define("routes", ['require','exports', 'backbone', 'jquery', 'utility','sidebar.view'], 
    function(require, exports, Backbone, jquery, Utility, SidebarView) {

    var Workspace = Backbone.Router.extend({

        routes: {
            ""                        : "home",
            "livemanage"              : "livemanage",
            "liverecord/:query"       : "liverecord",
            "globalsetup"             : "globalsetup",
            "statistics"              : "statistics",
            "livemanage/create/:query": "livemanagecreate",
            "logdownload"             : "logdownload",
        },

        initialize: function(){
            Utility.dateFormat();
            //Utility.forIE8();
            this.sidebarView = new SidebarView();
            this.sidebarView.render($('.ksc-sidebar'));
            this.curPage = "";
        },

        execute: function(callback, args) {
            switch(this.curPage){
                case 'home':
                  this.homeView.$el.hide();
                  break;
                case 'globalsetup':
                  this.globalSetupView.$el.hide();
                  break;
                case 'livemanage':
                  this.liveManageView.$el.hide();
                  break;
                case 'livemanagecreate':
                  this.liveManageCreateView.hide();
                  break;
                case 'liverecord':
                  this.liveRecordView.$el.hide();
                  this.liveRecordView.clearData();
                  break;
                case 'statistics':
                  this.statisticsView.$el.hide();
                  break;
                default:
            }
            if (callback)
                callback.apply(this, args);
        },

        home: function(){
            this.sidebarView.initLogin($.proxy(this.homeCallback, this))
        },

        homeCallback: function() {
            require(['home.view', 'statistics.model'], function(HomeView, HomeModel){
                this.curPage = 'home';
                this.sidebarView.select(this.curPage);
                if (!this.homeModel)
                    this.homeModel = new HomeModel();
                if (!this.homeView ){
                    var options = {collection: this.homeModel};
                    this.homeView = new HomeView(options);
                    this.homeView.render($('.ksc-module'));
                } else {
                    this.homeView.$el.show();
                }
            }.bind(this));
        },

        livemanage: function(){
            this.sidebarView.initLogin($.proxy(this.livemanageCallback, this))
        },

        livemanageCallback: function() {
            require(['liveManage.model', 'liveManage.view'], function(LiveManageModel, LiveManageView){
                this.curPage = 'livemanage';
                this.sidebarView.select(this.curPage);
                if (!this.liveManageModel)
                    this.liveManageModel = new LiveManageModel();
                if (!this.liveManageView ){
                    var options = {collection: this.liveManageModel};
                    this.liveManageView = new LiveManageView(options);
                    this.liveManageView.render($('.ksc-module'));
                } else {
                    this.liveManageView.update();
                }
            }.bind(this));
        },

        livemanagecreate: function(query){
            this.sidebarView.initLogin(function(){
                this.livemanagecreateCallback(query)
            }.bind(this))
        },

        livemanagecreateCallback: function(query) {
            require(['liveManage.model', 'liveManage.create.view'], function(LiveManageModel, LiveManageCreateView){
                this.curPage = 'livemanagecreate';
                this.sidebarView.select("livemanage");
                if (!this.liveManageModel)
                    this.liveManageModel = new LiveManageModel();
                if (!this.liveManageCreateView ){
                    var options = {
                        collection: this.liveManageModel,
                        query     : query
                    };
                    this.liveManageCreateView = new LiveManageCreateView(options);
                    this.liveManageCreateView.render($('.ksc-module'));
                } else {
                    this.liveManageCreateView.update(query);
                }
            }.bind(this));
        },

        globalsetup: function(){
            this.sidebarView.initLogin($.proxy(this.globalsetupCallback, this));
        },

        globalsetupCallback: function() {
            require(['globalSetup.model', 'globalSetup.view'], function(GlobalSetupModel, GlobalSetupView){
                this.curPage = 'globalsetup';
                this.sidebarView.select(this.curPage);
                if (!this.globalSetupModel)
                    this.globalSetupModel = new GlobalSetupModel();
                if (!this.globalSetupView ){
                    var options = {collection: this.globalSetupModel};
                    this.globalSetupView = new GlobalSetupView(options);
                    this.globalSetupView.render($('.ksc-module'));
                } else {
                    this.globalSetupView.$el.show();
                }
            }.bind(this));
        },

        liverecord: function(query){
            this.sidebarView.initLogin(function(){
                this.liverecordCallback(query)
            }.bind(this))
        },

        liverecordCallback: function(query) {
            require(['liveRecord.model', 'liveRecord.view'], function(LiveRecordModel, LiveRecordView){
                this.curPage = 'liverecord';
                this.sidebarView.select(this.curPage);
                if (!this.liveRecordModel){
                    this.liveWatchCollection      = new LiveRecordModel.LiveWatchCollection();
                    this.liveScreenshotCollection = new LiveRecordModel.LiveScreenshotCollection();
                }
                if (!this.liveRecordView ){
                    var options = {
                        query                   : query,
                        liveWatchCollection     : this.liveWatchCollection,
                        liveScreenshotCollection: this.liveScreenshotCollection
                    };
                    this.liveRecordView = new LiveRecordView(options);
                    this.liveRecordView.render($('.ksc-module'));
                } else {
                    this.liveRecordView.update(query);
                }
            }.bind(this));
        },

        statistics: function(){
            this.sidebarView.initLogin($.proxy(this.statisticsCallback, this));
        },

        statisticsCallback: function() {
            require(['statistics.model', 'statistics.view'], function(StatisticsModel, StatisticsView){
                this.curPage = 'statistics';
                this.sidebarView.select(this.curPage);
                if (!this.statisticsModel)
                    this.statisticsModel = new StatisticsModel();
                if (!this.statisticsView ){
                    var options = {collection: this.statisticsModel};
                    this.statisticsView = new StatisticsView(options);
                    this.statisticsView.render($('.ksc-module'));
                } else {
                    this.statisticsView.update();
                }
            }.bind(this));
        }
    });
    exports.Workspace = new Workspace();
});