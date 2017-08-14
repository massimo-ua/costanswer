(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcessWb', {
            templateUrl: 'app/modules/core/process/views/ca-process-product-process-wb.html',
            controller: caProcessProductProcessWbController
        });
    function caProcessProductProcessWbController($log, DataModel, $scope, $stateParams) {
        var vm = this;
        vm.$onInit = function() {
            vm.model = {};
            vm.buttonText = 'Save';
            if($stateParams.processId !== undefined) {
                DataModel.Process
                    .get({id: $stateParams.processId})
                    .$promise
                    .then(function(response){
                        vm.process = response;
                        vm.buttonText = 'Update';
                    });
            }
            vm.settings = [
                {
                    fieldGroup: [
                        {
                            key: 'name',
                            type: 'input',
                            templateOptions: {
                                type: 'text',
                                label: 'Name',
                                placeholder: 'Name',
                                required: true,
                                errorText: 'Please, fill in process name'
                            }
                        },
                        {
                            key: 'department',
                            type: 'input',
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
            vm.formOptions = {};
            vm.formDisabled = false;
        };
        vm.onSave = function() {
            vm.formDisabled = true;
            if(vm.process.id !== undefined) {
                vm.buttonText = "Updating...";
                vm.process.$update({id: $stateParams.processId})
                    .then(function(response){
                        $scope.$emit('PROCESS_UPDATED', response);
                        vm.buttonText = "Update";
                    })
                    .finally(function(){
                        vm.formDisabled = false;
                    });
            }
            else {
                vm.buttonText = "Saving...";
                var process = new DataModel.Process();
                process.name = vm.process.name;
                process.product_id = $stateParams.id;
                if(vm.process.department !== undefined) process.department = vm.process.department;
                process.$save()
                    .then(function(response){
                        $scope.$emit('PROCESS_CREATED', response);
                        vm.process.id = response.id;
                        vm.buttonText = "Update";
                    })
                    .finally(function(){
                        vm.formDisabled = false;
                    });
            }
        };
    }
    caProcessProductProcessWbController.$inject = ['$log', 'DataModel', '$scope', '$stateParams'];
}());