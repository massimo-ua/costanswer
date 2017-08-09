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
                  className: 'row',
                  fieldGroup: [
                      {
                          className: 'col-xs-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4 text-center',
                          key: 'name',
                          type: 'input',
                          ngModelElAttrs: {
                              class: 'form-control costanswer'
                          },
                          templateOptions: {
                              type: 'text',
                              label: 'Name',
                              placeholder: 'Name',
                              required: true,
                              errorText: 'Please, fill in process name'
                          }
                      },
                      {
                          className: 'col-xs-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4 text-center',
                          key: 'department',
                          type: 'input',
                          ngModelElAttrs: {
                              class: 'form-control costanswer'
                          },
                          templateOptions: {
                              type: 'text',
                              label: 'Department',
                              placeholder: 'unit',
                              required: false
                          }
                      }
                  ]
                }
            ];
            vm.formOptions = {
                formState: {
                    disabled: true
                }
            };
        };
        vm.onSave = function() {
           console.log('form submitted:', vm.process, vm);
        };
        vm.process = {};
    }
    caProcessProductProcessNewController.$inject = ['$log'];
}());