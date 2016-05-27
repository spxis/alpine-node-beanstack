module.exports = function (grunt) {
    // load all grunt tasks matching the `grunt-*` pattern
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        meta: {
            basePath: './',
            jsTestPath: 'test/',
            jsSourcePath: 'public/src/js/',
            jsDistributionPath: 'public/dist/js/',
            cssSourceSassPath: 'public/src/scss/',
            cssSourcePath: 'public/src/css/',
            cssDistributionPath: 'public/dist/css/',
            liveReload: true /* Set to false to disable LiveReload server, or true/port to enable */
        },

        banner: '/*!\n' +
        ' * Atigeo BeanStack Full Stack JavaScript Framework V1\n' +
        ' * Version <%= pkg.version %> built <%= grunt.template.today("yyyy-mm-dd") %>\n' +
        ' * Copyright <%= grunt.template.today("yyyy") %> Atigeo LLC\n' +
        '*/\n',

        files: {
            vendorJsFiles: [
                '<%= meta.jsDistributionPath %>vendors/atigeo-base.min.js',
                '<%= meta.jsDistributionPath %>vendors/moment.js',
                '<%= meta.jsDistributionPath %>vendors/pace.js',
                '<%= meta.jsDistributionPath %>vendors/underscore.js',
                '<%= meta.jsDistributionPath %>vendors/underscore.string.min.js',
                '<%= meta.jsDistributionPath %>vendors/angular-ui-notifications.js',
                '<%= meta.jsDistributionPath %>vendors/angular-ui-bootstrap.js',
                '<%= meta.jsDistributionPath %>vendors/angular-ui-bootstrap-tpls.js',
                '<%= meta.jsDistributionPath %>vendors/angular-ui-utils.js',
                '<%= meta.jsDistributionPath %>vendors/angular-ui-router.js',
                '<%= meta.jsDistributionPath %>vendors/angular-ng-storage.js',
                '<%= meta.jsDistributionPath %>vendors/atigeo-ng-common.js'
            ],
            vendorCssFiles: [
                '<%= meta.cssDistributionPath %>vendors/pace.css',
                '<%= meta.cssDistributionPath %>vendors/angular-loading.css',
                '<%= meta.cssDistributionPath %>vendors/angular-ui-notifications.css',
                '<%= meta.cssDistributionPath %>vendors/font-awesome.css'
            ],
            beanStackJsFiles: [
                // '<%= meta.jsSourcePath %>xui-bootstrap.js',
                // '<%= meta.jsSourcePath %>xUI.BeanStack.js'
            ],
            beanStackCssFiles: [
                '<%= meta.cssSourcePath %>/**/*.css',
                // '<%= meta.cssSourcePath %>xUI.BeanStack.sass.css'
            ],
            jsHintFiles: [
                'app.js',
                'gruntfile.js',
                'client/**/*.js',
                'app/*.js',
                'bin/**',
                'config/*.js',
                'controllers/*.js',
                'db/*.js',
                'models/*.js',
                'routes/*.js',
                'views/*.js',
                '<%= meta.jsSourcePath %>/*.js'
            ]
        },

        clean: {
            options: {
                force: true
            },
            build: {
                src: ['lib'],
                vendors: [
                    'public/dist/css/vendors',
                    'public/dist/js/vendors'
                ]
            },
            reset: {
                src: [
                    'lib',
                    'bower_components',
                    'node_modules'
                ]
            }
        },

        compass: {
            dev: {
                options: {
                    sassDir: 'public/src/scss',
                    cssDir: 'public/src/css'
                }
            }
        },

        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                mangle: {
                    except: ['$super', 'jQuery']
                },
                banner: '<%= banner %>'
            },
            // compressVendorJs: {
            //     files: {
            //         '<%= meta.jsDistributionPath %>vendor.min.js': ['<%= files.vendorJsFiles %>']
            //     }
            // },
            compressBeanStackJs: {
                files: {
                    '<%= meta.jsDistributionPath %>beanstack.min.js': ['<%= files.beanStackJsFiles %>']
                }
            }
        },

        concat: {
            options: {
                stripBanners: true
            },

            concatVendorCss: {
                files: {
                    '<%= meta.cssDistributionPath %>vendor.css': ['<%= files.vendorCssFiles %>']
                }
            },

            concatBeanStackCss: {
                files: {
                    '<%= meta.cssDistributionPath %>beanstack.css': ['<%= files.beanStackCssFiles %>']
                }
            },

            concatVendorJs: {
                files: {
                    '<%= meta.jsDistributionPath %>vendor.js': ['<%= files.vendorJsFiles %>']
                }
            },

            concatBeanStackJs: {
                src: ['<%= files.beanStackJsFiles %>'],
                dest: '<%= meta.jsDistributionPath %>beanstack.js'
            }
        },

        cssmin: {
            options: {
                banner: '<%= banner %>',
                report: true
            },
            minifyVendorCss: {
                files: {
                    '<%= meta.cssDistributionPath %>vendor.min.css': ['<%= files.vendorCssFiles %>']
                }
            },
            minifyBeanStackCss: {
                files: {
                    '<%= meta.cssDistributionPath %>beanstack.min.css': ['<%= files.beanStackCssFiles %>']
                }
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                esnext: true,
                quotmark: 'single',
                expr: true,
                '-W099': true,
                '-W053': true,
                '-W027': true,
                smarttabs: true,
                globals: {
                    jQuery: true,
                    MooTools: true
                },
                ignores: [
                    '<%= meta.jsSourcePath %>/*.min.js',
                    '<%= meta.jsSourcePath %>/*bootstrap*.js'
                ]
            },
            files: ['<%= files.jsHintFiles %>']
        },

        bower: {
            install: {
                options: {
                    verbose: true,
                    targetDir: './lib'
                }
            }
        },

