require(
    ["require", 
        "exports", 
        "knockout", 
        "ojs/ojbootstrap", 
        'ojs/ojcore',
        "ojs/ojrestdataprovider",
        
        'ojs/ojtable', 
        'ojs/ojcollectiontabledatasource', 
        'ojs/ojknockout', 
        'ojs/ojmodel' 
       ], 
        function (require, exports, ko, Bootstrap,oj,ojrestdataprovider_1) {
    "use strict";
    
    class PersonModel { 
        constructor() {
            var self = this;
            //URL of REST Web Service
            self.url = 'http://localhost:8080/04-PersonREST/rest/personapi/getAll';
            
            this.keyAttributes = "id";
            this.dataprovider = new ojrestdataprovider_1.RESTDataProvider({
                
                keyAttributes: this.keyAttributes,
                url: this.url,
    
                transforms: {
                    fetchFirst: {
                        request: async (options) => {
                            //url = new URL(options.url);
                          //  size=options.fetchParameters.size;
                           // offset=options.fetchParameters.offset;
                            
                            //url.searchParams.set("limit", String(size));
                            //url.searchParams.set("offset", String(offset));
                            //return new Request(url.href);
                            const url = new URL(options.url);
                            alert(url)
                            const { size, offset } = options.fetchParameters;
                            url.searchParams.set('limit', String(size));
                            url.searchParams.set('offset', String(offset));
                            alert(url.href);
                            return new Request(url.href);
                        },
                        response: async ({ body }) => {
                            //alert(JSON.stringify(body))
                           // items=body;
                            //const { items } = body;
                            // If the response body returns, for example, "items". 
                            // We need to assign "items" to "data"
                           // return { data: items };
                          // const { data, totalSize, hasMore } = body;
                           alert(body)
                           return { data: body };
                           //return { data, totalSize, hasMore };
                        },
                    },
                },
            });
            
        }
    }
    Bootstrap.whenDocumentReady().then(() => {
        ko.cleanNode(document.getElementById("output-table"));
        ko.applyBindings(new PersonModel(), document.getElementById("output-table"));
    });
});