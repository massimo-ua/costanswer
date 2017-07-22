(function(){
    'use strict';
    angular.module('costAnswer.core.process.services')
    .factory('processService', processService);
    function processService($log) {
        var factory = {};
        return factory;
    }
    processService.$inject = ['$log'];
})();