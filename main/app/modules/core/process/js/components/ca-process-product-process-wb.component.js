(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessWb', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-s.html',
            controller: caProcessProductProcessWbController
        });
    function caProcessProductProcessWbController(DataModel, $stateParams) {
        var vm = this;
        vm.$onInit = function() {
            vm.model = {};
            vm.formOptions = {};
            vm.controls = {
                buttonText : 'Save',
                formDisabled: false
            };
            if($stateParams.processId !== undefined) {
                DataModel.Process
                    .getWip({id: $stateParams.processId})
                    .$promise
                    .then(function(response){
                        //if response is not empty
                        if(response.length > 0) {
                            //loop over response
                            for(var i = 0; i < response.length; i++) {
                                //take only first month (becouse wip beginning is stored only in first month params)
                                if(response[i]["month_number"] == 1) {
                                    vm.model = response[i];
                                }
                            }
                        }
                    });
            }
            vm.settings = [
                {
                    fieldGroup: [
                        {
                            key: 'beginning_quantity',
                            type: 'ca-input',
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
                            type: 'ca-input',
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
                            type: 'ca-input',
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
        };
        vm.onSave = function() {
            vm.controls.formDisabled = true;
            var wip;
                vm.buttonText = "Saving...";
                wip = new DataModel.Process();
                wip.year_number = vm.year_number;
                wip[0] = {};
                for(var k in vm.model) {
                    wip[0][k] = vm.model[k];
                }
                wip.$saveWip({ id: $stateParams.processId })
                    .finally(function(){
                        vm.controls.formDisabled = false;
                        vm.controls.buttonText = "Save";
                    });
        };
    }
    caProcessProductProcessWbController.$inject = ['DataModel', '$stateParams'];
}());