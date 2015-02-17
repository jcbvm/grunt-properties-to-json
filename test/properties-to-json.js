var grunt = require('grunt');

var readFile = function(path) {
    return grunt.file.read(path).replace(/\r\n|\r|\n/g,'');
};

exports.tests = {
    default: function(test) {
        test.expect(1);
        var actual = readFile('tmp/default.json');
        var expected = readFile('test/expected/default.json');
        test.equal(actual, expected, 'Should correctly convert properties to json.');
        test.done();
    },
    dots: function(test) {
        test.expect(1);
        var actual = readFile('tmp/dots.json');
        var expected = readFile('test/expected/splitted.json');
        test.equal(actual, expected, 'Should correctly convert properties to json.');
        test.done();
    },
    underscores: function(test) {
        test.expect(1);
        var actual = readFile('tmp/underscores.json');
        var expected = readFile('test/expected/splitted.json');
        test.equal(actual, expected, 'Should correctly convert properties to json.');
        test.done();
    },
    exclude: function(test) {
        test.expect(1);
        var actual = readFile('tmp/exclude.json');
        var expected = readFile('test/expected/filterExclude.json');
        test.equal(actual, expected, 'Should correctly exclude the "this" namespace, but include "that" and "there".');
        test.done();
    },
    excludeDeep: function(test) {
        test.expect(1);
        var actual = readFile('tmp/excludeDeep.json');
        var expected = readFile('test/expected/filterDeep.json');
        test.equal(actual, expected, 'Should correctly exclude the (deep) "there", "another" and "two" namespaces.');
        test.done();
    },
    include: function(test) {
        test.expect(1);
        var actual = readFile('tmp/include.json');
        var expected = readFile('test/expected/filterInclude.json');
        test.equal(actual, expected, 'Should correctly include the "this" namespace, but exclude "that" and "there".');
        test.done();        
    },
    includeDeep: function(test) {
        test.expect(1);
        var actual = readFile('tmp/includeDeep.json');
        var expected = readFile('test/expected/filterDeep.json');
        test.equal(actual, expected, 'Should correctly include the (deep) "this", "that", "is", "test" and "one" namespaces.');
        test.done();
    },
    excludeInclude: function(test) {
        test.expect(1);
        var actual = readFile('tmp/excludeInclude.json');
        var expected = readFile('test/expected/filterExcludeInclude.json');
        test.equal(actual, expected, 'Should correctly exclude the "this" namespace, include "that", and exclude "there".');
        test.done();
    },
    merge: function(test) {
        test.expect(1);
        var actual = readFile('tmp/merged.json');
        var expected = readFile('test/expected/merged.json');
        test.equal(actual, expected, 'Should correctly merge multiple properties files to one json file.');
        test.done();
    }
};
