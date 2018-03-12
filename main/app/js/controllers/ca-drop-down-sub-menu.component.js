(function(){
    'use strict';
    angular.module('costAnswer.controllers')
        .component('caDropDownSubMenu', {
            restrict: 'E',
            bindings: {
                subs: '<'
            },
            templateUrl: 'app/views/ca-drop-down-sub-menu.html',
            controller: caDropDownSubMenuController
        });
    function caDropDownSubMenuController() {
        var vm = this;
        vm.$onInit = function() {
            vm.isVisible = false;
        };

        vm.toggleRoot = function() {
            console.log('sub state changed');
            vm.isVisible = !vm.isVisible;
        };
    }
    //caProcessProductProcessDlController.$inject = [];
}());