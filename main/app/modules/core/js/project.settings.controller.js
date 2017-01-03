(function(){
    'use strict';

    angular.module('costAnswer.core.controllers')
        .controller('ProjectSettingsController',ProjectSettingsController);
    ProjectSettingsController.$inject = ['$state', '$localStorage', '$log', 'toastr', 'PROJECT_TYPES', 'CURRENCIES', 'MONTHES', 'DataModel'];
    function ProjectSettingsController($state, $localStorage, $log, toastr, PROJECT_TYPES, CURRENCIES, MONTHES, DataModel) {
        var vm = this;
        function init() {
            vm.nextNew = true;
            try {
                vm.projectUuid = $localStorage.uuid;
            } catch(err) {
                $log.info(err.name + ' ' + err.message);
            }
            if(vm.projectUuid != undefined) {
                DataModel.Project.uuid({ uuid: vm.projectUuid })
                    .$promise
                        .then(function(response){
                            vm.settings.begin_month = parseInt(response.begin_month);
                            vm.settings.begin_year = parseInt(response.begin_year);
                            vm.settings.currency_id = parseInt(response.currency_id);
                            vm.settings.company_name = response.company_name;
                            vm.projectId = response.id;
                            vm.nextNew = false;
                        })
                        .catch(function(err){
                            $log.error(err.name + ' ' + err.message);
                        });
            }
            vm.settings = {};
            vm.currencies = CURRENCIES;
            vm.monthes = MONTHES;
        }
        init();
        vm.next = function() {
            if(vm.nextNew) {
                var project = new DataModel.Project();
                project.begin_month = vm.settings.begin_month;
                project.begin_year = vm.settings.begin_year;
                project.currency_id = vm.settings.currency_id;
                project.company_name = vm.settings.company_name;
                project.type_id = $localStorage.type;
                project.$save
                    .then(function(response){
                        $localStorage.uuid = response.uuid;
                        $state.go('moh');
                    })
                    .catch(function(err){
                        $log.error(err.name + ' ' + err.message);
                    });
            } else {
                if(vm.projectId) {
                    var project = new DataModel.Project();
                        project.begin_month = vm.settings.begin_month;
                        project.begin_year = vm.settings.begin_year;
                        project.currency_id = vm.settings.currency_id;
                        project.company_name = vm.settings.company_name;
                    project.$update({ id: vm.projectId })
                        .catch(function(err){
                            $log.error(err.name + ' ' + err.message);
                        });
                }
                $state.go('moh');
            }
        }
    }
}());