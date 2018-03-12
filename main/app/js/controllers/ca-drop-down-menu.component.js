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
                {id: 1, title: 'About Program', subs: [
                    { id: 10, title: 'Sub 10'},
                    { id: 20, title: 'Sub 20'},
                    { id: 30, title: 'Sub 30'}
                ]},
                {id: 2, title: 'User Manual'},
                {id: 3, title: 'FAQ'}
            ];
        };

        vm.toggleRoot = function() {
            console.log('ewtrew');
            vm.isVisible = !vm.isVisible;
        };
    }
    //caProcessProductProcessDlController.$inject = [];
}());