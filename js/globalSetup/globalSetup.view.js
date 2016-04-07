define("globalSetup.view", ['require','exports', 'backbone', 'template', 'bootstrap', 'utility', "modal.view"], 
    function(require, exports, Backbone, template, bootstrap, Utility, Modal) {

    var SecuritySetupView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/globalSetup/globalSetup.security.html'])({}));

            this.$el.find(".antileech-ctn").html(_.template(template['tpl/loading.html'])({}));

            this.collection.on('record.bucket.success', $.proxy(this.initBucketDropList, this));
            this.collection.on('record.bucket.error', $.proxy(this.onGetBucketListError, this));
            this.collection.on('get.antileech.success', $.proxy(this.onGetAntileechSuccess, this));
            this.collection.on('get.antileech.error', $.proxy(this.onGetAntileechError, this));
            this.collection.on('set.safety.success', $.proxy(this.onSubmitSuccess, this));
            this.collection.on('set.safety.error', $.proxy(this.onGetAntileechError, this));
            this.collection.on('get.auth.success', $.proxy(this.onGetAuthSuccess, this));
            this.collection.on('get.auth.error', $.proxy(this.onGetAntileechError, this));

            this.collection.getRecordBucketList();
            this.collection.getAuthList();

            this.$el.find(".submit-security").on("click", $.proxy(this.onClickSubmit, this))
        },

        onGetAuthSuccess: function(data){
            this.$el.find(".acl-ctn input").get(0).checked = data.auth;
        },

        onSubmitSuccess: function(){
            this.$el.find(".error-ctn").html("");
            if (this.successPopup) $("#" + this.successPopup.modalId).remove();
            var options = {
                title    :"提示",
                body     : '<div class="alert alert-success"><strong>提交成功！</strong></div>',
                backdrop : true,
                type     : 1,
            }
            this.successPopup = new Modal(options);
        },

        onClickSubmit: function(){
            var temp;
            if (this.currentAntileech && this.currentAntileech.bucket_name) {
                if (!this.isAntileechCorrect && this.currentAntileech.enable == "1"){
                    error = {message: "请输入正确的防盗链域名！"};
                    this.onGetAntileechError(error);
                    return;
                }
                this.currentAntileech.urls = this.$el.find(".antileech-ctn textarea").val();
                temp = _.extend({}, this.currentAntileech)
            }
             
            var args = {
                "auth": {
                    "auth": this.$el.find(".acl-ctn input").get(0).checked
                },
            };
            if (temp) args["antiLeech"] = temp;
            //this.collection.setAntileech(args);
            this.collection.setSafety(args);
        },

        onGetBucketListError: function(){
            var error = {message: "获取BUCKET列表失败！"};
            this.onGetAntileechError(error);
        },

        onGetAntileechError: function(error){
            var data = {
                type   : "alert-danger",
                message: "请求防盗链设置失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        onGetAntileechSuccess: function(data){
            this.isAntileechCorrect = false;
            this.currentAntileech = _.extend({}, data);
            var antileechTpl = _.template(template['tpl/globalSetup/globalSetup.security.antileech.html'])({data:data});
            this.antileechTpl = $(antileechTpl);
            this.$el.find(".antileech-ctn").html(this.antileechTpl);
            this.antileechTpl.find(".radio input").on("click", $.proxy(this.onClickNodeButton, this));
            this.$el.find(".antileech-ctn textarea").on("blur", $.proxy(this.onBlurTextarea, this));
            if (this.$el.find(".antileech-ctn textarea").val())
               this.$el.find(".antileech-ctn textarea").blur(); 
        },

        onClickNodeButton: function(event){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName !== "INPUT") return;
            var id = $(eventTarget).attr("id");

            if (id.indexOf("Referer") > -1){
                this.currentAntileech.allow_null_referer = parseInt(eventTarget.value);
            } else if (id.indexOf("Security3") > -1){
                this.currentAntileech.enable = eventTarget.value;
                if (eventTarget.value == "0"){
                    this.$el.find(".antileech-ctn textarea").val("");
                }
            } else {
                this.currentAntileech.enable = "1";
                this.currentAntileech.type = parseInt(eventTarget.value);
                if (eventTarget.value == "0")
                    this.$el.find(".antileech-title").html("白名单列表")
                else if (eventTarget.value == "1")
                    this.$el.find(".antileech-title").html("黑名单列表")
            }
        },

        onBlurTextarea: function(event){
            var eventTarget = event.srcElement || event.target,
                value = eventTarget.value, domains = [], error;
            if (value.indexOf(",") > -1){
                domains = value.split(",");
                for (var i = 0; i < domains.length; i++){
                    if (!Utility.isAntileechDomain(domains[i])){
                        this.isAntileechCorrect = false;
                        error = {message: "第" + (i + 1) + "个防盗链域名输错了！"};
                        this.onGetAntileechError(error);
                        return;
                    }
                }
                this.isAntileechCorrect = true;
            } else if (!Utility.isAntileechDomain(value)){
                error = {message: "请输入正确的防盗链域名！"};
                this.onGetAntileechError(error);
                this.isAntileechCorrect = false;
            } else {
                this.isAntileechCorrect = true;
                this.$el.find(".error-ctn").html("");
            }
        },

        initBucketDropList: function(list){
            var rootNode = this.$el.find(".antileech-bucket"),
                tempList = [];

            _.each(list, function(el, index, ls){
                tempList.push({name:el, value:el})
            })

            rootNode.find(".dropdown-menu").html("");

            Utility.initDropMenu(rootNode, tempList, function(value){
                this.collection.getAntileech(value);
            }.bind(this));

            if (list.length > 0){
                rootNode.find("#cur-value").html(list[0]);
                this.collection.getAntileech(list[0]);
            } else {
                rootNode.find("#cur-value").html("未设置");
                this.$el.find(".antileech-ctn").html(_.template(template['tpl/empty.html'])({data:{message: "您还没有配置Bucket，无法设置防盗链信息..."}}));
            }
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var LiveScreenshotView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/globalSetup/globalSetup.common.html'])({}));
            this.$el.find(".panel-ctn").html(_.template(template['tpl/loading.html'])({}));

            this.collection.on('get.screenshot.success', $.proxy(this.onGetScreenshotSuccess, this));
            this.collection.on('get.screenshot.error', $.proxy(this.onGetScreenshotError, this));
            this.collection.on('set.screenshot.success', $.proxy(this.onSubmitSuccess, this));
            this.collection.on('set.screenshot.error', $.proxy(this.onGetScreenshotError, this));
            this.collection.on('get.bucket.success', $.proxy(this.initBucketDropList, this));
            this.collection.on('get.bucket.error', $.proxy(this.onGetBucketListError, this));
            this.collection.getScreenshotSetup();
        },

        onSubmitSuccess: function(){
            this.$el.find(".error-ctn").html("");
            if (this.successPopup) $("#" + this.successPopup.modalId).remove();
            var options = {
                title    :"提示",
                body     : '<div class="alert alert-success"><strong>提交成功！</strong></div>',
                backdrop : true,
                type     : 1,
            }
            this.successPopup = new Modal(options);
        },

        onGetBucketListError: function(){
            var error = {message: "获取BUCKET列表失败！"};
            this.onGetScreenshotError(error);
        },

        onGetScreenshotError: function(error){
            var data = {
                type   : "alert-danger",
                message: "请求直播回看设置失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        initBucketDropList: function(list){
            var rootNode = this.screenshotDetail.find(".bucket-list"),
                tempList = [];

            this.defaultBucket = this.screenshotInfo.bucket || list[0];
            
            rootNode.find("#cur-value").html(this.defaultBucket);
            rootNode.find(".dropdown-menu").html("");

            if (list.length === 0){
                rootNode.find("#cur-value").html("无可用存储空间（Bucket）");
                rootNode.find(".dropdown-menu").hide();
                rootNode.find(".caret").hide();
                return;
            }

            if (_.indexOf(list, this.screenshotInfo.bucket) === -1){
                if (this.successPopup) $("#" + this.successPopup.modalId).remove();
                var options = {
                    title    :"警告",
                    body     : '<div class="alert alert-danger"><strong>您绑定的存储空间（Bucket）: ' + this.screenshotInfo.bucket + ' 已经删除，请重新绑定！</strong></div>',
                    backdrop : true,
                    type     : 1,
                }
                this.successPopup = new Modal(options);
            }

            if (this.screenshotInfo.bucket && _.indexOf(list, this.screenshotInfo.bucket) !== -1) {
                rootNode.find("#cur-value").html("已绑定：" + this.defaultBucket);
                rootNode.find(".dropdown-menu").hide();
                rootNode.find(".caret").hide();
                return;
            }

            _.each(list, function(el, index, ls){
                tempList.push({name:el, value:el})
            })

            Utility.initDropMenu(rootNode, tempList, function(value){
                this.screenshotInfo.bucket = value;
            }.bind(this));
        },

        onGetScreenshotSuccess: function(data){
            this.allDomainData = data;
            this.signList = Object.keys(this.allDomainData);
            this.initSignDropMenu();
        },

        initSignDropMenu: function(){
            var signs = [], rootNode;
            _.each(this.signList, function(el, index, list){
                signs.push({name : el, value: el});
            })
            rootNode = this.$el.find(".domain-sign");

            if (!this.currentSign) this.currentSign = this.signList[0];
            rootNode.find("#cur-value").html(this.currentSign);
            this.onChangeSign(this.currentSign);

            Utility.initDropMenu(rootNode, signs, function(value){
                this.onChangeSign(value);
                this.currentSign = value;
            }.bind(this));
        },

        onChangeSign: function(sign){
            this.screenshotInfo = _.extend({}, this.allDomainData[sign]);

            this.screenshotDetail = $(_.template(template['tpl/globalSetup/globalSetup.livescreenshot.html'])({data: this.screenshotInfo}));

            if (!this.screenshotInfo.screenshot) this.screenshotDetail.find(".open-ctn").hide();
            if (!window.BUCKET_LIST){
                this.collection.getBucketList();
            } else {
                this.collection.trigger("get.bucket.success", window.BUCKET_LIST)
            }

            this.screenshotDetail.find(".togglebutton input").on("click", $.proxy(this.onClickNodeButton, this))
            this.screenshotDetail.find("#notify-url").on("blur", $.proxy(this.onBlurNotifyUrl, this));
            this.screenshotDetail.find("#interval-time").on("blur", $.proxy(this.onBlurInterval, this));
            this.screenshotDetail.find(".submit-screenshot").on("click", $.proxy(this.onClickSubmitButton, this));
            this.screenshotDetail.find("#interval-time").on("keyup", $.proxy(this.onTimeInputKeyup, this));

            this.$el.find(".panel-ctn").html(this.screenshotDetail.get(0))
        },

        onTimeInputKeyup: function(event){
            var eventTarget = event.srcElement || event.target,
                value = $(eventTarget).val();
                value = value.replace(/[^\d]/g,'');
                if (parseInt(value) == 0) value = '';
                $(eventTarget).val(value);
        },

        onClickSubmitButton: function(){
            var error;
            if (this.screenshotDetail.find("#notify-url").val() !== "" &&
                this.screenshotInfo.screenshot && 
                !Utility.isURL(this.screenshotDetail.find("#notify-url").val())){
                error = {message: "您开启了直播截图，需要输入正确的通知URL！"};
                this.onGetScreenshotError(error);
                return;
            }
            if (this.screenshotInfo.screenshot && this.screenshotDetail.find("#interval-time").val() == ""){
                error = {message: "您开启了直播截图，需要输入正确的间隔时间！"};
                this.onGetScreenshotError(error);
                return;
            }
            var temp = _.extend({}, this.screenshotInfo), args = {};
            if (!this.screenshotInfo.screenshot){
                temp.bucket = "";
                temp.notifyUrl = "";
                temp.interval = "";
            }
            if (!temp.bucket) temp.bucket = this.defaultBucket;
            args[this.currentSign] = temp;
            this.collection.setScreenshotSetup(args)
        },

        onBlurNotifyUrl: function(event){
            this.screenshotInfo.notifyUrl = this.screenshotDetail.find("#notify-url").val();
        },

        onBlurInterval: function(event){
            this.screenshotInfo.interval = parseInt(this.screenshotDetail.find("#interval-time").val());
        },

        onClickNodeButton: function(event){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName !== "INPUT") return;
            if (eventTarget.checked){
                this.screenshotInfo.screenshot = true;
                this.$el.find(".open-ctn").slideDown(200);
            } else {
                this.screenshotInfo.screenshot = false;
                this.$el.find(".open-ctn").slideUp(200);
            }
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var LiveWatchView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/globalSetup/globalSetup.common.html'])({}));
            this.$el.find(".panel-ctn").html(_.template(template['tpl/loading.html'])({}));

            this.collection.on('get.vod.success', $.proxy(this.onGetVodSuccess, this));
            this.collection.on('get.vod.error', $.proxy(this.onGetVodError, this));
            this.collection.on('set.vod.success', $.proxy(this.onSubmitSuccess, this));
            this.collection.on('set.vod.error', $.proxy(this.onGetVodError, this));
            this.collection.on('get.bucket.success', $.proxy(this.initBucketDropList, this));
            this.collection.on('get.bucket.error', $.proxy(this.onGetBucketListError, this));
            this.collection.getVodSetup();
        },

        onSubmitSuccess: function(){
            this.$el.find(".error-ctn").html("");
            if (this.successPopup) $("#" + this.successPopup.modalId).remove();
            var options = {
                title    :"提示",
                body     : '<div class="alert alert-success"><strong>提交成功！</strong></div>',
                backdrop : true,
                type     : 1,
            }
            this.successPopup = new Modal(options);
        },

        onGetBucketListError: function(){
            var error = {message: "获取BUCKET列表失败！"};
            this.onGetVodError(error);
        },

        onGetVodError: function(error){
            var data = {
                type   : "alert-danger",
                message: "请求直播回看设置失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        initBucketDropList: function(list){
            var rootNode = this.vodDetail.find(".bucket-list"),
                tempList = [];

            this.defaultBucket = this.vodInfo.bucket || list[0]
            rootNode.find("#cur-value").html(this.defaultBucket);
            rootNode.find(".dropdown-menu").html("");

            if (list.length === 0){
                rootNode.find("#cur-value").html("无可用存储空间（Bucket）");
                rootNode.find(".dropdown-menu").hide();
                rootNode.find(".caret").hide();
                return;
            }

            if (_.indexOf(list, this.vodInfo.bucket) === -1){
                if (this.successPopup) $("#" + this.successPopup.modalId).remove();
                var options = {
                    title    :"警告",
                    body     : '<div class="alert alert-danger"><strong>您绑定的存储空间（Bucket）: ' + this.vodInfo.bucket + ' 已经删除，请重新绑定！</strong></div>',
                    backdrop : true,
                    type     : 1,
                }
                this.successPopup = new Modal(options);
            }

            if (this.vodInfo.bucket && _.indexOf(list, this.vodInfo.bucket) !== -1) {
                rootNode.find("#cur-value").html("已绑定：" + this.defaultBucket);
                rootNode.find(".dropdown-menu").hide();
                rootNode.find(".caret").hide();
                return;
            }

            _.each(list, function(el, index, ls){
                tempList.push({name:el, value:el})
            })

            Utility.initDropMenu(rootNode, tempList, function(value){
                this.vodInfo.bucket = value;
            }.bind(this));
        },

        onGetVodSuccess: function(data){
            this.allDomainData = data;
            this.signList = Object.keys(this.allDomainData);
            this.initSignDropMenu();
        },

        initSignDropMenu: function(){
            var signs = [], rootNode;
            _.each(this.signList, function(el, index, list){
                signs.push({name : el, value: el});
            })
            rootNode = this.$el.find(".domain-sign");

            if (!this.currentSign) this.currentSign = this.signList[0];
            rootNode.find("#cur-value").html(this.currentSign);
            this.onChangeSign(this.currentSign);

            Utility.initDropMenu(rootNode, signs, function(value){
                this.onChangeSign(value);
                this.currentSign = value;
            }.bind(this));
        },

        onChangeSign: function(sign){
            this.vodInfo = _.extend({}, this.allDomainData[sign]);
            this.vodDetail = $(_.template(template['tpl/globalSetup/globalSetup.livewatch.html'])({data: this.vodInfo}));

            if (!this.vodInfo.vod) this.vodDetail.find(".open-ctn").hide();
            if (!window.BUCKET_LIST){
                this.collection.getBucketList();
            } else {
                this.collection.trigger("get.bucket.success", window.BUCKET_LIST)
            }

            this.vodDetail.find(".togglebutton input").on("click", $.proxy(this.onClickNodeButton, this));
            this.vodDetail.find("#notify-url").on("blur", $.proxy(this.onBlurNotifyUrl, this));
            this.vodDetail.find(".submit-vod").on("click", $.proxy(this.onClickSubmitButton, this));

            this.$el.find(".panel-ctn").html(this.vodDetail.get(0))
        },

        onClickSubmitButton: function(){
            var error;
            if (this.vodDetail.find("#notify-url").val() !== "" && 
                this.vodInfo.vod && !Utility.isURL(this.vodDetail.find("#notify-url").val())){
                error = {message: "您开启了直播转点播，需要输入的正确通知URL！"};
                this.onGetVodError(error);
                return;
            }
            if (this.vodInfo.vod){
                var customDetail = this.vodDetail.find(".open-ctn"),
                    nodes = customDetail.find(".checkbox input:checked");
                if (nodes.length === 0){
                    var error = {message: "您开启了直播转点播，MP4和HLS必须至少选择一项。"}
                    this.onGetVodError(error)
                    return;
                }
                _.each(customDetail.find(".checkbox input"), function(el, index, list){
                    this.vodInfo[el.id] = el.checked;
                }.bind(this))
            }
            var temp = _.extend({}, this.vodInfo), args = {};
            if (!this.vodInfo.vod){
                temp.bucket = "";
                temp.notifyUrl = "";
                temp.vodhls = false;
                temp.vodmp4 = false;
            }
            if (!temp.bucket) temp.bucket = this.defaultBucket;
            args[this.currentSign] = temp;
            this.collection.setVodSetup(args)
        },

        onBlurNotifyUrl: function(event){
            this.vodInfo.notifyUrl = this.vodDetail.find("#notify-url").val();
        },

        onClickNodeButton: function(event){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName !== "INPUT") return;
            if (eventTarget.checked){
                this.$el.find(".open-ctn").slideDown(200);
                this.vodInfo.vod = true;
            } else {
                this.$el.find(".open-ctn").slideUp(200);
                this.vodInfo.vod = false;
            }
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var PublishView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/globalSetup/globalSetup.common.html'])({}));
            this.$el.find(".panel-ctn").html(_.template(template['tpl/loading.html'])({}));

            this.collection.on('get.publish.success', $.proxy(this.onGetPublishSuccess, this));
            this.collection.on('get.publish.error', $.proxy(this.onGetPublishError, this));
            this.collection.on('set.publish.success', $.proxy(this.onSubmitSuccess, this));
            this.collection.on('set.publish.error', $.proxy(this.onGetPublishError, this));
            this.collection.getPublishSetup();
        },

        onSubmitSuccess: function(){
            this.$el.find(".error-ctn").html("");
            if (this.successPopup) $("#" + this.successPopup.modalId).remove();
            var options = {
                title    :"提示",
                body     : '<div class="alert alert-success"><strong>提交成功！</strong></div>',
                backdrop : true,
                type     : 1,
            }
            this.successPopup = new Modal(options);
        },

        onGetPublishError: function(error){
            var data = {
                type   : "alert-danger",
                message: "请求发布设置信息失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        onGetPublishSuccess: function(data){
            this.allDomainData = data;
            this.signList = Object.keys(this.allDomainData.userPublishNodeMap);
            this.initSignDropMenu();
        },

        initSignDropMenu: function(){
            var signs = [], rootNode;
            _.each(this.signList, function(el, index, list){
                signs.push({name : el, value: el});
            })
            rootNode = this.$el.find(".domain-sign");

            if (!this.currentSign) this.currentSign = this.signList[0];
            rootNode.find("#cur-value").html(this.currentSign);
            this.onChangeSign(this.currentSign);

            Utility.initDropMenu(rootNode, signs, function(value){
                this.onChangeSign(value);
                this.currentSign = value;
            }.bind(this));
        },

        onChangeSign: function(sign){
            var data = {
                publishNodeList: this.allDomainData.publishNodeList,
                publishSetup: this.allDomainData.userPublishNodeMap[sign]
            }
            this.publicDetail = $(_.template(template['tpl/globalSetup/globalSetup.publish.html'])({data:data}));

            this.publishInfo = _.extend({}, this.allDomainData.userPublishNodeMap[sign]);

            if (data.publishSetup.publishType == 0) this.publicDetail.find(".custom-node-detail").hide();
            if (data.publishSetup.hlsFragmentType !== "HIGH") this.publicDetail.find(".delayed-ctn").hide();
            this.publicDetail.find(".delayed-ctn input").val(data.publishSetup.hlsFragment);
            this.publicDetail.find(".radio").on("click", $.proxy(this.onClickNodeButton, this));
            this.publicDetail.find(".submit-delayed").on("click", $.proxy(this.onClickSubmit, this));
            this.publicDetail.find(".delayed-ctn input").on("blur", $.proxy(this.onBlurDelayedTime, this));
            this.publicDetail.find(".delayed-ctn input").on("keyup", $.proxy(this.onDelayedTimeInputKeyup, this));
            this.$el.find(".panel-ctn").html(this.publicDetail.get(0))
            this.initHLSDropMenu();
        },

        onClickSubmit: function(){
            var valueDelay = this.publicDetail.find(".delayed-ctn input").val();
            if (this.publishInfo.hlsFragmentType == 'HIGH' &&
                valueDelay === ""){
                var error = {message: "您选择了高延时，必须填写延时时间"}
                this.onGetPublishError(error)
                return;
            }
            if ((this.publishInfo.hlsFragmentType == 'HIGH' && parseInt(valueDelay) > 20) ||
                (this.publishInfo.hlsFragmentType == 'HIGH' && parseInt(valueDelay) < 6) ){
                var error = {message: "您选择了高延时，高延时范围为6-20秒"}
                this.onGetPublishError(error)
                return;
            }
            if (this.publishInfo.publishType == 1){
                var customDetail = this.publicDetail.find(".custom-node-detail"),
                    nodes = customDetail.find(".checkbox input:checked");
                if (nodes.length === 0){
                    var error = {message: "您选择了自定义节点，必须至少选择一项。"}
                    this.onGetPublishError(error)
                    return;
                }
                this.publishInfo.publishNode = {};
                _.each(nodes, function(el, index, list){
                    this.publishInfo.publishNode[el.id] = true;
                }.bind(this))
            }
            var args = {};
            args[this.currentSign] = this.publishInfo;
            this.collection.setPublishSetup(args)
        },

        onDelayedTimeInputKeyup: function(event){
            var eventTarget = event.srcElement || event.target,
                value = $(eventTarget).val();
                value = value.replace(/[^\d]/g,'');
                if (parseInt(value) == 0) value = '';
                $(eventTarget).val(value);
        },

        onBlurDelayedTime: function(){
            this.publishInfo.hlsFragment = parseInt(this.publicDetail.find(".delayed-ctn input").val());
        },

        initHLSDropMenu: function(){
            var hlsDropOptions = [
                // {name: "默认", value: "DEFAULT"},
                {name: "低延时", value: "LOW"},
                {name: "高延时", value: "HIGH"}
            ];

            var defaultValue = _.find(hlsDropOptions, function(object){
                return object.value === this.publishInfo.hlsFragmentType
            }.bind(this));

            this.publicDetail.find(".hls-delay #cur-value").html(defaultValue.name)

            Utility.initDropMenu(this.publicDetail.find(".hls-delay"), hlsDropOptions, function(value){
                this.publishInfo.hlsFragmentType = value;
                if (value == "HIGH"){
                    this.publicDetail.find(".delayed-ctn").addClass("bounceIn animated");
                    this.publicDetail.find(".delayed-ctn").show();
                    this.publicDetail.find(".delayed-ctn input").val("6");
                    this.publicDetail.find(".delayed-ctn input").focus();
                } else {
                    this.publicDetail.find(".delayed-ctn").removeClass("bounceIn animated");
                    this.publicDetail.find(".delayed-ctn").hide();
                    this.publishInfo.hlsFragment = "";
                    this.publicDetail.find(".delayed-ctn input").val("");
                }
            }.bind(this));
        },

        onClickNodeButton: function(event){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName !== "INPUT") return;
            var id = $(eventTarget).attr("id");
            if (id == "typeRadios2"){
                this.$el.find(".custom-node-detail").slideDown(200);
            } else {
                this.$el.find(".custom-node-detail").slideUp(200);
            }
            this.publishInfo.publishType = parseInt($(eventTarget).val());
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var AddDomainBindView = Backbone.View.extend({
        events: {},

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/globalSetup/globalSetup.domainbind.add.html'])({data: options}));
            this.type = options.type;

            if (this.type === "PUSH"){
                var data = {
                    type   : "alert-info",
                    message: "域名必须填写协议头，目前推流域名暂只支持绑定一个域名。",
                    isClose: true
                }
                this.$el.find(".info-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
            }

            this.isCorrect = false;

            this.$el.find(".text-danger").hide();
            //this.$el.find("textarea").on("blur", $.proxy(this.onBlurDomainInput, this));
        },

        onBlurDomainInput: function(){
            var value = this.$el.find("textarea").val(), domainList;
            if (value.indexOf(",") > -1){
                if (this.type === "PUSH") {
                    this.$el.find(".text-danger").show();
                    this.isCorrect = false;
                }
                domainList = value.split(",");
                for (var i = 0; i < domainList.length; i++){
                    var prefix = domainList[i].substr(0, 4);
                    if ((this.type === "PUSH" || this.type === "PULL_CDN_RTMP") && prefix !== "rtmp"){
                        this.$el.find(".text-danger").show();
                        this.isCorrect = false;
                        return;
                    }
                    if (this.type === "PULL_CDN_HLS" && prefix !== "http"){
                        this.$el.find(".text-danger").show();
                        this.isCorrect = false;
                        return;
                    }
                    if (!Utility.isDomain(domainList[i])){
                        this.$el.find(".text-danger").show();
                        this.isCorrect = false;
                        return;
                    }
                }
                this.isCorrect = true;
            } else {
                var prefix = value.substr(0, 4);
                if ((this.type === "PUSH" || this.type === "PULL_CDN_RTMP") && prefix !== "rtmp"){
                    this.$el.find(".text-danger").show();
                    this.isCorrect = false;
                    return;
                }
                if (this.type === "PULL_CDN_HLS" && prefix !== "http"){
                    this.$el.find(".text-danger").show();
                    this.isCorrect = false;
                    return;
                }
                if (!Utility.isDomain(value)){
                    this.$el.find(".text-danger").show();
                    this.isCorrect = false;
                } else {
                    this.$el.find(".text-danger").hide();
                    this.isCorrect = true;
                }
            }
        },

        getArgs: function(){
            this.onBlurDomainInput()
            if (!this.isCorrect) return false;
            return this.$el.find("textarea").val();
        },

        render: function(target){
            this.$el.appendTo(target);
        }
    });

    var DomainbindView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/globalSetup/globalSetup.domainbind.html'])({}));
            this.$el.find(".panel-group-ctn").html(_.template(template['tpl/loading.html'])({}));

            this.domainType = "PUSH";

            this.collection.on("success", $.proxy(this.onGetDomainList, this));
            this.collection.on("error", $.proxy(this.onGetError, this));
            this.collection.on("delete.domain.success", $.proxy(this.onOperateDomainSuccess, this));
            this.collection.on("delete.domain.error", $.proxy(this.onGetError, this));
            this.collection.on("add.domain.success", $.proxy(this.onOperateDomainSuccess, this));
            this.collection.on("add.domain.error", $.proxy(this.onGetError, this));

            this.collection.queryDomain();
        },

        onOperateDomainSuccess: function(){
            this.collection.queryDomain();
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

        initDomainPanel: function(){
            this.panelGroup = $(_.template(template['tpl/globalSetup/globalSetup.domainbind.panel.html'])({}));
            this.$el.find(".panel-group-ctn").html(this.panelGroup.get(0));

            var pushNode = this.panelGroup.find('#headingPushRTMP a[href="#collapsePushRTMP"]'),
                pullRtmpNode = this.panelGroup.find('#headingPullRTMP a[href="#collapsePullRTMP"]'),
                pullHlsNode = this.panelGroup.find('#headingPullHLS a[href="#collapsePullHLS"]');

            if (this.domainType === "PUSH" && !this.panelGroup.find("#collapsePushRTMP").hasClass("in"))
                pushNode.click();
            else if (this.domainType === "PULL_CDN_RTMP" && !this.panelGroup.find("#collapsePullRTMP").hasClass("in"))
                pullRtmpNode.click();
            else if (this.domainType === "PULL_CDN_HLS" && !this.panelGroup.find("#collapsePullHLS").hasClass("in"))
                pullHlsNode.click();

            pushNode.find('span').html(this.allDomainData[this.currentSign].base['PUSH']);
            pullRtmpNode.find('span').html(this.allDomainData[this.currentSign].base['PULL_CDN_RTMP']);
            pullHlsNode.find('span').html(this.allDomainData[this.currentSign].base['PULL_CDN_HLS']);
            
            if (this.pushRTMPList.length === 0){
                var data = {message: "您还没有绑定RTMP推流域名..."}
                this.panelGroup.find("#collapsePushRTMP .panel-body").html(_.template(template['tpl/empty.html'])({data:data}));
            } else {
                this.table = $(_.template(template['tpl/globalSetup/globalSetup.domainbind.table.html'])({data: this.pushRTMPList}));
                this.panelGroup.find("#collapsePushRTMP .panel-body").html(this.table.get(0));
            }
            if (this.pullRTMPList.length === 0){
                var data = {message: "您还没有绑定RTMP拉流域名..."}
                this.panelGroup.find("#collapsePullRTMP .panel-body").html(_.template(template['tpl/empty.html'])({data:data}));
            } else {
                this.table = $(_.template(template['tpl/globalSetup/globalSetup.domainbind.table.html'])({data: this.pullRTMPList}));
                this.panelGroup.find("#collapsePullRTMP .panel-body").html(this.table.get(0));
            }
            if (this.pullHLSList.length === 0){
                var data = {message: "您还没有绑定HLS拉流域名..."}
                this.panelGroup.find("#collapsePullHLS .panel-body").html(_.template(template['tpl/empty.html'])({data:data}));
            } else {
                this.table = $(_.template(template['tpl/globalSetup/globalSetup.domainbind.table.html'])({data: this.pullHLSList}));
                this.panelGroup.find("#collapsePullHLS .panel-body").html(this.table.get(0));
            }
            this.panelGroup.find(".panel-body tbody .delete").on("click", $.proxy(this.onClickItemDelete, this));
            this.panelGroup.find(".panel-heading .create").on("click", $.proxy(this.onClickDomainBind, this));
        },

        onClickDomainBind: function(event){
            var eventTarget = event.srcElement || event.target,
                header = $(eventTarget).parent(),
                type = $(eventTarget).attr("type");
            if (!header.parent().find(".panel-collapse").hasClass("in"))
                header.find(".panel-title a").click();

            if (this.addDomainPopup) $("#" + this.addDomainPopup.modalId).remove();

            var addDomainView = new AddDomainBindView({
                collection: this.collection,
                domain    : header.find(".panel-title a").html(),
                type      : type
            });
            var options = {
                title:"绑定域名",
                body : addDomainView,
                backdrop : 'static',
                onOKCallback:  function(){
                    var options = addDomainView.getArgs();
                    if (!options) return;
                    var args = {
                        "domaintype": type,
                        "domainid"  : this.currentSign,
                        "domains"   : options
                    }
                    this.collection.addDomain(args);
                    this.addDomainPopup.$el.modal("hide");
                }.bind(this),
                onHiddenCallback: function(){}
            }
            this.addDomainPopup = new Modal(options);

            this.domainType = type;
        },

        onClickItemDelete: function(event){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName == "SPAN"){
                eventTarget = $(eventTarget).parent();
                id = eventTarget.attr("id");
            } else {
                id = $(eventTarget).attr("id");
            }
            this.deleteConfirm(id, function(){
                this.collection.deleteDomain(id)
            }.bind(this))
        },

        deleteConfirm: function(id, callback){
            var model, message;
            model = this.collection.get(id);
            message = "你确定要<span class='text-danger'>删除</span>域名<span class='text-primary separator'>" + model.get("userDomain") + "</span>吗？"

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

        onGetDomainList: function(data){
            this.allDomainData = data;
            this.signList = Object.keys(this.allDomainData);
            this.initSignDropMenu();
        },

        initSignDropMenu: function(){
            var signs = [], rootNode;
            _.each(this.signList, function(el, index, list){
                signs.push({name : el, value: el});
            })
            rootNode = this.$el.find(".domain-sign");

            if (!this.currentSign) this.currentSign = this.signList[0];
            rootNode.find("#cur-value").html(this.currentSign);
            this.onChangeSign(this.currentSign);

            Utility.initDropMenu(rootNode, signs, function(value){
                this.onChangeSign(value);
                this.currentSign = value;
            }.bind(this));
        },

        onChangeSign: function(value){
            this.collection.reset();
            _.each(this.allDomainData[value].domain, function(element, index, list){
                this.collection.push(new this.collection.model(element));
            }.bind(this))

            this.pushRTMPList = this.collection.filter(function(model) {
                return model.get("domainType") === 'PUSH';
            })
            this.pullRTMPList = this.collection.filter(function(model) {
                return model.get("domainType") === 'PULL_CDN_RTMP';
            })
            this.pullHLSList = this.collection.filter(function(model) {
                return model.get("domainType") === 'PULL_CDN_HLS';
            })
            this.initDomainPanel();
        },

        onGetError: function(error){
            var data = {
                type   : "alert-danger",
                message: "请求域名绑定信息失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var AddDomainSignView = Backbone.View.extend({
        events: {},

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/globalSetup/globalSetup.home.create.html'])({data: options}));
            this.isCorrect = false;
            this.$el.find(".text-danger").hide();
            if (options.noSign){
                var data = {
                    type   : "alert-info",
                    message: "您还没有域名标识，新建域名标识后方可继续使用。域名标识由字母和数字组成。新建后不允许修改。",
                    isClose: true
                }
                this.$el.find(".info-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
            }
            //this.$el.find("input").on("blur", $.proxy(this.onBlurDomainInput, this));
        },

        onBlurDomainInput: function(){
            var value = this.$el.find("input").val(), domainList,
                re = /^[0-9a-zA-Z]+$/;
            if (!re.test(value)){
                this.$el.find(".text-danger").show();
                this.isCorrect = false;
            } else {
                this.$el.find(".text-danger").hide();
                this.isCorrect = true;
            }
        },

        getArgs: function(){
            this.onBlurDomainInput();
            if (!this.isCorrect) return false;
            return this.$el.find("input").val();
        },

        render: function(target){
            this.$el.appendTo(target);
        }
    });

    var GlobalSetupView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/globalSetup/globalSetup.home.html'])({}));

            if (!window.NO_SIGN){
                this.domainbindView = new DomainbindView({collection: this.collection});
                this.$el.find('a[data-toggle="tab"]').on('shown.bs.tab', $.proxy(this.onShownTab, this));
            }
            this.collection.on("set.domainid.success", $.proxy(this.onOperateSignSuccess, this));
            this.collection.on("set.domainid.error", $.proxy(this.onGetError, this));
            this.$el.find('.create-sign').on('click', $.proxy(this.onClickCreateDomainSign, this));
        },

        onOperateSignSuccess: function(){
            this.addSignPopup.$el.modal("hide");
            window.NO_SIGN = false;
            if (!this.domainbindView){
                this.domainbindView = new DomainbindView({collection: this.collection});
                this.$el.find('a[data-toggle="tab"]').on('shown.bs.tab', $.proxy(this.onShownTab, this));
                this.domainbindView.render(this.$el.find("#domain-bind"));
            } else {
                this.collection.queryDomain();
            }

            if (this.publishView) this.collection.getPublishSetup();
            if (this.liveWatchView) this.collection.getVodSetup();
            if (this.liveScreenshotView) this.collection.getScreenshotSetup();

            setTimeout(function(){
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

        onGetError: function(error){
            if (this.addSignPopup) this.addSignPopup.$el.modal("hide");
            var message = "新建域名标识失败！";
            if (error.message) message = error.message;
            if (this.errorPopup) $("#" + this.errorPopup.modalId).remove();
            var options = {
                title    :"提示",
                body     : '<div class="alert alert-danger"><strong>' + message + '</strong></div>',
                backdrop : true,
                type     : 1,
                onHiddenCallback: function(){
                    if (window.NO_SIGN) 
                        this.$el.find('.create-sign').click();
                }.bind(this)
            }
            this.errorPopup = new Modal(options);
        },

        onClickCreateDomainSign: function(event){
            if(!window.NO_SIGN){
                var error = {message: "暂时只支持一个域名标识。"}
                this.onGetError(error)
            } else {
                if (this.addSignPopup) $("#" + this.addSignPopup.modalId).remove();

                var addDomainSignView = new AddDomainSignView({
                    collection: this.collection,
                    noSign    : window.NO_SIGN
                });
                var options = {
                    title:"新建域名标识",
                    body : addDomainSignView,
                    backdrop : 'static',
                    type     : 2,
                    onOKCallback:  function(){
                        var options = addDomainSignView.getArgs();
                        if (!options) return;
                        var args = {domainId : options};
                        this.collection.setDomainSign(args);
                        this.addSignPopup.$el.find(".modal-footer .btn-primary").attr("disabled", "disabled");
                        this.addSignPopup.$el.find(".modal-footer .btn-primary").html("新建中...");
                    }.bind(this),
                    onHiddenCallback: function(){}
                }
                this.addSignPopup = new Modal(options);
                if (window.NO_SIGN) {
                    this.addSignPopup.$el.find(".btn-default").remove();
                    this.addSignPopup.$el.find(".close").remove();
                }
            }
        },

        onShownTab: function (e) {
            var eventTarget = e.target; // newly activated tab
            var id = $(eventTarget).attr("data-target");
            relatedID = $(e.relatedTarget).attr("data-target");
            switch(id){
                case "#domain-bind":
                break;
                case "#publish-setup":
                    if (!this.publishView){
                        this.publishView = new PublishView({collection: this.collection});
                        this.publishView.render(this.$el.find("#publish-setup"));
                    }
                break;
                case "#live-watch-setup":
                    if (!this.liveWatchView){
                        this.liveWatchView = new LiveWatchView({collection: this.collection});
                        this.liveWatchView.render(this.$el.find("#live-watch-setup"));
                    }
                break;
                case "#live-screenshot-setup":
                    if (!this.liveScreenshotView){
                        this.liveScreenshotView = new LiveScreenshotView({collection: this.collection});
                        this.liveScreenshotView.render(this.$el.find("#live-screenshot-setup"));
                    }
                break;
                case "#security-setup":
                    if (!this.securitySetupView){
                        this.securitySetupView = new SecuritySetupView({collection: this.collection});
                        this.securitySetupView.render(this.$el.find("#security-setup"));
                    }
                break;
            }
        },

        render: function(target) {
            this.$el.appendTo(target);
            this.$el.addClass("fadeInLeft animated");

            if (window.NO_SIGN) 
                this.$el.find('.create-sign').click();
            else
                this.domainbindView.render(this.$el.find("#domain-bind"));
        }
    });

    return GlobalSetupView;
});