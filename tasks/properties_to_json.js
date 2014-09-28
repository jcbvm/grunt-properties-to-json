/**
 * grunt-properties-to-json
 * 
 * @version 0.1.0
 * @copyright 2014 Jacob van Mourik
 * @license MIT
 */

'use strict';

module.exports = function(grunt) {
    var unescapeUnicode = function(str) {
        return str.replace(/\\u(.{4})/ig, function(match,code) {
            return String.fromCharCode(parseInt(code,16)); 
        });
    };
    
    var propertiesToJSON = function(properties) {
        var result = {},
            lines = properties.trim().split(/\s*\n\s*/);
        for (var i = 0; i < lines.length; i++) {
            if (!lines[i]) { continue; }
            var parent = result,
                index = lines[i].indexOf('='),
                keys = lines[i].substring(0,index).trim().split('.'),
                value = lines[i].substring(index+1).trim();
            for (var j = 0; j < keys.length-1; j++) {
                parent = parent[keys[j]] = parent[keys[j]] || {};
            }
            parent[keys[keys.length-1]] = unescapeUnicode(value);
        }
        return JSON.stringify(result);
    };
    
    grunt.registerMultiTask('properties_to_json', 'Converts java property files to JSON files.', function() {
        var dest, data;
        
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
                data = grunt.file.read(src);
                grunt.file.write(dest, propertiesToJSON(data));
                grunt.log.writeln('File "' + dest + '" created.');
            });
        });
    });
};
