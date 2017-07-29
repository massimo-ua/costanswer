(function(){
    'use strict';
    angular.module('costAnswer.core.services')
    .factory('quantityCalculationMethod', quantityCalculationMethod);
    function quantityCalculationMethod($log) {
        var factory = {};
        var methods = [
            { "id": 1, "name": "Standard quantity per month", shortName: "Month" },
            { "id": 2, "name": "Standard quantity per batch", shortName: "Batch" }
        ];
        factory.get = function(id) {
          if(id === undefined) {
              return methods;
          }
          for(var i = 0; i < methods.length; i++) {
              if(id == methods[i].id) return methods[i];
          }
          return [];
        }
        return factory;
    }
    quantityCalculationMethod.$inject = ['$log'];
})();





quantityCalculationMethod: function(id){

},