//        shell: {
//
//        },

        bowercopy: {
            options: {
                srcPrefix: 'bower_components',
                clean: false
            },
            atigeo_ui: {
                src: 'atigeo-ui/dist/atigeo-base.min.css',
                dest: 'public/dist/css/atigeo-base.min.css'
            },
            // setup_fontawesome: {
            //     src: 'font-awesome/scss/*',
            //     dest: 'public/src/scss/font-awesome'
            // },
            // setup_sass: {
            //     src: 'bootstrap-sass-twbs/assets/stylesheets/bootstrap/*',
            //     dest: 'public/src/scss/bootstrap'
            // },
            deploy: {
                options: {
                    destPrefix: 'public/dist'
                },
                files: {
                    'js/vendors/atigeo-base.min.js': 'atigeo-ui/dist/atigeo-base.min.js',
                    'js/vendors/atigeo-ng-common.js': 'atigeo-ng-common/dist/atigeo-ng-common.min.js',
                    'js/vendors/angular.js': 'angular/angular.min.js',
                    'js/vendors/angular-ui-notifications.js': 'angular-ui-notification/dist/angular-ui-notification.min.js',
                    'css/vendors/angular-ui-notifications.css': 'angular-ui-notification/dist/angular-ui-notification.min.css',
                    'js/vendors/angular-ui-bootstrap.js': 'angular-bootstrap/ui-bootstrap.min.js',
                    'js/vendors/angular-ui-bootstrap-tpls.js': 'angular-bootstrap/ui-bootstrap-tpls.min.js',
                    'js/vendors/angular-ui-utils.js': 'angular-ui-utils/ui-utils.min.js',
                    'css/vendors/font-awesome.css': 'font-awesome/css/font-awesome.css',
                    'css/vendors/font-awesome.min.css': 'font-awesome/css/font-awesome.min.css',
                    'fonts': ['font-awesome/fonts/*'],
                    'css/fonts': ['atigeo-ui/dist/fonts/*'],
                    'icons': 'atigeo-ui/dist/icons/*',
                    'js/vendors/jquery.js': 'jquery/dist/jquery.js',
                    'js/vendors/jquery.min.js': 'jquery/dist/jquery.min.js',
                    'js/vendors/jquery.min.map': 'jquery/dist/jquery.min.map',
                    'js/vendors/moment.js': 'moment/min/moment.min.js',
                    'js/vendors/underscore.js': 'underscore/underscore-min.js',
                    'js/vendors/underscore.string.min.js': 'underscore.string/dist/underscore.string.min.js',
                    'js/vendors/angular-ui-router.js': 'angular-ui-router/release/angular-ui-router.min.js',
                    'js/vendors/angular-ng-storage.js': 'ngstorage/ngStorage.min.js',
                    'js/vendors/pace.js': 'PACE/pace.min.js',
                    'css/vendors/pace.css': 'PACE/themes/blue/pace-theme-minimal.css',
                }
            }
        },

        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: [],
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                createTag: false,
                commit: false,
                push: false
            }
        },

        watch: {
            options: {
                livereload: '<%= meta.liveReload %>' /* This value can true/false/port */
            },
            jshint: {
                files: ['<%= jshint.files %>'],
                tasks: ['jshint']
            },
            bump: {
                files: [
                    'app/**',
                    'bin/**',
                    'config/**',
                    'controllers/**',
                    'db/**',
                    'public/*.html',
                    'server/models/**',
                    'server/routes/**',
                    'views/**',
                    'app.js',
                    'gruntfile.js',
                    '<%= meta.jsSourcePath %>*.js',
                    '<%= meta.cssSourceSassPath %>*.scss'
                ],
                tasks: ['bump:patch']
            },
            js: {
                files: [
                    'gruntfile.js',
                    '<%= meta.jsSourcePath %>*.js'
                ],
                tasks: [
                    'concat:concatBeanStackJs',
                    'uglify:compressBeanStackJs'
                ]
            },
            css: {
                files: [
                    '<%= meta.cssSourceSassPath %>*.scss',
                    '!.sass-cache/**',
                    '!node_modules/**'
                ],
                tasks: [
                    'compass',
                    'cssmin:minifyVendorCss',
                    'cssmin:minifyBeanStackCss',
                    'concat:concatVendorCss',
                    'concat:concatBeanStackCss'
                ]
            }
            // babel: {
            //     files: ['client/**/*.js'],
            //     tasks: ['babel']
            // }
        },
        // babel: {
        //     options: {
        //         sourceMap: true,
        //         stage: 0
        //     },
        //     dist: {
        //         files: {
        //             'public/dist/js/app.js': 'client/**/*.js'
        //         }
        //     }
        // },

        systemjs: {
            options: {
                sfx: true,
                baseURL: './',
                configFile: './config.js',
                minify: true,
                sourceMaps: true,
                build: {
                    mangle: true
                }
            },
            dist: {
                files: [{
                    'src': './client/app.js',
                    'dest': './public/dist/js/app.min.js'
                }]
            }
        }
    });

    grunt.registerTask('default', 'Compiles all files and watches.',
        [
            'compass',
            'cssmin',
            'uglify',
            'concat',
            'bump',
            'watch'
        ]
    );
    grunt.registerTask('css',
        [
            'cssmin:minifyVendorCss',
            'cssmin:minifyBeanStackCss',
            'concat:concatVendorCss',
            'concat:concatBeanStackCss'
        ]);
    grunt.registerTask('js',
        [
            // 'uglify:compressVendorJs',
            'uglify:compressBeanStackJs',
            'concat:concatVendorJs',
            'concat:concatBeanStackJs',
            'systemjs'
        ]);
    grunt.registerTask('install', 'Cleans build folders, compiles all assets and copies to appropriate vendor destination, preparing for development.',
        [
            'clean:build',
            'bower',
            //'shell',
            'bowercopy',
            'compass',
            'cssmin',
            'uglify',
            'systemjs',
            'concat'
        ]
    );
};
