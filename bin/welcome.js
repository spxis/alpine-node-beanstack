var path = require('path');
var appDir = process.argv[1];
var dirName = path.dirname(appDir);
var http = require('http');
var logger = require('../config/logger');
var express = require('express');

process.chdir(dirName);

var app = express();
var server = http.createServer(app);

app.use('/', function (req, res, next) {
    logger.info('Loading welcome page.');
    res.sendFile(path.join(dirName, '../public/welcome.html'));
});

logger.info('Started welcome docker.');

server.listen(3000);
