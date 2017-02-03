(function(){
    'use strict';
    function ProjectDataInputMainController(
        $log,
        $localStorage,
        $scope,
        PROJECT_TYPES,
        DATAINPUT_HEADER,
        $state,
        DataModel,
        authService,
        ngDialog,
        popupService,
        toastr
        ){
        var vm = this;
        function init() {
            DataModel.Project.uuid({ uuid: $localStorage.uuid })
                .$promise
                    .then(function(response){
                        vm.projectType = PROJECT_TYPES[response.type_id];
                    });
            vm.datainput_header = DATAINPUT_HEADER;
            vm.duplicateButtonText = 'Duplicate';
            $scope.confirmButtonText = 'Save';
        }
        init();
        vm.clearAll = function() {
            $localStorage.$reset();
            $state.go('startCore');
        };
        vm.Save = function() {
            if(authService.isAuthenticated()) {
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
                        $scope.confirmButtonText = 'Saving...';
                        var project = new DataModel.Project();
                        project.name = value.name;
                        project.$setName({ uuid: $localStorage.uuid })
                            .catch(function(err){
                                $log.error(err);
                            })
                            .finally(function(){
                                $scope.confirmButtonText = 'Save';
                            });
                    });
            } else {
                popupService.OptionNotAllowed();
            }
        }
        vm.DuplicateProject = function() {
            if(authService.isAuthenticated()) {
                popupService.DuplicateProject({
                    uuid: $localStorage.uuid
                })
                    .then(function(){
                        toastr.info('Project was cloned succesfuly', 'Operation succesful!');
                        $state.go('dashboard.Projects');
                    })
                    .catch(function(err){
                        $log.error(err);
                        toastr.info('There was an error during project duplication', 'Operation failed!');
                    });
            }
            else {
                popupService.OptionNotAllowed();
            }

        }
    }
    ProjectDataInputMainController.$inject = [
        '$log',
        '$localStorage',
        '$scope',
        'PROJECT_TYPES',
        'DATAINPUT_HEADER',
        '$state',
        'DataModel',
        'authService',
        'ngDialog',
        'popupService',
        'toastr'
    ];
    angular.module('costAnswer.core.controllers')
        .controller('ProjectDataInputMainController', ProjectDataInputMainController);
}());