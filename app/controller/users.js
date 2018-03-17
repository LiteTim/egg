'use strict';

const Controller = require('egg').Controller;

const updateRule = {
    name: {type: 'string', required: false},
    payment_password: {type: 'string', required: false},
    displayName: {type: 'string', required: false},
    provider: {type: 'string', required: false},
    freeze_balance: {type: 'integer', required: false},
    gender: {type: 'boolean', required: false},
    password: {type: 'string', required: false},
    wechat_id: {type: 'string', required: false},
    birth: {type: 'string', required: false},
    age: {type: 'string', required: false},
    email: {type: 'string', required: false},
    mobile: {type: 'string', required: false},
    id_card: {type: 'string', required: false}
    /**
     *
     freeze_balance: INTEGER,
     gender: STRING,
     password: STRING,
     wechat_id: STRING,
     mobile: STRING,
     email: STRING,
     birth: DATE,
     balance: INTEGER,
     avatar: STRING,
     age: INTEGER,
     id_card: STRING,
     */
}

class UsersController extends Controller {


    async index() {

        console.log(!this.ctx.isAuthenticated(), !this.ctx.user);
        if (!this.ctx.isAuthenticated() || !this.ctx.user) {
            // console.log('hi', this.ctx.app.router);
            // this.ctx.redirect('/api/v1/login');
            // this.ctx.app.router.redirect('/', '/api/v1/login', 302);
            this.ctx.throw(401, "Unauthorized");
            return;
        }

        // console.log(JSON.stringify(this.ctx.request.header));

        let profile = await this.ctx.service.profile.findAndFilter(this.ctx.user.id);
        this.ctx.status = 200;
        this.ctx.body = profile;
    }


    async login() {
        console.log('login');
    }

    async update() {

        // console.log('params update', this.ctx.isAuthenticated(), this.ctx.user);

        if (!this.ctx.isAuthenticated()) {
            // this.ctx.redirect('/api/v1/login');
            this.ctx.throw(401, "Unauthorized");
            return;
        }

        this.ctx.validate(updateRule);
        let user = await this.ctx.service.user.update({id: this.ctx.user.id, updates: this.ctx.request.body});
        // console.log('user:', user);
        this.ctx.status = 200;
        this.ctx.body = {
            success: 'success'
        }

    }


}

module.exports = UsersController;
