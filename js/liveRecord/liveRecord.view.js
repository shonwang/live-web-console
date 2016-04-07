define("liveRecord.view", ['require','exports', 'backbone', 'template', 'bootstrap', 'utility', "modal.view", "daterangepicker", 'ckplayer'], 
    function(require, exports, Backbone, template, bootstrap, Utility, Modal, daterangepicker, ckplayer) {

    var PreviewView = Backbone.View.extend({
        events: {},

        initialize: function(options) {
            this.model = options.model;
            this.collection = options.collection;
            var tpl = '<div><h4>' + this.model.attributes.filename + '</h4>' + 
                      '<div class="error-ctn"></div>' + 
                      '<div class="preview-ctn" id="preview-ctn">' + 
                        '<video id="video1" controls="true" src="">Your browser does not support HTML5 video.</video> ' + 
                      '</div></div>'
            this.$el = $(tpl);

            this.args = {
                id: this.model.attributes.id
            };
            this.collection.off("play.info.success");
            this.collection.off("play.info.error");
            this.collection.on("play.info.success", $.proxy(this.onGetPlayInfo, this));
            this.collection.on("play.info.error", function(){alert("获取视频信息失败！")});
        },

        onGetPlayInfo: function(data){
            if(!data.url) {
                var data = {
                    type   : "alert-danger",
                    message: "获取视频信息失败，该视频已从云存储中删除！",
                    isClose: true
                }
                this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
                return;
            }
            this.type = data.type;
            if (data.type === "MP4"){
                this.video = this.$el.find("video").get(0);
                this.video.src = data.url;
                this.video.load();
            } else {
                var flashvars = {
                   f : BASE_URL + 'flash/m3u8.swf',//'http://wangshichao-vod.kssws.ks-cdn.com/flash/m3u8.swf',
                   a : data.url,
                   c : 0,
                   s : 4,
                   lv: 0//注意，是否锁定进度栏  0：不锁定，1：锁定。如果是直播，需设置lv:1 
               }
                // var flashvars = {
                //     f : data.url,
                //     p : 1,
                //     c : 0 //调用配置方式  =0：调用ckplayer.js
                // }
                var params = {
                    bgcolor:'#FFF',
                    allowFullScreen:true,
                    allowScriptAccess:'always',
                    wmode:'transparent'
                };
                CKobject.embedSWF('flash/ckplayer.swf', 'preview-ctn', 'ckplayer_a2', '100%', '400', flashvars, params);
                //CKobject.embedSWF('http://wangshichao-vod.kssws.ks-cdn.com/flash/ckplayer.swf', 'preview-ctn', 'ckplayer_a2', '100%', '400', flashvars, params);
            }
        },

        render: function(target){
            this.$el.appendTo(target);
            this.collection.getPlayInfo(this.args)
        },

        stopVideo: function(){
            if (this.video) this.video.pause();

            if (CKobject.getObjectById('ckplayer_a2'))
                CKobject.videoClear();
        }
    });

    var LiveWatchView = Backbone.View.extend({
        events: {},

        initialize: function(options) {
            this.collection = options.collection;

            this.$el = $(_.template(template['tpl/liveRecord/liveRecord.tabcontent.html'])({}));
            this.$el.find(".table-ctn").html(_.template(template['tpl/loading.html'])({}));
            this.$el.find(".operation .multi-delete").attr("disabled", "disabled");

            this.pageNum = 20;

            this.calendarOption = {
                parentEl: $(".ksc-module"),
                startDate: moment().subtract('days', 6),
                endDate: moment(),
                // timePicker: true,
                // timePickerIncrement: 30,
                format: 'YYYY/MM/DD h:mm A',
                opens: 'left',
                buttonClasses: ['btn btn-default'],
                applyClass: 'btn-small btn-primary',
                cancelClass: 'btn-small',
                locale: {
                    daysOfWeek: ['周日', '周一', '周二', '周三', '周四', '周五','周六'],
                    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
                }
            };

            this.initCalendar();

            this.$el.find(".operation .multi-delete").on("click", $.proxy(this.onClickDeleteButton, this));
            this.$el.find(".date-group button").on("click", $.proxy(this.onClickSpecificDate, this));
            this.$el.find(".query").on("click", $.proxy(this.onClickQueryButton, this));
            $('.ksc-module').on('scroll', $.proxy(this.onScrollContainer, this));

            this.startDate = this.calendarOption.startDate;
            this.endDate   = this.calendarOption.endDate;
            this.nextStartKey = null;
            this.initLiveRecord(options);
        },

        initLiveRecord: function(options){
            this.collection.on("watch.success", $.proxy(this.onGetLiveList, this));
            this.collection.on("watch.error", $.proxy(this.onGetError, this));

            this.collection.on("delete.watch.success", $.proxy(this.onOperateSuccess, this));
            this.collection.on("delete.watch.error", $.proxy(this.onOperateLiveError, this));

            this.queryArgs = {
                "id"           : null,
                "liveId"       : null,
                "limit"        : this.pageNum,
                "startKey"     : null,
                "keySearchText": null,
                "startTime"    : new Date(this.startDate._d).valueOf(),
                "endTime"      : new Date(this.endDate._d).valueOf()
            }
            if (options.liveId){
                this.$el.find("#liverecorde-id").val(options.liveId);
                this.queryArgs.liveId = options.liveId;
            }
            this.collection.getLiveWatch(this.queryArgs);
        },

        update : function(liveId){
            if (liveId){
                this.$el.find("#liverecorde-id").val(liveId)
                this.onClickQueryButton();
            } else {
                this.onClickQueryButton(true);
            }
        },

        clearData: function(){
            this.$el.find("#liverecorde-id").val("");
            this.$el.find("#liverecorde-filename").val("");
            this.collection.reset();
            this.queryArgs = {
                "id"           : null,
                "liveId"       : null,
                "limit"        : this.pageNum,
                "startKey"     : null,
                "keySearchText": null,
                "startTime"    : new Date(this.startDate._d).valueOf(),
                "endTime"      : new Date(this.endDate._d).valueOf()
            }
            this.collection.getLiveWatch(this.queryArgs);
        },

        onClickQueryButton: function(notCheck){
            var idInputNode = this.$el.find("#liverecorde-id"),
                nameInputNode = this.$el.find("#liverecorde-filename")
             if (idInputNode.val() == ""&&notCheck !== true){
                this.onGetError("直播ID必须填写！");
                return;
             }
             this.$el.find(".error-ctn").html("");
            this.collection.reset();
            this.queryArgs = {
                "id"           : null,
                "liveId"       : idInputNode.val(),
                "limit"        : this.pageNum,
                "startKey"     : null,
                "keySearchText": nameInputNode.val(),
                "startTime"    : new Date(this.startDate._d).valueOf(),
                "endTime"      : new Date(this.endDate._d).valueOf()
            }
            this.collection.getLiveWatch(this.queryArgs);
        },

        deleteConfirm: function(id, callback){
            var model, message;
            if (id){
                model = this.collection.get(id);
                message = "你确定要<span class='text-danger'>删除</span>回看<span class='text-primary separator'>" + model.get("filename") + "</span>吗？"
            } else {
                message = "你确定要批量<span class='text-danger'>删除</span>选中的回看吗？"
            }

            if (this.deletePopup) $("#" + this.deletePopup.modalId).remove();
            var options = {
                title:"警告",
                body : message,
                backdrop : 'static',
                onOKCallback:  function(){
                    this.deletePopup.$el.modal("hide");
                    callback&&callback();
                }.bind(this)
            }
            this.deletePopup = new Modal(options);  
        },

        onClickDeleteButton: function(){
            this.deleteConfirm(null, function(){
                var checkedList = this.collection.filter(function(model) {
                    return model.get("isChecked") === true;
                })
                var videoIds = [];
                _.each(checkedList, function(el, index, list){
                    videoIds.push(el.attributes.id);
                })
                if (videoIds.length === 0) return;
                this.collection.deleteLiveWatch({data:videoIds})
            }.bind(this))
        },

        onGetLiveList: function(data){
            if (this.collection.models.length === 0)
                this.$el.find(".table-ctn").html(_.template(template['tpl/empty.html'])({data:{message: "暂无数据……"}}));
            else {
                this.table = $(_.template(template['tpl/liveRecord/liveRecord.home.table.html'])({data: this.collection.models}));
                this.$el.find(".table-ctn").html(this.table.get(0));
                this.table.find("tbody tr").find(".checkbox").off("click");
                this.table.find("thead .checkbox input").off("click");
                this.table.find("tbody tr").find(".checkbox").on("click", $.proxy(this.onItemCheckedUpdated, this));
                this.table.find("thead .checkbox input").on("click", $.proxy(this.onAllCheckedUpdated, this));

                this.table.find("tbody .view").off("click");
                this.table.find("tbody .delete").off("click");
                this.table.find("tbody .view").on("click", $.proxy(this.onClickItemView, this));
                this.table.find("tbody .delete").on("click", $.proxy(this.onClickItemDelete, this));
            }
            this.nextStartKey = data.nextStartKey;
        },

        onClickItemDelete: function(){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName == "SPAN"){
                eventTarget = $(eventTarget).parent();
                id = eventTarget.attr("id");
            } else {
                id = $(eventTarget).attr("id");
            }
            this.deleteConfirm(id, function(){
                this.collection.deleteLiveWatch({data: [id]})
            }.bind(this))
        },

        onClickItemView: function(event){
            var eventTarget = event.srcElement || event.target, id;
            if (eventTarget.tagName == "SPAN"){
                eventTarget = $(eventTarget).parent();
                id = eventTarget.attr("id");
            } else {
                id = $(eventTarget).attr("id");
            }
            var model = this.collection.get(id);

            if (this.previewPopup) $("#" + this.previewPopup.modalId).remove();

            var previewView = new PreviewView({model: model, collection: this.collection});
            var options = {
                title:"预览",
                body : previewView,
                backdrop : 'static',
                type: 1,
                onHiddenCallback: function(){
                    previewView.stopVideo();
                }
            }
            this.previewPopup = new Modal(options);
        },

        onOperateSuccess: function(){
            this.onClickQueryButton(true);
            setTimeout(function(){
                this.$el.find(".error-ctn").html("");
                if (this.successPopup) $("#" + this.successPopup.modalId).remove();
                var options = {
                    title    :"提示",
                    body     : '<div class="alert alert-success"><strong>删除成功！</strong></div>',
                    backdrop : true,
                    type     : 1,
                }
                this.successPopup = new Modal(options);
            }.bind(this), 500)
        },

        onScrollContainer: function(event){
            if (this.$el.parent().css('display') == "none") return;
            var eventTarget = event.srcElement || event.target,
                hh = $(eventTarget).height(),
                scrollTop = eventTarget.scrollTop,
                scrollHHeight = eventTarget.scrollHeight;

            if (hh + scrollTop === scrollHHeight && this.nextStartKey) {
                this.queryArgs.startKey = this.nextStartKey
                this.collection.getLiveWatch(this.queryArgs);
            }
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
            if (checkedList.length === this.collection.models.length)
                this.table.find("thead .checkbox input").get(0).checked = true;
            if (checkedList.length !== this.collection.models.length)
                this.table.find("thead .checkbox input").get(0).checked = false;
            if (checkedList.length === 0) {
                this.$el.find(".operation .multi-delete").attr("disabled", "disabled");
            } else {
                this.$el.find(".operation .multi-delete").removeAttr("disabled", "disabled");
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
                this.$el.find(".operation .multi-delete").removeAttr("disabled", "disabled");
            } else {
                this.$el.find(".operation .multi-delete").attr("disabled", "disabled");
            }
        },

        onClickSpecificDate: function(event){
            var date = {
               'last7Days': [moment().subtract('days', 6), moment()],
               'last30Days': [moment().subtract('days', 29), moment()],
               'thismonth': [moment().startOf('month'), moment()],
            }, startDate, endDate;
            this.$el.find(".date-group button").removeClass("active");
            var eventTarget = event.srcElement || event.target;
            $(eventTarget).addClass("active");
            switch(eventTarget.id){
                case "seven-days":
                    startDate = date.last7Days[0];
                    endDate   = date.last7Days[1];

                break;
                case "thirty-days":
                    startDate = date.last30Days[0];
                    endDate   = date.last30Days[1];
                break;
                case "month":
                    startDate = date.thismonth[0];
                    endDate   = date.thismonth[1];
                break;
            }
            this.calendarOption.startDate = startDate;
            this.calendarOption.endDate = endDate;
            this.$el.find(".calendar").data('daterangepicker').setOptions(this.calendarOption, function(){});
            var dateStr = new Date(startDate._d).format("yyyy/MM/dd hh:mm") + " - " + 
                          new Date(endDate._d).format("yyyy/MM/dd hh:mm")  
            this.$el.find(".calendar").html(dateStr);

            this.startDate = startDate;
            this.endDate   = endDate;
        },

        initCalendar: function(){
            var dateStr = new Date(moment().subtract('days', 6)._d).format("yyyy/MM/dd hh:mm") + " - " + 
                          new Date(moment()._d).format("yyyy/MM/dd hh:mm")  
            this.$el.find(".calendar").html(dateStr);

            this.$el.find(".calendar").daterangepicker(this.calendarOption, function(start, end, label) {});

            this.$el.find(".calendar").on('show.daterangepicker', function() {
                this.$el.find(".date-group button").removeClass("active"); 
            }.bind(this));
            //this.$el.find(".calendar").on('hide.daterangepicker', function() {});
            this.$el.find(".calendar").on('apply.daterangepicker', function(ev, picker) {
                dateStr = new Date(picker.startDate._d).format("yyyy/MM/dd hh:mm") + " - " + 
                          new Date(picker.endDate._d).format("yyyy/MM/dd hh:mm")  
                this.$el.find(".calendar").html(dateStr);
                this.startDate = picker.startDate;
                this.endDate   = picker.endDate;
            }.bind(this));
            //this.$el.find(".calendar").on('cancel.daterangepicker', function(ev, picker) { console.log("cancel event fired"); });
        },

        render: function(target) {
            this.$el.appendTo(target);
        },

        onGetError: function(error){
            var data = {
                type   : "alert-danger",
                message: "请求直播回看失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        onOperateLiveError: function(error){
            var error = "服务器错误，删除失败！"
            this.onGetError(error);
        },
    });

    var LiveScreenshotView = LiveWatchView.extend({
        events: {},

        initLiveRecord: function(options){
            this.collection.on("screenshot.success", $.proxy(this.onGetLiveList, this));
            this.collection.on("screenshot.error", $.proxy(this.onGetError, this));

            this.collection.on("delete.screenshot.success", $.proxy(this.onOperateSuccess, this));
            this.collection.on("delete.screenshot.error", $.proxy(this.onOperateLiveError, this));

            this.queryArgs = {
                "id"           : null,
                "liveId"       : null,
                "limit"        : this.pageNum,
                "startKey"     : null,
                "keySearchText": null,
                "startTime"    : new Date(this.startDate._d).valueOf(),
                "endTime"      : new Date(this.endDate._d).valueOf()
            }
            if (options.liveId){
                this.$el.find("#liverecorde-id").val(options.liveId);
                this.queryArgs.liveId = options.liveId;
            }
            this.collection.getLiveScreenshot(this.queryArgs);
        },

        clearData: function(){
            this.$el.find("#liverecorde-id").val("");
            this.$el.find("#liverecorde-filename").val("");
            this.collection.reset();
            this.queryArgs = {
                "id"           : null,
                "liveId"       : null,
                "limit"        : this.pageNum,
                "startKey"     : null,
                "keySearchText": null,
                "startTime"    : new Date(this.startDate._d).valueOf(),
                "endTime"      : new Date(this.endDate._d).valueOf()
            }
            this.collection.getLiveScreenshot(this.queryArgs);
        },

        onClickQueryButton: function(notCheck){
            var idInputNode = this.$el.find("#liverecorde-id"),
                nameInputNode = this.$el.find("#liverecorde-filename")
             if (idInputNode.val() == "" && notCheck !== true){
                this.onGetError("直播ID必须填写！");
                return;
             }
             this.$el.find(".error-ctn").html("");
            this.collection.reset();
            this.queryArgs = {
                "id"           : null,
                "liveId"       : idInputNode.val(),
                "limit"        : this.pageNum,
                "startKey"     : null,
                "keySearchText": nameInputNode.val(),
                "startTime"    : new Date(this.startDate._d).valueOf(),
                "endTime"      : new Date(this.endDate._d).valueOf()
            }
            this.collection.getLiveScreenshot(this.queryArgs);
        },

        onScrollContainer: function(event){
            if (this.$el.parent().css('display') == "none") return;
            var eventTarget = event.srcElement || event.target,
                hh = $(eventTarget).height(),
                scrollTop = eventTarget.scrollTop,
                scrollHHeight = eventTarget.scrollHeight;

            if (hh + scrollTop === scrollHHeight && this.nextStartKey) {
                this.queryArgs.startKey = this.nextStartKey
                this.collection.getLiveScreenshot(this.queryArgs);
            }
        },

        onClickItemView: function(event){
            var eventTarget = event.srcElement || event.target, id, index;
            if (eventTarget.tagName == "SPAN"){
                eventTarget = $(eventTarget).parent();
                id = eventTarget.attr("id");
                index = eventTarget.attr("index");
            } else {
                id = $(eventTarget).attr("id");
                index = $(eventTarget).attr("index");
            }
            var model = this.collection.get(id);

            require(['images.view'], function(ImagesView){
                var options = {
                    collection : this.collection,
                    imageArray : this.collection.models,
                    activeImage: parseInt(index)
                }
                var myImagesView = new ImagesView(options);
                myImagesView._start();
            }.bind(this))
        },

        onClickDeleteButton: function(){
            this.deleteConfirm(null, function(){
                var checkedList = this.collection.filter(function(model) {
                    return model.get("isChecked") === true;
                })
                var videoIds = [];
                _.each(checkedList, function(el, index, list){
                    videoIds.push(el.attributes.id);
                })
                if (videoIds.length === 0) return;
                this.collection.deleteLiveScreenshot({data:videoIds})
            }.bind(this))
        },

        onClickItemDelete: function(){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName == "SPAN"){
                eventTarget = $(eventTarget).parent();
                id = eventTarget.attr("id");
            } else {
                id = $(eventTarget).attr("id");
            }
            this.deleteConfirm(id, function(){
                this.collection.deleteLiveScreenshot({data: [id]})
            }.bind(this))
        },

        deleteConfirm: function(id, callback){
            var model, message;
            if (id){
                model = this.collection.get(id);
                message = "你确定要<span class='text-danger'>删除</span>截图<span class='text-primary separator'>" + model.get("filename") + "</span>吗？"
            } else {
                message = "你确定要批量<span class='text-danger'>删除</span>选中的截图吗？"
            }

            if (this.deletePopup) $("#" + this.deletePopup.modalId).remove();
            var options = {
                title:"警告",
                body : message,
                backdrop : 'static',
                onOKCallback:  function(){
                    this.deletePopup.$el.modal("hide");
                    callback&&callback();
                }.bind(this)
            }
            this.deletePopup = new Modal(options);  
        }
    });

    var LiveRecordView = Backbone.View.extend({
        events: {
            //"click .add-domain":"onClickAddDomain"
        },

        initialize: function(options) {
            this.liveWatchCollection      = options.liveWatchCollection;
            this.liveScreenshotCollection = options.liveScreenshotCollection;
            if (options.query !== "none") options.query = JSON.parse(options.query);
            this.query = options.query;                    

            this.$el = $(_.template(template['tpl/liveRecord/liveRecord.home.html'])({}));

            var options = {collection: this.liveWatchCollection}
            if (this.query.type === 1) options.liveId = this.query.liveId
            this.liveWatchView = new LiveWatchView(options)

            this.currentTab = "#live-watch";

            this.$el.find('a[data-toggle="tab"]').on('shown.bs.tab', $.proxy(this.onShownTab, this));
        },

        onShownTab: function (e) {
            var eventTarget = e.target; // newly activated tab
            var id = $(eventTarget).attr("data-target");
            relatedID = $(e.relatedTarget).attr("data-target");
            switch(id){
                case "#live-watch":
                    this.currentTab = "#live-watch"
                break;
                case "#live-screenshot":
                    this.currentTab = "#live-screenshot"
                    if (!this.liveScreenshotView){
                        var options = {collection: this.liveScreenshotCollection}
                        if (this.query.type === 2) options.liveId = this.query.liveId
                        this.liveScreenshotView = new LiveScreenshotView(options)
                        this.liveScreenshotView.render(this.$el.find("#live-screenshot"))
                    }
                break;
            }
        },

        update: function(query){
            if (query !== "none") query = JSON.parse(query);
            this.query = query;
            this.$el.show();

            if (this.query.type === 1){
                if (this.currentTab !== "#live-watch")
                    this.$el.find('a[data-target="#live-watch"]').click();
                this.liveWatchView.update(this.query.liveId)
            } else if (this.query.type === 2){
                if (this.currentTab !== "#live-screenshot")
                    this.$el.find('a[data-target="#live-screenshot"]').click();
                this.liveScreenshotView.update(this.query.liveId)
            }
            this.$el.find(".operation .multi-delete").attr("disabled", "disabled");
        },

        clearData : function(){
            if (this.liveScreenshotView) this.liveScreenshotView.clearData();
            if (this.liveWatchView) this.liveWatchView.clearData();
        },

        render: function(target) {
            this.liveWatchView.render(this.$el.find("#live-watch"));
            this.$el.appendTo(target);
            this.$el.addClass("fadeInLeft animated");
            if (this.query.type === 2) this.$el.find('a[data-target="#live-screenshot"]').click();
        }
    });

    return LiveRecordView;
});