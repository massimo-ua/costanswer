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
                                defer.reject(error);
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
        factory.getCurrency = function(code) {
                var defer = $q.defer();
                if(currencies.length === 0) {
                    factory.get()
                        .then(function(response){
                            currencies = response.data;
                            defer.resolve(factory.findCurrency(code));
                        })
                        .catch(function(error){
                                defer.reject(error);
                        });
                }
                else {
                    defer.resolve(factory.findCurrency(code));
                }
                return defer.promise;
        };
        factory.findCurrency = function(code) {
            for(var i = 0; i < currencies.length; i++) {
                if(code == currencies[i].code) return currencies[i];
            }
            return {};
        };
        return factory;
    }
    CurrencyService.$inject = ['$log', '$http', 'API_PREFIX', '$q'];
}());