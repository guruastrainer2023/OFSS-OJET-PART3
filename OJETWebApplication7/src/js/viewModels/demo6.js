require(
    ["require", 
        "exports", 
        "knockout", 
        "ojs/ojbootstrap", 
        'ojs/ojcore',
        "ojs/ojrestdataprovider",
        "ojs/ojarraydataprovider",
        "ojs/ojinputtext", 
        'ojs/ojtable', 
        'ojs/ojcollectiontabledatasource', 
        'ojs/ojknockout', 
        'ojs/ojmodel',
        "ojs/ojformlayout",
        "ojs/ojlabel", 
        "ojs/ojbutton", 
        "oj-c/input-number",
       ], 
        function (require, exports, ko, Bootstrap,oj,ojrestdataprovider_1,ArrayDataProvider ) {
    "use strict";
    
    class PersonModel { 
        constructor() {
            var self = this;
            //URL of REST Web Service
            self.url = 'http://localhost:8080/04-PersonREST/rest/personapi/delete';
            this.inputPersonId=ko.observable('');
           
            this.personArr=ko.observable([]);
            this.showTable=ko.observable(false);
            this.deleteRow=async ()=>{

                alert("working")
                const row = {
                    id: this.inputPersonId()
                   
                  };
                  const request = new Request(this.url, {
                    headers: new Headers({
                      "Content-type": "application/json; charset=UTF-8",
                    }),
                    body: JSON.stringify(row),
                    method: "DELETE",
                  });
                 alert('working2');
                 const response = await fetch(request);
                 alert('working3');
                 const responseText = await response.json();
                 alert(JSON.stringify(responseText))
                 self.personArr=responseText;
                 //location.href="display.html";
                 self.dataprovider = new ArrayDataProvider(self.personArr, {
                    keyAttributes: "DepartmentifId",
                  //  implicitSort: [{ attribute: "DepartmentId", direction: "ascending" }],
                });
                 self.showTable(true);
            }
            
        }
        
    }
    Bootstrap.whenDocumentReady().then(() => {
        ko.cleanNode(document.getElementById("output-table"));
        ko.applyBindings(new PersonModel(), document.getElementById("output-table"));
    });
});