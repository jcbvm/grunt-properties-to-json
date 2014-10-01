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
    }
};
