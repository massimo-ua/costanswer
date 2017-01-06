(function(){
    'use strict';
    function DashboardSettingsController($log) {
        var vm = this;
        vm.headText = 'DashboardSettingsController Home Page';
    }
    DashboardSettingsController.$inject = ['$log'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardSettingsController', DashboardSettingsController);
}());