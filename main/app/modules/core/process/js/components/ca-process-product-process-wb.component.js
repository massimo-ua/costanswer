(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessWb', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-wb.html',
            controller: caProcessProductProcessWbController
        });
    function caProcessProductProcessWbController($log) {
        var vm = this;
    }
    caProcessProductProcessWbController.$inject = ['$log'];
}());