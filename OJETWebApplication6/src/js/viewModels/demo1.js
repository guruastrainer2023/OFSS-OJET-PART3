require(
    ["require", 
        "exports", 
        "knockout", 
        "ojs/ojbootstrap", 
        "text!data/chartData.json", 
        "ojs/ojarraydataprovider", 
        "ojs/ojknockout", 
        "ojs/ojchart", 
        "ojs/ojtoolbar", 
       ], 
        function (require, exports, ko, ojbootstrap_1, data, ArrayDataProvider) {
    "use strict";
    
    class ChartModel { 
        constructor() {
            /* toggle button variables */
            this.stackValue = ko.observable('off');
            this.orientationValue = ko.observable('vertical');
            this.stackValue = ko.observable("on");
            this.stackLabelValue = ko.observable("on");
            this.labelPosition = ko.observable("auto");
            this.dataProvider = new ArrayDataProvider(JSON.parse(data), {
                keyAttributes: 'id'
            });
        }
    }
    (0, ojbootstrap_1.whenDocumentReady)().then(() => {
        ko.cleanNode(document.getElementById('chart-container'))
        ko.applyBindings(new ChartModel(), document.getElementById('chart-container'));
    });
});