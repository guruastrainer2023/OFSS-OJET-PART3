require(
    ["require", 
    "exports", 
    "knockout", 
    "ojs/ojbootstrap", 
    "ojs/ojarraydataprovider", 
    "ojs/ojknockout", 
    "ojs/ojnavigationlist", 
    "ojs/ojswitch", 
    "ojs/ojradioset", 
    "ojs/ojformlayout"],
     function (require, exports, ko, Bootstrap, ArrayDataProvider) {
    "use strict";
    
    class ViewModel {
        constructor() {
            const data = [
                { name: 'Home', id: 'home', icons: 'oj-ux-ico-home' },
                {
                    name: 'Getting Started',
                    id: 'gettingstarted',
                    icons: 'oj-ux-ico-education'
                },
                { name: 'Cookbook', id: 'cookbook', icons: 'oj-ux-ico-book' },
                {
                    name: 'Style Lab',
                    disabled: 'true',
                    id: 'stylelab2',
                    icons: 'oj-ux-ico-color-palette'
                },
                { name: 'Library', id: 'library', icons: 'oj-ux-ico-library' },
                { name: 'Support', id: 'support', icons: 'oj-ux-ico-chat-on' },
                { name: 'Contact us', id: 'contactus', icons: 'oj-ux-ico-contact' }
            ];
            this.isChecked = ko.observable();
            this.selectedItem = ko.observable('home');
            this.display = ko.observable('all');
            this.edge = ko.observable('top');
            this.dataProvider = new ArrayDataProvider(data, { keyAttributes: 'id' });
            this.isContrastBackground = ko.observable(false);
            this.isChecked.subscribe(function (newValue) {
                let tabbarInstances = document.querySelectorAll('oj-tab-bar');
                Array.prototype.forEach.call(tabbarInstances, (tabbar) => {
                    if (newValue) {
                        tabbar.className = tabbar.className + ' oj-sm-condense';
                    }
                    else {
                        tabbar.className = tabbar.className.replace('oj-sm-condense', '');
                    }
                });
            });
            this.isContrastBackground.subscribe(function (newValue) {
                let navlistContainer = document.getElementById('tabbarcontainer');
                if (navlistContainer != null) {
                    if (newValue) {
                        navlistContainer.className = 'oj-bg-neutral-170 oj-color-invert';
                    }
                    else {
                        navlistContainer.className = '';
                    }
                }
            });
            this.isDivider = ko.observable(false);
            this.isDivider.subscribe(function (newValue) {
                let tabbarInstance = document.querySelectorAll('.oj-tabbar');
                Array.prototype.forEach.call(tabbarInstance, function (ojtabbar) {
                    if (newValue) {
                        ojtabbar.className = ojtabbar.className + ' oj-divider-bottom';
                    }
                    else {
                        ojtabbar.className = ojtabbar.className.replace('oj-divider-bottom', '');
                    }
                });
            });
            this.edge.subscribe(function (newValue) {
                let dividerSwitch = document.getElementById('verticaldividerSwitch');
                let tabbarInstance = document.querySelector('.oj-tabbar');
                let edgeClass;
                if (dividerSwitch.value) {
                    switch (newValue) {
                        case 'top':
                            edgeClass = 'oj-divider-bottom';
                            break;
                        case 'bottom':
                            edgeClass = 'oj-divider-top';
                            break;
                    }
                }
                tabbarInstance.className = tabbarInstance.className
                    .replace('oj-divider-top', '')
                    .replace('oj-divider-bottom', '');
                tabbarInstance.className = tabbarInstance.className + ' ' + edgeClass;
            });
        }
    }
    Bootstrap.whenDocumentReady().then(() => {
        ko.cleanNode(document.getElementById('tabbardemo'));
        ko.applyBindings(new ViewModel(), document.getElementById('tabbardemo'));
    });
});