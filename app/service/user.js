'use strict';

const Service = require('egg').Service;
let uuid = require('node-uuid')

class User extends Service {
    async list({offset = 0, limit = 10, order_by = 'created_at', order = 'ASC'}) {
        return this.ctx.model.User.findAndCountAll({
            offset,
            limit,
            order: [[order_by, order.toUpperCase()]],
        });
    }

    async find(id) {
        const user = await this.ctx.model.User.findById(id);
        if (!user) {
            this.ctx.throw(404, 'user not found');
        }
        return user;
    }

    async create(user) {
        return this.ctx.model.User.create(user);
    }

    async createByParams(user) {

        let tmp_user = {u_id: this.createUUID(), profile_id: this.createUUID(), provider: user.provider};
        let profile = {
            u_id: tmp_user.profile_id,
            user_id: tmp_user.u_id,
            name: user.username,
            password: user.password,
            provider: user.provider
        };
        // console.log(this, this.ctx);

        let one = await this.ctx.service.profile.findProfileByName(profile.name);

        console.log('one:', typeof one !== 'undefined', profile.name);
        if (one) {
            console.log(JSON.stringify(one));
            this.ctx.throw(409, "user has been exist!")
        }

        this.ctx.service.profile.create(profile);
        // console.log(tmp_user, profile);
        return this.ctx.model.User.create(tmp_user);
    }

    createUUID() {
        var _id = uuid.v4();
        _id = _id.replace(/-/g, '');
        return _id;
    }

    async update({id, updates}) {
        const user = await this.ctx.model.Profile.findById(id);
        if (!user) {
            this.ctx.throw(404, 'user not found');
        }
        console.log(id, updates, (updates.gender || user.gender));
        /**
         * 做一次数据清洗
         */
        const update = {
            name: updates.name || user.name,
            payment_password: updates.payment_password || user.payment_password,
            displayName: updates.displayName || user.displayName,
            freeze_balance: updates.freeze_balance || user.freeze_balance,
            gender: typeof updates.gender == 'undefined' ? undefined : updates.gender ? true : false,
            password: updates.password || user.password,
            wechat_id: updates.wechat_id || user.wechat_id,
            birth: updates.birth || user.birth,
            age: updates.age || user.age,
            email: updates.email || user.email,
            mobile: updates.mobile || user.mobile,
            id_card: updates.id_card || user.id_card
        };

        // console.log('update:', update);
        return user.update(update);
    }

    async del(id) {
        const user = await this.ctx.model.User.findById(id);
        if (!user) {
            this.ctx.throw(404, 'user not found');
        }
        return user.destroy();
    }
}

module.exports = User;
