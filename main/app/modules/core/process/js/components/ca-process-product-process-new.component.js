(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessNew', {
            restrict: 'E',
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-new.html',
            controller: caProcessProductProcessNewController
        });
    function caProcessProductProcessNewController($log) {
        var vm = this;
        vm.$onInit = function() {
            vm.settings = [
                {
                    key: 'name',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Name',
                        placeholder: 'Enter process name',
                        required: true
                    }
                },
                {
                    key: 'department',
                    type: 'input',
                    templateOptions: {
                        type: 'text',
                        label: 'Department',
                        placeholder: 'Enter department name',
                        required: false
                    }
                }
            ];
            vm.formOptions = {};
        };
        vm.onSave = function() {
            $log.debug('form submitted:', vm.model);
        };
        vm.process = {};
    }
    caProcessProductProcessNewController.$inject = ['$log'];
}());