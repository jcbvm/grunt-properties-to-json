/**
 * grunt-properties-to-json
 * 
 * @version 0.4.0
 * @copyright 2014-2015 Jacob van Mourik
 * @license MIT
 */

'use strict';

module.exports = function(grunt) {
    var parser = require('properties-parser'),
        _ = require('lodash');

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
                result[key] = deep && _.isPlainObject(val) ? transform(val,regexps,include,deep) : val;
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

    grunt.registerMultiTask('properties_to_json', 'Converts java property files to JSON files.', function() {
        var dest, data, dataList, options = this.options();

        this.files.forEach(function(f) {
            if (options.merge) {
                if (!f.dest) {
                    return grunt.log.warn('You are trying to merge but no destination file is defined.');
                } else if (grunt.file.isDir(f.dest)) {
                    return grunt.log.warn('Destination "' + f.dest + '" should be a file.');
                }
            } else if (grunt.file.isFile(f.dest)) {
                return grunt.log.warn('Destination "' + f.dest + '" should be a directory.');
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
                    dest = f.dest ? f.dest + (_.endsWith(f.dest,'/') ? '' : '/') + src.replace(/.*\//,'') : src;
                    dest = dest.replace('.properties','.json');
                    writeFile(data, dest);
                }
            });

            if (options.merge) {
                writeFile(_.merge.apply(null,dataList), f.dest);
            }
        });
    });
};
