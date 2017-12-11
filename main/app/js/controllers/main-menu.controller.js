(function(){
    'use strict'
    function mainMenuController() {
        var vm = this;
        vm.$onInit = function() {
            vm.menuItems = [
                { display: 'Dropdown Item 1', href: '#', children: [
                    { display: 'Child 1', href: '#', children: [
                    { display: 'Sub 1', href: '#sub1', children: []},
                    { display: 'Sub 2', href: '#sub2', children: []}]},
                    { display: 'Child 2', href: '#child2', children: []}]
                }
            ];
        };
    }
    //controller function linking
    angular.module('costAnswer.controllers')
        .controller('mainMenuController', mainMenuController)
}());