(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessWb', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-wb.html',
            controller: caProcessProductProcessWbController
        });
    function caProcessProductProcessWbController($log, DataModel, $scope, $stateParams) {
        var vm = this;
        vm.$onInit = function() {
            vm.model = {};
            vm.buttonText = 'Save';
            if($stateParams.processId !== undefined) {
                DataModel.Process
                    .get({id: $stateParams.processId})
                    .$promise
                    .then(function(response){
                        vm.process = response;
                        vm.buttonText = 'Update';
                    });
            }
            vm.settings = [
                {
                    fieldGroup: [
                        {
                            key: 'beginning_quantity',
                            type: 'input',
                            templateOptions: {
                                type: 'number',
                                label: 'Work in process (WIP) beginning',
                                placeholder: 'Units',
                                required: true,
                                errorText: 'Please, fill in WIP beginning quantity'
                            }
                        },
                        {
                            key: 'beginning_conversion_costs_complete',
                            type: 'input',
                            templateOptions: {
                                type: 'number',
                                label: 'WIP beginning conversion cost completed',
                                placeholder: '$',
                                required: true,
                                errorText: 'Please, fill in WIP beginning conversion cost completed'
                            }
                        },
                        {
                            key: 'beginning_direct_materials_complete',
                            type: 'input',
                            templateOptions: {
                                type: 'number',
                                label: 'Cost of WIP beginning direct materials completed',
                                placeholder: '$',
                                required: true,
                                errorText: 'Please, fill in WIP beginning direct materials completed'
                            }
                        }
                    ]
                }
            ];
            vm.formOptions = {};
            vm.formDisabled = false;
        };
        vm.onSave = function() {
            vm.formDisabled = true;
            if(vm.process.id !== undefined) {
                vm.buttonText = "Updating...";
                vm.process.$update({id: $stateParams.processId})
                    .then(function(response){
                        $scope.$emit('PROCESS_UPDATED', response);
                        vm.buttonText = "Update";
                    })
                    .finally(function(){
                        vm.formDisabled = false;
                    });
            }
            else {
                vm.buttonText = "Saving...";
                var process = new DataModel.Process();
                process.name = vm.process.name;
                process.product_id = $stateParams.id;
                if(vm.process.department !== undefined) process.department = vm.process.department;
                process.$save()
                    .then(function(response){
                        $scope.$emit('PROCESS_CREATED', response);
                        vm.process.id = response.id;
                        vm.buttonText = "Update";
                    })
                    .finally(function(){
                        vm.formDisabled = false;
                    });
            }
        };
    }
    caProcessProductProcessWbController.$inject = ['$log', 'DataModel', '$scope', '$stateParams'];
}());