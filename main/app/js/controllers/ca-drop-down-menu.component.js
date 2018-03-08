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
        };

        vm.toggleRoot = function() {
            console.log('ewtrew');
            vm.isVisible = !vm.isVisible;
        };
    }
    //caProcessProductProcessDlController.$inject = [];
}());