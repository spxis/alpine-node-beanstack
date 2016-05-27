var env = process.env.NODE_ENV || 'development';
var path = require('path');
var util = require('util');
var config = require('./config')[env];
var logger = require('./logger');

module.exports = function liveReloadModule(app) {
    var defaultLiveReloadPort = 35729; // TODO: It would be nice to have this coming from a CONSTANTS file.
    var defaultExcludeList = ['.js', '.git', '.svn', '.hg', '.svg', '.flv'];
    var defaultExtensions = ['html', 'hbs', 'css', 'js', 'png', 'gif', 'jpg', 'php', 'php5', 'py', 'rb', 'erb', 'coffee'];

    var liveReloadPort = config.liveReloadPort || defaultLiveReloadPort;
    var excludeList = config.excludeList || defaultExcludeList;
    var liveReloadByGrunt = (undefined !== config.liveReloadByGrunt) ? config.liveReloadByGrunt : true;
    var lrOptions = {
        exts: defaultExtensions
    };

    // Start the liveReload server in development only.
    if ('development' === env) {

        // If we want to run the LiveReload server without a grunt watch task, set liveReloadByGrunt to false.
        if (liveReloadByGrunt) {
            logger.warn('LiveReload server will start on port %s when "grunt watch" task is started.', liveReloadPort);
            logger.warn('To autostart LiveReload server without grunt, set liveReloadByGrunt to false.');
        } else {
            var liveReload = require('livereload');
            var server = liveReload.createServer(lrOptions);

            server.watch(path.join(__dirname, '../public'));

            var message = util.format('LiveReload server running on %s:%s.',
                config.serverUri, liveReloadPort);

            logger.info(message);
        }

        // Add the LiveReload.js script to each page.
        app.use(require('connect-livereload')({
            port: liveReloadPort,
            excludeList: excludeList
        }));
    }
};
