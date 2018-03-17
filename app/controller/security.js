const Controller = require('egg').Controller;
const captcha = require('trek-captcha');
// const KoaRedis = require('koa-redis'); //内部做了对象的序列化 ，并且允许传入定时器
let uuid = require('node-uuid');
const SMSClient = require('@alicloud/sms-sdk');
//cnpm install @alicloud/sms-sdk --save

let config = require('../../config/default');

let smsClient = new SMSClient({
    accessKeyId: config.ALIYUN.sms_accessKeyId,
    secretAccessKey: config.ALIYUN.sms_secretAccessKey
});
const mobielRule = {
    mobile: {type: 'string', required: true},
    captchaId: {type: 'string', required: false},
    captcha: {type: 'string', required: false},
}

class SecurityController extends Controller {


    async SMS() {

        this.ctx.validate(mobielRule);

        let ctx = this.ctx;
        let redis = this.ctx.app.sessionStore;
        let result = {
            state: -1,
            msg: ''
        };
        ctx.body = result;
        const {mobile, captchaId, captcha} = this.ctx.request.body;

        if (!(/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
            result.msg = '您的手机号码有误';
            console.log('手机号码有误');
            this.ctx.throw(400, "args error");
        }


        let mobileStore = await this.ctx.app.sessionStore.get("sms_" + ctx.mobile);

        if (!mobileStore) {
            mobileStore = {
                times: -1,
                smsCode: -1
            }
        }


        console.log('mobileStore  ===  >', mobileStore);
        if (mobileStore && mobileStore.times >= 2) {
            if (typeof captchaId === 'undefined') {
                mobileStore.times++;
                mobileStore.smsCode = -1;
                result.state = -1;
                result.msg = '没有找到图形验证码';
                await redis.set("sms_" + ctx.mobile, mobileStore, 60 * 30 * 1000);
                return;
            } else {

                if ((await redis.get(captchaId)) !== captcha) {

                    result.state = -1;
                    result.msg = '验证码失效!';
                    mobileStore.times++;
                    mobileStore.smsCode = -1;
                    await redis.set("sms_" + ctx.mobile, mobileStore, 60 * 30 * 1000);
                    return;
                }
            }

        }

        let sms_code = Math.random().toString().slice(-6);

        // await redis.destroy("sms_" + ctx.mobile);
        let mobileStoreInfo = (await redis.get("sms_" + ctx.mobile) ) || {times: 0, smsCode: sms_code};
        console.log(JSON.stringify(mobileStoreInfo));
        mobileStoreInfo.times = parseInt(mobileStoreInfo.times) + 1;

        await redis.set("sms_" + ctx.mobile, mobileStoreInfo, 60 * 30 * 1000);//30钟过期
        console.log((await redis.get("sms_" + ctx.mobile)))
        smsClient.sendSMS({
            PhoneNumbers: mobile,
            SignName: '旅游笔记',
            TemplateCode: 'SMS_113450896',
            TemplateParam: '{"code":' + sms_code + '}'
        }).then(function (res) {
            let {Code} = res
            if (Code === 'OK') {
                //处理返回参数
                console.log(res)
            }
        }, function (err) {
            console.log(err)
        })

        result.state = 1;
        result.msg = '验证码发送成功';
    }


    async graphic() {

        const result = await captcha();
        let captcha_id = uuid.v4();
        let storeMsg = {'captcha_id': captcha_id, 'token': result.token};
        result.token = undefined;
        result['captcha_id'] = captcha_id;
        console.log('result  captcha', captcha_id);
        this.ctx.body = {
            'captcha_id': captcha_id,
            buffer: result.buffer.toString("base64")
        };
        await this.ctx.app.redis.set(captcha_id, storeMsg,);
        await  this.ctx.app.redis.expire(captcha_id, 30 * 1000 * 60);
        console.log('redis:',);
    }

}

module.exports = SecurityController;