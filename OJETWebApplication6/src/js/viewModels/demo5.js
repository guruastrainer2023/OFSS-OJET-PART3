require(
    ["require", 
    "exports", 
    "knockout", 
    "ojs/ojbootstrap", 
    "ojs/ojarraydataprovider", 
    "text!data/pictoData.json", 
    "ojs/ojknockout", 
    "ojs/ojpictochart"], function (require, exports, ko, ojbootstrap_1, ArrayDataProvider, chartData) {
    "use strict";
    
    class PictoChartModel {
        constructor() {
            this.data = JSON.parse(chartData);
            this.dataProvider = new ArrayDataProvider(this.data, {
                keyAttributes: "name",
            });
            this.getColor = (index) => {
                return index === 0 ? "#ed6647" : "";
            };
        }
    }
    (0, ojbootstrap_1.whenDocumentReady)().then(() => {
        ko.cleanNode(document.getElementById("picto-container"))
        ko.applyBindings(new PictoChartModel(), document.getElementById("picto-container"));
    });
});