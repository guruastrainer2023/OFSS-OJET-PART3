require(
    ["require", 
        "exports", 
        "knockout", 
        "ojs/ojbootstrap", 
        'ojs/ojcore',
        "ojs/ojrestdataprovider",
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
        function (require, exports, ko, Bootstrap,oj,ojrestdataprovider_1) {
    "use strict";
    
    class PersonModel { 
        constructor() {
            var self = this;
            //URL of REST Web Service
            self.url = 'http://localhost:8080/04-PersonREST/rest/personapi/add';
            this.inputPersonId=ko.observable('');
            this.inputPersonName=ko.observable('');
            this.inputSalary=ko.observable('');
            this.personArr=ko.observable([{
                id:1,name:'John',salary:1000.00
            }]);
            this.showTable=ko.observable(false);
            this.addRow=async ()=>{

                alert("working")
                const row = {
                    id: this.inputPersonId(),
                    name: this.inputPersonName(),
                    salary: this.inputSalary()
                   
                  };
                  const request = new Request(this.url, {
                    headers: new Headers({
                      "Content-type": "application/json; charset=UTF-8",
                    }),
                    body: JSON.stringify(row),
                    method: "POST",
                  });
                 alert('working2');
                 const response = await fetch(request);
                 alert('working3');
                 const responseText = await response.json();
                 alert(JSON.stringify(responseText))
                 self.personArr=responseText;
                 //location.href="display.html";
                 self.showTable(true);
            }
            
        }
        
    }
    Bootstrap.whenDocumentReady().then(() => {
        ko.cleanNode(document.getElementById("output-table"));
        ko.applyBindings(new PersonModel(), document.getElementById("output-table"));
    });
});