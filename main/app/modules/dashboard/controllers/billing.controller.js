(function(){
    'use strict';
    function DashboardBillingsController($log,authService, helperService) {
        var vm = this;
        function init() {
            helperService.storage["title"] = "Billing and upgrade";
        }
        init();
        vm.changePlan = function() {
            $log.debug('closeplan');
        }
    }
    DashboardBillingsController.$inject = ['$log','authService', 'helperService'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardBillingsController', DashboardBillingsController);
}());