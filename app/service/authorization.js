'use strict';

const Service = require('egg').Service;

class Authorzation extends Service {
    async list({ offset = 0, limit = 10, order_by = 'created_at', order = 'ASC' }) {
        return this.ctx.model.Authorzation.findAndCountAll({
            offset,
            limit,
            order: [[ order_by, order.toUpperCase() ]],
        });
    }

    async find(id) {
        const authorzation = await this.ctx.model.Authorzation.findById(id);
        if (!authorzation) {
            this.ctx.throw(404, 'Authorzation not found');
        }
        return Authorzation;
    }

    async create(authorzation) {
        return this.ctx.model.authorzation.create(authorzation);
    }

    async update({ id, updates }) {
        const authorzation = await this.ctx.model.Authorzation.findById(id);
        if (!authorzation) {
            this.ctx.throw(404, 'authorzation not found');
        }
        return authorzation.update(updates);
    }

    async del(id) {
        const authorzation = await this.ctx.model.Authorzation.findById(id);
        if (!authorzation) {
            this.ctx.throw(404, 'authorzation not found');
        }
        return authorzation.destroy();
    }
}

module.exports = Authorzation;
