define("home.model", ['require','exports', 'backbone', 'jquery'], function(require, exports, Backbone, jquery) {
    var Model = Backbone.Model.extend({
        initialize: function(){}
    });

    var HomeCollection = Backbone.Collection.extend({
        
        model: Model,

        initialize: function(){},

        getReport: function(args){
            var url = BASE_URL + "report/condition"
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
                this.reset();
                if (res&&res.data){
                    this.runningStatus = res.data;
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

	});

    return HomeCollection;
});