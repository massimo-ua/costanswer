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
                        url: API_PREFIX + '/report/process/instant/' + processId + '/wip_beginning'
                    };
                    return $http(config);
                },
                production_plan: function(processId) {
                    var config = {
                        method: 'GET',
                        url: API_PREFIX + '/report/process/instant/' + processId + '/production_plan'
                    };
                    return $http(config);
                },
                direct_material: function(processId, directMaterialId) {
                    var config = {
                        method: 'GET',
                        url: API_PREFIX + '/report/process/instant/' + processId + '/direct_material' + (directMaterialId === undefined ? '' : '/' + directMaterialId)
                    };
                    return $http(config);
                }
            }
        };
        return factory;
    }
    reportService.$inject = ['$log','API_PREFIX','$http'];
})();
