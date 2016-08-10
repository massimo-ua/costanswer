(function() {
angular.module('costAnswer.core', ['costAnswer.core.controllers','costAnswer.core.services']);
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
            })
            .state('newProjectType', {
                url: '/new-project-type',
                controller: 'newProjectTypeController',
                templateUrl: 'app/modules/core/views/new-project-type.html'
            })
            .state('quickStart', {
                url: '/quick-start',
                controller: 'quickStartController',
                templateUrl: 'app/modules/core/views/quick-start.html'
            })
            .state('projectSettings', {
                url: '/project-settings',
                controller: 'projectSettingsController',
                templateUrl: 'app/modules/core/views/project-settings.html'
            });
        $urlRouterProvider.otherwise('/description/standard-costing');
    }]);
}());