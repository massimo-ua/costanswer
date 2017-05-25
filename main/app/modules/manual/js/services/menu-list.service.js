(function(){
    'use strict';
    angular.module('costAnswer.manual.services', [])
        .factory('manualMenuService', manualMenuService);
    function manualMenuService() {
        return {
            mainMenu: function() {
                    return [
                        {"id": 1, "name": "Fixed manufacturing overhead", "sref": "manual.fixed-manufacturing-overhead", "iconClass": "ion-settings", "disabled": false},
                        {"id": 2, "name": "Instant calculation results", "sref": "manual.instant-calculation-results", "iconClass": "ion-ios-home", "disabled": false},
                        {"id": 3, "name": "Operating controls", "sref": "manual.operating-controls", "iconClass": "ion-social-buffer", "disabled": false},
                        {"id": 4, "name": "Project setup", "sref": "manual.project-setup", "iconClass": "ion-connection-bars", "disabled": false},
                        {"id": 5, "name": "Reports", "sref": "manual.reports", "iconClass": "ion-ios-alarm-outline", "disabled": false},
                        {"id": 6, "name": "Standard costing", "sref": "manual-standard-costing", "iconClass": "ion-paintbucket", "disabled": false}
                    ];
                },
            standardCostingMenu: function() {
                    return [
                        {"id": 1, "name": "Inventory", "sref": "manual-standard-costing.inventory", "iconClass": "ion-social-buffer", "disabled": false},
                        {"id": 2, "name": "Direct labor", "sref": "manual-standard-costing.direct-labor", "iconClass": "ion-settings", "disabled": false},
                        {"id": 3, "name": "Direct materials", "sref": "manual-standard-costing.direct-materials", "iconClass": "ion-ios-home", "disabled": false},
                        {"id": 4, "name": "Machine hours", "sref": "manual-standard-costing.machine-hours", "iconClass": "ion-connection-bars", "disabled": false},
                        {"id": 5, "name": "Markup", "sref": "manual-standard-costing.markup", "iconClass": "ion-settings", "disabled": false},
                        {"id": 6, "name": "Product creation", "sref": "manual-standard-costing.product-creation", "iconClass": "ion-ios-home", "disabled": false},
                        {"id": 7, "name": "Production plan", "sref": "manual-standard-costing.production-plan", "iconClass": "ion-social-buffer", "disabled": false},
                        {"id": 8, "name": "Sales plan", "sref": "manual-standard-costing.sales-plan", "iconClass": "ion-connection-bars", "disabled": false},
                        {"id": 9, "name": "VMOH", "sref": "manual-standard-costing.vmoh", "iconClass": "ion-ios-home", "disabled": false},
                        {"id": 10, "name": "WIP beginning", "sref": "manual-standard-costing.wip-beginning", "iconClass": "ion-social-buffer", "disabled": false},
                        {"id": 11, "name": "WIP ending", "sref": "manual-standard-costing.wip-ending", "iconClass": "ion-connection-bars", "disabled": false},
                        {"id": 12, "name": "Back to main sections", "sref": "manual", "iconClass": "ion-connection-bars", "disabled": false},
                    ];
                }
        };
    }
}());



