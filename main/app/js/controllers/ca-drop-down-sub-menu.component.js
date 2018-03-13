(function(){
    'use strict';
    angular.module('costAnswer.controllers')
        .component('caDropDownSubMenu', {
            restrict: 'E',
            bindings: {
                subs: '<',
                title: '<caTitle'
            },
            templateUrl: 'app/views/ca-drop-down-sub-menu.html',
            controller: caDropDownSubMenuController
        });
    function caDropDownSubMenuController() {
        var vm = this;
        vm.$onInit = function() {
            vm.isVisible = false;
        };

        vm.toggleRoot = function(event) {
            vm.isVisible = !vm.isVisible;
        };
    }
    //caProcessProductProcessDlController.$inject = [];
}());