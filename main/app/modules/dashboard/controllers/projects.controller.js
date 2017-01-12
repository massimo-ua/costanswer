(function(){
    'use strict';
    function DashboardProjectsController($log,DataModel,$localStorage,$state) {
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
        vm.OpenProject = function(uuid) {
            if(uuid == undefined) return;
            $localStorage.uuid = uuid;
            DataModel.Moh.getWithUuid({ uuid: uuid }, function(response){
                $localStorage.moh = parseInt(response.id);
                $state.go('projectSettings');
            });
        }
    }
    DashboardProjectsController.$inject = ['$log','DataModel','$localStorage','$state'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardProjectsController', DashboardProjectsController);
}());