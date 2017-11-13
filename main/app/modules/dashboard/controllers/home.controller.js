(function(){
    'use strict';
    function DashboardHomeController($log, helperService) {
        var vm = this;
        vm.title = helperService.getValue("title");
    }
    DashboardHomeController.$inject = ['$log','helperService'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardHomeController', DashboardHomeController);
}());