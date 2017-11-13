(function(){
    'use strict';
    function DashboardHomeController($log, helperService) {
        var vm = this;
        vm.title = "My Account";
        helperService.subscribe("title", function(title) {
            vm.title = title;
        });
    }
    DashboardHomeController.$inject = ['$log','helperService'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardHomeController', DashboardHomeController);
}());