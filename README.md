# grunt-properties-to-json 
[![Build Status](https://travis-ci.org/jcbvm/grunt-properties-to-json.svg?branch=master)](https://travis-ci.org/jcbvm/grunt-properties-to-json) [![dependency Status](https://david-dm.org/jcbvm/grunt-properties-to-json/status.svg)](https://david-dm.org/jcbvm/grunt-properties-to-json#info=dependencies) [![devDependency Status](https://david-dm.org/jcbvm/grunt-properties-to-json/dev-status.svg)](https://david-dm.org/jcbvm/grunt-properties-to-json#info=devDependencies)

A grunt plugin for converting java property files to JSON files.

## Getting Started

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-properties-to-json --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-properties-to-json');
```

## Usage

With the following config, each `.properties` file in src will be converted to json and will be saved as a `.json` file in the same directory as the property file.

```js
grunt.initConfig({
    properties_to_json: {
        main: {
            src: ['path/to/properties/files', 'another/path/to/properties/files']
        }
    }
});
```

It is also possible to define a destination folder for the generated json files:

```js
grunt.initConfig({
    properties_to_json: {
        main: {
            files: [{
                src: ['path/to/properties/files', 'another/path/to/properties/files'],
                dest: 'tmp'
            }]
        }
    }
});
```

If you want keys in the property files to be splitted you can pass the `splitKeysBy` option (a string or regular expression). With this option the keys in the property files will be splitted by the given string or regular expression and used as nested keys in the JSON output.

```js
grunt.initConfig({
    properties_to_json: {
        main: {
            files: [{
                src: ['path/to/properties/files', 'another/path/to/properties/files'],
                dest: 'tmp'
            }],
            options: {
                splitKeysBy: '.'
            }
        }
    }
});
```

## License

This project is released under the MIT license.
