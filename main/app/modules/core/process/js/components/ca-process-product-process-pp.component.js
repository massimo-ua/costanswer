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
            vm.updateMode = false;
            vm.buttonText = 'Save';
            if($stateParams.processId !== undefined) {
                DataModel.Process
                    .productionPlan({id: $stateParams.processId})
                    .$promise
                    .then(function(response){
                        if(!angular.equals({}, response)) {
                            vm.model = response;
                            vm.buttonText = 'Update';
                            vm.updateMode = true;
                        }
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
            vm.buttonText = vm.updateMode ? "Updating..." : "Saving...";
            var plan = new DataModel.Process();
            plan.data = vm.model;
            plan.year_number = 1;
            plan.$saveProductionPlan({ id: $stateParams.processId })
                .then(function(){
                    vm.updateMode = true;
                })
                .finally(function(){
                    vm.buttonText = vm.updateMode ? "Update" : "Save";
                });
        };
    }
    caProcessProductProcessPpController.$inject = ['DataModel', '$stateParams', 'ProjectDataService', 'monthService'];
}());