define("liveRecord.model", ['require','exports', 'backbone', 'jquery'], function(require, exports, Backbone, jquery) {
    var Model = Backbone.Model.extend({
        initialize: function(){
            var statusName = this.get("liveStatus"),
                liveName   = this.get("liveName"),
                updateTimeFormated = this.get("updateTime");
            if (!statusName || statusName == "UNKNOWN") this.set("statusName", '未知');
            if (statusName == "NOSTART") this.set("statusName", '<span class="text-primary">准备中</span>');
            if (statusName == "STOP" ) this.set("statusName", '<span class="text-warning">已结束</span>');
            if (statusName == "LIVE") this.set("statusName", '<span class="text-success">直播中</span>');
            if (updateTimeFormated) this.set("updateTimeFormated", new Date(updateTimeFormated).format("yyyy/MM/dd hh:mm:ss"));
            if (!liveName) this.set("liveName", '未知');
            this.set("isChecked", false)
        }
    });

    var LiveWatchCollection = Backbone.Collection.extend({
        
        model: Model,

        initialize: function(){},

        getLiveWatch: function(args){
            var url = BASE_URL + "live/record"
            var defaultParas = {
                type: "POST",
                url: url,
                async: true,
                timeout: 30000,
                contentType: "application/json",
                processData: false
            };
            defaultParas.data = args

            defaultParas.data = JSON.stringify(defaultParas.data);

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result) {
                    _.each(res.list, function(element, index, list){
                        this.push(new Model(element));
                    }.bind(this))
                    this.trigger("watch.success", res);
                } else {
                    this.trigger("watch.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("watch.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getPlayInfo: function(args){
            var url = BASE_URL + "live/record/play/info"
            var defaultParas = {
                type: "GET",
                url: url,
                async: true,
                timeout: 30000,
            };
            defaultParas.data = args

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result)
                    this.trigger("play.info.success", res.data);
                else
                    this.trigger("play.info.error", res);
                
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("play.info.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        }, 

        deleteLiveWatch: function(args){
            var url = BASE_URL + "live/record/delete"
            var defaultParas = {
                type: "POST",
                url: url,
                async: true,
                timeout: 30000,
                contentType: "application/json",
                processData: false
            };
            defaultParas.data = args

            defaultParas.data = JSON.stringify(defaultParas.data);

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result) {
                    this.trigger("delete.watch.success", res);
                } else {
                    this.trigger("delete.watch.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("delete.watch.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },
    });

    var LiveScreenshotCollection = Backbone.Collection.extend({
        
        model: Model,

        initialize: function(){},

        getLiveScreenshot: function(args){
            var url = BASE_URL + "live/screenshot"
            var defaultParas = {
                type: "POST",
                url: url,
                async: true,
                timeout: 30000,
                contentType: "application/json",
                processData: false
            };
            defaultParas.data = args

            defaultParas.data = JSON.stringify(defaultParas.data);

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result) {
                    _.each(res.list, function(element, index, list){
                        this.push(new Model(element));
                    }.bind(this))
                    this.trigger("screenshot.success", res);
                } else {
                    this.trigger("screenshot.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("screenshot.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getScreeshotInfo: function(args){
            var url = BASE_URL + "live/screeshot/info"
            var defaultParas = {
                type: "GET",
                url: url,
                async: true,
                timeout: 30000,
            };
            defaultParas.data = args

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result)
                    this.trigger("screeshot.info.success", res.data);
                else
                    this.trigger("screeshot.info.error", res);
                
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("screeshot.info.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        }, 

        deleteLiveScreenshot: function(args){
            var url = BASE_URL + "live/screenshot/delete"
            var defaultParas = {
                type: "POST",
                url: url,
                async: true,
                timeout: 30000,
                contentType: "application/json",
                processData: false
            };
            defaultParas.data = args

            defaultParas.data = JSON.stringify(defaultParas.data);

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result) {
                    this.trigger("delete.screenshot.success", res);
                } else {
                    this.trigger("delete.screenshot.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("delete.screenshot.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },
    });

    exports.LiveWatchCollection      = LiveWatchCollection;
    exports.LiveScreenshotCollection = LiveScreenshotCollection;
});