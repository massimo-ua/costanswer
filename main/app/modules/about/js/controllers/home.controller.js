(function(){
    'use strict';
    function AboutHomeController($log, menuPopupService, menuListService) {
        var vm = this;
        vm.buttonText = "Sections";
        vm.menu = function() {
            menuPopupService.open(menuListService.list());
        };
    }
    AboutHomeController.$inject = ['$log', 'menuPopupService', 'menuListService'];
    angular.module('costAnswer.about.controllers',[])
        .controller('AboutHomeController', AboutHomeController);
}());