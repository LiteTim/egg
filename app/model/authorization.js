'use strict';

module.exports = app => {
    const {STRING, INTEGER, DATE} = app.Sequelize;

    const Authorization = app.model.define('authorization', {
        id: {
            type: INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        uid: STRING,
        provider: STRING,
        name:STRING,

        created_at: DATE,
        updated_at: DATE,
    });

    return Authorization;
};
