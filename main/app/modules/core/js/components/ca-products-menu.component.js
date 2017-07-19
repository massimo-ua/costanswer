(function(){
    'use strict';
    angular.module('costAnswer.core.components')
        .component('caProductsMenu', {
            bindings: {
                items: '<',
                config: '<',
                onDelete: '&' 
            },
            templateUrl: 'app/modules/core/views/ca-products-menu.html',
            controller: caProductsMenuController
        });
    function caProductsMenuController($log) {
        var vm = this;
        vm.$onInit = function() {
            vm.startItem = 1;
            vm.activeItem = undefined;
        };
        vm.range = function(start,total) {
            if(vm.items === undefined || vm.items.length === 0) return;
            var result = [];
            var i = 1;
            start = start > 1 ? start : 1;
            var end = (vm.items.length >= (start + total-1)) ? start + total - 1 : vm.items.length; 
            for(i=start;i<=end;i++) {
                result.push(i);
            }
            return result;
        };
        vm.move = function(i) {
            if((i > 0 && (vm.startItem + vm.config.displayBlock) > vm.items.length) || (i < 0 && vm.startItem < 2)) {
                return;
            }
            vm.startItem += i;
        };
        vm.removeItem = function(index) {
            vm.onDelete()(vm.items[index], function(error){
                if(error) {
                    $log.error(error);
                    return;
                }
                vm.items.splice(index,1);
                vm.move(-1);
            });
        };
    }
    caProductsMenuController.$inject = ['$log'];
})();