(function(){
    'use strict';
    angular.module('costAnswer.controllers')
        .component('caDropDownMenu', {
            restrict: 'E',
            bindings: {
                title: '<',
                items: '<'
            },
            require: {
                caDropDownSubMenu: '^'
            },
            templateUrl: 'app/views/ca-drop-down-menu.html',
            controller: caDropDownMenuController
        });
    function caDropDownMenuController() {
        var vm = this;
        vm.$onInit = function() {
            vm.isVisible = false;
        };

        vm.toggleRoot = function() {
            vm.isVisible = !vm.isVisible;
        };
    }
    //caProcessProductProcessDlController.$inject = [];
}());