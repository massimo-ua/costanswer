(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessDm', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-c.html',
            controller: caProcessProductProcessDmController
        });
    function caProcessProductProcessDmController(DataModel, $stateParams, ProjectDataService, monthService, reportService) {
        var vm = this;
        vm.$onInit = function() {
            vm.model = {};
            vm.updateMode = false;
            vm.year_number = 1;
            vm.itemsList = [];
            ProjectDataService.list()
                .then(function(response){
                    vm.project_begin_month = response.begin_month;
                });
            if($stateParams.processId !== undefined) DataModel.Process
                .directMaterial({id: $stateParams.processId})
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
                            className: "col-xs-12 col-sm-12 col-md-3 col-md-offset-2",
                            type: 'ca-input-ww',
                            templateOptions: {
                                type: 'text',
                                label: 'Name of raw material',
                                placeholder: 'Name',
                                maxlength: 20,
                                required: true
                            }
                        },
                        {
                            key: 'purchasing_price_per_unit',
                            className: "col-xs-12 col-sm-12 col-md-3 col-md-offset-2",
                            type: 'ca-input-ww',
                            templateOptions: {
                                type: 'number',
                                label: 'Price per unit',
                                placeholder: '$',
                                required: true,
                                min: 0
                            }
                        }
                    ]
                },
                {
                    className: "row",
                    fieldGroup: [
                        {
                            key: 'measurement_unit',
                            className: "col-xs-12 col-sm-12 col-md-3 col-md-offset-2",
                            type: 'ca-input-ww',
                            templateOptions: {
                                type: 'text',
                                label: 'Measurement unit',
                                placeholder: 'Unit',
                                maxlength: 20,
                                required: true
                            }
                        },
                        {
                            key: 'normal_waste',
                            className: "col-xs-12 col-sm-12 col-md-3 col-md-offset-2",
                            type: 'ca-input-ww',
                            templateOptions: {
                                type: 'number',
                                label: 'Normal waste',
                                placeholder: '%',
                                required: true,
                                min: 0,
                                max: 100
                            }
                        }
                    ]
                },
                {
                    className: "row",
                    fieldGroup: [
                        {
                            key: 'batch_quantity_required',
                            className: "col-xs-12 col-sm-12 col-md-3 col-md-offset-2",
                            type: 'ca-input-ww',
                            templateOptions: {
                                type: 'number',
                                label: 'Standard quantity required',
                                placeholder: 'Unit',
                                required: true,
                                min: 0
                            }
                        },
                        {
                            key: 'material_beginning',
                            className: "col-xs-12 col-sm-12 col-md-3 col-md-offset-2",
                            type: 'ca-input-ww',
                            templateOptions: {
                                type: 'number',
                                label: 'Cost of raw material beginning',
                                placeholder: '$',
                                required: true,
                                min: 0
                            }
                        }
                    ]
                },
                {
                    className: "row",
                    fieldGroup: [
                        {
                            key: 'safety_stock',
                            type: 'ca-annualMonthly',
                            templateOptions: {
                                type: 'number',
                                label: 'Safety stock',
                                placeholder: '%',
                                required: true,
                                min: 0,
                                max: 100,
                                monthes: monthService.AbsoluteMonthes(vm.project_begin_month)
                            }
                        },
                        {
                            key: 'season_price_change_rate',
                            type: 'ca-annualMonthly-first-red',
                            templateOptions: {
                                type: 'number',
                                label: 'Season price change',
                                placeholder: '+-%',
                                required: true,
                                min: -100,
                                max: 100,
                                monthes: monthService.AbsoluteMonthes(vm.project_begin_month)
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
        function refreshReport(direct_material_id) {
            if($stateParams.processId) {
                reportService.instant.Process.direct_material($stateParams.processId, direct_material_id)
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
            var dm = new DataModel.Process();
            for(var k in item) dm[k] = item[k];
            dm.year_number = vm.year_number;
            dm.$saveDirectMaterial({ id: $stateParams.processId })
                .then(function(response){
                    callback(response);
                    refreshReport();
                })
                .finally(function(){
                    vm.controls.formDisabled = false;
                    vm.controls.buttonText = 'Add';
                });
        }
        vm.onDelete = function(item, callback) {
            if(item && item.id) {
                DataModel.Product.deleteDirectMaterial({ id: item.id });
            }
            callback();
            refreshReport();
        };
        vm.onLoad = function(directMaterialId){
            refreshReport(directMaterialId);
        };
    }
    caProcessProductProcessDmController.$inject = ['DataModel', '$stateParams', 'ProjectDataService', 'monthService', 'reportService'];
}());