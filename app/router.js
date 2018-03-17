'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);
    app.router.resources('topics', '/api/v2/topics', app.controller.topics);
    app.passport.mount('github');

    // 鉴权成功后的回调页面
    router.get('/api/v1/authCallback', controller.home.authCallback);
    // 渲染登录页面，用户输入账号密码
    router.get('/api/v1/login', controller.home.login);
    // 注册页面
    router.post('/api/v1/signup', controller.home.signup);
    // 登录校验
    router.post('/api/v1/login', app.passport.authenticate('local', {successRedirect: '/api/v1/authCallback'}));
    router.put('/api/v1/users/:id', controller.users.update);

    router.get('/api/v1/users/:id', controller.users.index);

    router.post('/api/v1/security/captcha/graphic', controller.security.graphic);

    router.post('/api/v1/security/captcha/sms', controller.security.SMS);
    // console.log('passport:',app.passport.authenticate)

    router.post('/api/v1/storage/token', controller.storage.STSToken);
};
