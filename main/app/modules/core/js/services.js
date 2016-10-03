(function(){
    angular.module('costAnswer.core.services', ['costAnswer.core.moh.services']);
    angular.module('costAnswer.core.services').value('API_PREFIX','http://www.acl.pp.ua:10101');

    angular.module('costAnswer.core.services')
    .factory('DataModel', ['$resource', 'API_PREFIX', function($resource, API_PREFIX){
        return {
            Project: $resource(API_PREFIX+'/projects/:uuid', { uuid: '@_uuid' }, {
                update: { method: 'PUT' }
            })
        }
    }]);
}());