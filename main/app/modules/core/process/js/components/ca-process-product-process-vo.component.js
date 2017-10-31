(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessVo', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-c.html',
            controller: caProcessProductProcessVoController
        });
    function caProcessProductProcessVoController(DataModel, $stateParams, ProjectDataService, monthService, reportService) {
        var vm = this;
        vm.$onInit = function() {
            vm.model = {};
            vm.itemsList = [];
            vm.updateMode = false;
            vm.year_number = 1;
            ProjectDataService.list()
                .then(function(response){
                    vm.project_begin_month = response.begin_month;
                });
            if($stateParams.processId !== undefined) DataModel.Process
                .variableOverhead({id: $stateParams.processId})
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
                            key: 'name',
                            type: 'ca-input',
                            templateOptions: {
                                type: 'text',
                                label: 'Name of variable overhead',
                                placeholder: 'Name',
                                maxlength: 20,
                                required: true
                            }
                        },
                        {
                            key: 'amount_per_batch',
                            type: 'ca-input',
                            templateOptions: {
                                type: 'number',
                                label: 'Amount per batch',
                                placeholder: '$',
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
                buttonText: "Add",
                formDisabled: false
            };
            refreshReport();
        };
        function refreshReport(variableOverheadId) {
            if($stateParams.processId) {
                reportService.instant.Process.variable_overhead($stateParams.processId, variableOverheadId)
                    .then(function(response){
                        vm.instantReport = response.data.reportdata[0];
                    });
            }
            return;
        }
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
            dl.$saveVariableOverhead({ id: $stateParams.processId })
                .then(function(response){
                    refreshReport();
                    callback(response);
                })
                .finally(function(){
                    vm.controls.formDisabled = false;
                    vm.controls.buttonText = 'Add';
                });
        }
        vm.onDelete = function(item, callback) {
            if(item && item.id) {
                DataModel.Product.deleteVariableOverhead({ id: item.id })
                    $promise
                        .then(function(){
                            refreshReport();
                        });
            }
            callback();
        };
        vm.onLoad = function(variableOverheadId) {
            refreshReport(variableOverheadId);
        };
    }
    caProcessProductProcessVoController.$inject = ['DataModel', '$stateParams', 'ProjectDataService', 'monthService', 'reportService'];
}());