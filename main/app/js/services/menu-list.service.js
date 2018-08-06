(function(){
    'use strict';
    angular.module('costAnswer.services')
        .factory('menuListService', menuListService);
    menuListService.$inject = ['$filter'];
    function menuListService($filter) {
        return {
        help: function() {
                return [
                    {"id": 0, "display": 'HELP', "href": "#", "children": [
                        { "id": 1, "display": 'About Program', "href": "#", "children": [
                            {"id": 1, "display": "What is COSTANSWER", "href": "about/what-is-costanswer", "iconClass": "ion-settings", "disabled": false},
                            {"id": 2, "display": "Theory in brief", "href": "about/theory-in-brief", "iconClass": "ion-ios-home", "disabled": false},
                            {"id": 3, "display": "Direct vs indirect", "href": "about/direct-vs-indirect", "iconClass": "ion-social-buffer", "disabled": false},
                            {"id": 4, "display": "Variable vs fixed", "href": "about/variable-vs-fixed", "iconClass": "ion-connection-bars", "disabled": false},
                            {"id": 5, "display": "Product cost vs service cost", "href": "about/product-cost-vs-service-cost", "iconClass": "ion-ios-alarm-outline", "disabled": false},
                            {"id": 6, "display": "Inventory accounting", "href": "about/inventory-accounting", "iconClass": "ion-paintbucket", "disabled": false},
                            {"id": 7, "display": "Costing methods", "href": "about/costing-methods", "iconClass": "ion-ios-people", "disabled": false},
                            {"id": 8, "display": "Standard costing", "href": "about/standard-costing", "iconClass": "ion-ios-pie", "disabled": false},
                            {"id": 9, "display": "Process costing", "href": "about/process-costing", "iconClass": "ion-ios-cog", "disabled": false},
                            {"id": 10, "display": "Job order costing", "href": "about/job-order-costing", "iconClass": "ion-ios-alarm", "disabled": false},
                            {"id": 11, "display": "Your costing method", "href": "about/your-costing-method", "iconClass": "ion-pricetags", "disabled": false},
                            {"id": 12, "display": "Forecast vs actual", "href": "about/forecast-vs-actual", "iconClass": "ion-clipboard", "disabled": false},
                            {"id": 13, "display": "\"Per batch\" approach", "href": "about/per-batch-approach", "iconClass": "ion-clipboard", "disabled": false},
                            {"id": 14, "display": "Variable overhead", "href": "about/variable-overhead", "iconClass": "ion-clipboard", "disabled": false},
                            {"id": 15, "display": "Fixed overhead", "href": "about/fixed-overhead", "iconClass": "ion-clipboard", "disabled": false},
                            {"id": 16, "display": "Cost analysis", "href": "about/cost-analysis", "iconClass": "ion-clipboard", "disabled": false},
                            {"id": 17, "display": "Check ups", "href": "about/checkups", "iconClass": "ion-clipboard", "disabled": false}
                        ]},
                        {"id": 2, "display": 'User Manual', "children": [
                            {"id": 1, "display": "Fixed manufacturing overhead", "href": "manual/fixed-manufacturing-overhead", "iconClass": "ion-settings", "disabled": false},
                            {"id": 2, "display": "Instant calculation results", "href": "manual/instant-calculation-results", "iconClass": "ion-ios-home", "disabled": false},
                            {"id": 3, "display": "Operating controls", "href": "manual/operating-controls", "iconClass": "ion-social-buffer", "disabled": false},
                            {"id": 4, "display": "Project setup", "href": "manual/project-setup", "iconClass": "ion-connection-bars", "disabled": false},
                            {"id": 5, "display": "Reports", "href": "manual/reports", "iconClass": "ion-ios-alarm-outline", "disabled": false},
                            {"id": 6, "display": "Standard costing", "href": "manual-standard-costing", "iconClass": "ion-paintbucket", "disabled": false, "children": [
                                {"id": 1, "display": "Inventory", "href": "manual-standard-costing/inventory", "iconClass": "ion-social-buffer", "disabled": false},
                                {"id": 2, "display": "Direct labor", "href": "manual-standard-costing/direct-labor", "iconClass": "ion-settings", "disabled": false},
                                {"id": 3, "display": "Direct materials", "href": "manual-standard-costing/direct-materials", "iconClass": "ion-ios-home", "disabled": false},
                                {"id": 4, "display": "Machine hours", "href": "manual-standard-costing/machine-hours", "iconClass": "ion-connection-bars", "disabled": false},
                                {"id": 5, "display": "Markup", "href": "manual-standard-costing/markup", "iconClass": "ion-settings", "disabled": false},
                                {"id": 6, "display": "Product creation", "href": "manual-standard-costing/product-creation", "iconClass": "ion-ios-home", "disabled": false},
                                {"id": 7, "display": "Production plan", "href": "manual-standard-costing/production-plan", "iconClass": "ion-social-buffer", "disabled": false},
                                {"id": 8, "display": "Sales plan", "href": "manual-standard-costing/sales-plan", "iconClass": "ion-connection-bars", "disabled": false},
                                {"id": 9, "display": "VMOH", "href": "manual-standard-costing/vmoh", "iconClass": "ion-ios-home", "disabled": false},
                                {"id": 10, "display": "WIP beginning", "href": "manual-standard-costing/wip-beginning", "iconClass": "ion-social-buffer", "disabled": false},
                                {"id": 11, "display": "WIP ending", "href": "manual-standard-costing/wip-ending", "iconClass": "ion-connection-bars", "disabled": false},
                            ]}
                        ]},
                        {"id": 3, "display": 'FAQ', "href": 'coming-soon'}
                    ]}
                ];
            },
            logged: function(name) {
                return [
                    { "id": 0, "display": $filter('strTruncate')(name, '...', 10), "href": "", children: [
                        {"id": 1, "display": "Account", "href": "dashboard" },
                        {"id": 2, "display": "Logout", "href": "authLogout" }
                    ]}
                ]
            }
        };
    }
}());



