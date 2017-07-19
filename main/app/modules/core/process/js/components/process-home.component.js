(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessHome', {
            restrict: 'E',
            templateUrl: 'app/modules/core/process/views/home.html',
            controller: caProcessHomeController
        });
    function caProcessHomeController($log) {
        var vm = this;
        vm.$onInit = function() {
            vm.products = [
                {"id":254,"name":"2","measurement_unit":"rr","owner_id":null,"created_at":"2017-07-04 19:19:03","updated_at":"2017-07-10 18:15:03","deleted_at":null,"costing_method_id":"1","division":"AAAAA","order_number":"BBBB","quantity_calculation_method_id":"1","quantity_per_batch":"900","pivot":{"project_id":"123","product_id":"254"}},
                {"id":255,"name":"1","measurement_unit":"erw","owner_id":null,"created_at":"2017-07-04 19:19:06","updated_at":"2017-07-04 19:19:06","deleted_at":null,"costing_method_id":"1","division":"er","order_number":null,"quantity_calculation_method_id":"2","quantity_per_batch":"900","pivot":{"project_id":"123","product_id":"255"}},
                {"id":256,"name":"3","measurement_unit":"ff","owner_id":null,"created_at":"2017-07-04 19:19:09","updated_at":"2017-07-04 19:19:09","deleted_at":null,"costing_method_id":"1","division":"dd","order_number":"ss","quantity_calculation_method_id":"2","quantity_per_batch":"900","pivot":{"project_id":"123","product_id":"256"}},
                {"id":262,"name":"88","measurement_unit":"77","owner_id":null,"created_at":"2017-07-10 19:22:09","updated_at":"2017-07-10 19:50:52","deleted_at":null,"costing_method_id":"1","division":"66","order_number":"55","quantity_calculation_method_id":"1","quantity_per_batch":"1100","pivot":{"project_id":"123","product_id":"262"}}
            ];
            vm.config = {
                items: {
                    displayPropertyName: "name",
                    sref: "process.singleProduct"
                },
                addItem: {
                    display: true,
                    text: "Add product or service",
                    sref: "process.newProduct"
                },
                displayBlock: 5,
                deleteItem: {
                    text: "Remove"
                },
                arrows: {
                    forward: {
                        text: "Forward"
                    },
                    backward: {
                        text: "Backward"
                    }
                }
            };
        };
        vm.onDelete = function() {
            $log.debug('DELETE');
        };
    }
    caProcessHomeController.$inject = ['$log'];
}());
