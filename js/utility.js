define("utility", ['require','exports', 'backbone', 'bootstrap'], 
    function(require, exports, Backbone, bootstrap) {

    var Utility = {
        dateFormat: function(){
            Date.prototype.format = function(fmt) {
              var o = {
                "M+" : this.getMonth()+1,                 //月份
                "d+" : this.getDate(),                    //日
                "h+" : this.getHours(),                   //小时
                "m+" : this.getMinutes(),                 //分
                "s+" : this.getSeconds(),                 //秒
                "q+" : Math.floor((this.getMonth()+3)/3), //季度
                "S"  : this.getMilliseconds()             //毫秒
              };
              if(/(y+)/.test(fmt))
                fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
              for(var k in o)
                if(new RegExp("("+ k +")").test(fmt))
                  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
              return fmt;
            };
        },

        checkIEVersion: function(){
            if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE6.0") { 
                return "IE 6.0"; 
            } else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE7.0") { 
                return "IE 7.0"; 
            } else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE8.0") { 
                return "IE 8.0"; 
            } else if(navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion .split(";")[1].replace(/[ ]/g,"")=="MSIE9.0") { 
                return "IE 9.0"; 
            } 
        },

        forIE8: function(){
            if (!Function.prototype.bind) { 
                Function.prototype.bind = function (oThis) { 
                    if (typeof this !== "function") { 
                        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable"); 
                    } 
                    var aArgs = Array.prototype.slice.call(arguments, 1), 
                        fToBind = this, 
                        fNOP = function () {}, 
                        fBound = function () { 
                            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis, 
                                    aArgs.concat(Array.prototype.slice.call(arguments))); 
                        }; 
                    fNOP.prototype = this.prototype; 
                    fBound.prototype = new fNOP(); 
                    return fBound; 
                }; 
            } 
        },

        timeFormat: function(input) {
            var input = input || 0, num = parseInt(input);
            if (input >= 60 && input < 60 * 60) {
                num = parseInt(input / 60)
                return num + '分';
            } else if (input >= 60 * 60 && input < 60 * 60 * 24) {
                num = parseInt(input / 60 / 60);
                return num + '时';
            } else if (input >= 60 * 60 * 24 && input < 60 * 60 * 24 * 30) {
                num = parseInt(input / 60 / 60 / 24);
                return num + '天';
            } else if (input >= 60 * 60 * 24 * 30 && input < 60 * 60 * 24 * 30 * 12) {
                num = parseInt(input / 60 / 60 / 24 / 30);
                return num + '月';
            } else if (input >= 60 * 60 * 24 * 30 * 12){
                num = parseInt(input / 60 / 60 / 24 / 30 / 12);
                return num + '年';
            } else {
                return num + '秒';
            }
        },

        //产品说必须按1000算，不按1024算
        handlerToBps: function(input) {
            var input = input || 0;
            var num = parseFloat(input);
            if (input >= 1000 && input < 1000 * 1000) {
                num = parseFloat(input / 1000).toFixed(2);
                return num + 'Kbps';
            } else if (input >= 1000 * 1000 ){ //&& input < 1000 * 1000 * 1000) {
                num = parseFloat(input / 1000 / 1000).toFixed(2)
                return num + 'Mbps';
            // } else if (input >= 1000 * 1000 * 1000 && input < 1000 * 1000 * 1000 * 1000) {
            //     num = parseFloat(input / 1000 / 1000 / 1000).toFixed(2);
            //     return num + 'Gbps';
            // } else if (input >= 1000 * 1000 * 1000 * 1000) {
            //     num = parseFloat(input / 1000 / 1000 / 1000 / 1000).toFixed(2)
            //     return num + 'Tbps';
            } else {
                return num.toFixed(2) + "bps";
            }
        },

        handlerToB: function(input) {
            var input = input || 0;
            var num = parseFloat(input);
            if (input >= 1024 && input < 1024 * 1024) {
                num = parseFloat(input / 1024).toFixed(2);
                return num + 'KB';
            } else if (input >= 1024 * 1024 ){ //&& input < 1024 * 1024 * 1024) {
                num = parseFloat(input / 1024 / 1024).toFixed(2)
                return num + 'MB';
            // } else if (input >= 1024 * 1024 * 1024 && input < 1024 * 1024 * 1024 * 1024) {
            //     num = parseFloat(input / 1024 / 1024 / 1024).toFixed(2);
            //     return num + 'Gbps';
            // } else if (input >= 1024 * 1024 * 1024 * 1024) {
            //     num = parseFloat(input / 1024 / 1024 / 1024 / 1024).toFixed(2)
            //     return num + 'Tbps';
            } else {
                return num.toFixed(2) + "B";
            }
        },

        handlerToTB: function(input) {
            var input = input || 0, negative = false;
            var num = parseFloat(input);
            if (num < 0){
                input = Math.abs(input);
                num = Math.abs(num);
                negative = true;
            }

            if (input >= 1024 && input < 1024 * 1024) {
                num = parseFloat(input / 1024).toFixed(2);
                return negative ? (0 - num) + 'KB': num + 'KB';
            } else if (input >= 1024 * 1024 && input < 1024 * 1024 * 1024) {
                num = parseFloat(input / 1024 / 1024).toFixed(2)
                return negative ? (0 - num) + 'MB': num + 'MB';
            } else if (input >= 1024 * 1024 * 1024 && input < 1024 * 1024 * 1024 * 1024) {
                num = parseFloat(input / 1024 / 1024 / 1024).toFixed(2);
                return negative ? (0 - num) + 'GB': num + 'GB';
            } else if (input >= 1024 * 1024 * 1024 * 1024) {
                num = parseFloat(input / 1024 / 1024 / 1024 / 1024).toFixed(2)
                return negative ? (0 - num) + 'TB': num + 'TB';
            } else {
                return negative ? (0 - num).toFixed(2) + 'B': num.toFixed(2) + "B";
            }
        },

        handlerToTB1000: function(input) {
            var input = input || 0, negative = false;
            var num = parseFloat(input);
            if (num < 0){
                input = Math.abs(input);
                num = Math.abs(num);
                negative = true;
            }

            if (input >= 1000 && input < 1000 * 1000) {
                num = parseFloat(input / 1000).toFixed(2);
                return negative ? (0 - num) + 'KB': num + 'KB';
            } else if (input >= 1000 * 1000 && input < 1000 * 1000 * 1000) {
                num = parseFloat(input / 1000 / 1000).toFixed(2)
                return negative ? (0 - num) + 'MB': num + 'MB';
            } else if (input >= 1000 * 1000 * 1000 && input < 1000 * 1000 * 1000 * 1000) {
                num = parseFloat(input / 1000 / 1000 / 1000).toFixed(2);
                return negative ? (0 - num) + 'GB': num + 'GB';
            } else if (input >= 1000 * 1000 * 1000 * 1000) {
                num = parseFloat(input / 1000 / 1000 / 1000 / 1000).toFixed(2)
                return negative ? (0 - num) + 'TB': num + 'TB';
            } else {
                return negative ? (0 - num).toFixed(2) + 'B': num.toFixed(2) + "B";
            }
        },

        isFileName: function(fileName){
            var re = /^[^\\\/:\*\?"<>|\s\0]+$/
            return re.test(fileName)
        },

        isDir: function(dirName){
            if (dirName == "") return false;
            var strRegex = /^\/[^\\:\*\?"<>|\s\0]*\/$/,
                result   = strRegex.test(dirName);
            if (result){
                var dirNames = dirName.split("/");
                for(var i = 0; i < dirNames.length; i++){
                    if (dirNames[i] === "" && i !== 0 && i !== dirNames.length -1) 
                        return false
                }
                return true;
            } else {
                return false;
            }
        },

        isDomain: function(str_url){
            if (str_url == "") return false;
            //if (str_url.substr(0, 4) !== "http") str_url = "http://" + str_url;
            var strRegex = /^(http|https|rtmp):\/\/([\w-]+(\.[\w-]+)+(:[0-9]{1,5})?([\w-.]*)?){1}$/;
            return strRegex.test(str_url)
        },

        isURL: function(str_url){
            var strRegex = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/
            return strRegex.test(str_url)
        },

        isAntileechDomain: function(url) {
            var reg = /^(([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)|\*{1}\.)+[a-zA-Z]{2,20}$/;
            return reg.test(url);
        },

        isIP: function(str_ip){
            var re =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
            return re.test(str_ip)
        },

        randomStr: function ( max ){
            var randomStr_str = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIGKLMNOPQRSTUVWXYZ';
            var rv = '';
            for(var i=0; i < max; i++){
                rv += randomStr_str[Math.floor(Math.random() * randomStr_str.length)];
            }
            return rv;
        },

        initDropMenu: function (rootNode, typeArray, callback){
            var dropRoot = rootNode.find(".dropdown-menu"),
                showNode = rootNode.find("#cur-value");
            dropRoot.html("");
            _.each(typeArray, function(element, index, list){
                var itemTpl = '<li value="' + element.value + '">' + 
                                  '<a href="javascript:void(0);" value="' + element.value + '">'+ element.name + '</a>' + 
                            '</li>',
                itemNode = $(itemTpl);
                itemNode.on("click", function(event){
                    var eventTarget = event.srcElement || event.target;
                        showNode.html($(eventTarget).html()),
                        value = $(eventTarget).attr("value");
                    callback&&callback(value)
                });
                itemNode.appendTo(dropRoot);
            });
        },

        queue : function(functions, scope) {
            (function next() {
                if (functions.length > 0) {
                    functions.shift().apply(scope || {}, [next].concat(Array.prototype.slice.call(arguments, 0)));
                }
            })();
        }
    };
    return Utility;
});