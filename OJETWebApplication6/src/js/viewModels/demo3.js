require([
    "require", 
    "exports", 
    "knockout", 
    "ojs/ojbootstrap", 
    "text!data/basicCoordData.json", 
    "ojs/ojarraydataprovider", 
    "ojs/ojknockout", 
    "ojs/ojchart"], function (require, exports, ko, ojbootstrap_1, data, ArrayDataProvider) {
    "use strict";
    
    class ChartModel {
        constructor() {
            /* chart data */
            this.dataProvider = new ArrayDataProvider(JSON.parse(data), {
                keyAttributes: "id",
            });
        }
    }
    (0, ojbootstrap_1.whenDocumentReady)().then(() => {
        ko.cleanNode(document.getElementById("chart-container"));
        ko.applyBindings(new ChartModel(), document.getElementById("chart-container"));
    });
});