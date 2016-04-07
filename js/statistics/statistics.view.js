define("statistics.view", ['require','exports', 'backbone', 'template', 'bootstrap', 'utility', "daterangepicker"], 
    function(require, exports, Backbone, template, bootstrap, Utility) {

    var BusinessStatisticsView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;

            this.startDate = options.startSingleDate;
            this.endDate   = options.endSingleDate;
            this.activeType= options.activeType;

            this.$el = $(_.template(template['tpl/statistics/statistics.businessctn.html'])({}));
            this.$el.find(".table-ctn").html(_.template(template['tpl/loading.html'])({}));

            this.collection.on("business.success", $.proxy(this.onGetBusinessSuccess, this));
            this.collection.on("business.error", $.proxy(this.onGetError, this));
        },

        onGetBusinessSuccess: function(data){
            this.$el.find(".error-ctn").html("");
            if (data&&Object.keys(data).length === 0){
                var data = {message: "暂无数据，您先看点别的吧..."}
                this.$el.find(".table-ctn").html(_.template(template['tpl/empty.html'])({data:data}));
                return;
            }
            this.allData = [];

            _.each(data.keys, function(el, index, list){
                var size = data.size[index];
                if (this.activeType === 1) size = size + "个";
                if (this.activeType === 2) size = Utility.handlerToTB(size);
                if (this.activeType === 3) size = Utility.handlerToBps(size);
                this.allData.push({keys: el, size: size})
            }.bind(this))

            this.$el.find(".table-ctn").html(_.template(template['tpl/statistics/statistics.table.html'])({data:this.allData}));
        },

        onGetError: function(error){
            var data = {
                type   : "alert-danger",
                message: "请求业务分析数据失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        updateOpt: function(options){
            this.startDate = options.startDate;
            this.endDate   = options.endDate;
            this.activeType= options.activeType;
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var UserStatisticsView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/statistics/statistics.tabcontent.html'])({}));
            this.$el.find(".chart-line").html(_.template(template['tpl/loading.html'])({}));
            this.$el.find(".chart-pie").hide();
            // this.$el.find(".content-panel").show();
            //this.$el.find(".usernum-header").show();

            this.startDate = options.startDate;
            this.endDate   = options.endDate;

            this.collection.on("count.success", $.proxy(this.onGetCountSuccess, this));
            this.collection.on("count.error", $.proxy(this.onGetError, this));

            $(window).on('resize', $.proxy(this.onResizeChart, this));
        },

        onGetError: function(error){
            var data = {
                type   : "alert-danger",
                message: "请求用户数统计数据失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        onGetCountSuccess: function(data){
            this.$el.find(".error-ctn").html("");
            var userMaxNode = this.$el.find(".usernum-header .usernum-max"),
                userAvgNode = this.$el.find(".usernum-header .usernum-avg");
                userMaxNode.html("暂无数据");
                userAvgNode.html("暂无数据");
            if (data.values.length === 0){
                if (this.chart) this.chart.dispose();
                var data = {message: "暂无数据，您先看点别的吧..."}
                this.$el.find(".chart-line").html(_.template(template['tpl/empty.html'])({data:data}));
                return;
            }
            this.allData = data;
            require(['echarts'], function(echarts){
                this.setEchart();
            }.bind(this));
        },

        setEchart: function(){
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
                                formatter: function(value){return value + "人"}
                            }
                        }],
                series : [
                    {
                        name:'在线人数',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: this.allData.values
                    }
                ],
                notMerger: true
            };

            if (this.chart) this.chart.dispose();
                
            this.chart = echarts.init(this.$el.find(".chart-line")[0]);
            this.chart.setOption(chartOption);
        },

        onResizeChart: function(){
            if (this.chart&&
                $(".statistics-pannel").css('display') != "none"&&
                this.$el.parent().css('display') != "none"){
                this.chart.resize();
                this.chart.refresh();
            }
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var StorageStatisticsView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"getReportStore
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/statistics/statistics.tabcontent.html'])({}));
            this.$el.find(".storage-header").show();
            this.$el.find(".chart-line").html(_.template(template['tpl/loading.html'])({}));
            this.$el.find(".chart-pie").hide();

            this.startDate = options.startDate;
            this.endDate   = options.endDate;
            this.bucket    = options.bucket;

            this.collection.on("store.success", $.proxy(this.onGetStoreSuccess, this));
            this.collection.on("store.error", $.proxy(this.onGetError, this));

            $(window).on('resize', $.proxy(this.onResizeChart, this));
        },

        onGetError: function(error){
            var data = {
                type   : "alert-danger",
                message: "请求存储容量数据失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        onGetStoreSuccess: function(res){
            var data = res.detail, total = res.total;
            this.$el.find(".error-ctn").html("");
            var totalNode = this.$el.find(".storage-header .storage-total"),
                incrementNode = this.$el.find(".storage-header .storage-increment"),
                deleteNode = this.$el.find(".storage-header .storage-delete");
            if (data.length === 0){
                var data = {message: "暂无数据，您先看点别的吧..."}
                if (this.chart) this.chart.dispose();
                this.$el.find(".chart-line").html(_.template(template['tpl/empty.html'])({data:data}));
                totalNode.html("暂无数据");
                incrementNode.html("暂无数据");
                deleteNode.html("暂无数据");
                return;
            }
            this.times = [];
            this.all   = [];
            this.add   = [];
            this.del   = [];
            _.each(data, function(el, index, list){
                this.times.push(el.key);
                this.all.push(el.value.all);
                this.add.push(el.value.add);
                this.del.push(el.value.del);
            }.bind(this))

            // var totalSize = Utility.handlerToTB(this.all[this.all.length -1]),
            //     incrementSize = Utility.handlerToTB(this.add[this.add.length -1]),
            //     deleteSize = Utility.handlerToTB(this.del[this.del.length -1])
            
            var totalSize = Utility.handlerToTB(total.totalAll),
                incrementSize = Utility.handlerToTB(total.totalAdd),
                deleteSize = Utility.handlerToTB(total.totalDel)

            require(['echarts'], function(echarts){
                totalNode.html(totalSize);
                incrementNode.html(incrementSize);
                deleteNode.html(deleteSize);
                this.setEchart();
            }.bind(this));
        },

        setEchart: function(){
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
                        time = new Date(time).format("yyyy年MM月dd日");
                        var str_1 = obj[0] + "：" + Utility.handlerToTB(obj[2]), str_2 = "", str_3 = "";
                        if (downObj) str_2 = "<br />" + downObj[0] + "：" + Utility.handlerToTB(downObj[2]);
                        if (params[2]) str_3 = "<br />" + params[2][0] + "：" + Utility.handlerToTB(params[2][2])
                        var str = time + "<br />" + str_1 + str_2 + str_3
                        return str
                    }.bind(this)
                },
                // color: ["#87cefa"],
                legend: {
                    data:['总量', '增量', '删除量']
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
                        data : this.times,
                        axisLabel: {
                            formatter: function(value){
                                return new Date(value).format("MM/dd")
                            }
                        }
                    }
                ],
                yAxis : [{
                            type: 'value',
                            axisLabel: {
                                formatter: Utility.handlerToTB
                            }
                        }],
                series : [
                    {
                        name:'总量',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: this.all
                    },
                    {
                        name:'增量',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: this.add
                    },
                    {
                        name:'删除量',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: this.del
                    }

                ],
                notMerger: true
            };

            if (this.chart) this.chart.dispose();
                
            this.chart = echarts.init(this.$el.find(".chart-line")[0]);
            this.chart.setOption(chartOption);
        },

        onResizeChart: function(){
            if (this.chart&&
                $(".statistics-pannel").css('display') != "none"&&
                this.$el.parent().css('display') != "none"){
                this.chart.resize();
                this.chart.refresh();
            }
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var BandwidthStatisticsView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/statistics/statistics.tabcontent.html'])({}));
            this.$el.find(".bandwidth-header").show();
            this.$el.find(".chart-pie").hide();
            this.$el.find(".chart-line").html(_.template(template['tpl/loading.html'])({}));

            this.startDate = options.startDate;
            this.endDate   = options.endDate;

            this.collection.on("bandwidth.success", $.proxy(this.onGetBandwidthSuccess, this));
            this.collection.on("bandwidth.error", $.proxy(this.onGetError, this));

            $(window).on('resize', $.proxy(this.onResizeChart, this));
        },

        onGetError: function(error){
            var data = {
                type   : "alert-danger",
                message: "请求带宽数据失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        onGetBandwidthSuccess: function(data){
            this.$el.find(".error-ctn").html("");
            var uploadMaxNode = this.$el.find(".bandwidth-header .bandwidth-upload"),
                downloadMaxNode = this.$el.find(".bandwidth-header .bandwidth-download"),
                uploadTimeNode = this.$el.find(".bandwidth-header .upload-time-ctn"),
                downloadTimeNode = this.$el.find(".bandwidth-header .download-time-ctn");

            if (data.ups.length === 0 && data.downs.length === 0){
                var data = {message: "暂无数据，您先看点别的吧..."}
                if (this.chart) this.chart.dispose();
                this.$el.find(".chart-line").html(_.template(template['tpl/empty.html'])({data:data}));
                uploadMaxNode.html("暂无数据");
                downloadMaxNode.html("暂无数据");
                return;
            }
            this.allData = data;
            require(['echarts'], function(echarts){
                uploadMaxNode.html(Utility.handlerToBps(this.allData.maxUp));
                downloadMaxNode.html(Utility.handlerToBps(this.allData.maxDown));
                if (this.allData.maxUp !== 0){
                    uploadTimeNode.find(".bandwidth-upload-time").html(new Date(this.allData.maxUpTime).format("yyyy/MM/dd hh:mm"));
                    uploadTimeNode.show();
                } else {
                    uploadTimeNode.hide();
                }

                if (this.allData.maxDown !== 0){
                    downloadTimeNode.find(".bandwidth-download-time").html(new Date(this.allData.maxDownTime).format("yyyy/MM/dd hh:mm"));
                    downloadTimeNode.show();
                } else{
                    downloadTimeNode.hide();
                }
                this.setEchart();
            }.bind(this));
        },

        setEchart: function(){
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

            if (this.chart) this.chart.dispose();
                
            this.chart = echarts.init(this.$el.find(".chart-line")[0]);
            this.chart.setOption(chartOption);
        },

        onResizeChart: function(){
            if (this.chart&&
                $(".statistics-pannel").css('display') != "none"&&
                this.$el.parent().css('display') != "none"){
                this.chart.resize();
                this.chart.refresh();
            }
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var FlowStatisticsView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/statistics/statistics.tabcontent.html'])({}));
            this.$el.find(".flow-header").show();
            this.$el.find(".chart-pie").hide();
            this.$el.find(".chart-line").html(_.template(template['tpl/loading.html'])({}));

            this.startDate = options.startDate;
            this.endDate   = options.endDate;

            this.collection.on("flow.success", $.proxy(this.onGetFlowSuccess, this));
            this.collection.on("flow.error", $.proxy(this.onGetError, this));

            $(window).on('resize', $.proxy(this.onResizeChart, this));
        },

        onGetError: function(error){
            var data = {
                type   : "alert-danger",
                message: "请求流量数据失败！",
                isClose: true
            }

            if (error&&error.message) data.message = error.message;
            if (error&&typeof error == 'string') data.message = error;

            this.$el.find(".error-ctn").html(_.template(template['tpl/alert.message.html'])({data: data}));
        },

        onGetFlowSuccess: function(data){
            this.$el.find(".error-ctn").html("");
            var uploadNode = this.$el.find(".flow-header .flow-upload"),
                downloadNode = this.$el.find(".flow-header .flow-download");
            if (data.ups.length === 0 && data.downs.length === 0){
                if (this.chart) this.chart.dispose();
                var data = {message: "暂无数据，您先看点别的吧..."}
                this.$el.find(".chart-line").html(_.template(template['tpl/empty.html'])({data:data}));
                uploadNode.html("暂无数据");
                downloadNode.html("暂无数据");
                return;
            }
            this.allData = data;
            require(['echarts'], function(echarts){
                uploadNode.html(Utility.handlerToTB1000(this.allData.sumUp));
                downloadNode.html(Utility.handlerToTB1000(this.allData.sumDown));
                this.setEchart();
            }.bind(this));
        },

        setEchart: function(){
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
                        time = new Date(time).format("yyyy年MM月dd日");
                        var str_1 = obj[0] + "：" + Utility.handlerToTB1000(obj[2]), str_2 = "<br />";
                        if (downObj) str_2 = "<br />" + downObj[0] + "：" + Utility.handlerToTB1000(downObj[2]);
                        var str = time + "<br />" + str_1 + str_2
                        return str
                    }.bind(this)
                },
                // color: ["#87cefa"],
                legend: {
                    data:['上传流量', '下载流量']
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
                                return new Date(value).format("MM/dd")
                            }
                        }
                    }
                ],
                yAxis : [{
                            type: 'value',
                            axisLabel: {
                                formatter: Utility.handlerToTB1000
                            }
                        },
                        {
                            type: 'value',
                            axisLabel: {
                                formatter: Utility.handlerToTB1000
                            }
                        }],
                series : [
                    {
                        name:'上传流量',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: this.allData.ups
                    },
                    {
                        name:'下载流量',
                        type:'line',
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data: this.allData.downs
                    }

                ],
                notMerger: true
            };

            if (this.chart) this.chart.dispose();
                
            this.chart = echarts.init(this.$el.find(".chart-line")[0]);
            this.chart.setOption(chartOption);
        },

        onResizeChart: function(){
            if (this.chart&&
                $(".statistics-pannel").css('display') != "none"&&
                this.$el.parent().css('display') != "none"){
                this.chart.resize();
                this.chart.refresh();
            }
        },

        render: function(target) {
            this.$el.appendTo(target);
        }
    });

    var StatisticsView = Backbone.View.extend({
        events: {
            //"click .search-btn":"onClickSearch"
        },

        initialize: function(options) {
            this.collection = options.collection;
            this.$el = $(_.template(template['tpl/statistics/statistics.home.html'])({}));

            this.calendarOption = {
                parentEl: $(".ksc-module"),
                startDate: moment().subtract('days', 6),
                endDate: moment(),
                // timePicker: true,
                // timePickerIncrement: 30,
                // singleDatePicker: true,
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

            this.subViewOpt = {
                collection     : this.collection,
                startDate      : this.calendarOption.startDate,
                endDate        : this.calendarOption.endDate,
                startSingleDate: this.calendarOption.startDate,
                endSingleDate  : this.calendarOption.endDate,
                bucket         : "all",
                activeType     : 1
            }

            this.initCalendar();
            this.initCalendarSingle();
            this.initDropMenu();

            this.isBucketShow = false;
            this.currentTab = "#flow-statistics";

            this.flowView = new FlowStatisticsView(this.subViewOpt);

            this.$el.find('a[data-toggle="tab"]').on('shown.bs.tab', $.proxy(this.onShownTab, this));
            this.$el.find(".date-group button").on("click", $.proxy(this.onClickSpecificDate, this));
            this.$el.find(".btn-apply").on("click", $.proxy(this.onClickAppplyButton, this));

            this.collection.on('report.bucket.success', $.proxy(this.initBucketDropList, this));
            this.collection.on('report.bucket.error', $.proxy(this.onGetBucketListError, this));

            this.onClickAppplyButton();
        },

        update: function(){
            this.$el.show();
            switch(this.currentTab){
                case "#flow-statistics":
                    this.flowView.onResizeChart();
                break;
                case "#usernum-statistics":
                    this.userView.onResizeChart();
                break;
                case "#bandwidth-statistics":
                    this.bandwidth.onResizeChart();
                break;
                case "#storage-statistics":
                    this.storage.onResizeChart();
                    this.collection.getBucketList();
                break;
                case "#business-analysis":
                break;
            }
        },

        onClickAppplyButton: function(){
            switch(this.currentTab){
                case "#flow-statistics":
                    var args = {
                        start_time: new Date(this.subViewOpt.startDate._d).format("yyyyMMdd"),
                        end_time  : new Date(this.subViewOpt.endDate._d).format("yyyyMMdd") 
                    }
                    this.collection.getReportFlow(args);
                break;
                case "#usernum-statistics":
                    var args = {
                        start_time: new Date(this.subViewOpt.startDate._d).format("yyyyMMdd") + "0000",
                        end_time  : new Date(this.subViewOpt.endDate._d).format("yyyyMMddhhmm") 
                    }
                    this.collection.getReportCount(args);
                break;
                case "#bandwidth-statistics":
                    var args = {
                        start_time: new Date(this.subViewOpt.startDate._d).format("yyyyMMdd") + "0000",
                        end_time  : new Date(this.subViewOpt.endDate._d).format("yyyyMMddhhmm") 
                    }
                    this.collection.getReportBandwidth(args);
                break;
                case "#storage-statistics":
                    var endDate = new Date(this.subViewOpt.endDate._d).format("yyyyMMdd"),
                        nowDate = new Date().format("yyyyMMdd")
                    if (parseInt(endDate) >= parseInt(nowDate))
                        endDate = new Date(new Date().valueOf() - 1000 * 60 * 60 * 24).format("yyyyMMdd");
                    var args = {
                        start_time: new Date(this.subViewOpt.startDate._d).format("yyyyMMdd"),
                        end_time  : endDate,
                        bucket    : this.subViewOpt.bucket 
                    }
                    this.collection.getReportStore(args);
                break;
                case "#business-analysis":
                    var args = {
                        time       : new Date(this.subViewOpt.endSingleDate._d).format("yyyyMMdd"),
                        activeType : this.subViewOpt.activeType
                    }
                    this.collection.getReportBusiness(args);
                break;
            }
        },

        onShownTab: function (e) {
            var eventTarget = e.target; // newly activated tab
            var id = $(eventTarget).attr("data-target");
            relatedID = $(e.relatedTarget).attr("data-target");
            switch(id){
                case "#flow-statistics":
                    this.currentTab = "#flow-statistics";
                    this.hideOptionsBucket();
                break;
                case "#usernum-statistics":
                    this.currentTab = "#usernum-statistics";
                    if (!this.userView){
                        this.userView = new UserStatisticsView(this.subViewOpt);
                        this.userView.render(this.$el.find("#usernum-statistics"));
                    }
                    this.hideOptionsBucket();
                break;
                case "#bandwidth-statistics":
                    this.currentTab = "#bandwidth-statistics";
                    if (!this.bandwidth){
                        this.bandwidth = new BandwidthStatisticsView(this.subViewOpt);
                        this.bandwidth.render(this.$el.find("#bandwidth-statistics"));
                    }
                    this.hideOptionsBucket();
                break;
                case "#storage-statistics":
                    this.currentTab = "#storage-statistics";
                    if (!this.storage){
                        this.storage = new StorageStatisticsView(this.subViewOpt);
                        this.storage.render(this.$el.find("#storage-statistics"));
                        this.collection.getBucketList();
                    }
                    if (relatedID === "#business-analysis"){
                        setTimeout(function(){
                            this.showOptionsBucket();
                        }.bind(this), 750);
                    } else {
                        this.showOptionsBucket();
                    }
                break;
                case "#business-analysis":
                this.currentTab = "#business-analysis";
                    if (!this.business){
                        this.business = new BusinessStatisticsView(this.subViewOpt);
                        this.business.render(this.$el.find("#business-analysis"));
                    }
                    this.changeOptionsUI(true);
                    this.hideOptionsBucket();
                break;
            }
            if (relatedID === "#business-analysis")
                this.changeOptionsUI(false);

            this.onClickAppplyButton();
        },

        hideOptionsBucket: function(){
            if (!this.isBucketShow) return;
            this.isBucketShow = false
            var nodeClassName = ".bucket", animateClassName = "bounceOut animated";
            this.$el.find(nodeClassName).addClass(animateClassName);
            setTimeout(function(){
                this.$el.find(nodeClassName).hide();
                this.$el.find(nodeClassName).removeClass(animateClassName); 
            }.bind(this), 750);
        },

        showOptionsBucket: function(){
            if (this.isBucketShow) return;
            this.isBucketShow = true
            var nodeClassName = ".bucket", animateClassName = "bounceIn animated";
            this.$el.find(nodeClassName).removeAttr("style");
            this.$el.find(nodeClassName).addClass(animateClassName);
            setTimeout(function(){
                this.$el.find(nodeClassName).removeClass(animateClassName); 
            }.bind(this), 750);
        },

        changeOptionsUI: function(isAnalysis){
            var hideDateGroup = function(callback){
                var nodeClassName, calendarShowClassName, calendarHideClassName,
                animateClassName = "bounceOut animated"//"hinge animated";
                if (isAnalysis){
                    nodeClassName        = ".date-group";
                    calendarShowClassName= ".calendar";
                    calendarHideClassName= ".calendar-single";
                } else {
                    nodeClassName        = ".orther";
                    calendarShowClassName= ".calendar-single";
                    calendarHideClassName= ".calendar";
                }
                this.$el.find(nodeClassName).addClass(animateClassName);
                setTimeout(function(){
                    this.$el.find(calendarShowClassName).removeAttr("style");
                    this.$el.find(calendarHideClassName).hide();
                    this.$el.find(nodeClassName).hide();
                    this.$el.find(nodeClassName).removeClass(animateClassName);
                    callback();        
                }.bind(this), 750);
            }

            var showDateGroup = function(){
                var nodeClassName, animateClassName = "bounceIn animated";
                if (!isAnalysis){
                    nodeClassName        = ".date-group";
                    calendarShowClassName= ".calendar";
                    calendarHideClassName= ".calendar-single";
                } else {
                    nodeClassName        = ".orther";
                    calendarShowClassName= ".calendar-single";
                    calendarHideClassName= ".calendar";
                }
                this.$el.find(nodeClassName).addClass(animateClassName);
                this.$el.find(nodeClassName).removeAttr("style");
                this.$el.find(calendarShowClassName).removeAttr("style");
                this.$el.find(calendarHideClassName).hide();
                setTimeout(function(){
                    this.$el.find(nodeClassName).removeClass(animateClassName);     
                }.bind(this), 750);
            }
            Utility.queue([hideDateGroup, showDateGroup], this)
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
            this.calendarOption.singleDatePicker = false;
            this.$el.find(".calendar").data('daterangepicker').setOptions(this.calendarOption, function(){});
            var dateStr = new Date(startDate._d).format("yyyy/MM/dd hh:mm") + " - " + 
                          new Date(endDate._d).format("yyyy/MM/dd hh:mm")  
            this.$el.find(".calendar").html(dateStr);

            this.subViewOpt.startDate = startDate;
            this.subViewOpt.endDate = endDate;
            this.onClickAppplyButton();
        },

        initCalendar: function(){
            var dateStr = new Date(moment().subtract('days', 6)._d).format("yyyy/MM/dd hh:mm") + " - " + 
                          new Date(moment()._d).format("yyyy/MM/dd hh:mm")  
            this.$el.find(".calendar").html(dateStr);
            this.$el.find(".calendar").daterangepicker(this.calendarOption, function(start, end, label) {});
            this.$el.find(".calendar").on('show.daterangepicker', function() {
                this.$el.find(".date-group button").removeClass("active"); 
            }.bind(this));
            //this.$el.find(".calendar").on('hide.daterangepicker', function() { console.log("hide event fired"); });
            this.$el.find(".calendar").on('apply.daterangepicker', function(ev, picker) {
                dateStr = new Date(picker.startDate._d).format("yyyy/MM/dd hh:mm") + " - " + 
                          new Date(picker.endDate._d).format("yyyy/MM/dd hh:mm")  
                this.$el.find(".calendar").html(dateStr);
                this.subViewOpt.startDate = picker.startDate;
                this.subViewOpt.endDate = picker.endDate;
            }.bind(this));
            //this.$el.find(".calendar").on('cancel.daterangepicker', function(ev, picker) { console.log("cancel event fired"); });
        },

        initCalendarSingle: function(){
            var dateStr = new Date(moment().subtract('days', 1)._d).format("yyyy/MM/dd hh:mm")  
            this.$el.find(".calendar-single").html(dateStr);
            this.calendarOption.singleDatePicker = true;
            this.calendarOption.startDate = moment().subtract('days', 1);
            this.$el.find(".calendar-single").daterangepicker(this.calendarOption, function(start, end, label) {});
            this.$el.find(".calendar-single").on('apply.daterangepicker', function(ev, picker) {
                dateStr = new Date(picker.startDate._d).format("yyyy/MM/dd hh:mm") 
                this.$el.find(".calendar-single").html(dateStr);
                this.subViewOpt.startSingleDate = picker.startDate;
                this.subViewOpt.endSingleDate = picker.endDate;
            }.bind(this));
        },

        initBucketDropList: function(list){
            var rootNode = this.$el.find(".bucket"),
                tempList = [{name: "全部", value:"all"}];

            _.each(list, function(el, index, ls){
                tempList.push({name:el, value:el})
            })

            var defaultBucket =  "全部";

            rootNode.find("#cur-value").html(defaultBucket);
            rootNode.find(".dropdown-menu").html("");

            Utility.initDropMenu(rootNode, tempList, function(value){
                this.subViewOpt.bucket = value;
                this.onClickAppplyButton();
            }.bind(this));
        },

        initDropMenu: function(){
            var region = [
                {name: "中国标准", value: 1}
            ]
            Utility.initDropMenu(this.$el.find(".region"), region, function(value){

            }.bind(this));
            //1：并发数:2：总连接数:3：流量上行 4：流量下行、5：带宽峰值上行、6：带宽峰值下行
            var option1 = [
                {name: "并发数", value: 1},
                {name: "流量下行", value: 2},
                {name: "带宽峰值下行", value: 3}
            ]
            Utility.initDropMenu(this.$el.find(".option1"), option1, function(value){
                this.subViewOpt.activeType = parseInt(value);
                this.onClickAppplyButton();
                if (this.business) this.business.updateOpt(this.subViewOpt)
            }.bind(this));
        },

        render: function(target) {
            this.flowView.render(this.$el.find("#flow-statistics"));
            this.$el.appendTo(target);
            this.$el.addClass("fadeInLeft animated");
        }
    });

    return StatisticsView;
});