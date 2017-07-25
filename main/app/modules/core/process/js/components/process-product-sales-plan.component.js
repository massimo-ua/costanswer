(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductSalesPlan', {
            restrict: 'E',
            templateUrl: 'app/modules/core/process/views/sales-plan.html',
            controller: caProcessProductSalesPlanController
        });
    function caProcessProductSalesPlanController($log, $localStorage, DataModel, ProjectDataService, monthService, standardService, toastr, $stateParams) {
        var vm = this;
        vm.$onInit = function() {
            vm.items = {};
            vm.items.amount = [];
            vm.productId = $stateParams.id;
            vm.year_number = 1;
            vm.updateMode = false;
            vm.instantReport = [];
            vm.reportId = 'inventory';
            vm.config = {
                buttonText: "Save",
                nameMain: "Finished goods sold",
                namePlaceholder: "Units",
                nameErrorText: "Please, fill in amount of finished goods",
                min: 0,
                formDisabled: false
            };
            if($localStorage.uuid !== undefined) {
                ProjectDataService.list()
                    .then(function(response){
                        vm.monthes = monthService.AbsoluteMonthes(response.begin_month);
                        vm.begin_month = response.begin_month;
                });
            }
            DataModel.Product.getSalesPlan({ id: vm.productId })
                .$promise
                    .then(function(response){
                        var emptyCounter = 0;
                        for(var i=0; i < response.length; i++) {
                            if(response[i].finished_goods_sold) {
                                vm.items.amount[response[i].month_number-1] = {};
                                vm.items.amount[response[i].month_number-1].value = parseInt(response[i].finished_goods_sold) / 100;
                            } else {
                                emptyCounter += 1;
                            }
                        }
                        if(response.length == 12 && emptyCounter === 0) {
                            vm.config.buttonText = "Update";
                            vm.updateMode = true;
                        }
                    })
                    .catch(function(error){
                        $log.debug(error);
                    });
                    refreshReport();
        };
        function refreshReport() {
            if(vm.productId) {
                standardService.getInstantReport(vm.productId, vm.reportId, function(response){
                    vm.instantReport = response;
                });
            }
            return;
        }
        vm.onSave = function(form) {
            vm.config.buttonText = vm.updateMode ? "Updating..." : "Saving...";
            vm.config.formDisabled = true;
            var data = {};
            for(var k in form.amount) {
                data[k] = {};
                data[k].month_number = +k + 1;
                data[k].finished_goods_sold = Math.round(form.amount[k].value * 100);
            }
            var plan = {};
            plan.year_number = vm.year_number;
            plan.data = data;
            DataModel.Product.saveSalesPlan({ id: vm.productId }, plan)
                .$promise
                    .then(function(){
                        vm.updateMode = true;
                        refreshReport();
                    })
                    .catch(function(error){
                        if(error.status == 422) {
                            var suggestedValue = parseInt(error.data.errors[0].suggestion) / 100;
                            toastr.error('Insufficient inventory in ' + monthService.AbsoluteMonth(error.data.errors[0].month, vm.begin_month).full + '. Please, change your input data and try again. Suggested value: ' + suggestedValue, 'Аttention!');
                        }
                    })
                    .finally(function(){
                        vm.config.buttonText = vm.updateMode ? "Update" : "Save";
                        vm.config.formDisabled = false;
                    });
        };
    }
    caProcessProductSalesPlanController.$inject = ['$log','$localStorage','DataModel','ProjectDataService','monthService','standardService','toastr', '$stateParams'];
}());