(function(){
    'use strict'
    function MainMenuController() {
        var vm = this;
        vm.menuItems = [
            { display: 'Dropdown Item 1', href: '#', children: [
                { display: 'Child 1', href: '#', children: [
                { display: 'Sub 1', href: '#sub1', children: []},
                { display: 'Sub 2', href: '#sub2', children: []}]},
                { display: 'Child 2', href: '#child2', children: []}]},
            { display: 'Dropdown Item 2', href: '#dropdown2', children: []},
            { display: 'Dropdown Item 3', href: '#', children: [
                { display: 'Child 3', href: '#child3', children: []}]}
            ];
    }
    //controller function linking
    angular.module('costAnswer.controllers')
        .controller('MainMenuController', MainMenuController)
}());