define("liveManage.view", ['require','exports', 'backbone', 'template', 'bootstrap', 'jqpaginator', 'utility', 'modal.view'], 
    function(require, exports, Backbone, template, bootstrap, jqPaginator, Utility, Modal) {

    var LiveManageView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/liveManage/liveManage.home.html'])({}));

            this.queryArgs = {
                "liveId": "",
                "liveName": "",
                "state": null,
                "page": 1,
                "size": 10,
                "orders": [{
                    "property": "createTime",
                    "direction": "DESC",
                    "ignoreCase": false,
                    "nullHandling": "NATIVE"
                }]
            };

            this.isInitPaginator = false;
            this.isQuering = false;

            this.$el.find(".table-ctn").html(_.template(template['tpl/loading.html'])({}));
            this.$el.find(".operation .enable").attr("disabled", "disabled");
            this.$el.find(".operation .disable").attr("disabled", "disabled");
            this.$el.find(".operation .m-delete").attr("disabled", "disabled");

            this.$el.find(".operation .m-delete").on("click", $.proxy(this.onClickDeleteButton, this));
            this.$el.find(".operation .enable").on("click", $.proxy(this.onClickStartButton, this));
            this.$el.find(".operation .disable").on("click", $.proxy(this.onClickStopButton, this));
            this.$el.find(".operation .create").on("click", $.proxy(this.onClickCreateButton, this));
            this.$el.find(".query-input").on("blur", $.proxy(this.onInputBlur, this));
            this.$el.find(".query-ctn .query").on("click", $.proxy(this.onClickQueryButton, this));

            this.initLiveDropMenu();

            this.collection.on("success", $.proxy(this.onGetLiveList, this));
            this.collection.on("error", $.proxy(this.onGetListError, this));
            this.collection.on("start.success", $.proxy(this.onOperateLiveSuccess, this));
            this.collection.on("start.error", $.proxy(this.onOperateLiveError, this));
            this.collection.on("stop.success", $.proxy(this.onOperateLiveSuccess, this));
            this.collection.on("stop.error", $.proxy(this.onOperateLiveError, this));
            this.collection.on("delete.success", $.proxy(this.onOperateLiveSuccess, this));
            this.collection.on("delete.error", $.proxy(this.onOperateLiveError, this));

            this.collection.queryLiveList(this.queryArgs);
        },

        update: function(){
            this.$el.show();
            this.onClickQueryButton();
        },

        onGetListError: function(error){
            this.isQuering = false;
            this.$el.find(".total-items span").html(0);
            var data = {
                type   : "alert-danger",
                message: "服务器错误！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        onClickCreateButton: function(){
            window.location.hash = "#/livemanage/create/new";
        },

        deleteConfirm: function(id, callback){
            var model, message;
            if (id){
                model = this.collection.get(id);
                message = "你确定要<span class='text-danger'>删除</span>直播<span class='text-primary separator'>" + model.get("liveId") + "</span>吗？"
            } else {
                message = "你确定要批量<span class='text-danger'>删除</span>选中的直播吗？"
            }

            var tpl = '<div>' + message + '</div>' + 
                      '<div class="checkbox" style="text-align: center;">' + 
                        '<label>' + 
                            '<input type="checkbox" id="delete-record">' + 
                                '<span class="checkbox-material" style="margin-right:  10px;"><span class="check"></span></span>' + 
                                '同时删除直播回看和截图' + 
                        '</label>' + 
                      '</div>'

            if (this.deletePopup) $("#" + this.deletePopup.modalId).remove();
            var options = {
                title:"警告",
                body : tpl,
                backdrop : 'static',
                onOKCallback:  function(){
                    var isChecked = this.deletePopup.$el.find("#delete-record").get(0).checked;
                    this.deletePopup.$el.modal("hide");
                    callback&&callback(isChecked);
                }.bind(this)
            }
            this.deletePopup = new Modal(options);  
        },

        disableConfirm: function(id, callback){
            var model, message;
            if (id){
                model = this.collection.get(id);
                message = "你确定要<span class='text-danger'>结束</span>直播<span class='text-primary separator'>" + model.get("liveId") + "</span>吗？"
            } else {
                message = "你确定要批量<span class='text-danger'>结束</span>选中的直播吗？"
            }

            if (this.disablePopup) $("#" + this.disablePopup.modalId).remove();
            var options = {
                title:"警告",
                body : message,
                backdrop : 'static',
                onOKCallback:  function(){
                    this.disablePopup.$el.modal("hide");
                    callback&&callback();
                }.bind(this)
            }
            this.disablePopup = new Modal(options);  
        },

        startConfirm: function(id, callback){
            var model, message;
            if (id){
                model = this.collection.get(id);
                message = "你确定要<span class='text-success'>开始</span>直播<span class='text-primary separator'>" + model.get("liveId") + "</span>吗？"
            } else {
                message = "你确定要批量<span class='text-success'>开始</span>选中的直播吗？"
            }

            if (this.startPopup) $("#" + this.startPopup.modalId).remove();
            var options = {
                title:"警告",
                body : message,
                backdrop : 'static',
                onOKCallback:  function(){
                    this.startPopup.$el.modal("hide");
                    callback&&callback();
                }.bind(this)
            }
            this.startPopup = new Modal(options);  
        },

        onClickDeleteButton: function(){
            this.deleteConfirm(null, function(isChecked){
                var checkedList = this.collection.filter(function(model) {
                    return model.get("isChecked") === true;
                })
                var videoIds = [];
                _.each(checkedList, function(el, index, list){
                    videoIds.push(el.attributes.id);
                })
                if (videoIds.length === 0) return;
                var args = {
                    "ids"         : videoIds,
                    "deleteRecord": isChecked
                }
                this.collection.deleteLive(args)
            }.bind(this))
        },

        onClickStartButton: function(){
            this.startConfirm(null, function(){
                var checkedList = this.collection.filter(function(model) {
                    return model.get("isChecked") === true;
                })
                var videoIds = [];
                _.each(checkedList, function(el, index, list){
                    videoIds.push(el.attributes.id);
                })
                if (videoIds.length === 0) return;
                this.collection.startLive(videoIds)
            }.bind(this))
        },

        onClickStopButton: function(){
            this.disableConfirm(null, function(){
                var checkedList = this.collection.filter(function(model) {
                    return model.get("isChecked") === true;
                })
                var videoIds = [];
                _.each(checkedList, function(el, index, list){
                    videoIds.push(el.attributes.id);
                })
                if (videoIds.length === 0) return;
                this.collection.stopLive(videoIds)
            }.bind(this))
        },

        initPaginator: function(){
            this.$el.find(".total-items span").html(this.collection.total)
            if (this.collection.total < this.queryArgs.size) return;
            var total = Math.ceil(this.collection.total/this.queryArgs.size);

            this.$el.find(".pagination").jqPaginator({
                totalPages: total,
                visiblePages: 10,
                currentPage: 1,
                onPageChange: function (num, type) {
                    if (type !== "init"){
                        this.$el.find(".table-ctn").html(_.template(template['tpl/loading.html'])());
                        var args = _.extend(this.queryArgs);
                        args.page = num;
                        args.size = this.queryArgs.size;
                        this.collection.queryLiveList(args);
                    }
                }.bind(this)
            });
            this.isInitPaginator = true;
        },

        onGetLiveList: function(){
            this.isQuering = false;
            this.$el.find(".operation .enable").attr("disabled", "disabled");
            this.$el.find(".operation .disable").attr("disabled", "disabled");
            this.$el.find(".operation .m-delete").attr("disabled", "disabled");
            if (this.collection.models.length === 0)
                this.$el.find(".table-ctn").html(_.template(template['tpl/empty.html'])({data:{message: "暂无数据……"}}));
            else {
                this.table = $(_.template(template['tpl/liveManage/liveManage.home.table.html'])({data: this.collection.models}));
                this.$el.find(".table-ctn").html(this.table.get(0));
                if (!this.isInitPaginator) this.initPaginator();
                this.table.find("tbody tr").find(".checkbox").on("click", $.proxy(this.onItemCheckedUpdated, this));
                this.table.find("thead .checkbox input").on("click", $.proxy(this.onAllCheckedUpdated, this));

                this.table.find("tbody .edit").on("click", $.proxy(this.onClickItemEdit, this));
                this.table.find("tbody .stop").on("click", $.proxy(this.onClickItemDisable, this));
                this.table.find("tbody .play").on("click", $.proxy(this.onClickItemPlay, this));
                this.table.find("tbody .delete").on("click", $.proxy(this.onClickItemDelete, this));

                this.table.find("tbody .replay").on("click", $.proxy(this.onClickItemRecord, this));
                this.table.find("tbody .screenshot").on("click", $.proxy(this.onClickItemRecord, this));
            }
            this.$el.find(".total-items span").html(this.collection.total)
        },

        onClickItemRecord: function(event){
            var eventTarget = event.srcElement || event.target,
                id = $(eventTarget).attr("id"), 
                model = this.collection.get(id), type;

            if ($(eventTarget).hasClass("replay"))
                type = 1
            else 
                type = 2
            var options = {
                liveId: model.get("liveId"),
                type  : type
            }
            options = JSON.stringify(options);
            window.location.hash = "#/liverecord/" + options;
        },

        onItemCheckedUpdated: function(event){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName !== "INPUT") return;
            var id = $(eventTarget).attr("id");
            var model = this.collection.get(id);
            model.set("isChecked", eventTarget.checked)

            var checkedList = this.collection.filter(function(model) {
                return model.get("isChecked") === true;
            })
            if (checkedList.length === this.collection.length)
                this.table.find("thead .checkbox input").get(0).checked = true;
            if (checkedList.length !== this.collection.length)
                this.table.find("thead .checkbox input").get(0).checked = false;
            if (checkedList.length === 0) {
                this.$el.find(".operation .enable").attr("disabled", "disabled");
                this.$el.find(".operation .disable").attr("disabled", "disabled");
                this.$el.find(".operation .m-delete").attr("disabled", "disabled");
            } else {
                this.$el.find(".operation .enable").removeAttr("disabled", "disabled");
                this.$el.find(".operation .disable").removeAttr("disabled", "disabled");
                this.$el.find(".operation .m-delete").removeAttr("disabled", "disabled");
            }
        },

        onAllCheckedUpdated: function(event){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName !== "INPUT") return;
            this.collection.each(function(model){
                model.set("isChecked", eventTarget.checked);
            }.bind(this))
            this.table.find("tbody tr").find(".checkbox input").prop("checked", eventTarget.checked);
            if (eventTarget.checked){
                this.$el.find(".operation .enable").removeAttr("disabled", "disabled");
                this.$el.find(".operation .disable").removeAttr("disabled", "disabled");
                this.$el.find(".operation .m-delete").removeAttr("disabled", "disabled");
            } else {
                this.$el.find(".operation .enable").attr("disabled", "disabled");
                this.$el.find(".operation .disable").attr("disabled", "disabled");
                this.$el.find(".operation .m-delete").attr("disabled", "disabled");
            }
        },

        onClickItemEdit: function(event){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName == "SPAN"){
                eventTarget = $(eventTarget).parent();
                id = eventTarget.attr("id");
            } else {
                id = $(eventTarget).attr("id");
            }
            window.location.hash = "#/livemanage/create/" + id;
        },

        onClickItemPlay: function(event){
            var eventTarget = event.srcElement || event.target, id;
            if (eventTarget.tagName == "SPAN"){
                eventTarget = $(eventTarget).parent();
                id = eventTarget.attr("id");
            } else {
                id = $(eventTarget).attr("id");
            }
            
            this.startConfirm(id, function(){
                this.collection.startLive([parseInt(id)])
            }.bind(this))
        },

        onClickItemDelete: function(event){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName == "SPAN"){
                eventTarget = $(eventTarget).parent();
                id = eventTarget.attr("id");
            } else {
                id = $(eventTarget).attr("id");
            }
            this.deleteConfirm(id, function(isChecked){
                var args = {
                    "ids"         : [parseInt(id)],
                    "deleteRecord": isChecked
                }
                this.collection.deleteLive(args)
            }.bind(this))
        },

        onClickItemDisable: function(event){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName == "SPAN"){
                eventTarget = $(eventTarget).parent();
                id = eventTarget.attr("id");
            } else {
                id = $(eventTarget).attr("id");
            }
            this.disableConfirm(id, function(){
                this.collection.stopLive([parseInt(id)])
            }.bind(this))
        },

        onOperateLiveSuccess: function(){
            this.onClickQueryButton();
            setTimeout(function(){
                this.$el.find(".error-ctn").html("");
                if (this.successPopup) $("#" + this.successPopup.modalId).remove();
                var options = {
                    title    :"提示",
                    body     : '<div class="alert alert-success"><strong>操作成功！</strong></div>',
                    backdrop : true,
                    type     : 1,
                }
                this.successPopup = new Modal(options);
            }.bind(this), 500)
        },

        onOperateLiveError: function(error){
            var data = {
                type   : "alert-danger",
                message: "服务器错误, 操作失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        onInputBlur: function(event){
            var eventTarget = event.srcElement || event.target;

            switch(eventTarget.id){
                case "live-id":
                    this.queryArgs.liveId = $(eventTarget).val();
                break;
                case "live-name":
                    this.queryArgs.liveName = $(eventTarget).val();
                break;
            }
        },

        onClickQueryButton: function(){
            if (this.isQuering) return false;
            this.isQuering = true
            this.isInitPaginator = false;
            this.queryArgs.page = 1;
            this.$el.find(".table-ctn").html(_.template(template['tpl/loading.html'])({}));
            this.$el.find(".pagination").html("");
            this.collection.queryLiveList(this.queryArgs);
        },

        initLiveDropMenu: function(){
            var status = [
                {name: "全部", value: "ALL"},
                {name: "准备中", value: "NOSTART"},
                {name: "直播中", value: "LIVE"},
                {name: "已结束", value: "STOP"}
            ],
            rootNode = this.$el.find(".live-status");
            Utility.initDropMenu(rootNode, status, function(value){
                this.queryArgs.state = value
                if (this.queryArgs.state == "ALL")
                    this.queryArgs.state = null;
            }.bind(this));

            // var record = [
            //     {name: "全部", value: ""},
            //     {name: "回看", value: "FILE_MISSING"},
            //     {name: "截图", value: "UNTRANSCODED"}
            // ],
            // rootNode = this.$el.find(".live-record");
            // Utility.initDropMenu(rootNode, record, function(value){

            // }.bind(this));

            var pageNum = [
                {name: "10条", value: 10},
                {name: "20条", value: 20},
                {name: "50条", value: 50},
                {name: "100条", value: 100}
            ]
            Utility.initDropMenu(this.$el.find(".page-info"), pageNum, function(value){
                this.queryArgs.size = value;
                this.queryArgs.page = 1;
                this.onClickQueryButton();
            }.bind(this));
        },

        render: function(target) {
            this.$el.appendTo(target);
            this.$el.addClass("fadeInLeft animated");
        }
    });

    return LiveManageView;
});