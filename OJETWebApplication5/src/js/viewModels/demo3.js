require(
    ["require",
        "exports",
        "knockout",
        "ojs/ojbootstrap",
        "ojs/ojknockout",
        "oj-c/button", 
        "ojs/ojdialog",
        "ojs/ojformlayout",
        "ojs/ojinputtext"],
    function (require, exports, ko, Bootstrap) {
        "use strict";

        class viewModel {
            constructor() {
                this.textVal1 = ko.observable("");
                this.textVal2 = ko.observable("");
                this.abcd="";
            }
            close(event) {
                document.getElementById("modalDialog1").close();
            }
            open(event) {
                document.getElementById("modalDialog1").open();
            }
        }
        Bootstrap.whenDocumentReady().then(() => {
            ko.cleanNode(document.getElementById("div1"))
            ko.applyBindings(new viewModel(), document.getElementById("div1"));
        });
    });