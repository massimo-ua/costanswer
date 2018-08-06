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
                },
                direct_labor: function(processId, directLaborId) {
                    var config = {
                        method: 'GET',
                        url: API_PREFIX + '/report/process/instant/' + processId + '/direct_labor' + (directLaborId === undefined ? '' : '/' + directLaborId)
                    };
                    return $http(config);
                },
                variable_overhead: function(processId, variableOverheadId) {
                    var config = {
                        method: 'GET',
                        url: API_PREFIX + '/report/process/instant/' + processId + '/variable_overhead' + (variableOverheadId === undefined ? '' : '/' + variableOverheadId)
                    };
                    return $http(config);
                },
                machine_hour: function(processId, machineHourId) {
                    var config = {
                        method: 'GET',
                        url: API_PREFIX + '/report/process/instant/' + processId + '/machine_hour' + (machineHourId === undefined ? '' : '/' + machineHourId)
                    };
                    return $http(config);
                },
                wip_ending: function(processId) {
                    var config = {
                        method: 'GET',
                        url: API_PREFIX + '/report/process/instant/' + processId + '/wip_ending'
                    };
                    return $http(config);
                },
            }
        };
        return factory;
    }
    reportService.$inject = ['$log','API_PREFIX','$http'];
})();
