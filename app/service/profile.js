'use strict';

const Service = require('egg').Service;

class Profile extends Service {
    async list({offset = 0, limit = 10, order_by = 'created_at', order = 'ASC'}) {
        return this.ctx.model.Profile.findAndCountAll({
            offset,
            limit,
            order: [[order_by, order.toUpperCase()]],
        });
    }

    async find(id) {
        const profile = await this.ctx.model.Profile.findById(id);
        if (!profile) {
            this.ctx.throw(404, 'profile not found');
        }
        return profile;
    }


    async findAndFilter(id) {
        let profile = await this.ctx.model.Profile.findById(id);
        if (!profile) {
            this.ctx.throw(404, 'profile not found');
        }
        profile = JSON.parse(JSON.stringify(profile))
        profile.password = undefined;
        profile.created_at = undefined;
        profile.updated_at = undefined;
        profile.payment_password = undefined;
        // 数据转换
        if (Object.keys(profile).length > 0) {
            var keys = Object.keys(profile);
            keys.forEach(function (key) {
                // console.log(key, profile[key]);
                if (typeof profile[key] === 'undefined' || profile[key] == null) {
                    profile[key] = '';
                }
            })
        }
        return profile;
    }

    async create(profile) {
        return this.ctx.model.Profile.create(profile);
    }

    async findProfileByName(name) {
        // this.ctx.model.Profile.find()

        const one = await this.ctx.model.Profile.findOne({
            where: {
                name: name
            }
        });
        if (!one) {
            // this.ctx.throw(404, 'profile not found!')
        }
        return one;
    }

    async update({id, updates}) {
        const profile = await this.ctx.model.Profile.findById(id);
        if (!profile) {
            this.ctx.throw(404, 'profile not found');
        }
        return profile.update(updates);
    }

    async del(id) {
        const profile = await this.ctx.model.Profile.findById(id);
        if (!profile) {
            this.ctx.throw(404, 'profile not found');
        }
        return profile.destroy();
    }
}

module.exports = Profile;
