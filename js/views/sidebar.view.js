define("sidebar.view", ['require','exports', 'backbone', 'template', 'bootstrap', 'modal.view'], 
    function(require, exports, Backbone, template, bootstrap, Modal) {

    var SidebarView = Backbone.View.extend({
        events: {
            //"click li":"onClickItem"
        },

        initialize: function() {
            this.$el = $(_.template(template['tpl/sidebar.html'])());

            $(".ksc-nav .menu").on("click", $.proxy(this.onClickSideBarToggle, this));

            //this.initLogin();
        },

        setIndex: function(parentNode){
            var itemNodes = parentNode.children("li"), hash;

            itemNodes.on("click", function(event){
                var eventTarget = event.srcElement || event.target,
                id = $(eventTarget).attr('id'),
                $et = $(eventTarget);
                if (!id){
                    id = $et.parent("li").attr('id');
                    $et.parent("li").parent("ul").children("li").removeClass("active");
                    $et.parent("li").addClass("active");
                    $et = $et.parent("li");
                } else {
                    $et.parent("ul").children("li").removeClass("active");
                    $et.addClass("active");
                }
                $et.parent("ul").children("li").each(function(i, item){
                    if (!$(item).hasClass("active")){
                        $(item).find("ul").find("li").removeClass("active");
                        $(item).children("ul").slideUp(200);
                    }
                })
                if (!$(eventTarget).attr('id'))
                    $et.children("ul").slideToggle(200);
            });
            itemNodes.each(function(index, item){
                if ($(item).children("ul").get(0)){
                    var parent = $(item).children("ul");
                    parent.hide();
                    this.setIndex(parent);
                }
            }.bind(this))
        },

        select: function(id){
            this.$el.find("li").removeClass("active");
            var target = this.$el.find("li[id='" + id +"']")
            target.parents().show();
            target.parents("li").addClass("active");
            target.addClass("active");
        },

        onClickSideBarToggle: function(){
            var sidebarNode = $(".ksc-sidebar");
            if (sidebarNode.hasClass("sidebar-show")){
                sidebarNode.removeClass("sidebar-show")
            } else {
                sidebarNode.addClass("sidebar-show")
            }
        },

        initLogin: function(callback){
            var redirect = function (url) {
                var tpl = '<div id="loginTips" class="modal fade bs-example-modal-sm">' + 
                            '<div class="modal-dialog modal-sm">' + 
                                '<div class="modal-content" style="text-align:center;padding:5px">' + 
                                    '<div class="modal-header"><h3 class="modal-title">请登录</h3></div>' + 
                                    '<div class="modal-body">您还没有登录,请登陆后访问本页面.系统正在为您跳转到登录页面...</div>' + 
                                '</div>' + 
                            '</div>' + 
                          '</div>'
                var $loginTops = $(tpl),
                    url = url || 'http://www.ksyun.com/user/login',
                    options = {
                        backdrop:'static'
                    };
                $loginTops.modal(options);
                setTimeout(function(){
                    location.href = url + '?callback=' + encodeURIComponent(location.href);
                }, 2000);
            };

            var sendRequest = function (data) {
                var defaultParas = {
                    type: data.type,
                    url: data.url,
                    async: true,
                    timeout: 60000
                };

                defaultParas.data = data.queryData;

                defaultParas.beforeSend = function(xhr){
                    xhr.setRequestHeader("Accept","application/json, text/plain, */*");
                }
                
                defaultParas.success = function(res){
                    data.successCallBack&&data.successCallBack(res)
                }
                    
                defaultParas.error = function(response, msg){
                    data.errorCallBack&&data.errorCallBack(response, msg)
                }

                $.ajax(defaultParas);
            };

            var signData = {
                url            : BASE_URL + "live/config/domainid/get?" + new Date().valueOf(),
                type           : "GET",
                queryData      : {},
                successCallBack: function(res){
                    if (res&&res.result&&res.data&&res.data.length == 0) {
                        window.NO_SIGN = true;
                        if (window.location.hash !== "#/globalsetup")
                            window.location.hash = "#/globalsetup";
                        else
                            callback&&callback();
                    } else {
                        callback&&callback();
                    }
                }.bind(this),
                errorCallBack  : function(){}
            }

            var data = {
                url            : BASE_URL + "live/user/info?" + new Date().valueOf(),
                type           : "GET",
                queryData      : {},
                successCallBack: function(res){
                    if (res&&res.email) {
                        this.isLogin = true;
                        if (res.enabled){
                            sendRequest(signData);
                            this.isEnabled = true;                            
                        } else {
                            this.isEnabled = false;
                            this.popupAlert();
                        }
                        $(".ksc-nav .username").html(res.email);

                    } else {
                        this.isLogin = false;
                        redirect();
                    }
                }.bind(this),
                errorCallBack  : function(){
                    this.isLogin = false;
                    redirect();
                }
            }
            if (!this.isLogin)
                sendRequest(data);
            else if (!this.isEnabled)
                this.popupAlert();
            else
               callback&&callback(); 
        },

        popupAlert: function(){
            if (this.alertPopup) $("#" + this.alertPopup.modalId).remove();
            var options = {
                title:"警告",
                body : '<strong class="text-danger">您的账户尚未开通金山视频云直播服务，请联系您的商务负责人。正在为您跳转到控制台首页...</strong>',
                backdrop : 'static',
                type : 0
            }
            this.alertPopup = new Modal(options); 
            this.alertPopup.$el.find(".close").remove();
            setTimeout(function(){
                location.href = "http://www.ksyun.com/console/index";
            }, 2000);
        },

        render: function(target) {
            this.$el.appendTo(target);
            this.setIndex(this.$el);
        }

    });

    return SidebarView;
});