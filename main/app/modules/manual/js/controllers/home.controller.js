(function(){
    'use strict';
    angular.module('costAnswer.manual.controllers',[])
        .component('manualHome', {
            restrict: 'E',
            templateUrl: 'app/modules/manual/views/home.html',
            controller: ManualHomeController
        });
    function ManualHomeController($log, menuPopupService, manualMenuService) {
        var vm = this;
        vm.buttonText = "Sections";
        vm.openMenu = function() {
            menuPopupService.open(manualMenuService.mainMenu());
        };
    }
    ManualHomeController.$inject = ['$log', 'menuPopupService', 'manualMenuService'];
}());