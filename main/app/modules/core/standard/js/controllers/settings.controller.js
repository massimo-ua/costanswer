(function(){
    'use strict';
    function PropertySettingsController(
        standardService,
        $stateParams,
        DataModel,
        $log
    )
    {
        var vm = this;
        function init() {
                vm.product_id = $stateParams.id;
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
                }
                vm.quantity_calculation_methods = standardService.quantityCalculationMethods();
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
                            $og.error(error);
                        });

            }
            init();
            vm.checkQuantityPerBatch = function(){
                return vm.form.quantity_calculation_method_id == 2;
            }
            vm.onSave = function(form) {
                $log.debug(form);
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
                    .catch(function(error){
                        $log.error(error);
                    })
                    .finally(function(){
                        vm.controls.buttonText = "Update";
                    });
            }
    } 
    PropertySettingsController.$inject = [
        'standardService',
        '$stateParams',
        'DataModel',
        '$log'
    ];
    angular.module('costAnswer.core.standard.controllers')
        .controller('PropertySettingsController', PropertySettingsController);
}());