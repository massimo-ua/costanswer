(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessDm', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-dm.html',
            controller: caProcessProductProcessDmController
        });
    function caProcessProductProcessDmController(DataModel, $stateParams, ProjectDataService, monthService) {
        var vm = this;
        vm.$onInit = function() {
            vm.model = {};
            vm.updateMode = false;
            vm.buttonText = 'Save';
            ProjectDataService.list()
                .then(function(response){
                    vm.project_begin_month = response.begin_month;
                });
            if($stateParams.processId !== undefined) DataModel.Process
                .productionPlan({id: $stateParams.processId})
                .$promise
                .then(function (response) {
                    if (!angular.equals({}, response)) {
                        vm.model = response;
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
                    vm.formDisabled = false;
                });
        };
    }
    caProcessProductProcessDmController.$inject = ['DataModel', '$stateParams', 'ProjectDataService', 'monthService'];
}());