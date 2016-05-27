module.exports = function getEnvironments() {
    var env = process.env.NODE_ENV || 'development';
    var config = require('../config/config')[env];

    var environments = {
        development: (config.env === 'development'),
        test: (config.env === 'test'),
        staging: (config.env === 'staging'),
        production: (config.env === 'production')
    };

    return (environments);
};
