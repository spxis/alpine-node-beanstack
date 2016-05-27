var express = require('express');
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config')[env];
var path = require('path');
var appDir = process.argv[1];
var dirName = path.dirname(appDir);
var logger = require('../config/logger');

module.exports = function statics(app) {
    // Expose static HTML files, Angular controllers, etc. here.
    if (config.contextFolder) {
        logger.info('Possible embedded website. Context folder "%s" defined.', config.contextFolder);

        app.use(config.contextFolder + '', express.static(path.join(__dirname, '../public')));
        app.use(config.contextFolder + 'components', express.static(path.join(__dirname, '../lib')));
        app.use(config.contextFolder + 'jspm_packages', express.static(path.join(__dirname, '../jspm_packages')));
        app.use(config.contextFolder + 'conf', express.static(path.join(__dirname, '../')));
        app.use(config.contextFolder + 'dist/js/client', express.static(path.join(__dirname, '../client')));
        app.use(config.contextFolder + 'templates', express.static(path.join(__dirname, '../views/templates')));
    } else {
        logger.info('Standalone website detected (no context folder defined in config file).');

        app.use('/', express.static(path.join(__dirname, '../public')));
        app.use('/components', express.static(path.join(__dirname, '../lib')));
        app.use('/jspm_packages', express.static(path.join(__dirname, '../jspm_packages')));
        app.use('/conf', express.static(path.join(__dirname, '../')));
        app.use('/dist/js/client', express.static(path.join(__dirname, '../client')));
        app.use('/templates', express.static(path.join(__dirname, '../views/templates')));
    }

    if (app.get('env') !== 'production') {
        // Expose JSON data files for non-production environments.
        app.use(config.contextFolder + '/json', express.static(path.join(__dirname, '../json')));

        // Expose Log files for non-production environments.
        app.use(config.contextFolder + '/logs', express.static(path.join(__dirname, '../logs')));
    }

};