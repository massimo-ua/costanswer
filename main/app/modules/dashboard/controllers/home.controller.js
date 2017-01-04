(function(){
    'use strict';
    function DashboardHomeController($log) {
        var vm = this;
        vm.headText = 'DashboardHomeController Home Page';
    }
    DashboardHomeController.$inject = ['$log'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardHomeController', DashboardHomeController);
}());