(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessWe', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-s.html',
            controller: caProcessProductProcessWeController
        });
    function caProcessProductProcessWeController(DataModel, $stateParams, ProjectDataService, monthService, reportService) {
        var vm = this;

        vm.$onInit = function() {
            vm.model = {};
            vm.year_number = 1;
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
                        vm.model = response;
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
            refreshReport();
        };
        function refreshReport() {
            if($stateParams.processId) {
                reportService.instant.Process.wip_ending($stateParams.processId)
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
                wip.year_number = 1;
                for(var k in vm.model) wip[k] = vm.model[k];
                wip.$saveWip({ id: $stateParams.processId })
                    .then(function(){
                        refreshReport();
                    })
                    .finally(function(){
                        vm.controls.formDisabled = false;
                        vm.controls.buttonText = "Save";
                    });
        };
    }
    caProcessProductProcessWeController.$inject = ['DataModel', '$stateParams', 'ProjectDataService', 'monthService', 'reportService'];
}());
