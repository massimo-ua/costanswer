(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessMh', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-s.html',
            controller: caProcessProductProcessMhController
        });
    function caProcessProductProcessMhController(DataModel, $stateParams, ProjectDataService, monthService) {
        var vm = this;
        vm.$onInit = function() {
            vm.model = {};
            vm.year_number = 1;
            vm.month_number = 0;
            vm.formOptions = {};
            vm.nameProperty = 'name';
            vm.controls = {
                buttonText: "Save",
                formDisabled: false
            };
            ProjectDataService.list()
                .then(function(response){
                    vm.project_begin_month = response.begin_month;
                });
            if($stateParams.processId !== undefined) DataModel.Process
                .machineHours({id: $stateParams.processId})
                .$promise
                .then(function (response) {
                        vm.model = response;
                        vm.controls.buttonText = 'Update';
                });
            vm.settings = [
                {
                    className: "row",
                    fieldGroup: [
                        {
                            key: 'hours_per_batch_required',
                            type: 'ca-input',
                            templateOptions: {
                                type: 'number',
                                label: 'Machine hours per batch required',
                                placeholder: 'Hours',
                                min: 0,
                                required: true
                            }
                        },
                        {
                            key: 'hourly_rate',
                            type: 'ca-input',
                            templateOptions: {
                                type: 'number',
                                label: 'Hourly rate',
                                placeholder: '$',
                                required: true,
                                min: 0
                            }
                        }
                    ]
                }
            ];
        };
        vm.onSave = saveFormData;
        function saveFormData() {
            vm.controls.formDisabled = true;
            vm.controls.buttonText = vm.model.id ? 'Updating...' : 'Saving...';
            var mh = new DataModel.Process();
            for(var k in vm.model) mh[k] = vm.model[k];
            mh.year_number = vm.year_number;
            mh.month_number = vm.month_number;
            mh.$saveMachineHours({ id: $stateParams.processId })
                .finally(function(){
                    vm.controls.formDisabled = false;
                    vm.controls.buttonText = 'Update';
                });
        }
        vm.onLoad = function(component_id) {
            //refreshReport(component_id);
        };
    }
    caProcessProductProcessMhController.$inject = ['DataModel', '$stateParams', 'ProjectDataService', 'monthService'];
}());
