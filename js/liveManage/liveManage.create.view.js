define("liveManage.create.view", ['require','exports', 'backbone', 'template', 'bootstrap', 'qrcode', 'ckplayer', 'modal.view'], 
    function(require, exports, Backbone, template, bootstrap, qrcode, ckplayer, Modal) {

    var PCToolView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/liveManage/liveManage.pctool.html'])({}));
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var MobileUploadView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/liveManage/liveManage.mobileupload.html'])({}));
            this.initCodeImage();
        },

        initCodeImage: function(){
            this.$el.find('.ios-code').qrcode({width: 128,height: 128,text: "Coming soon!"});
            this.$el.find('.android-code').qrcode({
                width: 128,
                height: 128,
                text: "http://wendangimg.kssws.ks-cdn.com/VDN_APK/android_demo.apk"
            });
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var LocalCameraView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/liveManage/liveManage.create.camera.html'])({}));

            this.$el.find(".pushBtn2").on("click", $.proxy(this.onClickPush, this));
            this.isInitFlash = false
        },

        initLocalCamera: function(url, liveId){
            var urlPart = url.split("/");
            liveId = urlPart[urlPart.length - 1];
            urlPart.splice(urlPart.length - 1, 1)
            url = urlPart.join("/");
            liveId = liveId.replace(/\&/g, "|")

            require(["swfobject"],function(swfobject){
                this.isInitFlash = true;
                var flashvarsObj = { 
                    liveurl: url, 
                    liveId: liveId
                };
                swfobject.embedSWF("flash/WebcamVideoHelper.swf", "myContent", "100%", "250", "9.0.0", "flash/expressInstall.swf", flashvarsObj);
                //swfobject.embedSWF("flash/WebcamVideoHelper.swf", "myContent", "900", "600", "9.0.0", "flash/expressInstall.swf", flashvarsObj);
            })
        },

        onClickPush: function(){
            if (this.isInitFlash) return;
            var message = '<strong class="text-info">您还没有推流地址，请先生成推流地址。</strong>';

            if (this.pushNullPopup) $("#" + this.pushNullPopup.modalId).remove();
            var options = {
                title:"提示",
                body : message,
                backdrop : 'static',
                type: 1,
                onOKCallback:  function(){
                    this.pushNullPopup.$el.modal("hide");
                }.bind(this)
            }
            this.pushNullPopup = new Modal(options);  
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var LiveManageCreateView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.query      = options.query;
            this.$el = $(_.template(template['tpl/liveManage/liveManage.create.html'])({}));
            
            this.isCreating = false;

            this.mobileUploadView = new MobileUploadView({collection: this.collection});
            this.pcToolView = new PCToolView({collection: this.collection});
            this.localCameraView = new LocalCameraView({collection: this.collection});

            this.$el.find(".cancel").on("click", $.proxy(this.onClickCancel, this));
            this.$el.find(".create-address").on("click", $.proxy(this.onClickCreateLive, this));
            this.$el.find(".create-input").on("blur", $.proxy(this.onInputBlur, this));
            this.$el.find("#live-exprie").on("keyup", $.proxy(this.onExprieInputKeyup, this));
            //this.$el.find(".live-acl .checkbox").on("click", $.proxy(this.onClickSetPrivate, this));
            
            this.collection.on("live.info.success", $.proxy(this.onGetLiveInfoSuccess, this));
            this.collection.on("live.info.error", $.proxy(this.onGetLiveInfoError, this));
            this.collection.on("create.success", $.proxy(this.onCreateLive, this));
            this.collection.on("create.error", $.proxy(this.onGetLiveInfoError, this));
            this.collection.on('get.auth.success', $.proxy(this.onGetAuthSuccess, this));
            this.collection.on('get.auth.error', $.proxy(this.onGetLiveInfoError, this));

            this.update(this.query);
        },

        update: function(query){
            this.queryArgs = {
                "liveName": "",
                "expire"  : ""
                //"isPublic": false
            }
            this.$el.find(".table-address").hide();
            this.query = query;
            this.$el.show();
            if (this.query !== 'new'){
                this.$el.find(".ksc-title-2 small").html("/编辑直播")
                this.collection.getLiveById({id: this.query})
            } else {
                this.$el.find(".ksc-title-2 small").html("/新建直播")
                this.$el.find("#live-name").val("");
                this.$el.find("#live-exprie").val("");
                this.$el.find(".expire-ctn").removeClass("bounceIn animated");
                //this.$el.find(".expire-ctn").hide();
                //this.$el.find(".live-acl input").get(0).checked = true;
                this.collection.getAuthList()
            }
            this.$el.find(".local-camera-ctn").remove();
            this.localCameraView = new LocalCameraView({collection: this.collection});
            this.localCameraView.render(this.$el.find("#local-camera"))
        },

        onGetAuthSuccess: function(data){
            this.auth = data.auth;
            if (data.auth){
                this.$el.find(".expire-ctn").show();
                this.$el.find("#live-exprie").val(data.defaultExpire);
            } else {
                this.$el.find(".expire-ctn").hide();
                this.$el.find("#live-exprie").val("");
            }
        },

        onClickCreateLive: function(){
            if (this.isCreating) return;
            //var isPublic = !this.$el.find(".live-acl input").get(0).checked,
              var liveName = this.$el.find("#live-name").val(),
                  exprie   = this.$el.find("#live-exprie").val();
            var data = {
                type   : "alert-danger",
                message: "开启了鉴权，您必须填写过期时间！",
                isClose: true
            }
            if (!liveName) {
                this.$el.find("#live-name").focus();
                return;
            }
            if (this.auth&&!exprie){
                this.$el.find("#live-exprie").focus();
                this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
            } else {
                this.$el.find(".table-address").hide();
                this.isCreating = true;
                this.queryArgs.liveName = liveName;
                this.queryArgs.expire = parseInt(exprie);
                this.collection.createLive(this.queryArgs)
            }
        },

        onClickSetPrivate: function(event){
            var eventTarget = event.srcElement || event.target;
            if (eventTarget.tagName !== "INPUT") return;
            if (eventTarget.checked){
                this.$el.find(".expire-ctn").addClass("bounceIn animated");
                this.$el.find(".expire-ctn").show();
            } else {
                this.$el.find(".expire-ctn").removeClass("bounceIn animated");
                this.$el.find(".expire-ctn").hide();
                // this.queryArgs.expire = "";
                // this.$el.find(".expire-ctn input").val("");
            }
        },

        onInputBlur: function(event){
            var eventTarget = event.srcElement || event.target;

            switch(eventTarget.id){
                case "live-name":
                    this.queryArgs.liveName = $(eventTarget).val();
                break;
                case "live-exprie":
                    this.queryArgs.expire = $(eventTarget).val();
                break;
            }
        },

        onExprieInputKeyup: function(event){
            var eventTarget = event.srcElement || event.target,
                value = $(eventTarget).val();
                value = value.replace(/[^\d]/g,'');
                if (parseInt(value) == 0) value = '';
                $(eventTarget).val(value);
        },

        onCreateLive: function(data){
            this.$el.find(".error-ctn").html("");
            this.isCreating = false;
            this.streamAddressTable = $(_.template(template['tpl/liveManage/liveManage.address.table.html'])({data:data}));
            this.$el.find(".table-address-ctn").html(this.streamAddressTable.get(0));
            this.queryArgs.id = data.id;
            this.streamAddressTable.find("tbody .play").on("click", $.proxy(this.onClickItemPlay, this));
            this.streamAddressTable.find("tbody .push").on("click", $.proxy(this.onClickItemPush, this));
            this.localCameraView.$el.find(".pushBtn2").off();
            this.localCameraView.$el.find(".pushBtn2").on("click", function(){
                this.streamAddressTable.find("tbody .push").click();
            }.bind(this));

            var contentFn = function(){
                var address = $(this).attr("url"),
                    node = $('<div class="img-thumbnail"></div>');
                node.qrcode({width: 256,height: 256,text: decodeURI(address)});
                //node.qrcode({width: 256,height: 256,text: address});
                return node.get(0);
            };

            this.streamAddressTable.find("tbody .qrcode").popover({
                animation  : false,
                "placement": "right", 
                "html"     : true,
                "content"  : contentFn, 
                "trigger"  : "hover"
            })

            this.$el.find(".table-address").show()//.slideDown(500);
        },

        onClickItemPush: function(event){
            var eventTarget = event.srcElement || event.target, url, liveId;
            if (eventTarget.tagName == "SPAN"){
                eventTarget = $(eventTarget).parent();
                url = eventTarget.attr("url");
                liveId = eventTarget.attr("liveid");
            } else {
                url = $(eventTarget).attr("url");
                liveId = $(eventTarget).attr("liveid");
            }
            this.$el.find('.local-camera-tab').click();

            var flashCtn = this.$el.find('.local-camera-ctn');
            if (flashCtn.find("object").get(0)){
                flashCtn.find('object').remove();
                flashCtn.html('<div id="myContent"></div>')
            }            
            this.localCameraView.initLocalCamera(url, liveId);
        },

        onClickItemPlay: function(event){
            var eventTarget = event.srcElement || event.target, url;
            if (eventTarget.tagName == "SPAN"){
                eventTarget = $(eventTarget).parent();
                url = eventTarget.attr("url");
            } else {
                url = $(eventTarget).attr("url");
            }
            this.initFlashPlayer(url);
        },

        onGetLiveInfoSuccess: function(data){
            this.queryArgs.liveName = data.liveName;
            this.queryArgs.expire = data.expire;
            //this.queryArgs.isPublic = data.isPublic;
            this.queryArgs.id = data.id;
            this.auth = data.auth;
            this.$el.find("#live-name").val(data.liveName);
            if (this.auth){
                this.$el.find("#live-exprie").val(data.expire);
                this.$el.find(".expire-ctn").addClass("bounceIn animated");
                this.$el.find(".expire-ctn").show();
            } else {
                this.$el.find(".expire-ctn").removeClass("bounceIn animated");
                this.$el.find(".expire-ctn").hide();
                this.$el.find("#live-exprie").val("");
            }
            //this.$el.find(".live-acl input").get(0).checked = !data.isPublic;

            this.onCreateLive(data)
        },

        onGetLiveInfoError: function(error){
            this.isCreating = false;
            var data = {
                type   : "alert-danger",
                message: "无法获取直播信息！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
            this.$el.find(".table-address").show();
        },

        initFlashPlayer: function(url){
            var prefix = url.substr(0, 4), flashvars;
            // 播放器参数说明地址：http://www.ckplayer.com/tool/help/29.htm
            if (prefix == "http"){
                flashvars = {
                   f : BASE_URL + 'flash/m3u8.swf',
                   a : url || 'http://movie.ks.js.cn/flv/other/1_0.flv',
                   c : 0,
                   s : 4,
                   lv: 1//注意，是否锁定进度栏  0：不锁定，1：锁定。如果是直播，需设置lv:1 
                }  
            } else if (prefix == "rtmp"){
                flashvars = {
                    f : url || 'http://movie.ks.js.cn/flv/other/1_0.flv',
                    p : 1,
                    c : 0, //调用配置方式  =0：调用ckplayer.js
                    lv: 1
                }
            }
            var params = {
                bgcolor:'#FFF',
                allowFullScreen:true,
                allowScriptAccess:'always',
                wmode:'transparent'
            };
            CKobject.embedSWF('flash/ckplayer.swf', 'ckplayer-ctn', 'ckplayer_a1', '100%', '300', flashvars, params); 
        },

        onClickCancel: function(){
            if (CKobject.getObjectById('ckplayer_a1'))
                this.$el.find(".player-ctn object").remove();
            location.hash = "#/livemanage";
        },

        hide: function(){
            this.$el.hide();
            if (CKobject.getObjectById('ckplayer_a1'))
                this.$el.find(".player-ctn object").remove();
        },

        render: function(target) {
            this.mobileUploadView.render(this.$el.find("#mobile-upload"));
            this.pcToolView.render(this.$el.find("#pc-tools"));
            this.localCameraView.render(this.$el.find("#local-camera"))
            this.$el.appendTo(target);
            this.$el.addClass("fadeInLeft animated");
        }
    });

    return LiveManageCreateView;
});