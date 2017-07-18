(function(){
    'use strict';
    angular.module('costAnswer.core.process.services')
    .factory('processService', processService);
    function processService($log) {
        var factory = {};
        factory.productsList = function(uuid) {
                var config = {
                    method: 'GET',
                    url: API_PREFIX + '/products/list/2/'+uuid
                };
                return $http(config);
            };
    }
    processService.$inject = ['$log'];
})();