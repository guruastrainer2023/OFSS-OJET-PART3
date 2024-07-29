require([
    "require", 
    "exports", 
    "knockout", 
    "ojs/ojbootstrap", 
    "text!data/hiringData.json",
    "ojs/ojarraydataprovider", 
    "ojs/ojknockout", 
    "ojs/ojchart", "ojs/ojtoolbar", 
    "ojs/ojformlayout", 
    ], 
    function (require, exports, ko, ojbootstrap_1, data, ArrayDataProvider) {
    "use strict";
    
    class ChartModel {
        constructor() {
            /* toggle button variables */
            this.stackValue = ko.observable("on");
            this.stackLabelValue = ko.observable("on");
            this.orientationValue = ko.observable("vertical");
            this.labelPosition = ko.observable("auto");
            this.dataProvider = new ArrayDataProvider(JSON.parse(data), {
                keyAttributes: "id",
            });
            /* toggle buttons*/
            this.stackValue.subscribe((value) => {
                if (value === "off") {
                    this.stackLabelValue("off");
                }
                document.getElementById("stackLabelToggle").disabled = value === "off";
            });
        }
    }
    (0, ojbootstrap_1.whenDocumentReady)().then(() => {
        ko.cleanNode(document.getElementById("chart-container"))
        ko.applyBindings(new ChartModel(), document.getElementById("chart-container"));
    });
});