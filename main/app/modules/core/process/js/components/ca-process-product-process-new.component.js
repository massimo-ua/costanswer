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
                    template: '<div class="row"><div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4"></div></div>'
                },
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
                              placeholder: 'Enter process name',
                              required: true
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
                              placeholder: 'Enter department name',
                              required: false
                          }
                      }
                  ]
                }
            ];
            vm.formOptions = {};
            vm.buttonText = "Save";
        };
        vm.onSave = function() {
           $log.debug('form submitted:', vm.process, vm);
        };
        vm.process = {};
    }
    caProcessProductProcessNewController.$inject = ['$log'];
}());