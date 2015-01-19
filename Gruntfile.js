'use strict';

module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        clean: {
            tests: ['tmp']
        },
        properties_to_json: {
            default: {
                files: [{
                    src: ['test/fixtures/default.properties'],
                    dest: 'tmp'
                }]
            },
            dots: {
                files: [{
                    src: ['test/fixtures/dots.properties'],
                    dest: 'tmp'
                }],
                options: {
                    splitKeysBy: '.'
                }
            },
            underscores: {
                files: [{
                    src: ['test/fixtures/underscores.properties'],
                    dest: 'tmp'
                }],
                options: {
                    splitKeysBy: /_/
                }
            },
            exclude: {
                files: [{
                    src: ['test/fixtures/exclude.properties'],
                    dest: 'tmp'
                }],
                options: {
                    splitKeysBy: '.',
                    exclude: 'this'
                }
            },
            include: {
                files: [{
                    src: ['test/fixtures/include.properties'],
                    dest: 'tmp'
                }],
                options: {
                    splitKeysBy: '.',
                    include: 'this'
                }
            },
            excludeInclude: {
                files: [{
                    src: ['test/fixtures/excludeInclude.properties'],
                    dest: 'tmp'
                }],
                options: {
                    splitKeysBy: '.',
                    exclude: 'this',
                    include: 'that'
                }
            }
        },
        nodeunit: {
            tests: ['test/*_test.js']
        }
    });
    
    grunt.loadTasks('tasks');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    
    grunt.registerTask('test', ['clean', 'properties_to_json', 'nodeunit']);
    grunt.registerTask('default', ['jshint', 'test']);
};
