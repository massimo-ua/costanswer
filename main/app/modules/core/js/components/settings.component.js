(function(){
    'use strict';
    angular.module('costAnswer.core.components')
        .component('propertySettings', {
            bindings: {
                costingMethod: '<',
                returnSref: '@'
            },
            templateUrl: 'app/modules/core/views/settings.html',
            controller: PropertySettingsController
        });
        function PropertySettingsController(
        standardService,
        $stateParams,
        DataModel,
        $log,
        $scope,
        $localStorage,
        $state,
        quantityCalculationMethod
    )
    {
        var vm = this;
        vm.$onInit = function() {
                vm.form = {};
                vm.item = {};
                vm.controls = {
                    buttonText: "Update",
                    nameMain: "Product/Service name",
                    namePlaceholder: "Name",
                    nameErrorText: "Please, fill in product name",
                    unitMain: "Measurement unit",
                    unitPlaceholder: "Unit",
                    unitErrorText: "Please, fill in product measurement unit",
                    divisionMain: "Division",
                    divisionPlaceholder: "Name",
                    orderMain: "Order #",
                    orderPlaceholder: "Name",
                    quantityCalculationMethodLabel: "Standard quantity per",
                    QuantityPerBatchLabel: "Standard quantity per batch"
                };
                vm.quantity_calculation_methods = quantityCalculationMethod.get();
                if($stateParams.id) {
                    DataModel.Product.get({ id: $stateParams.id })
                        .$promise
                            .then(function(response){
                                vm.item = response;
                                vm.form.name = response.name;
                                vm.form.measurement_unit = response.measurement_unit;
                                vm.form.division = response.division;
                                vm.form.order_number = response.order_number;
                                vm.form.quantity_calculation_method_id = parseInt(response.quantity_calculation_method_id);
                                vm.form.quantity_per_batch = parseInt(response.quantity_per_batch) / 100;
                            })
                            .catch(function(error){
                                $log.error(error);
                            });
                } else {
                    vm.form.quantity_calculation_method_id = 1;
                }
            };
            vm.checkQuantityPerBatch = function(){
                return vm.form.quantity_calculation_method_id == 2;
            };
            vm.onSave = function(form) {
                if(vm.checkQuantityPerBatch() && !form.quantity_per_batch) return;
                vm.controls.formDisabled = true;
                if(!vm.item || vm.item.id === undefined) {
                    vm.controls.buttonText = "Saving...";
                    if(!$localStorage.uuid || vm.form.quantity_calculation_method_id === undefined) return;
                        
                    var product = new DataModel.Product();
                    product.project_uuid = $localStorage.uuid;
                    product.name = form.name;
                    product.costing_method_id = vm.costingMethod;
                    product.measurement_unit = form.measurement_unit;
                    product.division = form.division;
                    product.order_number = form.order_number;
                    product.quantity_calculation_method_id = form.quantity_calculation_method_id;
                    if(form.quantity_per_batch){
                        product.quantity_per_batch = Math.round(form.quantity_per_batch * 100);
                    }
                    product.$save()
                        .then(function(response){
                            $scope.$emit('PRODUCT_CREATED', response);
                            vm.form = {};
                            vm.itemForm.$setPristine();
                            $state.go(vm.returnSref, { id: response.id }, {
                                reload: true
                            });
                        })
                        .finally(function(){
                            vm.controls.formDisabled = false;
                            vm.controls.buttonText = "Save";
                        });
                } else {
                    vm.controls.buttonText = "Updating...";
                    vm.item.name = form.name;
                    vm.item.measurement_unit = form.measurement_unit;
                    vm.item.division = form.division;
                    vm.item.order_number = form.order_number;
                    vm.item.quantity_calculation_method_id = form.quantity_calculation_method_id;
                    if(form.quantity_per_batch){
                        vm.item.quantity_per_batch = Math.round(form.quantity_per_batch * 100);
                    }
                    vm.item.$update({ id: $stateParams.id })
                        .then(function(response){
                            $scope.$emit('PRODUCT_UPDATED', response);
                        })
                        .finally(function(){
                            vm.controls.buttonText = "Update";
                            vm.controls.formDisabled = false;
                        });
                }
            };
    } 
    PropertySettingsController.$inject = [
        'standardService',
        '$stateParams',
        'DataModel',
        '$log',
        '$scope',
        '$localStorage',
        '$state',
        'quantityCalculationMethod'
    ];
}());