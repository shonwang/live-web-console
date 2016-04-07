define("globalSetup.model", ['require','exports', 'backbone', 'jquery'], function(require, exports, Backbone, jquery) {
    var Model = Backbone.Model.extend({
        initialize: function(){
            var statusName = this.get("status"),
                updateTimeFormated = this.get("updateTime"),
                createTimeFormated = this.get("createTime");
            if (statusName == 1) this.set("statusName", '<span class="text-danger">审核失败</span>');
            if (statusName == 0) this.set("statusName", '<span class="text-info">审核中</span>');
            if (statusName == 2) this.set("statusName", '<span class="text-success">审核通过</span>');
            if (updateTimeFormated) this.set("updateTimeFormated", new Date(updateTimeFormated).format("yyyy/MM/dd hh:mm:ss"));
            if (createTimeFormated) this.set("createTimeFormated", new Date(createTimeFormated).format("yyyy/MM/dd hh:mm:ss"));
        }
    });

    var GlobalSetup = Backbone.Collection.extend({
        
        model: Model,

        initialize: function(){},

        queryDomain: function(args){
            var url = BASE_URL + "live/config/domain/bind/list"
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
                if (res&&res.result&&res.data){
                    this.trigger("success", res.data);
                } else {
                    this.trigger("error");
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

        deleteDomain: function(args){
            var url = BASE_URL + "live/config/domain/bind/delete"
            var defaultParas = {
                type: "POST",
                url: url,
                async: true,
                timeout: 30000,
                contentType: "application/json",
                processData: false
            };
            defaultParas.data = args

            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                this.trigger("delete.domain.success", res);
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("delete.domain.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        addDomain: function(args){
            var url = BASE_URL + "live/config/domain/bind/add"
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
                this.trigger("add.domain.success", res);
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("add.domain.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getPublishSetup: function(args){
            var url = BASE_URL + "live/config/publishnode/get"
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
                    this.trigger("get.publish.success", res.data);
                } else {
                    this.trigger("get.publish.error");
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("get.publish.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        setPublishSetup: function(args){
            var url = BASE_URL + "live/config/publishnode/set"
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
                this.trigger("set.publish.success", res);
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("set.publish.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getVodSetup: function(args){
            var url = BASE_URL + "live/config/vod/get"
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
                    this.trigger("get.vod.success", res.data);
                } else {
                    this.trigger("get.vod.error");
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("get.vod.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        setVodSetup: function(args){
            var url = BASE_URL + "live/config/vod/set"
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
                this.trigger("set.vod.success", res);
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("set.vod.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getScreenshotSetup: function(args){
            var url = BASE_URL + "live/config/screenshot/get"
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
                    this.trigger("get.screenshot.success", res.data);
                } else {
                    this.trigger("get.screenshot.error");
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("get.screenshot.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        setScreenshotSetup: function(args){
            var url = BASE_URL + "live/config/screenshot/set"
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
                this.trigger("set.screenshot.success", res);
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("set.screenshot.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getAntileech: function(args){
            var url = BASE_URL + "live/antileech"
            var defaultParas = {
                type: "GET",
                url: url,
                async: true,
                timeout: 30000
            };
            defaultParas.data = {
                bucket: args,
                t: new Date().valueOf()
            };
            defaultParas.beforeSend = function(xhr){
                //xhr.setRequestHeader("ContentType","application/json");
            }
            defaultParas.success = function(res){
                if (res)
                    this.trigger("get.antileech.success", res);
                else
                    this.trigger("get.antileech.error");
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("get.antileech.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        setAntileech: function(args){
            var url = BASE_URL + "live/antileech"
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
                this.trigger("set.antileech.success", res);
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("set.antileech.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getBucketList: function(args){
            var url = BASE_URL + "live/bucket"
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
                    if (!window.BUCKET_LIST) window.BUCKET_LIST = res.list
                    this.trigger("get.bucket.success", res.list);
                } else {
                    this.trigger("get.bucket.error");
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("get.bucket.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        getRecordBucketList: function(args){
            var url = BASE_URL + "live/record/bucket"
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
                    this.trigger("record.bucket.success", res.list);
                } else {
                    this.trigger("record.bucket.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("record.bucket.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },

        setDomainSign: function(args){
            var url = BASE_URL + "live/config/domainid"
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
                if(res&&res.result){
                    this.trigger("set.domainid.success", res);
                } else {
                    this.trigger("set.domainid.error", res);
                }
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("set.domainid.error", response);
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
        },

        setSafety: function(args){
            var url = BASE_URL + "live/config/safety/set"
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
                this.trigger("set.safety.success", res);
            }.bind(this);

            defaultParas.error = function(response, msg){
                if (response&&response.responseText)
                    response = JSON.parse(response.responseText)
                this.trigger("set.safety.error", response);
            }.bind(this);

            $.ajax(defaultParas);
        },
	});

    return GlobalSetup;
});