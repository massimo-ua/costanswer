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
        ngDialog
        ){
        var vm = this;
        function init() {
            DataModel.Project.uuid({ uuid: $localStorage.uuid })
                .$promise
                    .then(function(response){
                        vm.projectType = PROJECT_TYPES[response.type_id];
                    });
            vm.datainput_header = DATAINPUT_HEADER;
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
                ngDialog.openConfirm({
                    template: 'app/modules/core/views/dialogs/option-not-allowed.html',
                    className: 'ngdialog-theme-plain',
                    closeByDocument: false,
                    closeByEscape: false,
                    showClose: true
                });
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
        'ngDialog'
    ];
    angular.module('costAnswer.core.controllers')
        .controller('ProjectDataInputMainController', ProjectDataInputMainController);
}());