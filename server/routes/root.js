var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config')[env];
var express = require('express');
var router = express.Router();
var pkg = require('../../package');
var logger = require('../../config/logger');
var preloaded = require('../../config/preloaded')();
var environments = require('../../config/environments')();

router.get([ '/index', '/home' ], function (req, res, next) {
    res.redirect(config.contextFolder + '/');
});

router.get('', function (req, res, next) {
    res.render('index', { title: pkg.displayName, package: pkg, preloaded: preloaded, environments: environments });
});

module.exports = router;
