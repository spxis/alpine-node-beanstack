var env = process.env.NODE_ENV || 'development';
var appDir = process.argv[1];
var path = require('path');
var dirName = path.dirname(appDir);
var config = require('./config')[env];
var winston = require('winston');
var maxLogSize = 1 * 1024 * 1024;
var requestLogger = require('winston-request-logger');

module.exports = function httpLogger(app) {
    var logger = new (winston.Logger)({
        transports: [
            new winston.transports.File({ filename: path.join(dirName, config.logLocation, '/http.log'), json: true, maxsize: maxLogSize })
        ]
    });

    app.use(requestLogger.create(logger, {
        'ip': ':ip',
        'code': ':statusCode',
        'agent': ':userAgent',
        'time': ':responseTime ms',
        'method': ':method',
        'url': ':url[pathname]'
    }));
};
