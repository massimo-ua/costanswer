(function(){
    'use strict';
    angular.module('costAnswer.core.services')
    .factory('menuService', menuService);
    function menuService($log) {
        var factory = {};
        var Properties = {
            'standard': [
                    {"id": 1, "name": "Product/Service settings", "sref": "property.settings", "iconClass": "ion-settings", "disabled": false},
                    {"id": 2, "name": "Inventory", "sref": "property.inventory", "iconClass": "ion-ios-home", "disabled": false},
                    {"id": 3, "name": "Production plan", "sref": "property.pp", "iconClass": "ion-social-buffer", "disabled": false},
                    {"id": 4, "name": "Sales plan", "sref": "property.sp", "iconClass": "ion-connection-bars", "disabled": false},
                    {"id": 5, "name": "Work in process (WIP) beginning", "sref": "property.wb", "iconClass": "ion-ios-alarm-outline", "disabled": false},
                    {"id": 6, "name": "Direct materials", "sref": "property.dm", "iconClass": "ion-paintbucket", "disabled": false},
                    {"id": 7, "name": "Direct labor", "sref": "property.dl", "iconClass": "ion-ios-people", "disabled": false},
                    {"id": 8, "name": "Variable manufacturing overhead (VMOH)", "sref": "property.vo", "iconClass": "ion-ios-pie", "disabled": false},
                    {"id": 9, "name": "Machine hours", "sref": "property.mh", "iconClass": "ion-ios-cog", "disabled": false},
                    {"id": 10, "name": "Work in process (WIP) ending", "sref": "property.we", "iconClass": "ion-ios-alarm", "disabled": false},
                    {"id": 11, "name": "Markup", "sref": "property.mu", "iconClass": "ion-pricetags", "disabled": false},
                    {"id": 12, "name": "Report", "sref": "property.report", "iconClass": "ion-clipboard", "disabled": false}
                ],
            'process': [
                    {"id": 0, "name": "Product/Service settings", "sref": "process-property.settings", "iconClass": "ion-settings", "disabled": false},
                    {"id": 1, "name": "Inventory", "sref": "process-property.inventory", "iconClass": "ion-ios-home", "disabled": false},
                    {"id": 2, "name": "Sales plan", "sref": "process-property.sp", "iconClass": "ion-connection-bars", "disabled": false},
                    {"id": 3, "name": "Processes", "sref": "process-property.processes", "iconClass": "ion-loop", "disabled": false},
                    {"id": 4, "name": "Markup", "sref": "process-property.mu", "iconClass": "ion-pricetags", "disabled": false},
                    {"id": 5, "name": "Report", "sref": "process-property.report", "iconClass": "ion-clipboard", "disabled": false}
            ],
            'job-order': [],
            'process-property': [
                {"id": 1, "name": "Process settings", "sref": "product-process-component.settings", "iconClass": "ion-settings", "disabled": false},
                {"id": 2, "name": "Work in process (WIP) beginning", "sref": "product-process-component.wb", "iconClass": "ion-ios-alarm-outline", "disabled": false},
                {"id": 3, "name": "Production plan", "sref": "product-process-component.pp", "iconClass": "ion-social-buffer", "disabled": false},
                {"id": 4, "name": "Direct materials", "sref": "product-process-component.dm", "iconClass": "ion-paintbucket", "disabled": false},
                {"id": 5, "name": "Direct labor", "sref": "product-process-component.dl", "iconClass": "ion-ios-people", "disabled": false},
                {"id": 6, "name": "Variable manufacturing overhead (VMOH)", "sref": "product-process-component.vo", "iconClass": "ion-ios-pie", "disabled": false},
                {"id": 7, "name": "Machine hours", "sref": "product-process-component.mh", "iconClass": "ion-ios-cog", "disabled": false},
                {"id": 8, "name": "Work in process (WIP) ending", "sref": "product-process-component.we", "iconClass": "ion-ios-alarm", "disabled": false}
            ]
        };
        factory.properties = function(key) {
            return Properties[key];
        };
        return factory;
    }
    menuService.$inject = ['$log'];
})();
