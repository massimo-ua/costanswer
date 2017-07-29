(function(){
    'use strict';
    angular.module('costAnswer.core.components')
        .component('caProductMarkup', {
            bindings: {
                item: '<',
                config: '<',
                onSave: '&'
            },
            templateUrl: 'app/modules/core/views/ca-product-markup.html',
        });
})();
