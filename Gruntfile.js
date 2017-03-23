module.exports = function (grunt) {
    function filterForJS(files) {
        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    function filterForCSS(files) {
        return files.filter(function (file) {
            return file.match(/\.css$/);
        });
    }

    function buildIndex(task, jsFiles, cssFiles) {
        grunt.file.copy('src/index.html', task.data.dir + '/index.html', {
            process: function (contents) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    }

    function returnFiles(task, fileFunc) {
        return fileFunc(task.filesSrc).map(function (file) {
            return file.replace(grunt.config('build_dir') + '/', '');
        });
    }

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-html2js');

    grunt.registerMultiTask('indexDebug', 'Process index.html template', function () {
        var jsFiles = returnFiles(this, filterForJS),
            cssFiles = returnFiles(this, filterForCSS);
        jsFiles.push('templates-app.js');
        buildIndex(this, jsFiles, cssFiles);

    });
    grunt.registerMultiTask('index', 'Process index.html template', function () {
        var jsFiles = returnFiles(this, filterForJS),
            cssFiles = returnFiles(this, filterForCSS);
        jsFiles.push('js/built.min.js');
        jsFiles.push('templates-app.js');
        buildIndex(this, jsFiles, cssFiles);
    });
    grunt.initConfig(grunt.util._.extend({
        pkg: grunt.file.readJSON("package.json"),
        indexDebug: {
            build: {
                dir: '<%= build_dir %>',
                src: ['<%= libs %>', '<%= libs_css %>', '<%= build_dir %>/src/**/*.js']
            }
        },
        index: {
            build: {
                dir: '<%= build_dir %>',
                src: ['<%= min_libs %>', '<%= libs_css %>']
            }
        },
        html2js: {
            app: {
                options: {
                    base: 'src'
                },
                src: ['src/**/*.tpl.html'],
                dest: '<%= build_dir %>/templates-app.js'
            }
        },
        copy: {
            build_js: {
                files: [
                    {
                        src: ['src/**/*.js'],
                        dest: '<%= build_dir %>',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_libs: {
                files: [
                    {
                        src: ['<%= libs %>', '<%= libs_css %>'],
                        dest: '<%= build_dir %>',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_minlibs: {
                files: [
                    {
                        src: ['<%= min_libs %>', '<%= libs_css %>'],
                        dest: '<%= build_dir %>',
                        cwd: '.',
                        expand: true
                    }
                ]
            }
        },
        clean: [
            '<%= build_dir %>'
        ],
        jshint: {
            src: ['src/**/*.js'],

            gruntfile: [
                'Gruntfile.js'
            ],
            options: {
                curly: true,
                immed: true,
                newcap: true,
                noarg: true,
                sub: true,
                boss: true,
                eqnull: true
            },
            globals: {}
        },
        uglify: {
            build: {
                src: '<%= build_dir %>/js/built.js',
                dest: '<%= build_dir %>/js/built.min.js'
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: '<%= build_dir %>/js/built.js'
            }
        }
    }, require('./build.config.js')));
    grunt.registerTask('app', ['clean', 'html2js', 'jshint', 'concat', 'uglify', 'copy:build_minlibs', 'index']);
    grunt.registerTask('app-debug', ['clean', 'html2js', 'jshint', 'copy:build_libs', 'copy:build_js', 'indexDebug']);
};