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
            .state('projectDataInput', {
                url: '/project-data-input',
                views: { 
                    "main": {
                        controller: 'projectDataInputMainController',
                        templateUrl: 'app/modules/core/views/project-data-input.html'
                    }
                }
            })
            .state('moh', {
                url: '/moh',
                abstract: true,
                defaultChild: 'moh.settings',
                parent: "projectDataInput",
                controller: 'mohController',
                templateUrl: 'app/modules/core/views/moh/home.html'
            })
            .state('moh.settings', {
                url: '/settings',
                controller: 'mohSettingsController',
                templateUrl: 'app/modules/core/views/moh/settings.html'
            })
            .state('moh.im', {
                url: '/indirect-materials',
                controller: 'mohIndirectMaterialsController',
                templateUrl: 'app/modules/core/views/moh/indirect-materials.html'
            })
            .state('moh.pms', {
                url: '/production-managers-salaries',
                controller: 'mohProductionManagersSalariesController',
                templateUrl: 'app/modules/core/views/moh/production-managers-salaries.html'
            })
            .state('moh.pfi', {
                url: '/production-facilities-insurance',
                controller: 'mohProductionFacilitiesInsuranceController',
                templateUrl: 'app/modules/core/views/moh/production-facilities-insurance.html'
            })
            /*.state('mohDataInput.home', {
                parent: "mohDataInput",
                url: '/',
                controller: 'mohDataInputHomeController',
                templateUrl: 'app/modules/core/views/moh/home.html'
            })*/;
        $urlRouterProvider.otherwise('/description/standard-costing');
    }]);
}());