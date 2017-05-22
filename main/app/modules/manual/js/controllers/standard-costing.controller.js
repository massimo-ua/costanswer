(function(){
    'use strict';
    angular.module('costAnswer.manual.controllers')
        .component('manualStandardCosting', {
            restrict: 'E',
            templateUrl: 'app/modules/manual/views/standard-costing.html',
            controller: manualStandardCostingController
        });
    function manualStandardCostingController($log, menuPopupService, manualMenuService) {
        var vm = this;
        vm.buttonText = "Standard costing subsections";
        vm.openMenu = function() {
            menuPopupService.open(manualMenuService.standardCostingMenu());
        };
    }
    manualStandardCostingController.$inject = ['$log', 'menuPopupService', 'manualMenuService'];
}());