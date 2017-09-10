(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessDl', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-dl.html',
            controller: caProcessProductProcessDlController
        });
    function caProcessProductProcessDlController(DataModel, $stateParams, ProjectDataService, monthService) {
        var vm = this;
        vm.$onInit = function() {
            vm.model = {};
            vm.updateMode = false;
            vm.year_number = 1;
            ProjectDataService.list()
                .then(function(response){
                    vm.project_begin_month = response.begin_month;
                });
            if($stateParams.processId !== undefined) DataModel.Process
                .directLabor({id: $stateParams.processId})
                .$promise
                .then(function (response) {
                    if (response.length > 0) {
                        vm.itemsList = response;
                        vm.buttonText = 'Update';
                        vm.updateMode = true;
                    }
                });
            vm.settings = [
                {
                    className: "row",
                    fieldGroup: [
                        {
                            key: 'worker',
                            type: 'ca-input',
                            templateOptions: {
                                type: 'text',
                                label: 'Worker name/title',
                                placeholder: 'Name',
                                maxlength: 20,
                                required: true
                            }
                        },
                        {
                            key: 'hours_per_batch_required',
                            type: 'ca-input',
                            templateOptions: {
                                type: 'number',
                                label: 'Hours per batch required',
                                placeholder: 'Hours',
                                required: true,
                                min: 0
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
                        },
                        {
                            key: 'payroll_taxes',
                            type: 'ca-input',
                            templateOptions: {
                                type: 'number',
                                label: 'Payroll taxes',
                                placeholder: '$',
                                required: true,
                                min: 0
                            }
                        },
                        {
                            key: 'annual_growth_rate',
                            type: 'ca-input',
                            templateOptions: {
                                type: 'number',
                                label: 'Annual growth rate',
                                placeholder: '%',
                                required: true,
                                min: 0
                            }
                        }
                    ]
                }
            ];
            vm.formOptions = {};
            vm.formDisabled = false;
            vm.nameProperty = 'worker';
            vm.controls = {
                buttonText: "Add",
                formDisabled: false
            };
        };
        vm.onSave = saveFormData;
        vm.onUpdate = saveFormData;
        vm.onClear = function(){
            vm.form.$setPristine();
            vm.form.$setUntouched();
        };
        function saveFormData(item, callback) {
            vm.controls.formDisabled = true;
            vm.controls.buttonText = item.id ? 'Updating...' : 'Saving...';
            var dl = new DataModel.Process();
            for(var k in item) dl[k] = item[k];
            dl.year_number = vm.year_number;
            dl.$saveDirectLabor({ id: $stateParams.processId })
                .then(function(response){
                    callback(response);
                })
                .finally(function(){
                    vm.controls.formDisabled = false;
                    vm.controls.buttonText = 'Add';
                });
        }
        vm.onDelete = function(item, callback) {
            if(item && item.id) {
                DataModel.Product.deleteDirectLabor({ id: item.id });
            }
            callback();
        };
        vm.onLoad = function(component_id) {
            //refreshReport(component_id);
        };
    }
    caProcessProductProcessDlController.$inject = ['DataModel', '$stateParams', 'ProjectDataService', 'monthService'];
}());