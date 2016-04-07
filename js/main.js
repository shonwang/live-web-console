requirejs.config({
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

        "routes": 'routes',
        "utility": 'utility',
        "template": 'template',
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
        "statistics.model": 'statistics/statistics.model',
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
        qrcode: {
          deps: ["jquery"],
          exports: "qrcode"
        },
        underscore : {exports : "underscore" },
        ckplayer : {exports : "ckplayer" },
        swfobject : {exports : "swfobject" },
        echarts : {exports : "echarts" }
    },
    urlArgs: new Date().valueOf()
});

window.DEBUG = true;
if (window.DEBUG)
    window.BASE_URL = "http://local.live.ksyun.com/data/";
else
    window.BASE_URL = "http://console.live.ksyun.com/";

requirejs(['routes', 'backbone'], function(routes, Backbone) {
	Backbone.history.start();
});