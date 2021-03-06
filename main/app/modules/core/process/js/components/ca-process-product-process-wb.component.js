(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessWb', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-s.html',
            controller: caProcessProductProcessWbController
        });
    function caProcessProductProcessWbController(DataModel, $stateParams, reportService) {
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
                        if(!angular.equals(response,{})) {
                            //loop over response
                            angular.forEach(response, function(item, key) {
                                if(item.month_number == 1) {
                                    this.model = item;
                                }
                              }, vm);
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
                                label: 'WIP beginning  (Units)',
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
                                label: 'WIP beginning conversion cost',
                                placeholder: '$',
                                required: true,
                                min: 0,
                                errorText: 'Please, fill in WIP beginning conversion cost'
                            }
                        },
                        {
                            key: 'beginning_direct_materials_complete',
                            type: 'ca-input',
                            templateOptions: {
                                type: 'number',
                                label: 'WIP beginning direct materials',
                                placeholder: '$',
                                required: true,
                                min: 0,
                                errorText: 'Please, fill in WIP beginning direct materials'
                            }
                        }
                    ]
                }
            ];
            refreshReport();
        };
        function refreshReport() {
            if($stateParams.processId) {
                reportService.instant.Process.wip_beginning($stateParams.processId)
                    .then(function(response){
                        vm.instantReport = response.data.reportdata[0];
                    });
            }
            return;
        }
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
                    .then(function(response){
                        vm.model = response[0];
                        refreshReport();
                    })
                    .finally(function(){
                        vm.controls.formDisabled = false;
                        vm.controls.buttonText = "Save";
                    });
        };
    }
    caProcessProductProcessWbController.$inject = ['DataModel', '$stateParams', 'reportService'];
}());