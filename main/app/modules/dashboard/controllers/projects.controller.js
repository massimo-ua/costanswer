(function(){
    'use strict';
    function DashboardProjectsController($log,DataModel,$localStorage,$state,popupService,ngDialog,$scope,toastr,helperService) {
        var vm = this;
        function init() {
            helperService.add("title", "My Projects");
            vm.confirmButtonText = 'Save';
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
            vm.confirmButtonText = 'Save';
            vm.duplicateButtonText = 'Duplicate';
            vm.deleteButtonText = 'Delete';
            vm.openButtonText = 'Open';
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
        vm.DuplicateProject = function(project) {
            popupService.DuplicateProject(project)
                .then(function(response){
                    vm.projects.push(response);
                    toastr.info('Project was cloned succesfuly', 'Operation succesful!');
                })
                .catch(function(err){
                    $log.error(err);
                    toastr.info('There was an error during project duplication', 'Operation failed!');
                });
        }
    }
    DashboardProjectsController.$inject = ['$log','DataModel','$localStorage','$state','popupService','ngDialog','$scope','toastr','helperService'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardProjectsController', DashboardProjectsController);
}());