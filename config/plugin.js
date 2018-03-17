'use strict';

// had enabled by egg
// exports.static = true;
exports.validate = {
    package: 'egg-validate',
};

exports.passport = {
    enable: true,
    package: 'egg-passport',
};

exports.passportGithub = {
    enable: true,
    package: 'egg-passport-github',
};

exports.sequelize = {
    enable: true,
    package: 'egg-sequelize'
}
exports.cors = {
    enable: true,
    package: 'egg-cors',
};
exports.redis = {
    enable: true,
    package: 'egg-redis',
};