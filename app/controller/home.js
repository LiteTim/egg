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


    /**
     * @api {get} v1/users/user/:id 查询用户信息
     * @apiVersion 1.0.0
     * @apiName 获取用户信息
     * @apiGroup User
     * @apiPermission none
     *
     * @apiDescription Compare Verison 1.0.0
     *
     * @apiParam {Number}  id 用户ID
     *
     * @apiExample Example usage:
     * curl -i http://localhost/user/4711
     *
     * @apiSuccess {Number}   id            用户ID
     * @apiSuccess {Date}     registered    注册时间
     * @apiSuccess {Date}     name          用户名称
     * @apiSuccess {Object}   profile       用户简介
     * @apiSuccess {Number}   profile.age   年龄
     * @apiSuccess {String}   profile.image 头像地址
     * @apiSuccess {Object[]} options       空
     * @apiSuccess {String}   options.name  Option Name.
     * @apiSuccess {String}   options.value Option Value.
     *
     * @apiError NoAccessRight 没有认证登录
     * @apiError UserNotFound   该用户不存在
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 401 Not Authenticated
     *     {
 *       "error": "NoAccessRight"
 *     }
     */
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
        // console.log('result id:', id);
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
