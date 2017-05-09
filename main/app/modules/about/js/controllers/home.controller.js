(function(){
    'use strict';
    function AboutHomeController($log, menuPopupService) {
        var vm = this;
        vm.buttonText = "Sections";
        vm.menu = function() {
            menuPopupService.open();
        };
    }
    AboutHomeController.$inject = ['$log', 'menuPopupService'];
    angular.module('costAnswer.about.controllers',[])
        .controller('AboutHomeController', AboutHomeController);
}());