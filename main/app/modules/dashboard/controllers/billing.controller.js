(function(){
    'use strict';
    function DashboardBillingsController($log,authService) {
        var vm = this;
        function init() {

        }
        init();
        vm.changePlan = function() {
            $log.debug('closeplan');
        }
    }
    DashboardBillingsController.$inject = ['$log','authService'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardBillingsController', DashboardBillingsController);
}());