(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessWe', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-s.html',
            controller: caProcessProductProcessWeController
        });
    function caProcessProductProcessWeController(DataModel, $stateParams, ProjectDataService, monthService) {
        var vm = this;

        vm.$onInit = function() {
            vm.model = {};
            vm.year_number = 1;
            vm.month_number = 0;
            vm.formOptions = {};
            vm.controls = {
                buttonText: "Save",
                formDisabled: false
            };
            ProjectDataService.list()
            .then(function(response){
                vm.project_begin_month = response.begin_month;
            });
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
                    className: "row",
                    fieldGroup: [
                        {
                            key: 'ending_conversion_costs_complete_rate',
                            type: 'ca-annualMonthly',
                            templateOptions: {
                                type: 'number',
                                label: 'Conversion costs complete',
                                placeholder: '%',
                                min: 0,
                                required: true,
                                monthes: monthService.AbsoluteMonthes(vm.project_begin_month)
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
                wip.year_number = 1;
                for(var k in vm.model) wip[k] = vm.model[k];
                wip.$saveWip({ id: $stateParams.processId })
                    .finally(function(){
                        vm.controls.formDisabled = false;
                        vm.controls.buttonText = "Save";
                    });
        };
    }
    caProcessProductProcessWeController.$inject = ['DataModel', '$stateParams', 'ProjectDataService', 'monthService'];
}());