(function(){
    'use strict';
    angular.module('costAnswer.core.components')
        .component('caAnnualOne', {
            bindings: {
                nextSref: '@'
            },
            templateUrl: 'app/modules/core/views/ca-annual-one.html',
            controller: caAnnualOneController
        });
    function caAnnualOneController($log) {
        var vm = this;
    }
    caAnnualOneController.$inject = ['$log'];
})();