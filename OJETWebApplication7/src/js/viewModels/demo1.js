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
    
    class EmployeeModel { 
        constructor() {
            var self = this;
            //URL of REST Web Service
            self.serviceURL = 'http://dummy.restapiexample.com/api/v1/employees';
            //An observable to hold Employee Collection
            self.EmpCol = ko.observable();
            //An observable to show Employess in JET table using knockout data binding
            self.datasource = ko.observable();
            
            // Map attributes returned from REST Web service to view model attribute names
             
            self.parseEmp = function (response) {
                return {
                    EmployeeId : response['id'], 
                    EmployeeName : response['employee_name'], 
                    EmployeeSalary : response['employee_salary'], 
                    EmployeeAge : response['employee_age']
                };
            };
            
            //ojModel to hold single employee record
            self.Employee = oj.Model.extend( {
                urlRoot : self.serviceURL, 
                parse : self.parseEmp, 
                idAttribute : 'EmployeeId'
            });
            self.emp = new self.Employee();
            //ojCollection to hold all employees
            self.EmpCollection = oj.Collection.extend( {
                url : self.serviceURL, 
                model : self.emp, 
                comparator : "EmployeeId"
            });
            self.EmpCol(new self.EmpCollection());
            
            //JET utility to convert ojCollection in row and column format
            self.datasource(new oj.CollectionTableDataSource(self.EmpCol()));
        }
    }
    (0, ojbootstrap_1.whenDocumentReady)().then(() => {
        ko.cleanNode(document.getElementById('output-table'))
       ko.applyBindings(new EmployeeModel(), document.getElementById('output-table'));
    });
});