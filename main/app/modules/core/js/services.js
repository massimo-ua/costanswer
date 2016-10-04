(function(){
    angular.module('costAnswer.core.services', ['costAnswer.core.moh.services']);
    angular.module('costAnswer.core.services').value('API_PREFIX','http://www.acl.pp.ua:10101');

    angular.module('costAnswer.core.services')
    .factory('DataModel', ['$resource', 'API_PREFIX', function($resource, API_PREFIX){
        return {
            Project: $resource(API_PREFIX+'/projects/:id', { id: '@_id' }, {
                update: { method: 'PUT' },
                uuid: {
                    method: 'GET',
                    params: { uuid: '@uuid' },
                    url: API_PREFIX+'/projects/uuid/:uuid'
                }
            }),
            Moh: $resource(API_PREFIX+'/moh/:id', { id: '@_id' }, {
                update: { method: 'PUT' },
                saveWithUuid: {
                    method: 'POST',
                    url: API_PREFIX+'/moh/uuid'
                }
            })
        }
    }]);
}());