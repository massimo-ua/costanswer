(function(){
    'use strict';
    angular.module('costAnswer.core.standard.controllers')
        .component('propertyWipBeginning', {
            restrict: 'E',
            templateUrl: 'app/modules/core/standard/views/property/wip-beginning.html',
            controller: propertyWipBeginningController
        });
    function propertyWipBeginningController($log, $localStorage, $stateParams, DataModel, monthService, standardService, toastr, ProjectDataService) {
        var vm = this;
        function init() {
            vm.product_id = $stateParams.id;
            vm.form = {};
            vm.month_number = 1;
            vm.year_number = 1;
            vm.instantReport = [];
            vm.reportId = 'wip';
            vm.controls = {
                buttonText: "Save",
                namePlaceholder: "$",
                nameErrorText: "Please, fill in amount of beginning WIP costs (0 allowed)",
                Name: "WIP beginning $",
                Qty: "WIP beginning Units",
                qtyPlaceholder: "Units",
                qtyErrorText: "Please, fill in WIP beginning Units (0 allowed)",
            };
            DataModel.Product.getWip({ id: vm.product_id })
                .$promise
                    .then(function(response){
                        vm.id = response[0].id;
                        vm.controls.buttonText = "Update";
                        vm.form.beginning_costs = parseInt(response[0].beginning_costs) / 100;
                        vm.form.beginning_quantity = parseInt(response[0].beginning_quantity) / 100;
                    })
                    .catch(function(){
                        vm.id = undefined;            
                    });
            if($localStorage.uuid !== undefined) {
                ProjectDataService.list()
                    .then(function(response){
                        vm.project = response;
                        vm.controls.namePlaceholder = monthService.Month(response.begin_month).full + ', ' + response.currency.symbol;
                        vm.month_number = response.begin_month;
                        vm.controls.Name = "WIP beginning " + response.currency.symbol;
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
            var wip = new DataModel.Product();
            if(vm.id === undefined) {
                vm.controls.buttonText = "Saving...";
                wip.beginning_costs = Math.round(vm.form.beginning_costs * 100);
                wip.beginning_quantity = Math.round(vm.form.beginning_quantity * 100);
                wip.month_number = 1;
                wip.year_number = vm.year_number;
                wip.$saveWip({ id: vm.product_id })
                    .then(function(response){
                        vm.controls.buttonText = "Update";
                        vm.id = response.id;
                        refreshReport();
                    })
                    .catch(function(error){
                        vm.controls.buttonText = "Save";
                            var suggestedValue = parseInt(error.data.errors[0].suggestion) / 100;
                            toastr.error('Insufficient total work-in-process in ' + monthService.AbsoluteMonth(error.data.errors[0].month, vm.month_number).full + '. Please, change your "WIP beginning Units" and try again. Suggested value: ' + suggestedValue, 'Аttention!');
                    });
            }
            else {
                vm.controls.buttonText = "Updating...";
                wip.beginning_costs = Math.round(vm.form.beginning_costs * 100);
                wip.beginning_quantity = Math.round(vm.form.beginning_quantity * 100);
                wip.$updateWip({ id: vm.id })
                    .then(function(response){
                        refreshReport();
                    })
                    .catch(function(error){
                        var suggestedValue = 0;
                        var fieldName = '';
                        angular.forEach(error.data.errors, function(value){
                            suggestedValue = parseInt(value.suggestion) / 100;
                            fieldName = (value.app_err_code == 'BSN_UNSUF_INV_QTY') ? 'WIP beginning Units' : 'WIP beginning $';
                            toastr.error('Insufficient total work-in-process in ' + monthService.AbsoluteMonth(value.month, vm.month_number).full + '. Please, change your "' + fieldName + '" and try again. Suggested value: ' + suggestedValue, 'Аttention!');

                        });
                    })
                    .finally(function(){
                        vm.controls.buttonText = "Update";
                    });
            }
        };
    }
    propertyWipBeginningController.$inject = ['$log', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', 'toastr', 'ProjectDataService'];
}());