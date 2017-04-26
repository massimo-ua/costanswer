(function(){
    'use strict';
    function NewProductController(
        $scope,
        $localStorage,
        $state,
        DataModel,
        standardService,
        $log
    )
    {
        var vm = this;
        function init() {
            vm.form = {};
            vm.costingMethod = 1;
            vm.controls = {
                buttonText: "Save",
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
        }
        init();
        vm.onSave = function(form) {
            if(!$localStorage.uuid || vm.costingMethod == undefined) return;
            vm.controls.formDisabled = true;
            vm.controls.buttonText = "Saving...";
            var product = new DataModel.Product();
            product.project_uuid = $localStorage.uuid;
            product.name = form.name;
            product.costing_method_id = vm.costingMethod;
            product.measurement_unit = form.measurement_unit;
            product.division = form.division;
            product.order_number = form.order_number;
            product.$save()
                .then(function(response){
                    $scope.$emit('NEW_ST_PRODUCT', response);
                    vm.form = {};
                    vm.itemForm.$setPristine();
                    $state.go('standard.singleProduct', { id: response.id }, {
                        reload: true
                    });
                })
                .catch(function(err){
                    $log.error(err);
                })
                .finally(function(){
                    vm.controls.formDisabled = false;
                    vm.controls.buttonText = "Save";
                });
        }
    } 
    NewProductController.$inject = [
        '$scope',
        '$localStorage',
        '$state',
        'DataModel',
        'standardService',
        '$log'
    ];
    angular.module('costAnswer.core.standard.controllers')
        .controller('NewProductController', NewProductController);
}());