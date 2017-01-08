(function(){
    'use strict';
    function DashboardSettingsController($log,authService) {
        var vm = this;
        function init() {
            vm.profile = authService.profile();
        }
        init();
    }
    DashboardSettingsController.$inject = ['$log','authService'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardSettingsController', DashboardSettingsController);
}());