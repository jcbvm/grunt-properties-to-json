/**
 * grunt-properties-to-json
 * 
 * @version 0.2.0
 * @copyright 2014 Jacob van Mourik
 * @license MIT
 */

'use strict';

module.exports = function(grunt) {
    var parser = require('properties-parser');
    
    var splitKeysBy = function(obj, splitBy) {
        var keys, value, parent, result = {};
        for (var key in obj) {
            keys = key.split(splitBy);
            value = obj[key];
            parent = result;
            for (var j = 0; j < keys.length-1; j++) {
                parent = parent[keys[j]] = parent[keys[j]] || {};
            }
            parent[keys[keys.length-1]] = value;
        }
        return result;
    };
    
    var exclude = function(obj, excludes) {
        var exclusions = [].concat(excludes);
        return obj.filter(function(element) {
            return exclusions.indexOf(element) < 0;
        });
    };

    var include = function(obj, includes) {
        var inclusions = [].concat(includes);
        return obj.filter(function(element) {
            return inclusions.indexOf(element) >= 0;
        });
    };

    grunt.registerMultiTask('properties_to_json', 'Converts java property files to JSON files.', function() {
        var dest, data, options = this.options();
        this.files.forEach(function(f) {
            f.src.forEach(function (src) {
                if (src.substr(-11) !== '.properties') {
                    return;
                }
                if (!grunt.file.exists(src)) {
                    grunt.log.warn('Source file "' + src + '" not found.');
                    return false;
                }
                if (f.dest && grunt.file.exists(f.dest) && grunt.file.isFile(f.dest)) {
                    grunt.log.warn('Destination "' + f.dest + '" is not a directory.');
                    return false;
                }
                if (f.dest) {
                    dest = f.dest + (f.dest.substr(-1) !== '/' ? '/' : '') + src.match(/\/([^/]*)$/)[1];
                } else {
                    dest = src;
                }
                dest = dest.replace('.properties','.json');
                data = parser.read(src);
                if (options.splitKeysBy) {
                    data = splitKeysBy(data, options.splitKeysBy);
                    if (options.exclude) {
                        data = exclude(data, options.exclude);
                }
                    if (options.include) {
                        data = include(data, options.include);
                    }
                }
                grunt.file.write(dest, JSON.stringify(data), { encoding: 'utf8' });
                grunt.log.writeln('File "' + dest + '" created.');
            });
        });
    });
};
