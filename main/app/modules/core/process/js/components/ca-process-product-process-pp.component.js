(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessPp', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-s.html',
            controller: caProcessProductProcessPpController
        });
    function caProcessProductProcessPpController(DataModel, $stateParams, ProjectDataService, monthService, reportService) {
        var vm = this;
        vm.$onInit = function() {
            vm.updateMode = false;
            vm.model = {};
            vm.formOptions = {};
            vm.controls = {
                buttonText : 'Save',
                formDisabled: false
            };
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
                            type: 'ca-annualMonthly',
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
                            type: 'ca-annualMonthly',
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
            refreshReport();
        };
        function refreshReport() {
            if($stateParams.processId) {
                reportService.instant.Process.production_plan($stateParams.processId)
                    .then(function(response){
                        vm.instantReport = response.data.reportdata[0];
                    });
            }
            return;
        }
        vm.onSave = function() {
            vm.controls.formDisabled = true;
            vm.controls.buttonText = vm.updateMode ? "Updating..." : "Saving...";
            var plan = new DataModel.Process();
            plan.data = vm.model;
            plan.year_number = 1;
            plan.$saveProductionPlan({ id: $stateParams.processId })
                .then(function(){
                    vm.updateMode = true;
                    refreshReport();
                })
                .finally(function(){
                    vm.controls.buttonText = vm.updateMode ? "Update" : "Save";
                    vm.controls.formDisabled = false;
                });
        };
    }
    caProcessProductProcessPpController.$inject = ['DataModel', '$stateParams', 'ProjectDataService', 'monthService', 'reportService'];
}());