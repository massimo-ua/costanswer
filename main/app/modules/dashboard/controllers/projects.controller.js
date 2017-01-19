(function(){
    'use strict';
    function DashboardProjectsController($log,DataModel,$localStorage,$state,popupService,ngDialog,$scope) {
        var vm = this;
        function init() {
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
                ngDialog.openConfirm({
                    template: 'app/modules/core/views/dialogs/set-project-name.html',
                    className: 'ngdialog-theme-plain',
                    closeByDocument: false,
                    closeByEscape: false,
                    showClose: true,
                    scope: $scope
                })
                .then(
                    function(value) {
                        vm.confirmButtonText = 'Saving...';
                        /*var project = new DataModel.Project();
                        project.name = value.name;
                        project.$setName({ uuid: $localStorage.uuid })
                            .catch(function(err){
                                $log.error(err);
                            })
                            .finally(function(){
                                $scope.confirmButtonText = 'Save';
                            });*/
                    });
        }
    }
    DashboardProjectsController.$inject = ['$log','DataModel','$localStorage','$state','popupService','ngDialog','$scope'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardProjectsController', DashboardProjectsController);
}());