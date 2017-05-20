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
                        {"id": 6, "name": "Standard costing", "sref": "manual.standard-costing", "iconClass": "ion-paintbucket", "disabled": false}
                    ];
                },
            standardCostingMenu: function() {
                    return [
                        {"id": 1, "name": "What is COSTANSWER", "sref": "manual.what-is-costanswer", "iconClass": "ion-settings", "disabled": false},
                        {"id": 2, "name": "Theory in brief", "sref": "manual.theory-in-brief", "iconClass": "ion-ios-home", "disabled": false},
                        {"id": 3, "name": "Direct vs indirect", "sref": "manual.direct-vs-indirect", "iconClass": "ion-social-buffer", "disabled": false},
                        {"id": 4, "name": "Variable vs fixed", "sref": "manual.variable-vs-fixed", "iconClass": "ion-connection-bars", "disabled": false}
                    ];
                }
        };
    }
}());



