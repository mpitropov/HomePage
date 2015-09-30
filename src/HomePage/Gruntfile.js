/*
This file in the main entry point for defining grunt tasks and using grunt plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkID=513275&clcid=0x409
*/
module.exports = function (grunt) {
    // load Grunt plugins from NPM
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-uncss');


    // configure plugins
    grunt.initConfig({
        uglify: {
            my_target: {
                // Compiles Scripts/app.js which has angularjs module
                // Then the rest of the js files into wwwwroot/app.js
                files: {
                    'wwwroot/app.js': ['js/jquery.js', 'js/bootstrap.min.js', 'js/jquery.easing.min.js',
                        'js/jquery.fittext.js', 'js/wow.min.js', 'js/creative.js', 'js/cbpAnimatedHeader.js', 'js/classie.js']
                }
            }
        },

        watch: {
            scripts: {
                files: ['js/**/*.js'],
                tasks: ['uglify']
            }
        },

        imagemin: {
            dynamic: {                         // Another target
                options: {
                    optimizationLevel: 7,
                    progressive: true
                },
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: 'img/',                   // Src matches are relative to this path
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
                    dest: 'wwwroot/img/'                  // Destination path prefix
                }]
            }
            //png: {
            //    options: {
            //        optimizationLevel: 7
            //    },
            //    files: [
            //      {
            //          // Set to true to enable the following options…
            //          expand: true,
            //          // cwd is 'current working directory'
            //          cwd: 'img/',
            //          src: ['**/*.png'],
            //          // Could also match cwd line above. i.e. img/
            //          dest: 'wwwroot/img/',
            //          ext: '.png'
            //      }
            //    ]
            //},
            //jpg: {
            //    options: {
            //        progressive: true
            //    },
            //    files: [
            //      {
            //          // Set to true to enable the following options…
            //          expand: true,
            //          // cwd is 'current working directory'
            //          cwd: 'img/',
            //          src: ['**/*.jpg'],
            //          // Could also match cwd line above. i.e. img/
            //          dest: 'wwwroot/img/',
            //          ext: '.jpg'
            //      }
            //    ]
            //}
            //dist: {
            //    options: {
            //        optimizationLevel: 5 // 0-7,  3 default
            //    },
            //    files: [{
            //        expand: true,
            //        cwd: 'img',
            //        src: ['**/*.{png,gif}'],//jpg,
            //        dest: 'wwwroot/img/'
            //    }]
            //}
        },
        cssmin: {
            dist: {
                options: {
                    banner: '/* CSS Combined */'
                },
                files: {
                    'wwwroot/css/style.min.css': ['css/bootstrap.min.css', 'css/animate.min.css',
                        'css/creative.css']
                }
            },
            post: {
                options: {
                    keepSpecialComments: 0
                },
                files: {
                    'wwwroot/css/style.min.css': ['wwwroot/css/style.min.css']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '',
                    src: 'index.html',
                    dest: 'wwwroot/'
                }]
            }
        },
        uncss: {
            dist: {
                options: {
                    ignore: [/js-.+/, '.special-class'],
                    ignoreSheets: [/fonts.googleapis/, /font-awesome.min.css/],
                },
                files: [
                    { src: 'wwwroot/index.html', dest: 'wwwroot/css/style.min.css' }
                ]
            }
        },
    });

    // define tasks
    grunt.registerTask('default', ['uglify', 'imagemin', 'watch']);
    grunt.registerTask('imagemin --force', ['imagemin']);
    grunt.registerTask('create', ['uglify', 'cssmin', 'htmlmin', 'cssmin:post']);


};