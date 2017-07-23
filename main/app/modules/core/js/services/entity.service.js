(function(){
    'use strict';
    angular.module('costAnswer.core.services')
    .factory('entityService', entityService);
    function entityService($log, API_PREFIX, $http) {
        var factory = {};
        factory.products = function(uuid, type) {
                var config = {
                    method: 'GET',
                    url: API_PREFIX + '/products/list/' + type + '/' + uuid
                };
                return $http(config);
        };
        return factory;
    }
    entityService.$inject = ['$log','API_PREFIX','$http'];
})();