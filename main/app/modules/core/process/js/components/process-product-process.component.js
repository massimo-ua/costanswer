(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcess', {
            templateUrl: 'app/modules/core/process/views/product-process.html',
            controller: caProcessProductProcessController
        });
        function caProcessProductProcessController($log, $stateParams, entityService, $scope, $state, DataModel) {
          var vm = this;

    }
    caProcessProductProcessController.$inject = ['$log', '$stateParams', 'entityService', '$scope', '$state', 'DataModel'];
}());
