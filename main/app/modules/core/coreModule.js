(function() {
angular.module('costAnswer.core', ['costAnswer.core.controllers','costAnswer.core.services']);
angular.module('costAnswer.core')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('descriptionCore', {
                url: '/description/:costingMethod',
                views: { 
                    "main": {
                            controller: 'descriptionCoreController',
                            templateUrl: 'app/modules/core/views/description.html'
                    }
                }
            })
            .state('startCore', {
                url: '/start',
                views: { 
                    "main": {
                controller: 'startCoreController',
                templateUrl: 'app/modules/core/views/start.html'
                }
            }
            })
            .state('newProjectType', {
                url: '/new-project-type',
                views: { 
                    "main": {
                controller: 'newProjectTypeController',
                templateUrl: 'app/modules/core/views/new-project-type.html'
                }
            }
            })
            .state('quickStart', {
                url: '/quick-start',
                views: { 
                    "main": {
                controller: 'quickStartController',
                templateUrl: 'app/modules/core/views/quick-start.html'
                }
            }
            })
            .state('projectSettings', {
                url: '/project-settings',
                views: { 
                    "main": {
                        controller: 'projectSettingsController',
                        templateUrl: 'app/modules/core/views/project-settings.html'
                    }
                }
            })
            .state('mohDataInput', {
                abstract: true,
                url: '/moh-data-input',
                views: { 
                    "main": {
                        controller: 'mohDataInputController',
                        templateUrl: 'app/modules/core/views/moh/main.html'
                    }
                }
            })
            .state('mohDataInput.home', {
                parent: "mohDataInput",
                url: '/',
                controller: 'mohDataInputHomeController',
                templateUrl: 'app/modules/core/views/moh/home.html'
            });
        $urlRouterProvider.otherwise('/description/standard-costing');
    }]);
}());