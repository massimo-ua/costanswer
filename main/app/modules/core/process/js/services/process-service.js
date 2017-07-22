(function(){
    'use strict';
    angular.module('costAnswer.core.process.services')
    .factory('processService', processService);
    function processService($log) {
        var factory = {};
        factory.productPropeties = function(){
            return [
                {"id": 1, "name": "Product/Service settings", "sref": "property.settings", "iconClass": "ion-settings", "disabled": false},
                {"id": 2, "name": "Inventory", "sref": "property.inventory", "iconClass": "ion-ios-home", "disabled": false},
                {"id": 3, "name": "Sales plan", "sref": "property.sp", "iconClass": "ion-connection-bars", "disabled": false},
                {"id": 4, "name": "Markup", "sref": "property.mu", "iconClass": "ion-pricetags", "disabled": false},
                {"id": 5, "name": "Report", "sref": "property.report", "iconClass": "ion-clipboard", "disabled": false}
            ];
        };
        return factory;
    }
    processService.$inject = ['$log'];
})();