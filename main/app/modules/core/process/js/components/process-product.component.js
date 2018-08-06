(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProduct', {
            restrict: 'E',
            templateUrl: 'app/modules/core/process/views/product.html',
            controller: caProcessProductController
        });
    function caProcessProductController($log, processService, $state) {
        var vm = this;
        vm.$onInit = function() {
            vm.productPropeties = processService.productPropeties();
            vm.initialState = $state.current.name;
        };
    }
    caProcessProductController.$inject = ['$log', 'processService', '$state'];
}());