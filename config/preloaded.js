module.exports = function getPreloaded() {
    var pkg = require('../package');
    var env = process.env.NODE_ENV || 'development';
    var config = require('../config/config')[env];
    var environments = require('../config/environments')();
    var contextFolder = process.env.NODE_CONTEXTFOLDER || config.contextFolder;
    var apiUrl = process.env.NODE_APIURL || config.apiUrl;
    var virtualDirectory = process.env.NODE_VIRTUALDIRECTORY || config.virtualDirectory;
    var baseHref = process.env.NODE_BASEHREF || config.baseHref;
    var credentials = process.env.NODE_CREDENTIALS || config.credentials;

    var preloaded = {
        pkg: {
            displayName: pkg.displayName,
            version: pkg.version,
            lastBuild: pkg.lastBuild
        },
        config: {
            env: env,
            contextFolder: contextFolder,
            apiUrl: apiUrl,
            virtualDirectory: virtualDirectory,
            baseHref: baseHref,
            credentials: credentials
        },
        environments: environments,
        resources: {
            loaded: false
        },
        loggedInUser: {
            username: '',
            affiliation: '',
            isAdmin: false,
            isLoggedIn: false
        }
    };

    return (preloaded);
};