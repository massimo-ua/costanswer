(function(){
    'use strict';
    angular.module('costAnswer.core.components')
        .component('caProductsMenu', {
            bindings: {
                products: '<',
                config: '<',
                onDelete: '&' 
            },
            templateUrl: 'app/modules/core/views/ca-products-menu.html',
            controller: caProductsMenuController
        });
    function caProductsMenuController($log) {
        this.$onInit = function() {
            //
        };
    }
    caProductsMenuController.$inject = ['$log'];
})();