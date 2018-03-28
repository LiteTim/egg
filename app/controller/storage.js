const Controller = require('egg').Controller;
const ALY = require("aliyun-sdk")
let sts;

class StorageController extends Controller {


    async STSToken() {
        //isAuthenticated
        if (!this.ctx.isAuthenticated()) {
            this.ctx.throw(401, "Unauthorized");
            return;
        }
        let ctx = this.ctx;

        let response = await new Promise(function (full, error) {
            // 构建一个 Aliyun Client, 用于发起请求
            // 构建Aliyun Client时需要设置AccessKeyId和AccessKeySevcret
            // STS是Global Service, API入口位于华东 1 (杭州) , 这里使用sts API的主地址
            if (!sts) {
                sts = new ALY.STS({
                    accessKeyId: "LTAI1GAEoTh5N3Zg",
                    secretAccessKey: "y1UGRacmFs2MfEI02w1HiOH2vTnbTl",
                    endpoint: 'https://sts.aliyuncs.com',
                    apiVersion: '2015-04-01'
                });
            }

            // 构造AssumeRole请求
            sts.assumeRole({
                Action: 'AssumeRole',
                // 指定角色Arn
                RoleArn: 'acs:ram::1445259050276282:role/ramroletravelappwrite',
                //设置Token的附加Policy，可以在获取Token时，通过额外设置一个Policy进一步减小Token的权限；
                Policy: '{"Version":"1","Statement":[{"Effect":"Allow","Action":["oss:PutObject"],"Resource":["acs:oss:*:*:travelnote","acs:oss:*:*:travelnote/' + ctx.user.user_id + '/*"]}]}',
                //设置Token有效期，可选参数，默认3600秒；
                //DurationSeconds: 3600,
                RoleSessionName: ctx.user.user_id
            }, function (err, res) {
                if (err) {
                    error(err)
                } else {
                    console.log(err, res);
                    full(res)
                }
            });

            console.log('{"Version":"1","Statement":[{"Effect":"Allow","Action":["oss:PutObject"],"Resource":["acs:oss:*:*:travelnote","acs:oss:*:*:travelnote/${user_id}/*"]}]}')

        });

        ctx.status = 200;
        ctx.body = response;
    }

}

module.exports = StorageController;