(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessPp', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-pp.html',
            controller: caProcessProductProcessPpController
        });
    function caProcessProductProcessPpController(DataModel, $stateParams, ProjectDataService, monthService) {
        var vm = this;
        vm.$onInit = function() {
            vm.model = {};
            vm.buttonText = 'Save';
            if($stateParams.processId !== undefined) {
                DataModel.Process
                    .productionPlan({id: $stateParams.processId})
                    .$promise
                    .then(function(response){
                        //vm.model = response;
                        //vm.buttonText = 'Update';
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
                                min: 0
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
                                min: 0
                            }
                        }
                    ]
                }
            ];
            vm.formOptions = {};
            vm.formDisabled = false;
            ProjectDataService.list()
                .then(function(response){
                    for(var i=0; i<vm.settings["0"]["fieldGroup"].length;i++) {
                        vm.settings["0"]["fieldGroup"][i]["templateOptions"]["monthes"] = monthService.AbsoluteMonthes(response.begin_month);
                    }
                    vm.begin_month = response.begin_month;
                });
        };
        vm.onSave = function() {
            vm.formDisabled = true;
            var plan;
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
                plan = new DataModel.Process();
                plan.data = vm.model;
                plan.year_number = 1;
                plan.$saveProductionPlan({ id: $stateParams.processId })
                    .then(function(response){
                        //vm.model.id = response.id;
                        vm.buttonText = "Update";
                    })
                    .finally(function(){
                        vm.formDisabled = false;
                    });
            }
        };
    }
    caProcessProductProcessPpController.$inject = ['DataModel', '$stateParams', 'ProjectDataService', 'monthService'];
}());