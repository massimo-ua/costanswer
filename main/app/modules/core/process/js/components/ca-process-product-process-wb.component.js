(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessWb', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-wb.html',
            controller: caProcessProductProcessWbController
        });
    function caProcessProductProcessWbController(DataModel, $stateParams) {
        var vm = this;
        vm.$onInit = function() {
            vm.model = {};
            vm.buttonText = 'Save';
            if($stateParams.processId !== undefined) {
                DataModel.Process
                    .getWip({id: $stateParams.processId})
                    .$promise
                    .then(function(response){
                        vm.model.id = response.id;
                        vm.model.beginning_quantity = response.beginning_quantity / 100;
                        vm.model.beginning_conversion_costs_complete = response.beginning_conversion_costs_complete / 100;
                        vm.model.beginning_direct_materials_complete = response.beginning_direct_materials_complete / 100;
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
                                min: 0,
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
                                min: 0,
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
                                min: 0,
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
            var wip;
            if(vm.model.id !== undefined) {
                vm.buttonText = "Updating...";
                wip = DataModel.Wip();
                wip.beginning_quantity = vm.model.beginning_quantity * 100;
                wip.beginning_conversion_costs_complete = vm.model.beginning_conversion_costs_complete * 100;
                wip.beginning_direct_materials_complete = vm.model.beginning_direct_materials_complete * 100;
                wip.$update({id: $stateParams.processId})
                    .then(function(response){
                        vm.buttonText = "Update";
                    })
                    .finally(function(){
                        vm.formDisabled = false;
                    });
            }
            else {
                vm.buttonText = "Saving...";
                wip = new DataModel.Process();
                wip.year_number = 1;
                wip.month_number = 1;
                wip.beginning_quantity = vm.model.beginning_quantity * 100;
                wip.beginning_conversion_costs_complete = vm.model.beginning_conversion_costs_complete * 100;
                wip.beginning_direct_materials_complete = vm.model.beginning_direct_materials_complete * 100;
                wip.$saveWip({ id: $stateParams.processId })
                    .then(function(response){
                        vm.model.id = response.id;
                        vm.buttonText = "Update";
                    })
                    .finally(function(){
                        vm.formDisabled = false;
                    });
            }
        };
    }
    caProcessProductProcessWbController.$inject = ['DataModel', '$stateParams'];
}());