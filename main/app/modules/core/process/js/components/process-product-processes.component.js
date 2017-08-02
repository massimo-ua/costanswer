(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductProcesses', {
            templateUrl: 'app/modules/core/process/views/product-processes.html',
            controller: caProcessProductProcessesController
        });
    function caProcessProductProcessesController($log, entityService, $stateParams, $scope, DataModel, $state) {
        var vm = this;
        vm.$onInit = function() {
            entityService.getProductProcesses($stateParams.id)
                .then(function(response){
                    vm.processes = response.data;
                });
            vm.config = {
                items: {
                    displayPropertyName: "name",
                    sref: 'product-process.process',
                    params: function(id) {
                        return {'id': $stateParams.id, 'processId': id};
                    }
                },
                addItem: {
                    display: true,
                    text: "Add process",
                    sref: "product-process.new"
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
        $scope.$on('PROCESS_CREATED', function(event, data) {
            vm.processes.push(data);
            event.stopPropagation();
        });
        $scope.$on('PROCESS_UPDATED', function(event, data) {
            vm.processes.forEach(function(process,index,list){
                if(process.id === data.id) {
                    list[index].name = data.name;
                }
            });
            event.stopPropagation();
        });
        vm.onDelete = function(item, callback) {
            DataModel.Process.remove({id: item.id})
                .$promise
                .then(function(response){
                    callback();
                    $state.go('product-process', undefined, {
                        reload: true
                    });
                })
                .catch(function(error){
                    callback(error);
                });
        };
    }
    caProcessProductProcessesController.$inject = ['$log', 'entityService', '$stateParams', '$scope', 'DataModel', '$state'];
}());