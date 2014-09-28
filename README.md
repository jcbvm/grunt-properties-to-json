# grunt-properties-to-json

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

### Basic

```js
grunt.initConfig({
    properties_to_json: {
        main: {
            src: ['path/to/properties/files', 'another/path/to/properties/files']
        }
    }
});
```

The generated json files will be put in the same directory as the source.

### Advanced

```js
grunt.initConfig({
    properties_to_json: {
        main: {
            files: [{
                src: ['path/to/properties/files', 'another/path/to/properties/files'],
                dest: 'tmp'
            }],
            options: {
                encoding: 'utf8'
            }
        }
    }
});
```

The generated json files will be put in the given destination folder.
Optionally you can define the encoding which will be used when reading the properties files, default is 'utf8'.

## License

This project is released under the MIT license.
