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
            vm.buttonText = 'Save';
            vm.year_number = 1;
            ProjectDataService.list()
                .then(function(response){
                    vm.project_begin_month = response.begin_month;
                });
            /*if($stateParams.processId !== undefined) DataModel.Process
                .directMaterial({id: $stateParams.processId})
                .$promise
                .then(function (response) {
                    if (response.length > 0) {
                        vm.itemsList = response;
                        vm.buttonText = 'Update';
                        vm.updateMode = true;
                    }
                });*/
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
            vm.nameProperty = 'name';
            vm.controls = {
                buttonText: "Add"
            };
        };
        vm.onSave = saveFormData;
        vm.onUpdate = saveFormData;
        vm.onClear = function(){
            vm.form.$setPristine();
            vm.form.$setUntouched();
        };
        function saveFormData(item, callback) {
            /*var dm = new DataModel.Process();
            for(var k in item) dm[k] = item[k];
            dm.year_number = vm.year_number;
            dm.$saveDirectMaterial({ id: $stateParams.processId })
                .then(function(response){
                    callback(response);
                });*/
        }
        vm.onDelete = function(item, callback) {
            if(item && item.id) {
                DataModel.Product.deleteDirectMaterial({ id: item.id });
            }
            callback();
        };
        vm.onLoad = function(component_id) {
            //refreshReport(component_id);
        };
    }
    caProcessProductProcessDlController.$inject = ['DataModel', '$stateParams', 'ProjectDataService', 'monthService'];
}());