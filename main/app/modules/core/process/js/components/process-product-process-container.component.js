(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessContainer', {
            templateUrl: 'app/modules/core/process/views/process-product-process-container.html',
            controller: caProcessProductProcessContainerController
        });
    function caProcessProductProcessContainerController($log, $state, $stateParams, menuService) {
        var vm = this;
        vm.tabsList = menuService.properties('process-property');
        vm.initialState = $state.current.name;
        vm.config = {
            srefParams: function(){
                return {
                    id: $stateParams.id,
                    processId: $stateParams.processId
                }
            }
        };
    }
    caProcessProductProcessContainerController.$inject = ['$log', '$state', '$stateParams', 'menuService'];
}());