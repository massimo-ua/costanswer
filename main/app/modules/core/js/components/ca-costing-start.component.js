(function(){
    'use strict';
    angular.module('costAnswer.core.components')
        .component('caCostingStart', {
            bindings: {
                nextSref: '@',
                buttonText: '@?'
            },
            templateUrl: 'app/modules/core/views/ca-costing-start.html',
            controller: caCostingStartController
        });
    function caCostingStartController($log) {
        var vm = this;
        vm.$onInit(function(){
            vm.buttonValue = vm.buttonText || 'Create product or service';
        });
    }
    caCostingStartController.$inject = ['$log'];
})();