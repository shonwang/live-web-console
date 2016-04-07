define("home.view", ['require','exports', 'backbone', 'template', 'bootstrap', 'utility', "daterangepicker"], 
    function(require, exports, Backbone, template, bootstrap, Utility) {

    var HomeView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/home/home.html'])({}));

            this.$el.find(".running-status .running-data").html(_.template(template['tpl/loading.html'])());
            this.$el.find(".person-status .echart-ctn").html(_.template(template['tpl/loading.html'])());
            this.$el.find(".bandwidth-status .echart-ctn").html(_.template(template['tpl/loading.html'])());

            this.collection.on("livecountinfo.success", $.proxy(this.initRunningStatus, this));
            this.collection.on("livecountinfo.error", $.proxy(this.onGetError, this));
            this.collection.on("bandwidth.success", $.proxy(this.onGetBandwidthSuccess, this));
            this.collection.on("bandwidth.error", $.proxy(this.onGetBandwidthError, this));
            this.collection.on("count.success", $.proxy(this.onGetCountSuccess, this));
            this.collection.on("count.error", $.proxy(this.onGetCountError, this));

            this.startDate = moment().subtract('days', 29);
            this.endDate   = moment();

            var args = {
                start_time: new Date(this.startDate._d).format("yyyyMMdd") + "0000",
                end_time  : new Date(this.endDate._d).format("yyyyMMddhhmm") 
            }
            this.collection.getReportBandwidth(args);
            this.collection.getReportCount(args);
            this.collection.getReportLiveCountInfo();

            this.$el.find(".refresh").on("click", $.proxy(this.onClickRefresh, this));
            $(window).on('resize', $.proxy(this.onResizeChart, this));

            this.isRefresh = false;
        },

        initRunningStatus: function(data){
            this.isRefresh = false;
            this.allStatusData = data;
            data.storeKeys = Object.keys(data.store);
            _.each(data.storeKeys, function(el, index, list){
                data.store[el] = Utility.handlerToTB(data.store[el]);
            })
            this.runningStatus = $(_.template(template['tpl/home/home.info.html'])({data: data}));
            this.$el.find(".running-status .running-data").html(_.template(template['tpl/home/home.info.html'])({data: data}))
        },

        onGetBandwidthSuccess: function(data){
            var uploadMaxNode = this.$el.find(".bandwidth-status .bandwidth-upload"),
                downloadMaxNode = this.$el.find(".bandwidth-status .bandwidth-download");
            if (data.ups.length === 0 && data.downs.length === 0){
                var data = {message: "暂无数据，您先看点别的吧..."}
                this.$el.find(".bandwidth-status .echart-ctn").html(_.template(template['tpl/empty.html'])({data:data}));
                uploadMaxNode.html("暂无数据");
                downloadMaxNode.html("暂无数据");
                return;
            }
            this.allData = data;
            require(['echarts'], function(echarts){
                uploadMaxNode.html(Utility.handlerToBps(this.allData.maxUp));
                downloadMaxNode.html(Utility.handlerToBps(this.allData.maxDown));
                this.setBandwidthChart();
            }.bind(this));
        },

        setBandwidthChart: function(){
            var chartOption = {
                noDataLoadingOption: {
                    text : "暂无数据",
                    effect : "dynamicLine",
                    textStyle : {
                        fontSize : 20
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    formatter: function(params, ticket, callback) {
                        var obj = params[0], downObj = params[1];
                        var time = obj[1];
                        time = new Date(time).format("yyyy年MM月dd日 hh:mm");
                        var str_1 = obj[0] + "：" + Utility.handlerToBps(obj[2]), str_2 = "<br />";
                        if (downObj) str_2 = "<br />" + downObj[0] + "：" + Utility.handlerToBps(downObj[2])
                        var str = time + "<br />" + str_1 + str_2; 
                        return str
                    }.bind(this)
                },
                // color: ["#87cefa"],
                legend: {
                    data:['上传带宽', '下载带宽']
                },
                toolbox: {
                    show : false
                },
                dataZoom : {
                    show : true,
                    realtime : true,
                    start : 0,
                    end : 100,
                    showDetail: false
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        data : this.allData.times,
                        axisLabel: {
                            formatter: function(value){
                                return new Date(value).format("MM/dd hh:mm")
                            }
                        }
                    }
                ],
                yAxis : [{
                            type: 'value',
                            axisLabel: {
                                formatter: Utility.handlerToBps
                            }
                        }],
                series : [
                    {
                        name:'上传带宽',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: this.allData.ups
                    },
                    {
                        name:'下载带宽',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: this.allData.downs
                    }

                ],
                notMerger: true
            };

            if (this.bandwidthChart) this.bandwidthChart.dispose();
                
            this.bandwidthChart = echarts.init(this.$el.find(".bandwidth-status .echart-ctn")[0]);
            this.bandwidthChart.setOption(chartOption);
        },

        onGetCountSuccess: function(data){
            var userMaxNode = this.$el.find(".person-status .average"),
                userAvgNode = this.$el.find(".person-status .max");
                userMaxNode.html("暂无数据");
                userAvgNode.html("暂无数据");
            if (data.values.length === 0){
                var data = {message: "暂无数据，您先看点别的吧..."}
                this.$el.find(".echart-ctn").html(_.template(template['tpl/empty.html'])({data:data}));
                return;
            }
            this.allPersonData = data;
            require(['echarts'], function(echarts){
                this.setPersonEchart();
            }.bind(this));
        },

        setPersonEchart: function(){
            var chartOption = {
                noDataLoadingOption: {
                    text : "暂无数据",
                    effect : "dynamicLine",
                    textStyle : {
                        fontSize : 20
                    }
                },
                tooltip : {
                    trigger: 'axis',
                    formatter: function(params, ticket, callback) {
                        var obj = params[0], downObj = params[1];
                        var time = obj[1];
                        time = new Date(time).format("yyyy年MM月dd日 hh:mm");
                        var str = time + "<br />" + 
                                  obj[0] + "：" + obj[2] + "人"
                        return str
                    }.bind(this)
                },
                color: ["#87cefa"],
                legend: {
                    data:['在线人数']
                },
                toolbox: {
                    show : false
                },
                dataZoom : {
                    show : true,
                    realtime : true,
                    start : 0,
                    end : 100,
                    showDetail: false
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : true,
                        data : this.allPersonData.times,
                        axisLabel: {
                            formatter: function(value){
                                return new Date(value).format("MM/dd hh:mm")
                            }
                        }
                    }
                ],
                yAxis : [{
                            type: 'value',
                            axisLabel: {
                                formatter: function(value){return value + "人"}
                            }
                        }],
                series : [
                    {
                        name:'在线人数',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: this.allPersonData.values
                    }
                ],
                notMerger: true
            };

            if (this.personChart) this.personChart.dispose();
                
            this.personChart = echarts.init(this.$el.find(".person-status .echart-ctn")[0]);
            this.personChart.setOption(chartOption);
        },

        onResizeChart: function(){
            if (this.personChart&&this.$el.css('display') != "none"){
                this.personChart.resize();
                this.personChart.refresh();
            }
            if (this.bandwidthChart&&this.$el.css('display') != "none"){
                this.bandwidthChart.resize();
                this.bandwidthChart.refresh();
            }
        },

        onGetError: function(error){
            this.isRefresh = false;
            var data = {
                type   : "alert-danger",
                message: "请求运行概况信息失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        onGetBandwidthError: function(){
            var error = {message: "请求带宽数据失败！"};
            this.onGetError(error);
        },

        onGetCountError: function(){
            var error = {message: "请求在线人数失败！"};
            this.onGetError(error);   
        },

        onClickRefresh: function(){
            if (!this.isRefresh){
                this.$el.find(".running-status .running-data").html(_.template(template['tpl/loading.html'])());
                this.startDate = moment().subtract('days', 29);
                this.endDate   = moment();

                var args = {
                    start_time: new Date(this.startDate._d).format("yyyyMMdd") + "0000",
                    end_time  : new Date(this.endDate._d).format("yyyyMMddhhmm") 
                }
                this.collection.getReportBandwidth(args);
                this.collection.getReportCount(args);
                this.collection.getReportLiveCountInfo();
                this.isRefresh = true;
            }
        },

        render: function(target) {
            this.$el.appendTo(target);
            this.$el.addClass("fadeInLeft animated");
        }
    });

    return HomeView;
});