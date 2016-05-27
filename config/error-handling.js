module.exports = function errors(app) {
    var pkg = require('../package');
    var env = process.env.NODE_ENV || 'development';
    var config = require('../config/config')[env];
    var environments = require('../config/environments')();
    var logger = require('./logger');

    /// catch 404 and forward to error handler
    app.use(function (err, req, res, next) {
        if (err.status !== 404) {
            return next();
        }
        res.render('error', {
            message: err.message,
            error: err,
            config: config,
            package: pkg,
            layout: 'public',
            environments: environments
        });
    });

    /// error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                config: config,
                package: pkg,
                layout: 'public',
                environments: environments
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            config: config,
            package: pkg,
            layout: 'public',
            environments: environments
        });
    });
};