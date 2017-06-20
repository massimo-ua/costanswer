(function(){
    'use strict';
    angular.module('costAnswer.services')
    .factory('CurrencyService', CurrencyService);
    function CurrencyService($log, $http, API_PREFIX, $q) {
        var currencies = [];
        var factory = {};
        factory.list = function() {
                        var defer = $q.defer();
                        if(currencies.length > 0) defer.resolve(currencies);
                        factory.get()
                            .then(function(response){
                                currencies = response.data;
                                defer.resolve(currencies);
                            })
                            .catch(function(error){
                                defer.reject(err);
                            });
                        return defer.promise;
                };
        factory.get = function() {
                    var config = {
                        method: 'GET',
                        url: API_PREFIX + '/currencies'
                    };
                    return $http(config);
                };
        return factory;
    }
    CurrencyService.$inject = ['$log', '$http', 'API_PREFIX', '$q'];
}());