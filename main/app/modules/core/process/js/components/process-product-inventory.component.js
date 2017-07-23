(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductInventory', {
            restrict: 'E',
            templateUrl: 'app/modules/core/process/views/product-inventory.html',
            controller: caProcessProductInventoryController
        });
    function caProcessProductInventoryController($log, $localStorage, $stateParams, DataModel, monthService, standardService, toastr) {
        var vm = this;
        vm.$onInit = function() {
            vm.product_id = $stateParams.id;
            vm.reportId = 'inventory';
            vm.item = {};
            vm.month_number = 1;
            vm.year_number = 1;
            vm.instantReport = [];
            vm.config = {
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
                            vm.item.finished_goods_beginning = parseInt(response[0].finished_goods_beginning) / 100;
                        }
                        vm.config.buttonText = "Update";
                    })
                    .catch(function(){
                        vm.id = undefined;            
                    });
            if($localStorage.uuid !== undefined) {
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            vm.project = response;
                            vm.config.namePlaceholder = monthService.Month(response.begin_month).full + ',' + vm.config.namePlaceholder;
                        });
            }
            refreshReport();
        };
        function refreshReport() {
            if(vm.product_id) {
                standardService.getInstantReport(vm.product_id, vm.reportId, function(response){
                    vm.instantReport = response;
                });
            }
            return;
        }
        vm.onSave = function(form) {
            var inventory = new DataModel.Product();
            if(vm.id === undefined) {
                vm.config.buttonText = "Saving...";
                inventory.finished_goods_beginning = Math.round(form.finished_goods_beginning * 100);
                inventory.month_number = vm.month_number;
                inventory.year_number = vm.year_number;
                inventory.$saveInventory({ id: vm.product_id })
                    .then(function(response){
                        vm.config.buttonText = "Update";
                        vm.id = response.id;
                        refreshReport();
                    })
                    .catch(function(error){
                        vm.config.buttonText = "Save";
                        var suggestedValue = parseInt(error.data.errors[0].suggestion) / 100;
                        toastr.error('Insufficient inventory in ' + monthService.AbsoluteMonth(error.data.errors[0].month, vm.month_number).full + '. Please, change your "Finished goods beginning" and try again. Suggested value: ' + suggestedValue, 'Аttention!');
                    });
            }
            else {
                vm.config.buttonText = "Updating...";
                inventory.finished_goods_beginning = Math.round(form.finished_goods_beginning * 100);
                inventory.$updateInventory({ id: vm.id })
                    .then(function(){
                        refreshReport();
                    })
                    .catch(function(error){
                        var suggestedValue = parseInt(error.data.errors[0].suggestion) / 100;
                        toastr.error('Insufficient inventory in ' + monthService.AbsoluteMonth(error.data.errors[0].month, vm.month_number).full + '. Please, change your "Finished goods beginning" and try again. Suggested value: ' + suggestedValue, 'Аttention!');
                    })
                    .finally(function(){
                        vm.config.buttonText = "Update";
                    });
            }
        };

    }
    caProcessProductInventoryController.$inject = ['$log', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', 'toastr'];
}());