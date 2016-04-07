define("modal.view", ['require','exports', 'template', 'utility'], 
    function(require, exports, template, Utility) {

    var ModalView = Backbone.View.extend({
        events: {},

        initialize: function(option) {
            this.options = {
                title   : "提示",
                backdrop: true,
                keyboard: true,
                show    : true,
                type    : 2,
                body    : "hollo world",
                width   : null,
                height  : null,
                onOKCallback : function(){},
                onShownCallback : function(){},
                onHiddenCallback : function(){}
            }

            if (option)
                _.extend(this.options, option);

            this.$el = $(_.template(template['tpl/modal.html'])());
            this.modalId = Utility.randomStr(24);
            this.$el.attr("id", this.modalId);

            this.$el.find(".modal-title").html(this.options.title);
            if (typeof this.options.body === "string"){
                this.$el.find(".modal-body").html(this.options.body);
            } else {
                this.$el.find(".modal-body").html("");
                this.options.body.render(this.$el.find(".modal-body"));
            }

            this.$el.on('hidden.bs.modal', function (e) {
                this.options.onHiddenCallback&&this.options.onHiddenCallback();
            }.bind(this))

            this.$el.on('shown.bs.modal', function (e) {
                this.options.onShownCallback&&this.options.onShownCallback();
            }.bind(this))

            this.initSize();
            this.initFooterButton();
            this.render();

            var originOption = {
                backdrop: this.options.backdrop,
                keyboard: this.options.keyboard,
                show: this.options.show
            }
            this.$el.modal(originOption);
        },

        initSize: function(){
            if (this.options.width)
                this.$el.find(".modal-dialog").css("width", this.options.width + "px");
            if (this.options.height)
                this.$el.find(".modal-dialog").css("height", this.options.height + "px");
        },

        initFooterButton: function(){
            var okButton = this.$el.find(".modal-footer .btn-primary"),
                cancelButton = this.$el.find(".modal-footer .btn-default")
            if (this.options.type === 1){
                okButton.hide();
                cancelButton.html("关闭");
            } else if (this.options.type === 0){
                this.$el.find(".modal-footer .btn").hide();
            } else {
                okButton.on("click", $.proxy(this.onClickOK, this))
            }
        },

        onClickOK : function(){
            this.options.onOKCallback&&this.options.onOKCallback();
        },

        render: function() {
            this.$el.appendTo(document.body);
        }

    });

    return ModalView;
});