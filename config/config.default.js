'use strict';

module.exports = appInfo => {
    var exports = {};
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1520671153486_3327';

    // add your config here
    config.middleware = ['errorHandler'];

    // 只对 /api 前缀的 url 路径生效
    config.errorHandler = {
        match: '/api',
    }

    config.passportGithub = {
        key: '_1520671153486_3327',
        secret: '_1520671153486_3327__'
    };
    config.passportLocal = {
        key: '_1520671153486_3327',
        secret: '_1520671153486_3327__'
    };

    config.sequelize = {
        dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
        database: 'example_dev',
        host: 'localhost',
        port: '3306',
        username: 'root',
        password: 'root',
    };

    config.security = {
        xframe: {
            enable: true,
        },
        domainWhiteList: ['http://localhost:7001/', 'http://127.0.0.1:7001/', '127.0.0.1:7001', '127.0.0.1:7001/', 'chrome-extension://aicmkgpgakddgnaphhhpliifpcfhicfo\''],
        csrf: {enable: false,}
    };
    config.cors = {
        origin: '*'
        // {string|Array} allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    config.redis = {
        client: {
            port: 6379,          // Redis port
            host: '127.0.0.1',   // Redis host
            password: 'auth',
            db: 0,
        },
    }
    return config;
    //apidoc -i ./app/controller -o /Users/cenxiaozhong/Desktop/git/egg-web/app/doc
};
