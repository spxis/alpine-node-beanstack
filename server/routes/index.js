module.exports = function (app) {
    var env = process.env.NODE_ENV || 'development';
    var express = require('express');
    var config = require('../../config/config')[env];
    var logger = require('../../config/logger');

    var root = require('./root');

    // If the router cannot find a path that matches the configurations defined in each Route below,
    // it will look to render any HTML files found in the public statics folders.
    app.use(config.contextFolder + '/', root);

};
