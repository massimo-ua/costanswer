(function() {
angular.module('costAnswer.core', ['costAnswer.core.controllers']);
angular.module('costAnswer.core')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('descriptionCore', {
                url: '/description/:costingMethod',
                controller: 'descriptionCoreController',
                templateUrl: 'app/modules/core/views/description.html'
            })
            .state('startCore', {
                url: '/start',
                controller: 'startCoreController',
                templateUrl: 'app/modules/core/views/start.html'
            });
        $urlRouterProvider.otherwise('/description/standard-costing');
    }]);
}());