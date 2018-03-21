'use strict';

const Controller = require('egg').Controller;

const signupRule = {
    username: 'string',
    password: 'string',
    provider: 'string'
}

class HomeController extends Controller {
    async index() {
        this.ctx.body = 'hi, egg';
        console.log('hi')
    }



    async login() {
        console.log('login');
    }


    async signup() {

        let ctx = this.ctx;
        ctx.validate(signupRule);

        let user = await ctx.service.user.createByParams(ctx.request.body);
        if (user) {
            ctx.status = 201;
            ctx.body = {
                msg: 'sign up success'
            }
        } else {
            ctx.status = 500;
            ctx.body = {
                state: -1,
                msg: 'error'
            }
        }
    }

    async authCallback() {
        let ctx = this.ctx;
        ctx.session.visited = ctx.session.visited ? ctx.session.visited++ : 1;

        console.log('authCallback login success', 'session:', ctx.session);
        ctx.status = 200;
        ctx.body = {
            success: 'login success'
        }
    }
}

module.exports = HomeController;
