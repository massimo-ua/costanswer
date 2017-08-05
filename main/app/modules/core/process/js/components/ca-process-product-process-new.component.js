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
            vm.config = {
                properties: [
                    {
                        input: {
                            wrapperClass: 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4 text-center',
                            type: 'text',
                            key: 'input',
                            name: 'name',
                            maxLength: 20,
                            required: true,
                            class: 'form-control costanswer',
                            placeholder: 'Name',
                            model: 'name'
                        },
                        label: {
                            wrapperClass: 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4 text-center',
                            for: 'name',
                            class: 'text-center m-b-20px',
                            text: 'Process name:'
                        }
                    }
                    ]
            };
            vm.model = {};
        };
    }
    caProcessProductProcessNewController.$inject = ['$log'];
}());