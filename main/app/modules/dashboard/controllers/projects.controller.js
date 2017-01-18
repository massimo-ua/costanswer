(function(){
    'use strict';
    function DashboardProjectsController($log,DataModel,$localStorage,$state,popupService) {
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
        vm.DeleteProject = function(project) {
            popupService.ConfirmAction('Please confirm deletion of project "' + project.name + '"!')
            .then(
                function(value) {
                    DataModel
                        .Project
                            .delete({ uuid: project.uuid })
                            .$promise
                                .then(function(response){
                                    for(var i=0; i < vm.projects.length; i++) {
                                        if(vm.projects[i].id == project.id) {
                                            $log.debug(i);
                                            vm.projects.splice(i, 1);
                                        }
                                    }
                                })
                                .catch(function(err){
                                    $log.error(err);
                                });
                },
                function(value){
                    $log.debug('Cancel deletion');
                });
        }
        vm.SaveAsProject = function(project) {
            $log.debug(project);
        }
    }
    DashboardProjectsController.$inject = ['$log','DataModel','$localStorage','$state','popupService'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardProjectsController', DashboardProjectsController);
}());