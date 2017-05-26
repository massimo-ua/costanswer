(function(){
    'use strict';
    angular.module('costAnswer.core.standard.controllers')
        .component('propertyWipEnding', {
            restrict: 'E',
            templateUrl: 'app/modules/core/standard/views/property/wip-ending.html',
            controller: propertyWipEndingController
        });
    function propertyWipEndingController($log, $localStorage, $stateParams, DataModel, monthService, standardService) {
        var vm = this;
         function init() {
            vm.form = {};
            vm.form.amount = [];
            vm.form.ending_quantity = [];
            vm.product_id = $stateParams.id;
            vm.year_number = 1;
            vm.updateMode = false;
            vm.reportId = 'wip';
            vm.min = function(index) {
                return 0;
            };
            vm.controls = {
                buttonText: "Save",
                nameTitle: "WIP ending $",
                namePlaceholder: "$",
                endingQuantityTitle: "WIP ending Units",
                endingQuantityPlaceholder: "Units",
            };
            if($localStorage.uuid !== undefined) {
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            vm.monthes = monthService.AbsoluteMonthes(response.begin_month);
                        });
            }
            DataModel.Product.getWipEnding({ id: vm.product_id })
                .$promise
                    .then(function(response){
                        var emptyCounter = 0;
                        for(var i=0; i < response.length; i++) {
                            if(response[i].ending_costs) {
                                vm.form.amount[response[i].month_number-1] = {};
                                vm.form.amount[response[i].month_number-1].value = parseInt(response[i].ending_costs) / 100;
                                vm.form.ending_quantity[response[i].month_number-1] = {};
                                vm.form.ending_quantity[response[i].month_number-1].value = parseInt(response[i].ending_quantity) / 100;
                            } else {
                                emptyCounter += 1;
                            }
                        }
                        if(response.length == 12 && emptyCounter == 0) {
                            vm.controls.buttonText = "Update";
                            vm.updateMode = true;
                        }
                    })
                    .catch(function(error){
                        $log.error(error);
                    });
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
            vm.controls.buttonText = vm.updateMode ? "Updating..." : "Saving...";
            vm.controls.formDisabled = true;
            var data = {};
            for(var k in form.amount) {
                data[k] = {};
                data[k].month_number = +k + 1;
                data[k].ending_costs = Math.round(form.amount[k].value * 100);
                data[k].ending_quantity = Math.round(form.ending_quantity[k].value * 100);
            }
            var plan = {};
            plan.year_number = vm.year_number;
            plan.data = data;
            DataModel.Product.saveWipEnding({ id: vm.product_id }, plan)
                .$promise
                    .then(function(){
                        vm.updateMode = true;
                        refreshReport();
                    })
                    .catch(function(error){
                        $log.error(error);
                    })
                    .finally(function(){
                        vm.controls.buttonText = vm.updateMode ? "Update" : "Save";
                        vm.controls.formDisabled = false;
                    });
        };
    }
    propertyWipEndingController.$inject = ['$log', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService'];
}());