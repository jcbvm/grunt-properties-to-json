/*
 * grunt-properties-to-json
 * http://gruntjs.com/
 * 
 * Copyright (c) 2014-2015 Jacob van Mourik, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
    var parser = require('properties-parser'),
        _ = require('lodash'),
        path = require('path');

    var splitKeysBy = function(obj, splitBy) {
        var keys, parent, result = {};
        _.forEach(obj, function(val, key) {
            keys = key.split(splitBy);
            parent = result;
            keys.forEach(function(k, i) {
                 if (i === keys.length-1) {
                     parent[k] = val;
                 } else {
                     parent = parent[k] = parent[k] || {};
                 }
            });
        });
        return result;
    };

    var filter = function(obj, regexps, include, deep) {
        return _.transform(obj, function(result, val, key) {
            var hasMatch = hasRegMatch(regexps, key);
            if ((hasMatch && include) || (!hasMatch && !include)) {
                result[key] = deep && _.isPlainObject(val) ? filter(val,regexps,include,deep) : val;
            }
        },{});
    };

    var toRegExps = function(value) {
        value = [].concat(value);
        return value.map(function(val) {
            return _.isRegExp(val) ? val : new RegExp(val);
        });
    };

    var hasRegMatch = function(regexps, value) {
        return regexps.some(function(regexp) {
            return regexp.test(value);
        });
    };

    var writeFile = function(data, dest) {
        grunt.file.write(dest, JSON.stringify(data), { encoding: 'utf8' });
        grunt.log.writeln('File "' + dest + '" created.');
    };

    var propertiesToJSON = function() {
        var dest, data, dataList, options = this.options();

        this.files.forEach(function(f) {
            if (options.merge) {
                if (!f.dest) {
                    return grunt.log.warn('Task skipped, no destination file is defined.');
                } else if (grunt.file.isDir(f.dest)) {
                    return grunt.log.warn('Task skipped, destination "' + f.dest + '" should be a file but is a directory.');
                }
            } else if (f.dest && grunt.file.isFile(f.dest)) {
                return grunt.log.warn('Task skipped, destination "' + f.dest + '" should be a directory but is a file.');
            }

            dataList = [];

            f.src.forEach(function(src) {
                if (src.substr(-11) !== '.properties') {
                    return;
                }
                if (!grunt.file.exists(src)) {
                    return grunt.log.warn('Source file "' + src + '" not found.');
                }
                data = parser.read(src);
                if (options.splitKeysBy) {
                    data = splitKeysBy(data, options.splitKeysBy);
                }
                if (options.exclude) {
                    data = filter(data, toRegExps(options.exclude), false, !!options.deepExclude);
                }
                if (options.include) {
                    data = filter(data, toRegExps(options.include), true, !!options.deepInclude);
                }
                if (options.merge) {
                    dataList.push(data);
                } else {
                    dest = f.dest ? path.join(f.dest, path.basename(src)) : src;
                    dest = dest.replace('.properties','.json');
                    writeFile(data, dest);
                }
            });

            if (options.merge) {
                writeFile(_.merge.apply(null,dataList), f.dest);
            }
        });
    };

    grunt.registerMultiTask('propertiesToJSON', 'Converts java property files to JSON files.', propertiesToJSON);

    // Deprecate old task name
    grunt.registerMultiTask('properties_to_json', 'Converts java property files to JSON files.', function() {
        grunt.log.warn('The "properties_to_json" task name is deprecated. Please use "propertiesToJSON" instead.');
        propertiesToJSON.apply(this, arguments);
    });
};
