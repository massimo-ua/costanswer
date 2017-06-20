(function(){
    'use strict';
    angular.module('costAnswer.services')
    .factory('ProjectDataService', ProjectDataService);
    function ProjectDataService($log, $http, API_PREFIX, $q, $localStorage) {
        var project = {};
        var factory = {};
        factory.list = function(reload) {
                        var defer = $q.defer();
                        if(project.length > 0) defer.resolve(project);
                        factory.get()
                                .then(function(response){
                                    project = response.data;
                                    defer.resolve(project);
                                })
                                .catch(function(error){
                                    defer.reject(err);
                                });
                        return defer.promise;
                };
        factory.get = function() {
                    var config = {
                        method: 'GET',
                        url: API_PREFIX + '/projects/uuid/' + $localStorage.uuid
                    };
                    return $http(config);
                };
        return factory;
    }
    ProjectDataService.$inject = ['$log', '$http', 'API_PREFIX', '$q', '$localStorage'];
}());