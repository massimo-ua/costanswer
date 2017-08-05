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
                formName: 'settingsForm',
                properties: [
                    {
                        errorText: 'Please enter process name',
                        input: {
                            wrapperClass: 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4 text-center',
                            key: 'input',
                            attributes: {
                                type: 'text',
                                name: 'name',
                                maxLength: 20,
                                required: true,
                                class: 'form-control costanswer text-center m-b-10px',
                                placeholder: 'Name',
                                'ng-model': 'name'
                            }

                        },
                        label: {
                            wrapperClass: 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4 text-center',
                            attributes: {
                                for: 'name',
                                class: 'text-center m-b-10px'
                            },
                            text: 'Process name:'
                        }
                    },
                    {
                        errorText: 'Please enter department name',
                        input: {
                            wrapperClass: 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4 text-center',
                            key: 'input',
                            attributes: {
                                type: 'text',
                                name: 'department',
                                maxLength: 20,
                                required: true,
                                class: 'form-control costanswer text-center m-b-10px',
                                placeholder: 'unit',
                                'ng-model': 'department'
                            }
                        },
                        label: {
                            wrapperClass: 'col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4 text-center',
                            attributes: {
                                for: 'department',
                                class: 'text-center m-b-10px'
                            },
                            text: 'Department:'
                        }
                    }
                    ]
            };
            vm.model = {};
        };
    }
    caProcessProductProcessNewController.$inject = ['$log'];
}());