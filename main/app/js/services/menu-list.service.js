(function(){
    'use strict';
    angular.module('costAnswer.services')
        .factory('menuListService', menuListService);
    function menuListService() {
        return {
        help: function() {
                return [
                    { id: 1, name: 'About Program', subs: [
                        {"id": 1, "name": "What is COSTANSWER", "sref": "about.what-is-costanswer", "iconClass": "ion-settings", "disabled": false},
                        {"id": 2, "name": "Theory in brief", "sref": "about.theory-in-brief", "iconClass": "ion-ios-home", "disabled": false},
                        {"id": 3, "name": "Direct vs indirect", "sref": "about.direct-vs-indirect", "iconClass": "ion-social-buffer", "disabled": false},
                        {"id": 4, "name": "Variable vs fixed", "sref": "about.variable-vs-fixed", "iconClass": "ion-connection-bars", "disabled": false},
                        {"id": 5, "name": "Product cost vs service cost", "sref": "about.product-cost-vs-service-cost", "iconClass": "ion-ios-alarm-outline", "disabled": false},
                        {"id": 6, "name": "Inventory accounting", "sref": "about.inventory-accounting", "iconClass": "ion-paintbucket", "disabled": false},
                        {"id": 7, "name": "Costing methods", "sref": "about.costing-methods", "iconClass": "ion-ios-people", "disabled": false},
                        {"id": 8, "name": "Standard costing", "sref": "about.standard-costing", "iconClass": "ion-ios-pie", "disabled": false},
                        {"id": 9, "name": "Process costing", "sref": "about.process-costing", "iconClass": "ion-ios-cog", "disabled": false},
                        {"id": 10, "name": "Job order costing", "sref": "about.job-order-costing", "iconClass": "ion-ios-alarm", "disabled": false},
                        {"id": 11, "name": "Your costing method", "sref": "about.your-costing-method", "iconClass": "ion-pricetags", "disabled": false},
                        {"id": 12, "name": "Forecast vs actual", "sref": "about.forecast-vs-actual", "iconClass": "ion-clipboard", "disabled": false},
                        {"id": 13, "name": "\"Per batch\" approach", "sref": "about.per-batch-approach", "iconClass": "ion-clipboard", "disabled": false},
                        {"id": 14, "name": "Variable overhead", "sref": "about.variable-overhead", "iconClass": "ion-clipboard", "disabled": false},
                        {"id": 15, "name": "Fixed overhead", "sref": "about.fixed-overhead", "iconClass": "ion-clipboard", "disabled": false},
                        {"id": 16, "name": "Cost analysis", "sref": "about.cost-analysis", "iconClass": "ion-clipboard", "disabled": false},
                        {"id": 17, "name": "Check ups", "sref": "about.checkups", "iconClass": "ion-clipboard", "disabled": false}
                    ]},
                    {id: 2, name: 'User Manual', subs: [
                        {"id": 1, "name": "Fixed manufacturing overhead", "sref": "manual.fixed-manufacturing-overhead", "iconClass": "ion-settings", "disabled": false},
                        {"id": 2, "name": "Instant calculation results", "sref": "manual.instant-calculation-results", "iconClass": "ion-ios-home", "disabled": false},
                        {"id": 3, "name": "Operating controls", "sref": "manual.operating-controls", "iconClass": "ion-social-buffer", "disabled": false},
                        {"id": 4, "name": "Project setup", "sref": "manual.project-setup", "iconClass": "ion-connection-bars", "disabled": false},
                        {"id": 5, "name": "Reports", "sref": "manual.reports", "iconClass": "ion-ios-alarm-outline", "disabled": false},
                        {"id": 6, "name": "Standard costing", "sref": "manual-standard-costing", "iconClass": "ion-paintbucket", "disabled": false, subs: [
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
                        ]}
                    ]},
                    {id: 3, name: 'FAQ', sref: 'coming-soon'}
                ];
            }
        };
    }
}());



