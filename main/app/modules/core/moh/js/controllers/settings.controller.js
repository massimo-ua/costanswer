(function(){
    'use strict'
    //controller functions definitions
    function MohSettingsController($scope, $log, $localStorage, MOH_ALLOCATION_BASE, MOH_CALCULATION_BASE, DataModel) {
        var vm = this;
        vm.saveCalculationBase = function() {
            if($localStorage.moh && $localStorage.uuid && vm.mohSettings.calculation_base_id != undefined) {
                var moh = {};
                moh.project_uuid = $localStorage.uuid;
                moh.calculation_base_id = vm.mohSettings.calculation_base_id;
                $log.debug(moh);
                DataModel.Moh.updateWithUuid(moh)
                    .$promise
                        .then(function(){
                            $scope.$emit('MOH_CALCULATION_CHANGE', vm.mohSettings.calculation_base_id);
                        })
                        .catch(function(err){
                            $log.debug(err);
                        });
                        }
                        return;
                }
                vm.saveAllocationBase = function() {
                    if(!$localStorage.moh) {
                        if(!$localStorage.uuid || vm.mohSettings.allocation_base_id == undefined || vm.mohSettings.calculation_base_id == undefined) return;
                        var moh = new DataModel.Moh();
                        moh.project_uuid = $localStorage.uuid;
                        moh.calculation_base_id = vm.mohSettings.calculation_base_id;
                        moh.allocation_base_id = vm.mohSettings.allocation_base_id;
                        moh.$saveWithUuid(function(response){
                            $localStorage.moh = response.id;
                        },
                        function(err){
                            $log.debug(err);
                        });
                    } else {
                        if(!$localStorage.uuid || vm.mohSettings.allocation_base_id == undefined) return;
                        var moh = {};
                        moh.project_uuid = $localStorage.uuid;
                        moh.allocation_base_id = vm.mohSettings.allocation_base_id;
                        DataModel.Moh.updateWithUuid(moh).$promise
                            .catch(function(err){
                                $log.debug(err);
                            });
                    }

                }
                function init() {
                    vm.mohSettings = {};
                    vm.uuid = $localStorage.uuid;
                    if(vm.uuid != undefined) {
                        DataModel.Moh.getWithUuid({ uuid: vm.uuid }, function(response){
                            vm.mohSettings.calculation_base_id = parseInt(response.calculation_base_id);
                            vm.mohSettings.allocation_base_id = parseInt(response.allocation_base_id);
                            $scope.$emit('MOH_CALCULATION_CHANGE', vm.mohSettings.calculation_base_id);
                        });
                    }
                    vm.moh_allocation_base = MOH_ALLOCATION_BASE;
                    vm.moh_calculation_base = MOH_CALCULATION_BASE;
                };
                init();
    }
    //dependencies injection block
    MohSettingsController.$inject = ['$scope', '$log', '$localStorage', 'MOH_ALLOCATION_BASE', 'MOH_CALCULATION_BASE', 'DataModel'];
    //controller function linking
    angular.module('costAnswer.core.moh.controllers')
        .controller('MohSettingsController', MohSettingsController)
}());