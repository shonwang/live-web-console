define("statistics.model", ['require','exports', 'backbone', 'jquery'], function(require, exports, Backbone, jquery) {
    var Model = Backbone.Model.extend({});

    var GlobalSetup = Backbone.Collection.extend({
        
        model: Model,

        initialize: function(){},

        getReportFlow: function(args){
            var url = BASE_URL + "live/report/flow"
            var defaultParas = {
                type: "GET",
                url: url,
                async: true,
                timeout: 30000
            };
            defaultParas.data = {
                start_time: args.start_time,
                end_time  : args.end_time,
                t         : new Date().valueOf()
            };
            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result){
                    this.trigger("flow.success", res.data);
                } else {
                    this.trigger("flow.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("flow.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getReportBandwidth: function(args){
            var url = BASE_URL + "live/report/bandwidth"
            var defaultParas = {
                type: "GET",
                url: url,
                async: true,
                timeout: 30000
            };
            defaultParas.data = {
                start_time: args.start_time,
                end_time  : args.end_time,
                t         : new Date().valueOf()
            };
            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result){
                    this.trigger("bandwidth.success", res.data);
                } else {
                    this.trigger("bandwidth.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("bandwidth.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getReportCount: function(args){
            var url = BASE_URL + "live/report/count"
            var defaultParas = {
                type: "GET",
                url: url,
                async: true,
                timeout: 30000
            };
            defaultParas.data = {
                start_time: args.start_time,
                end_time  : args.end_time,
                t         : new Date().valueOf()
            };
            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result){
                    this.trigger("count.success", res.data);
                } else {
                    this.trigger("count.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("count.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getReportStore: function(args){
            var url = BASE_URL + "live/report/storesize"
            var defaultParas = {
                type: "GET",
                url: url,
                async: true,
                timeout: 30000
            };
            defaultParas.data = {
                start_time: args.start_time,
                end_time  : args.end_time,
                bucket    : args.bucket,
                t         : new Date().valueOf()
            };
            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result){
                    this.trigger("store.success", res.data);
                } else {
                    this.trigger("store.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("store.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getReportBusiness: function(args){
            var url = BASE_URL + "live/report/business"
            var defaultParas = {
                type: "GET",
                url: url,
                async: true,
                timeout: 30000
            };
            defaultParas.data = {
                time      : args.time,
                activeType: args.activeType,
                t         : new Date().valueOf()
            };
            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result){
                    this.trigger("business.success", res.data);
                } else {
                    this.trigger("business.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("business.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getReportLiveCountInfo: function(args){
            var url = BASE_URL + "live/report/livecountinfo"
            var defaultParas = {
                type: "GET",
                url: url,
                async: true,
                timeout: 30000
            };
            defaultParas.data = {
                t : new Date().valueOf()
            };
            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res&&res.result){
                    this.trigger("livecountinfo.success", res.data);
                } else {
                    this.trigger("livecountinfo.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("livecountinfo.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getBucketList: function(args){
            var url = BASE_URL + "live/report/bucket/list"
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
                    if (!window.REPORT_BUCKET_LIST) window.REPORT_BUCKET_LIST = res.data
                    this.trigger("report.bucket.success", res.data);
                } else {
                    this.trigger("report.bucket.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("report.bucket.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        }
	});

    return GlobalSetup;
});