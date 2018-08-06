(function(){
    'use strict';
    angular.module('costAnswer.core.components')
        .component('caProductInventory', {
            bindings: {
                item: '<',
                config: '<',
                onSave: '&'
            },
            templateUrl: 'app/modules/core/views/ca-product-inventory.html',
        });
})();