require(
    ["require", 
        "exports", 
        "knockout", 
        "ojs/ojbootstrap", 
        'ojs/ojcore',
        'ojs/ojtable', 
        'ojs/ojcollectiontabledatasource', 
        'ojs/ojknockout', 
        'ojs/ojmodel' 
       ], 
        function (require, exports, ko, ojbootstrap_1,oj) {
    "use strict";
    
    class PersonModel { 
        constructor() {
            var self = this;
            //URL of REST Web Service
            self.serviceURL = 'http://localhost:8080/04-PersonREST/rest/personapi/getAll';
            //An observable to hold Employee Collection
            self.PersonCol = ko.observable();
            //An observable to show Employess in JET table using knockout data binding
            self.datasource = ko.observable();
            
            // Map attributes returned from REST Web service to view model attribute names
             
            self.parsePerson = function (response) {
                return {
                    id : response['id'], 
                    name : response['name'], 
                    salary : response['salary']
                    
                };
            };
            
            //ojModel to hold single employee record
            self.Person = oj.Model.extend( {
                urlRoot : self.serviceURL, 
                parse : self.parseEmp, 
                idAttribute : 'id'
            });
            self.person = new self.Person();
            //ojCollection to hold all employees
            self.personCollection = oj.Collection.extend( {
                url : self.serviceURL, 
                model : self.emp, 
                comparator : "id"
            });
            self.PersonCol(new self.personCollection());
            
            //JET utility to convert ojCollection in row and column format
            self.datasource(new oj.CollectionTableDataSource(self.PersonCol()));
        }
    }
    (0, ojbootstrap_1.whenDocumentReady)().then(() => {
        ko.cleanNode(document.getElementById('output-table'))
       ko.applyBindings(new PersonModel(), document.getElementById('output-table'));
    });
});