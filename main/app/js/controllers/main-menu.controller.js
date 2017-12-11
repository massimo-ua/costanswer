(function(){
    'use strict';
    angular.module('costAnswer.controllers')
        .component('caMainMenu', {
            restrict: 'E',
            templateUrl: 'app/views/main-menu.html',
            controller: caMainMenuController
        });
        function caMainMenuController() {
            var vm = this;
            vm.$onInit = function() {
                vm.menuItems = [
                    { display: 'Dropdown Item 1', href: '#', children: [
                      { display: 'Child 1', href: '#', children: [
                        { display: 'Sub 1', href: 'http://www.google.com', children: []},
                        { display: 'Sub 2', href: '#', children: [
                          { display: 'Grand Child 1', href: 'http://www.google.com', children: []},
                          { display: 'Grand Child 2', href: 'http://www.google.com', children: []}
                          ]}
                        ]},
                      { display: 'Child 2', href: 'http://www.google.com', children: []}
                      ]},
                    { display: 'Dropdown Item 2', href: 'http://www.google.com', children: []},
                    { display: 'Dropdown Item 3', href: '#', children: [
                      { display: 'Child 3', href: 'http://www.google.com', children: []}
                      ]}
                    ];
            };
        }
}());
