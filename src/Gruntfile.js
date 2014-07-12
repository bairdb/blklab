var path = require('path');

var port = 8080;

module.exports = function (grunt) {
    grunt.initConfig({
        express: {
            options: {
                port: port,
                hostname: '*'
            },
            livereload: {
                options: {
                    server: path.resolve('./core/app.js'),
                    livereload: true,
                    serverreload: true,
                    bases: [path.resolve('./core')]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');
    grunt.loadNpmTasks('grunt-open');

    grunt.registerTask('default', ['express', 'express-keepalive']);
};
