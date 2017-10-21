(function(){
    'use strict';
    angular.module('costAnswer.core.services')
    .factory('reportService', reportService);
    function reportService($log, API_PREFIX, $http) {
        var factory = {};
        factory.instant = {
            Process: {
                wip_beginning: function(processId) {
                    var config = {
                        method: 'GET',
                        url: API_PREFIX + '/report/process/instant' + processId + '/wip_beginning'
                    };
                    return $http(config);
                }
            }
        };
        return factory;
    }
    reportService.$inject = ['$log','API_PREFIX','$http'];
})();
