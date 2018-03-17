const Parameter = require('parameter');

const LocalStrategy = require('passport-local').Strategy;
module.exports = app => {


    /**
     * Validate
     *
     * ```js
     * app.validator.addRule('jsonString', (rule, value) => {
   *   try {
   *     JSON.parse(value);
   *   } catch (err) {
   *     return 'must be json string';
   *   }
   * });
     *
     * app.validator.validate({
   * 	 name: 'string',
   * 	 info: { type: 'jsonString', required: false },
   * }, {
   *   name: 'Egg',
   *   info: '{"foo": "bar"}',
   * });
     * ```
     */
    app.validator = new Parameter();


    app.model.sync();

    // app.passport.verify(async (ctx, user) => {
    //     // 检查用户
    //     assert(user.provider, 'user.provider should exists');
    //     assert(user.id, 'user.id should exists');
    //
    //     console.log('ctx:', ctx, 'user:', user);
    //
    //     // 从数据库中查找用户信息
    //     //
    //     // Authorization Table
    //     // column   | desc
    //     // ---      | --
    //     // provider | provider name, like github, twitter, facebook, weibo and so on
    //     // uid      | provider unique id
    //     // user_id  | current application user id
    //     const auth = await ctx.model.Authorization.findOne({
    //         uid: user.id,
    //         provider: user.provider,
    //     });
    //     const existsUser = await ctx.model.User.findOne({id: auth.user_id});
    //     if (existsUser) {
    //         return existsUser;
    //     }
    //     // 调用 service 注册新用户
    //     const newUser = await ctx.service.user.register(user);
    //     return newUser;
    // });
    //
    // // 将用户信息序列化后存进 session 里面，一般需要精简，只保存个别字段
    // app.passport.serializeUser(async (ctx, user) => {
    //     // 处理 user
    //     // ...
    //     // return user;
    // });
    //
    // // 反序列化后把用户信息从 session 中取出来，反查数据库拿到完整信息
    // app.passport.deserializeUser(async (ctx, user) => {
    //     // 处理 user
    //     // ...
    //     // return user;
    // });


    // 挂载 strategy
    const config = app.config.passportLocal;
    config.passReqToCallback = true;

    app.passport.use(new LocalStrategy(config, (req, username, password, done) => {
        console.log('name:', username, 'password', password, done);
        // 把 Passport 插件返回的数据进行清洗处理，返回 User 对象
        const user = {
            provider: 'local',
            username,
            password,
        };
        // 这里不处理应用层逻辑，传给 app.passport.verify 统一处理
        app.passport.doVerify(req, user, done);
    }));

    // 处理用户信息
    app.passport.verify(async (ctx, user, done) => {
        // console.log('verify', user, done);

        switch (user.provider) {
            case 'local':
                return await verifyLocal(user)
                break;

        }

        async function verifyLocal(user) {

            const {username, password} = user;

            if (!username || !password) {
                return;
            }

            let user_profile = await ctx.service.profile.findProfileByName(username)

            if (!user_profile) {
                console.log('用户不存在');
                ctx.throw(404, "user not found!");
                return;
            }

            if (user_profile.password != password) {
                console.log('密码不正确', 'right:', user_profile.password, password);
                ctx.throw(401, "password error.")
                return;
            }
            return user_profile;


        }
    });


    app.passport.serializeUser(async (ctx, user) => {
        // ctx.session.passport.user = user;
        // console.log('serialize User', ctx.session);
        return user
    });
    app.passport.deserializeUser(async (ctx, user) => {
        // console.log('deserializeUser User', user, ctx.session, ctx.is);
        // ctx.session.user = null;
        return user;
    });


    app.sessionStore = {
        async get(key) {
            const res = await app.redis.get(key);
            // console.log('res:', res);
            if (!res) return null;

            try {
                return JSON.parse(res);
            } catch (err) {
                await app.redis.del(key);
            }
        },

        async set(key, value, maxAge) {
            // maxAge not present means session cookies
            // we can't exactly know the maxAge and just set an appropriate value like one day
            if (!maxAge) maxAge = 24 * 60 * 60 * 1000;
            value = JSON.stringify(value);
            await app.redis.set(key, value, 'PX', maxAge);
        },

        async destroy(key) {
            await app.redis.del(key);
        },
    };
};