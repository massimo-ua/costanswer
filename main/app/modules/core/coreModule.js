(function() {
angular.module('costAnswer.core', [
    'costAnswer.core.controllers',
    'costAnswer.core.services',
    'costAnswer.core.directives',
    'costAnswer.core.filters',
    'costAnswer.core.components'
    ]);
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
                controller: 'StartCoreController',
                controllerAs: 'vm',
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
                        controller: 'ProjectSettingsController',
                        controllerAs: 'vm',
                        templateUrl: 'app/modules/core/views/project-settings.html'
                    }
                }
            })
            .state('projectDataInput', {
                url: '/project-data-input',
                views: { 
                    "main": {
                        controller: 'ProjectDataInputMainController',
                        controllerAs: 'vm',
                        templateUrl: 'app/modules/core/views/project-data-input.html'
                    }
                }
            })
            .state('projectReport', {
                url: '/report',
                parent: "projectDataInput",
                controller: 'ProjectReportController',
                controllerAs: 'prc',
                templateUrl: 'app/modules/core/views/project-report.html'
            })
            .state('moh', {
                url: '/moh',
                //abstract: true,
                redirectTo: 'moh.settings',
                parent: "projectDataInput",
                controller: 'mohController',
                templateUrl: 'app/modules/core/moh/views/home.html'
            })
            .state('moh.settings', {
                url: '/settings',
                //url: '',
                controller: 'MohSettingsController',
                controllerAs: 'vm',
                templateUrl: 'app/modules/core/moh/views/settings.html'
            })
            .state('moh.im', {
                url: '/indirect-materials',
                controller: 'mohIndirectMaterialsController',
                templateUrl: 'app/modules/core/moh/views/cost-per-month.html'
            })
            .state('moh.pms', {
                url: '/production-managers-salaries',
                controller: 'mohProductionManagersSalariesController',
                templateUrl: 'app/modules/core/moh/views/annual-growth-salary.html'
            })
            .state('moh.pfi', {
                url: '/production-facilities-insurance',
                controller: 'mohProductionFacilitiesInsuranceController',
                templateUrl: 'app/modules/core/moh/views/cost-per-month.html'
            })
            .state('moh.ppt', {
                url: '/production-property-taxes',
                controller: 'mohProductionPropertyTaxesController',
                templateUrl: 'app/modules/core/moh/views/cost-per-month.html'
            })
            .state('moh.il', {
                url: '/indirect-labor',
                controller: 'mohIndirectLaborController',
                templateUrl: 'app/modules/core/moh/views/annual-growth-salary.html'
            })
            .state('moh.pmr', {
                url: '/production-machinery-rent',
                controller: 'mohProductionMachineryRentController',
                templateUrl: 'app/modules/core/moh/views/cost-per-month.html'
            })
            .state('moh.puooe', {
                url: '/production-utilities-and-other-overhead-expences',
                controller: 'mohProductionUtilitiesAndOtherOverheadExpencesController',
                templateUrl: 'app/modules/core/moh/views/cost-per-month.html'
            })
            .state('moh.pfa', {
                url: '/production-facilities-amortization',
                controller: 'mohProductionFacilitiesAmortizationController',
                templateUrl: 'app/modules/core/moh/views/cost-per-month.html'
            })
            .state('moh.report', {
                url: '/report',
                controller: 'mohReportController',
                templateUrl: 'app/modules/core/moh/views/report.html'
            });
        $urlRouterProvider.otherwise('/description/standard-costing');
    }]);
}());