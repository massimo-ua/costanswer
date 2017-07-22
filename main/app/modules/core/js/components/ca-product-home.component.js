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
        vm.tabsList = menuService.productPropeties(vm.costingMethodName);
        vm.initialState = $state.current.name;
    }
    caProductHomeController.$inject = ['$log','$state','menuService'];
})();