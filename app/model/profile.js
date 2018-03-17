'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE, BOOLEAN} = app.Sequelize;

    console.log('define table profile');
    console.log(app.model.define);

    const Profile = app.model.define('profile', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        u_id: STRING,
        user_id: STRING,
        name: STRING,
        displayName: STRING,
        profile_id: STRING,
        payment_password: STRING,
        freeze_balance: INTEGER,
        gender: BOOLEAN,
        password: STRING,
        wechat_id: STRING,
        mobile: STRING,
        email: STRING,
        birth: DATE,
        balance: INTEGER,
        avatar: STRING,
        age: INTEGER,
        id_card: STRING,
        created_at: DATE,
        updated_at: DATE,
    });

    // User.prototype.associate = function () {
    //     app.model.User.hasMany(app.model.Post, {as: 'posts', foreignKey: 'user_id'});
    // };

    return Profile;
};
