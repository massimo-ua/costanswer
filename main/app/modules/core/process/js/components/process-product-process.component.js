(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcess', {
            templateUrl: 'app/modules/core/process/views/product-process.html',
            controller: caProcessProductProcessController
        });
        var vm = this;
        function caProcessProductProcessController($log) {
        vm.$onInit = function() {
          $log.debug('caProcessProductProcessController');
        };
    }
    caProcessProductProcessController.$inject = ['$log'];
}());
