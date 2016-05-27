var appDir = process.argv[1];
var path = require('path');
var dirName = path.dirname(appDir);
var logger = require('./logger');
var exphbs = require('express-handlebars');
var pkg = require('../package');
var extension = pkg.templateEngine;

module.exports = function viewEngine(app) {

    var viewsRoot = '../views';

    /*---------------------------------------------------------------------------*/
    // Add and configure Handlebars support.
    // https://github.com/ericf/express-handlebars
    // https://github.com/ericf/express-handlebars/tree/master/examples
    /*---------------------------------------------------------------------------*/

    if (extension === 'hbs') {
        var handlebarsHelpers = {
            dateFormat: function (context, block) {
                var f = block.hash.format || dates.isoDate;
                return moment(context).format(f);
            },
            timeFromNow: function (context) {
                return moment(context).fromNow();
            },
            ifCond: function (v1, operator, v2, options) {
                switch (operator) {
                    /*jslint eqeq: true */
                    case '==':
                        return (v1 == v2) ? options.fn(this) : options.inverse(this);
                    case '===':
                        return (v1 === v2) ? options.fn(this) : options.inverse(this);
                    case '<':
                        return (v1 < v2) ? options.fn(this) : options.inverse(this);
                    case '<=':
                        return (v1 <= v2) ? options.fn(this) : options.inverse(this);
                    case '>':
                        return (v1 > v2) ? options.fn(this) : options.inverse(this);
                    case '>=':
                        return (v1 >= v2) ? options.fn(this) : options.inverse(this);
                    case '&&':
                        return (v1 && v2) ? options.fn(this) : options.inverse(this);
                    case '||':
                        return (v1 || v2) ? options.fn(this) : options.inverse(this);
                    default:
                        return options.inverse(this);
                }
            },
            plusOne: function (number) {
                return number + 1;
            },
            json: function (context) {
                return JSON.stringify(context);
            }
        };
        var hbsOptions = {
            extname: '.' + extension,
            defaultLayout: 'main',
            layoutsDir: viewsRoot + '/layouts',
            partialsDir: [
                    viewsRoot + '/templates',
                    viewsRoot + '/partials'
            ],
            helpers: handlebarsHelpers
        };

        app.engine(extension, exphbs(hbsOptions));
        app.set('views', path.join(__dirname, viewsRoot));
        app.set('view engine', extension); // 'ejs'
        app.set('view options', { layouts: null });
    } else {
        // NOTE: This does not work yet.
        app.set('views', path.join(__dirname, viewsRoot));
        app.set('view engine', extension); // 'ejs'
        app.set('view options', { layouts: null });
    }

    logger.info('View engine "%s" has been configured.', app.get('view engine'));

};
