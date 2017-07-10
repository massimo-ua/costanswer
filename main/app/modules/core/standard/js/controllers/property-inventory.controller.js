(function(){
    'use strict';
    angular.module('costAnswer.core.standard.controllers')
        .component('propertyInventory', {
            restrict: 'E',
            templateUrl: 'app/modules/core/standard/views/property/inventory.html',
            controller: propertyInventoryController
        });
    function propertyInventoryController($log, $localStorage, $stateParams, DataModel, monthService, standardService, toastr) {
        var vm = this;
            function init() {
            vm.product_id = $stateParams.id;
            vm.reportId = 'inventory';
            vm.form = {};
            vm.month_number = 1;
            vm.year_number = 1;
            vm.instantReport = [];
            vm.controls = {
                buttonText: "Save",
                nameMain: "Finished goods beginning",
                namePlaceholder: "Units",
                nameErrorText: "Please, fill in amount of finished goods"
            };
            DataModel.Product.getInventory({ id: vm.product_id })
                .$promise
                    .then(function(response){
                        if(response.length > 0) {
                            vm.id = response[0].id;
                            vm.form.finished_goods_beginning = parseInt(response[0].finished_goods_beginning) / 100;
                        }
                        vm.controls.buttonText = "Update";
                    })
                    .catch(function(){
                        vm.id = undefined;            
                    });
            if($localStorage.uuid !== undefined) {
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            vm.project = response;
                            vm.controls.namePlaceholder = monthService.Month(response.begin_month).full + ',' + vm.controls.namePlaceholder;
                        });
            }
            refreshReport();
        }
        function refreshReport() {
            if(vm.product_id) {
                standardService.getInstantReport(vm.product_id, vm.reportId, function(response){
                    vm.instantReport = response;
                });
            }
            return;
        }
        init();

        vm.onSave = function(form) {
            var inventory = new DataModel.Product();
            if(vm.id === undefined) {
                vm.controls.buttonText = "Saving...";
                inventory.finished_goods_beginning = Math.round(vm.form.finished_goods_beginning * 100);
                inventory.month_number = vm.month_number;
                inventory.year_number = vm.year_number;
                inventory.$saveInventory({ id: vm.product_id })
                    .then(function(response){
                        vm.controls.buttonText = "Update";
                        vm.id = response.id;
                        refreshReport();
                    })
                    .catch(function(error){
                        vm.controls.buttonText = "Save";
                        var suggestedValue = parseInt(error.data.errors[0].suggestion) / 100;
                        toastr.error('Insufficient inventory in ' + monthService.AbsoluteMonth(error.data.errors[0].month, vm.month_number).full + '. Please, change your "Finished goods beginning" and try again. Suggested value: ' + suggestedValue, 'Аttention!');
                    });
            }
            else {
                vm.controls.buttonText = "Updating...";
                inventory.finished_goods_beginning = Math.round(vm.form.finished_goods_beginning * 100);
                inventory.$updateInventory({ id: vm.id })
                    .then(function(){
                        refreshReport();
                    })
                    .catch(function(error){
                        var suggestedValue = parseInt(error.data.errors[0].suggestion) / 100;
                        toastr.error('Insufficient inventory in ' + monthService.AbsoluteMonth(error.data.errors[0].month, vm.month_number).full + '. Please, change your "Finished goods beginning" and try again. Suggested value: ' + suggestedValue, 'Аttention!');
                    })
                    .finally(function(){
                        vm.controls.buttonText = "Update";
                    });
            }
        };
    }
    propertyInventoryController.$inject = ['$log', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', 'toastr'];
}());