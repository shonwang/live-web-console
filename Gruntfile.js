module.exports = function(grunt) {
    var pkg = grunt.file.readJSON('package.json');
    grunt.initConfig({
        clean: ["temp", "dest"],
        requirejs: {
            compile: {
                options: {
                    appDir: "./",
                    baseUrl: "js",
                    mainConfigFile: "js/main.js",
                    dir: "temp",
                    paths: {
                        jquery: '../libs/jquery.min',
                        bootstrap: '../libs/bootstrap.min',
                        datetimepicker: '../libs/jquery.datetimepicker',
                        moment: '../libs/moment.min',
                        daterangepicker: '../libs/daterangepicker',
                        underscore: '../libs/underscore',
                        backbone: '../libs/backbone-min',
                        jqpaginator: "../libs/jqPaginator",
                        echarts: "../libs/echart-plain",
                        qrcode: '../libs/jquery.qrcode.min',
                        ckplayer: '../libs/ckplayer',
                        swfobject: '../libs/swfobject',

                        "template": 'template',
                        "routes": 'routes',
                        "utility": 'utility',
                        "home.view": 'home/home.view',
                        "home.model": 'home/home.model',
                        "sidebar.view": 'views/sidebar.view',
                        "modal.view": 'views/modal.view',
                        "images.view": 'views/images.view',
                        "globalSetup.view": 'globalSetup/globalSetup.view',
                        "globalSetup.model": 'globalSetup/globalSetup.model',
                        "liveManage.view": 'liveManage/liveManage.view',
                        "liveManage.create.view": 'liveManage/liveManage.create.view',
                        "liveManage.model": 'liveManage/liveManage.model',
                        "liveRecord.view": 'liveRecord/liveRecord.view',
                        "liveRecord.model": 'liveRecord/liveRecord.model',
                        "statistics.view": 'statistics/statistics.view',
                        "statistics.model": 'statistics/statistics.model'
                    },
                    shim: {
                        jquery: {exports: "jquery"},
                        moment: {exports: "moment"},
                        bootstrap: {
                          deps: ["jquery"],
                          exports: "bootstrap"
                        },
                        datetimepicker: {
                          deps: ["jquery", "bootstrap"],
                          exports: "datetimepicker"
                        },
                        daterangepicker: {
                          deps: ["jquery", "bootstrap", "moment"],
                          exports: "daterangepicker"
                        },
                        jqpaginator: {
                          deps: ["jquery"],
                          exports: "jqpaginator"
                        },
                        underscore : {exports : "underscore" },
                        ckplayer : {exports : "ckplayer" },
                        swfobject : {exports : "swfobject" },
                        echarts : {exports : "echarts" }
                    },
                    skipDirOptimize: true,
                    modules: [{
                        name: 'routes',
                        exclude: ['backbone', 'jquery', 'utility','sidebar.view']
                    },{
                        name: 'utility',
                        exclude: ['backbone', 'bootstrap']
                    },{
                        name: 'template'
                    },{
                        name: 'sidebar.view',
                        exclude: ['backbone', 'template', 'bootstrap', 'modal.view']
                    },{
                        name: 'modal.view',
                        exclude: ['backbone', 'template', 'bootstrap', 'utility']
                    },{
                        name: 'images.view',
                        exclude: ['backbone', 'template']
                    },{
                        name: 'home.view',
                        exclude: ['backbone', 'template', 'bootstrap', 'utility', "daterangepicker"]
                    },{
                        name: 'home.model',
                        exclude: ['backbone', 'jquery']
                    },{
                        name: 'globalSetup.view',
                        exclude: ['backbone', 'template', 'bootstrap', 'utility', 'modal.view']
                    },{
                        name: 'globalSetup.model',
                        exclude: ['backbone', 'jquery']
                    },{
                        name: 'liveManage.view',
                        exclude: ['backbone', 'template', 'bootstrap', 'jqpaginator', 'utility', 'modal.view']
                    },{
                        name: 'liveManage.create.view',
                        exclude: ['backbone', 'template', 'bootstrap', 'qrcode', 'ckplayer', 'modal.view']
                    },{
                        name: 'liveManage.model',
                        exclude: ['backbone', 'jquery']
                    },{
                        name: 'liveRecord.view',
                        exclude: ['backbone', 'template', 'bootstrap', 'utility', 'modal.view', 'daterangepicker', 'ckplayer']
                    },{
                        name: 'liveRecord.model',
                        exclude: ['backbone', 'jquery']
                    },{
                        name: 'statistics.view',
                        exclude: ['backbone', 'template', 'bootstrap', 'utility', "daterangepicker"]
                    },{
                        name: 'statistics.model',
                        exclude: ['backbone', 'jquery']
                    }]
                },
                done:function(done, out){
                }
            }
        },
        underscore: {
            compile: {
                options: {
                    namespace: "JST",
                    amd: true
                },
                files: {"js/template.js": ['tpl/**/*.html', 'tpl/*.html']}
            },
            compile2: {
                options: {
                    namespace: "JST",
                    amd: true
                },
                files: {"temp/js/template.js": ['temp/tpl/**/*.html', 'temp/tpl/*.html']}
            }
        },
        uglify: {
            target: {
                files: {
                    'temp/libs/css3-mediaqueries.js': ['temp/libs/css3-mediaqueries.js'],
                    'temp/libs/jqPaginator.js': ['temp/libs/jqPaginator.js'],
                    'temp/libs/jquery.datetimepicker.js': ['temp/libs/jquery.datetimepicker.js'],
                    'temp/libs/require.js': ['temp/libs/require.js'],
                    'temp/libs/underscore.js': ['temp/libs/underscore.js'],
                    'temp/libs/ckplayer.js': ['temp/libs/ckplayer.js'],
                    'temp/libs/daterangepicker.js': ['temp/libs/daterangepicker.js']
                }
            },
            task2: {
                files: {
                    'temp/js/template.js': ['temp/js/template.js'],
                }
            }
        },
        cssmin: {
            target: {
                files: {
                    'temp/css/animate.css': ['temp/css/animate.css'],
                    'temp/css/jquery.datetimepicker.css': ['temp/css/jquery.datetimepicker.css'],
                    'temp/css/main.css': ['temp/css/main.css'],
                    'temp/css/daterangepicker-bs3.css': ['temp/css/daterangepicker-bs3.css'],
                }
            }
        },
        watch: {
            task1: {
                files: ['tpl/*'],
                tasks: ['underscore']
            }
        },
        filerev: {
            options: {
                algorithm: 'md5',
                length: 8
            },
            images: {
                src: ['temp/images/**/*.{jpg,jpeg,gif,png,webp,ico}']
            },
            css: {
                src: ['temp/css/**/*']
            },
            js: {
                src: ['temp/js/**/*']
            }
        },
        usemin: {
            html:['temp/index.html', 'temp/tpl/**/*'],
            css: 'temp/css/*',
            js:  'temp/js/*',
            options:{
                assetsDirs: ['temp','temp/css', 'temp/js', 'temp/images'],
            }
        },
        copy: {
            main: {
                files: [
                {
                    expand: true,
                    cwd: 'temp/',
                    src: ['css/*', 'css/**/*'],
                    dest: 'dest/'
                },
                {
                    expand: true,
                    cwd: 'temp/',
                    src: ['js/*', 'js/**/*'],
                    dest: 'dest/'
                },
                {
                    expand: true,
                    cwd: 'temp/',
                    src: ['libs/*', 'libs/**/*'],
                    dest: 'dest/'
                },
                {
                    expand: true,
                    cwd: 'temp/',
                    src: ['fonts/*', 'fonts/**/*'],
                    dest: 'dest/'
                },
                {
                    expand: true,
                    cwd: 'temp/',
                    src: ['images/*', 'images/**/*'],
                    dest: 'dest/'
                },
                {
                    expand: true,
                    cwd: 'temp/',
                    src: ['flash/*', 'flash/**/*'],
                    dest: 'dest/'
                },
                {
                    expand: true,
                    cwd: 'temp/',
                    src: "*.html",
                    dest: 'dest/'
                },
                {
                    expand: true,
                    cwd: 'temp/',
                    src: "*.xml",
                    dest: 'dest/'
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-underscore-compiler');
    grunt.loadNpmTasks('grunt-filerev');
    grunt.loadNpmTasks('grunt-usemin');

    grunt.registerTask('setmainmd5', '', function() {
        var dataMain = grunt.file.read("js/main.js");
        var mainArray = dataMain.split("\n"), 
            isShim = false, line, newMain = [], key, value, path;
        var keys = Object.keys(grunt.filerev.summary);

        for (var k = 0; k < mainArray.length; k++){
            line = mainArray[k];
            grunt.log.writeln(line)
            if (line.indexOf('shim') > -1) isShim = true;
            if (!isShim){
                if (line.indexOf(':') > -1&&line.indexOf(",") > -1){
                    var lineArray = line.split(":")[1].replace(/'|,|\s|"/g, "").split("/");
                    key = lineArray[lineArray.length - 1];

                    for (var i = 0; i < keys.length; i++){
                        if (keys[i].indexOf(key) > -1&&keys[i].indexOf(".css") == -1){
                            var valueArray;
                            if (grunt.filerev.summary[keys[i]].indexOf("\\") > -1)
                                valueArray = grunt.filerev.summary[keys[i]].split("\\");
                            else 
                                valueArray = grunt.filerev.summary[keys[i]].split("/")
                            value = valueArray[valueArray.length - 1].replace(/\.js/g, "");
                            line = line.split(":")[0] + ":"+ line.split(":")[1].replace(new RegExp(key, "g"), value);
                        }
                    }
                }
            }
            if (line.indexOf('DEBUG') > -1&&line.indexOf('if') == -1) line = 'window.DEBUG = false;\n'
            if (line.indexOf('urlArgs') > -1) line = "";
            newMain.push(line);
            grunt.log.writeln(line)
        }
        if (grunt.filerev.summary['temp\\js\\main.js'])
            path = grunt.filerev.summary['temp\\js\\main.js'].replace(/\\/g, "/");
        else
            path = grunt.filerev.summary['temp/js/main.js']
        grunt.file.write(path, newMain.join(""));

        var tplData = grunt.file.read("temp/js/template.js"), tplPath;
        if (grunt.filerev.summary['temp\\js\\template.js'])
            tplPath = grunt.filerev.summary['temp\\js\\template.js'].replace(/\\/g, "/");
        else
            tplPath = grunt.filerev.summary['temp/js/template.js']
        tplData = tplData.replace(/temp\/tpl\//g, "tpl/")
        grunt.file.write(tplPath, tplData);
        grunt.file.delete("temp/js/template.js");
    });

    grunt.registerTask('default',['clean', 'underscore:compile', 'requirejs', 'uglify:target','cssmin','filerev', 'usemin', 'underscore:compile2', 'uglify:task2', 'setmainmd5', 'copy']);
    grunt.registerTask('temp',['underscore:compile']);
};