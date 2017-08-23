(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessPp', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-pp.html',
            controller: caProcessProductProcessPpController
        });
    function caProcessProductProcessPpController(DataModel, $stateParams, ProjectDataService) {
        var vm = this;
        vm.$onInit = function() {
            ProjectDataService.list()
                .then(function(response){
                    vm.monthes = monthService.AbsoluteMonthes(response.begin_month);
                    vm.begin_month = response.begin_month;
                });
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
                            key: 'goods_started_in_production',
                            type: 'annualMonthly',
                            templateOptions: {
                                type: 'number',
                                label: 'Units started into production',
                                placeholder: 'Units',
                                required: true,
                                min: 0,
                                monthes: vm.monthes
                            }
                        },
                        {
                            key: 'goods_transfered_out',
                            type: 'annualMonthly',
                            templateOptions: {
                                type: 'number',
                                label: 'Units completed and transferred out to the next process or warehouse',
                                placeholder: 'Units',
                                required: true,
                                min: 0,
                                monthes: vm.monthes
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
                wip = new DataModel.Wip();
                wip.beginning_quantity = vm.model.beginning_quantity * 100;
                wip.beginning_conversion_costs_complete = vm.model.beginning_conversion_costs_complete * 100;
                wip.beginning_direct_materials_complete = vm.model.beginning_direct_materials_complete * 100;
                wip.$update({ id: vm.model.id })
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
    caProcessProductProcessPpController.$inject = ['DataModel', '$stateParams', 'ProjectDataService'];
}());