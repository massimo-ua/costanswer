(function(){
    'use strict';
    angular.module('costAnswer.about.services', [])
        .factory('menuListService', menuListService);
    function menuListService(ngDialog, $log, DataModel) {
        return {
        list: function() {
                return [
                    {"id": 1, "name": "Checkups", "sref": "about.checkups", "iconClass": "ion-settings", "disabled": false},
                    {"id": 2, "name": "Cost analysis", "sref": "about.cost-analysis", "iconClass": "ion-ios-home", "disabled": false},
                    {"id": 3, "name": "Costing methods", "sref": "about.costing-methods", "iconClass": "ion-social-buffer", "disabled": false},
                    {"id": 4, "name": "Direct vs Indirect", "sref": "about.direct-vs-indirect", "iconClass": "ion-connection-bars", "disabled": false},
                    {"id": 5, "name": "FMOH", "sref": "about.fmoh", "iconClass": "ion-ios-alarm-outline", "disabled": false},
                    {"id": 6, "name": "Forecast vs actual", "sref": "about.forecast-vs-actual", "iconClass": "ion-paintbucket", "disabled": false},
                    {"id": 7, "name": "Inventory accounting", "sref": "about.inventory-accounting", "iconClass": "ion-ios-people", "disabled": false},
                    {"id": 8, "name": "Job order costing", "sref": "about.job-order-costing", "iconClass": "ion-ios-pie", "disabled": false},
                    {"id": 9, "name": "Per batch approach", "sref": "about.per-batch-approach", "iconClass": "ion-ios-cog", "disabled": false},
                    {"id": 10, "name": "Process costing", "sref": "about.process-costing", "iconClass": "ion-ios-alarm", "disabled": false},
                    {"id": 11, "name": "Product vs service", "sref": "about.product-vs-service", "iconClass": "ion-pricetags", "disabled": false},
                    {"id": 12, "name": "Right method", "sref": "about.right-method", "iconClass": "ion-clipboard", "disabled": false},
                    {"id": 13, "name": "Standard costing", "sref": "about.standard-costing", "iconClass": "ion-clipboard", "disabled": false},
                    {"id": 14, "name": "Theory in brief", "sref": "about.theory-in-brief", "iconClass": "ion-clipboard", "disabled": false},
                    {"id": 15, "name": "Variable vs Fixed", "sref": "about.variable-vs-fixed", "iconClass": "ion-clipboard", "disabled": false},
                    {"id": 16, "name": "VMOH", "sref": "about.vmoh", "iconClass": "ion-clipboard", "disabled": false},
                    {"id": 17, "name": "What is costanswer", "sref": "about.what-is-costanswer", "iconClass": "ion-clipboard", "disabled": false}
                ];
            }
        };
    }
    menuListService.$inject = ['ngDialog','$log','DataModel'];
}());



