(function(){
    'use strict';
    function DashboardHomeController($log, helperService) {
        var vm = this;
        vm.title = helperService.storage["title"];
    }
    DashboardHomeController.$inject = ['$log','helperService'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardHomeController', DashboardHomeController);
}());