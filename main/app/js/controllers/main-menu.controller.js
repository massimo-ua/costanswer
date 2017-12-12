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
                vm.konami = [{
                    name: "Konami",
                    link: "#",
                    subtree: [{
                      name: "Metal Gear",
                      link: "#",
                      subtree: [{
                        name: "Metal Gear",
                        link: "metal-gear"
                      }, {
                        name: "Metal Gear 2: Solid Snake",
                        link: "metal-gear2"
                      }, {
                        name: "Metal Gear Solid: The Twin Snakes",
                        link: "metal-gear-solid"
                      }]
                    }]
                  }];
            };
        }
}());
