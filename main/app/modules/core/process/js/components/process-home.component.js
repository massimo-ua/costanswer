(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessHome', {
            restrict: 'E',
            templateUrl: 'app/modules/core/process/views/home.html',
            controller: caProcessHomeController
        });
    function caProcessHomeController($log, entityService, $localStorage, $state, DataModel) {
        var vm = this;
        vm.$onInit = function() {
            entityService.products($localStorage.uuid,2)
            .then(function(response){
                vm.products = response.data;
            })
            .catch(function(error){
                $log.error(error);
            });
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
        vm.onDelete = function(item, callback) {
            DataModel.Product.remove({id: item.id})
                .$promise
                    .then(function(response){
                        callback();
                        $state.go('process.start', undefined, {
                            reload: true
                        });
                    })
                    .catch(function(error){
                        callback(error);
                    });
        };
    }
    caProcessHomeController.$inject = ['$log', 'entityService', '$localStorage', '$state', 'DataModel'];
}());
