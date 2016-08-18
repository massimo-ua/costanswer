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
                parent: "projectDataInput",
                controller: 'mohController',
                templateUrl: 'app/modules/core/views/moh/home.html'
            })
            .state('moh.settings', {
                url: '',
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
            .state('moh.ppt', {
                url: '/production-property-taxes',
                controller: 'mohProductionPropertyTaxesController',
                templateUrl: 'app/modules/core/views/moh/production-property-taxes.html'
            })
            .state('moh.il', {
                url: '/indirect-labour',
                controller: 'mohIndirectLabourController',
                templateUrl: 'app/modules/core/views/moh/indirect-labour.html'
            })
            .state('moh.pmr', {
                url: '/production-machinery-rent',
                controller: 'mohProductionMachineryRentController',
                templateUrl: 'app/modules/core/views/moh/production-machinery-rent.html'
            })
            .state('moh.puooe', {
                url: '/production-utilities-and-other-overhead-expences',
                controller: 'mohProductionUtilitiesAndOtherOverheadExpencesController',
                templateUrl: 'app/modules/core/views/moh/production-utilities-and-other-overhead-expences.html'
            })
            .state('moh.pfa', {
                url: '/production-facilities-amortization',
                controller: 'mohProductionFacilitiesAmortizationController',
                templateUrl: 'app/modules/core/views/moh/production-facilities-amortization.html'
            })
            .state('moh.report', {
                url: '/report',
                controller: 'mohReportController',
                templateUrl: 'app/modules/core/views/moh/report.html'
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