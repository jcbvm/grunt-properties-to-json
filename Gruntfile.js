module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            all: ['Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        clean: {
            tests: 'tmp'
        },
        nodeunit: {
            tests: 'test/properties-to-json.js'
        },
        propertiesToJSON: {
            default: {
                src: 'test/fixtures/default.properties',
                dest: 'tmp'
            },
            dots: {
                src: 'test/fixtures/dots.properties',
                dest: 'tmp',
                options: {
                    splitKeysBy: '.'
                }
            },
            underscores: {
                src: 'test/fixtures/underscores.properties',
                dest: 'tmp',
                options: {
                    splitKeysBy: /_/
                }
            },
            exclude: {
                src: 'test/fixtures/exclude.properties',
                dest: 'tmp',
                options: {
                    splitKeysBy: '.',
                    exclude: 'this'
                }
            },
            include: {
                src: 'test/fixtures/include.properties',
                dest: 'tmp',
                options: {
                    splitKeysBy: '.',
                    include: 'this'
                }
            },
            excludeInclude: {
                src: 'test/fixtures/excludeInclude.properties',
                dest: 'tmp',
                options: {
                    splitKeysBy: '.',
                    exclude: 'this',
                    include: 'that'
                }
            },
            merge: {
                src: 'test/fixtures/merge*.properties',
                dest: 'tmp/merged.json',
                options: {
                    splitKeysBy: '.',
                    merge: true
                }
            }
        }
    });
    
    grunt.loadTasks('tasks');
    
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    
    grunt.registerTask('test', ['clean', 'propertiesToJSON', 'nodeunit']);
    grunt.registerTask('default', ['jshint', 'test']);
};
