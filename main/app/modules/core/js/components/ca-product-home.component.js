(function(){
    'use strict';
    angular.module('costAnswer.core.components')
        .component('caProductHome', {
            bindings: {
                costingMethodName: '@'
            },
            templateUrl: 'app/modules/core/views/ca-product-home.html',
            controller: caProductHomeController
        });
    function caProductHomeController($log, $state, menuService) {
        var vm = this;
        vm.$onInit = function() {
            vm.tabsList = menuService.properties(vm.costingMethodName);
            vm.initialState = $state.current.name;
        }
    }
    caProductHomeController.$inject = ['$log','$state','menuService'];
})();