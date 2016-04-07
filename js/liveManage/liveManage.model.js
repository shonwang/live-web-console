define("liveManage.model", ['require','exports', 'backbone', 'jquery'], function(require, exports, Backbone, jquery) {
    var Model = Backbone.Model.extend({
        initialize: function(){
            var statusName = this.get("state"),
                replay = this.get("replay"),
                screenshot = this.get("screenshot");
                //updateTimeFormated = this.get("updateTime");
            if (!statusName || statusName == "UNKNOWN") this.set("statusName", '未知');
            if (statusName == "NOSTART") this.set("statusName", '<span class="text-primary">准备中</span>');
            if (statusName == "STOP") this.set("statusName", '<span class="text-warning">已结束</span>');
            if (statusName == "LIVE") this.set("statusName", '<span class="text-success">直播中</span>');

            var recoder = "未设置",
                replayCtn = '<a href="javascript:void(0)" id="' + this.get("id") + '" class="replay">回看</a>',
                screenshotCtn = '<a href="javascript:void(0)" id="' + this.get("id") + '" class="screenshot">截图</a>';

            if (replay&&screenshot) recoder = replayCtn + '<span class="separator">|</span>' + screenshotCtn;
            if (!replay&&screenshot) recoder = screenshotCtn;
            if (replay&&!screenshot) recoder = replayCtn;
            this.set("recoder", recoder);

            //if (updateTimeFormated) this.set("updateTimeFormated", new Date(updateTimeFormated).format("yyyy/MM/dd hh:mm:ss"));
            this.set("isChecked", "false")
        }
    });

    var LiveManageCollection = Backbone.Collection.extend({
        
        model: Model,

        initialize: function(){},

        queryLiveList: function(args){
            var url = BASE_URL + "live/list"
            var defaultParas = {
                type: "POST",
                url: url,
                async: true,
                timeout: 30000,
                contentType: "application/json",
                processData: false
            };
            defaultParas.data = {
                "liveId"  : args.liveId,
                "liveName": args.liveName,
                "state"   : args.state,
                "page"    : args.page,
                "size"    : args.size,
                "orders": [{
                    "property": "createTime",
                    "direction": "DESC",
                    "ignoreCase": false,
                    "nullHandling": "NATIVE"
                }]
            };

            defaultParas.data = JSON.stringify(defaultParas.data);

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                this.reset();
                if (res){
                    _.each(res.list, function(element, index, list){
                        this.push(new Model(element));
                    }.bind(this))
                    this.total = res.totalCount;
                    this.trigger("success");
                } else {
                    this.trigger("error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                this.reset();
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        startLive: function(args){
            var url = BASE_URL + "live/start"
            var defaultParas = {
                type: "POST",
                url: url,
                async: true,
                timeout: 30000,
                contentType: "application/json",
                processData: false
            };
            defaultParas.data = args;

            defaultParas.data = JSON.stringify(defaultParas.data);

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                this.trigger("start.success");
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("start.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        stopLive: function(args){
            var url = BASE_URL + "live/stop"
            var defaultParas = {
                type: "POST",
                url: url,
                async: true,
                timeout: 30000,
                contentType: "application/json",
                processData: false
            };
            defaultParas.data = args;

            defaultParas.data = JSON.stringify(defaultParas.data);

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                this.trigger("stop.success");
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("stop.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        deleteLive: function(args){
            var url = BASE_URL + "live/delete"
            var defaultParas = {
                type: "POST",
                url: url,
                async: true,
                timeout: 30000,
                contentType: "application/json",
                processData: false
            };
            defaultParas.data = args;

            defaultParas.data = JSON.stringify(defaultParas.data);

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                this.trigger("delete.success");
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("delete.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getLiveById: function(args){
            var url = BASE_URL + "live/query"
            var defaultParas = {
                type: "GET",
                url: url,
                async: true,
                timeout: 30000,
                // contentType: "application/json",
                // processData: false
            };
            defaultParas.data = args;

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result)
                    this.trigger("live.info.success", res.data);
                else
                    this.trigger("live.info.error", res);
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("live.info.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        createLive: function(args){
            var url = BASE_URL + "live/create"
            var defaultParas = {
                type: "POST",
                url: url,
                async: true,
                timeout: 30000,
                contentType: "application/json",
                processData: false
            };
            defaultParas.data = args;

            defaultParas.data = JSON.stringify(defaultParas.data);

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result)
                    this.trigger("create.success", res.data);
                else
                    this.trigger("create.error", res);
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("create.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getAuthList: function(args){
            var url = BASE_URL + "live/config/auth"
            var defaultParas = {
                type: "GET",
                url: url,
                async: true,
                timeout: 30000
            };
            defaultParas.data = {
                t: new Date().valueOf()
            };
            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result){
                    this.trigger("get.auth.success", res.data);
                } else {
                    this.trigger("get.auth.error");
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("get.auth.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        }
	});

    return LiveManageCollection;
});