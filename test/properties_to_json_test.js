'use strict';

var grunt = require('grunt');

exports.properties_to_json = {
    default: function(test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/default.json').replace(/\r\n|\r|\n/g,'');
        var expected = grunt.file.read('test/expected/default.json').replace(/\r\n|\r|\n/g,'');
        test.equal(actual, expected, 'Should correctly convert properties to json.');
        test.done();
    },
    dots: function(test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/dots.json').replace(/\r\n|\r|\n/g,'');
        var expected = grunt.file.read('test/expected/splitted.json').replace(/\r\n|\r|\n/g,'');
        test.equal(actual, expected, 'Should correctly convert properties to json.');
        test.done();
    },
    underscores: function(test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/underscores.json').replace(/\r\n|\r|\n/g,'');
        var expected = grunt.file.read('test/expected/splitted.json').replace(/\r\n|\r|\n/g,'');
        test.equal(actual, expected, 'Should correctly convert properties to json.');
        test.done();
    },
    exclude: function(test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/exclude.json').replace(/\r\n|\r|\n/g,'');
        var expected = grunt.file.read('test/expected/exclude.json').replace(/\r\n|\r|\n/g,'');
        test.equal(actual, expected, 'Should correctly exclude the "this" namespace, but include "that" and "there".');
        test.done();
    },
    include: function(test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/include.json').replace(/\r\n|\r|\n/g,'');
        var expected = grunt.file.read('test/expected/include.json').replace(/\r\n|\r|\n/g,'');
        test.equal(actual, expected, 'Should correctly include the "this" namespace, but exclude "that" and "there".');
        test.done();        
    },
    excludeInclude: function(test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/excludeInclude.json').replace(/\r\n|\r|\n/g,'');
        var expected = grunt.file.read('test/expected/excludeInclude.json').replace(/\r\n|\r|\n/g,'');
        test.equal(actual, expected, 'Should correctly exclude the "this" namespace, include "that", and exclude "there".');
        test.done();
    }
};
