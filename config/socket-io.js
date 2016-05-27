var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];
var logger = require('../config/logger');
var fs = require('fs');
var path = require('path');

module.exports = function (server) {
    var io = require('socket.io').listen(server);

    logger.info('Starting the Socket.IO Listener.');

    io.on('connection', function (socket) {
        // logger.info('Socket connection');
        // logger.info('Socket.id', socket.id);

        socket.emit('ping', {hello: 'world'});
        socket.on('pong', function (data) {
            logger.info('pong', JSON.stringify(data));
        });
        socket.on('ready', function (data) {
            logger.info('ready', JSON.stringify(data));
        });
        socket.on('disconnect', function () {
            io.emit('disconnected', {user: 'has disconnected!'});
        });

        io.emit('attention', {this: 'goes to everyone!'});
    });
    io.on('disconnect', function () {
        logger.info('Socket disconnection');
    });

    require('../config/tailer')(io);

    return (io);
};
