(function(){
    'use strict';
    angular.module('costAnswer.controllers')
        .component('caDropDownMenu', {
            restrict: 'E',
            templateUrl: 'app/views/ca-drop-down-menu.html',
            controller: caDropDownMenuController
        });
    function caDropDownMenuController() {
        var vm = this;
        vm.$onInit = function() {
            vm.isVisible = false;
            vm.rootTitle = 'HELP';
            vm.items = [
                {id: 1, name: 'About Program', subs: [
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
                {id: 2, name: 'User Manual'},
                {id: 3, name: 'FAQ'}
            ];
        };

        vm.toggleRoot = function() {
            console.log('ewtrew');
            vm.isVisible = !vm.isVisible;
        };
    }
    //caProcessProductProcessDlController.$inject = [];
}());