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
     * @apiError UserNotFound   该用户不存在
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 404 Not found
     *     {
     *       "error": "Not found"
     *     }
     */
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


    /**
     * @api {get} /v1/users/signin 登录接口
     * @apiVersion 1.0.0
     * @apiName 登录
     * @apiGroup User
     * @apiPermission none
     *
     * @apiDescription Compare Verison 1.0.0
     *
     *
     * @apiExample Example usage:
     * curl -i http://localhost/user/4711
     *
     * @apiParam {Number}   mobile        用户的手机号码
     * @apiParam {String}   password      用户的登录密码
     * @apiParam {String}   platform      平台（mobile）(可选参数， 放在请求头里面)
     *
     * @apiError UserNotFound   该用户不存在
     *
     * @apiErrorExample Response (example):
     *     HTTP/1.1 401 Not Authenticated
     *     {
     *       "error": "UserNotFound"
     *     }
     * @apiSuccessExample Response (example):
     *     HTTP/1.1 200
     *     {
     *          "state": 200,
     *          "msg": "sign in success",
     *          "sessionToken":"xxxxxx"
     *     }
     *
     */

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
