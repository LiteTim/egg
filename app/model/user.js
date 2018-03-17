'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;

    const User = app.model.define('user', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        u_id: STRING,
        profile_id: STRING,
        provider: STRING,
        token: STRING,//for oauth1
        tokenSecret: STRING, //for oauth1
        accessToken: STRING, //for oauth2
        refreshToken: STRING, // for oauth2
        created_at: DATE,
        updated_at: DATE,

    });

    User.prototype.associate = function () {
        app.model.User.hasMany(app.model.Post, {as: 'posts', foreignKey: 'user_id'});
    };

    return User;
};


