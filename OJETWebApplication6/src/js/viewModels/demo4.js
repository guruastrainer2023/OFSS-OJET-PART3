require(
    ["require", 
    "exports", 
    "knockout", 
    "ojs/ojbootstrap", 
    "text!data/basicCoordData.json", 
    "ojs/ojarraydataprovider", 
    "ojs/ojknockout", 
    "ojs/ojinputnumber", 
    "ojs/ojchart", "ojs/ojinputtext", 
    "ojs/ojformlayout", 
    
], function (require, exports, ko, ojbootstrap_1, data, ArrayDataProvider) {
    "use strict";
    
    class ChartModel {
        constructor() {
            this.currentTab = ko.observable("seriesStyles");
            this.color1 = ko.observable("#267DB3");
            this.borderColor1 = ko.observable("#0F3248");
            this.pattern1 = ko.observable("smallChecker");
            this.markerShape1 = ko.observable("auto");
            this.plotAreaColor = ko.observable("#F2F2F2");
            this.plotAreaBorderColor = ko.observable("#000000");
            this.plotAreaBorderWidth = ko.observable(0);
            this.plotArea = ko.pureComputed(() => {
                return {
                    backgroundColor: this.plotAreaColor(),
                    borderColor: this.plotAreaBorderColor(),
                    borderWidth: this.plotAreaBorderWidth(),
                };
            });
            /* chart axes */
            this.xTitle = ko.observable("X-Axis Title");
            this.xStyle = ko.observable({ fontStyle: "italic", color: "#6070C7" });
            this.xMajorTickColor = ko.observable("#C4CED7");
            this.xMajorTickWidth = ko.observable(1);
            this.xMajorTickStyle = ko.observable("solid");
            this.xAxisLineColor = ko.observable("#9E9E9E");
            this.xAxisLineWidth = ko.observable(1);
            this.yTitle = ko.observable("Y-Axis Title");
            this.yStyle = ko.observable({ fontStyle: "italic", color: "#6070C7" });
            this.yAxisLineColor = ko.observable("#9E9E9E");
            this.yAxisLineWidth = ko.observable(1);
            this.yMajorTickColor = ko.observable("#C4CED7");
            this.yMajorTickWidth = ko.observable(1);
            this.yMajorTickStyle = ko.observable("solid");
            this.yTickLabelPosition = ko.observable("outside");
            this.xAxis = ko.pureComputed(() => {
                return {
                    title: this.xTitle(),
                    titleStyle: this.xStyle(),
                    axisLine: {
                        lineColor: this.xAxisLineColor(),
                        lineWidth: this.xAxisLineWidth(),
                    },
                    majorTick: {
                        lineColor: this.xMajorTickColor(),
                        lineWidth: this.xMajorTickWidth(),
                        lineStyle: this.xMajorTickStyle(),
                    },
                };
            });
            this.yAxis = ko.pureComputed(() => {
                return {
                    title: this.yTitle(),
                    titleStyle: this.yStyle(),
                    axisLine: {
                        lineColor: this.yAxisLineColor(),
                        lineWidth: this.yAxisLineWidth(),
                    },
                    majorTick: {
                        lineColor: this.yMajorTickColor(),
                        lineWidth: this.yMajorTickWidth(),
                        lineStyle: this.yMajorTickStyle(),
                    },
                    tickLabel: {
                        position: this.yTickLabelPosition(),
                    },
                };
            });
            /* basic chart data */
            this.dataProvider = new ArrayDataProvider(JSON.parse(data), {
                keyAttributes: "id",
            });
        }
    }
    (0, ojbootstrap_1.whenDocumentReady)().then(() => {
        ko.cleanNode(document.getElementById("chart-container"))
        ko.applyBindings(new ChartModel(), document.getElementById("chart-container"));
    });
});