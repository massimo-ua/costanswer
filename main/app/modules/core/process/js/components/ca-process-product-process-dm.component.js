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
            vm.itemsList = [{"id":258,"name":"1","measurement_unit":"ss","created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"pivot":{"product_id":"254","direct_material_id":"258"},"params":[{"id":3310,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":null,"safety_stock":null,"normal_waste":"0.1000","batch_quantity_required":"1000","purchasing_price_per_unit":"1000","created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"0"},{"id":3311,"direct_material_id":"258","material_beginning":"1000","season_price_change_rate":"0.0000","safety_stock":"0.0500","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"1"},{"id":3312,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":"0.0200","safety_stock":"0.0300","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"2"},{"id":3313,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":"0.0200","safety_stock":"0.0200","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"3"},{"id":3314,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":"0.0200","safety_stock":"0.0100","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"4"},{"id":3315,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":"0.0200","safety_stock":"0.0000","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"5"},{"id":3316,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":"0.0200","safety_stock":"0.0000","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"6"},{"id":3317,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":"0.0200","safety_stock":"0.0100","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"7"},{"id":3318,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":"0.0200","safety_stock":"0.0200","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"8"},{"id":3319,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":"0.0200","safety_stock":"0.0300","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"9"},{"id":3320,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":"0.0200","safety_stock":"0.0200","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"10"},{"id":3321,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":"0.0200","safety_stock":"0.0300","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:04","updated_at":"2017-07-04 19:19:04","deleted_at":null,"year_number":"1","month_number":"11"},{"id":3322,"direct_material_id":"258","material_beginning":null,"season_price_change_rate":"0.0200","safety_stock":"0.0100","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"12"}]},{"id":259,"name":"2","measurement_unit":"rr","created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"pivot":{"product_id":"254","direct_material_id":"259"},"params":[{"id":3323,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":null,"safety_stock":null,"normal_waste":"0.1000","batch_quantity_required":"1000","purchasing_price_per_unit":"1000","created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"0"},{"id":3324,"direct_material_id":"259","material_beginning":"1000","season_price_change_rate":"0.0000","safety_stock":"0.0500","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"1"},{"id":3325,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":"0.0100","safety_stock":"0.0300","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"2"},{"id":3326,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":"0.0100","safety_stock":"0.0200","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"3"},{"id":3327,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":"0.0100","safety_stock":"0.0100","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"4"},{"id":3328,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":"0.0100","safety_stock":"0.0000","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"5"},{"id":3329,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":"0.0100","safety_stock":"0.0000","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"6"},{"id":3330,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":"0.0100","safety_stock":"0.0100","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"7"},{"id":3331,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":"0.0100","safety_stock":"0.0200","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"8"},{"id":3332,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":"0.0100","safety_stock":"0.0300","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"9"},{"id":3333,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":"0.0100","safety_stock":"0.0200","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"10"},{"id":3334,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":"0.0100","safety_stock":"0.0300","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"11"},{"id":3335,"direct_material_id":"259","material_beginning":null,"season_price_change_rate":"0.0100","safety_stock":"0.0100","normal_waste":null,"batch_quantity_required":null,"purchasing_price_per_unit":null,"created_at":"2017-07-04 19:19:05","updated_at":"2017-07-04 19:19:05","deleted_at":null,"year_number":"1","month_number":"12"}]}];
            /*ProjectDataService.list()
                .then(function(response){
                    vm.project_begin_month = response.begin_month;
                });
            if($stateParams.processId !== undefined) DataModel.Process
                .directMaterials({id: $stateParams.processId})
                .$promise
                .then(function (response) {
                    if (!angular.equals({}, response)) {
                        vm.model = response;
                        vm.buttonText = 'Update';
                        vm.updateMode = true;
                    }
                });*/
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