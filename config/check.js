var mkdirp = require('mkdirp');

module.exports = function check(config) {

    // Make sure we have a logs directory.
    mkdirp(config.logLocation, function (err) {
        if (err) {
            console.error('Problem creating directory %s: %s', config.logLocation, err);
        }
    });

};
