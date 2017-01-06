(function(){
    'use strict';
    function DashboardProjectsController($log,DataModel) {
        var vm = this;
        function init() {
            DataModel.Project
                .query({})
                .$promise
                    .then(function(response){
                       vm.projects = response;
                    })
                    .catch(function(err){
                        $log.error(err);
                    });
            vm.tabs = [
                { text: "All", filter: undefined },
                { text: "Forecast", filter: 1 },
                { text: "Actual", filter: 2 },
                { text: "Variance", filter: 3 }
            ];
        }
        init();
        vm.setFilterValue = function(value) {
            vm.type_filter = value;
        }
    }
    DashboardProjectsController.$inject = ['$log','DataModel'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardProjectsController', DashboardProjectsController);
}());