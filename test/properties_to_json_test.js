'use strict';

var grunt = require('grunt');

exports.properties_to_json = {
    test: function(test) {
        test.expect(1);
        var actual = grunt.file.read('tmp/test.json').replace(/\r\n|\r|\n/g,'');
        var expected = grunt.file.read('test/expected/test.json').replace(/\r\n|\r|\n/g,'');
        test.equal(actual, expected, 'Should correctly convert properties to json.');
        test.done();
    }
};
