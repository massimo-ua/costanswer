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
                    className: 'col-xs-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4',
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
                    className: 'col-xs-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4',
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
           console.log('form submitted:', vm.process, vm);
        };
        vm.process = {};
    }
    caProcessProductProcessNewController.$inject = ['$log'];
}());