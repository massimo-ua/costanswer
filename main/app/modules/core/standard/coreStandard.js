(function(){
    angular.module('costAnswer.core')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('standard', {
                url: '/standard',
                redirectTo: 'standard.start',
                parent: "projectDataInput",
                template: '<ca-standard-home></ca-standard-home>'
            })
            .state('standard.start', {
                url: '/start',
                template: '<ca-costing-start next-sref="standard.newProduct"></ca-costing-start>'
            })
            .state('standard.newProduct', {
                url: '/product/new',
                template: '<property-settings costing-method="1" return-sref="standard.singleProduct"></property-settings>'
            })
            .state('standard.singleProduct', {
                url: '/product/:id',
                redirectTo: 'property',
                template: '<ca-product-home costing-method-name="standard"></ca-product-home>',
            })
            .state('property', {
                parent: "standard.singleProduct",
                redirectTo: 'property.inventory',
                url: "/property",
                template: '<ca-property-home></ca-property-home>'
            })
            .state('property.settings', {
                url: '/settings',
                template: '<property-settings></property-settings>'
            })
            .state('property.inventory', {
                url: '/inventory',
                template: '<property-inventory></property-inventory>'
            })
            .state('property.pp', {
                url: '/production-plan',
                controller: 'propertyProductionPlanController',
                templateUrl: 'app/modules/core/standard/views/property/plan.html',
            })
            .state('property.sp', {
                url: '/sales-plan',
                controller: 'propertySalesPlanController',
                templateUrl: 'app/modules/core/standard/views/property/plan.html',
            })
            .state('property.wb', {
                url: '/wip-beginning',
                template: '<property-wip-beginning></property-wip-beginning>',
            })
            .state('property.dm', {
                url: '/direct-materials',
                controller: 'propertyDirectMaterialsController',
                templateUrl: 'app/modules/core/standard/views/property/direct-materials.html',
            })
            .state('property.dl', {
                url: '/direct-labor',
                controller: 'propertyDirectLaborController',
                templateUrl: 'app/modules/core/standard/views/property/direct-labor.html',
            })
            .state('property.vo', {
                url: '/variable-overhead',
                controller: 'propertyVariableOverheadController',
                templateUrl: 'app/modules/core/standard/views/property/variable-overhead.html',
            })
            .state('property.mh', {
                url: '/machine-hours',
                controller: 'propertyMachineHoursController',
                templateUrl: 'app/modules/core/standard/views/property/machine-hours.html',
            })
            .state('property.we', {
                url: '/wip-ending',
                template: '<property-wip-ending></property-wip-ending>',
            })
            .state('property.mu', {
                url: '/mark-up',
                controller: 'propertyMarkUpController',
                templateUrl: 'app/modules/core/standard/views/property/mark-up.html',
            })
            .state('property.report', {
                url: '/report',
                controller: 'propertyReportController',
                templateUrl: 'app/modules/core/standard/views/property/report.html',
            });   
    }]);
}());