var env = process.env.NODE_ENV || 'development';
var appDir = process.argv[1];
var path = require('path');
var dirName = path.dirname(appDir);
var config = require('./config')[env];
var winston = require('winston');
var maxLogSize = 1 * 1024 * 1024;

var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ json: false, timestamp: true, maxsize: maxLogSize, colorize: true }),
        new winston.transports.File({ filename: path.join(dirName, config.logLocation, '/logs.log'), json: false, maxsize: maxLogSize })
    ],
    exceptionHandlers: [
        new (winston.transports.Console)({ json: false, timestamp: true, maxsize: maxLogSize, colorize: true }),
        new winston.transports.File({ filename: path.join(dirName, config.logLocation, '/exceptions.log'), json: false, maxsize: maxLogSize })
    ],
    exitOnError: false
});

module.exports = logger;