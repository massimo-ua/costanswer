(function(){
    angular.module('costAnswer.core')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('standard', {
                url: '/standard',
                redirectTo: 'standard.start',
                parent: "projectDataInput",
                controller: 'standardController',
                templateUrl: 'app/modules/core/standard/views/home.html'
            })
            .state('standard.start', {
                url: '/start',
                controller: 'startProductController',
                templateUrl: 'app/modules/core/standard/views/start.html',
            })
            .state('standard.newProduct', {
                url: '/product/new',
                controller: 'NewProductController',
                controllerAs: 'vm',
                templateUrl: 'app/modules/core/standard/views/property/settings.html',
            })
            .state('standard.singleProduct', {
                url: '/product/:id',
                redirectTo: 'property',
                controller: 'singleProductController',
                templateUrl: 'app/modules/core/standard/views/single-product.html',
            })
            .state('property', {
                parent: "standard.singleProduct",
                redirectTo: 'property.inventory',
                url: "/property",
                controller: 'propertyController',
                templateUrl: 'app/modules/core/standard/views/property/home.html'
            })
            .state('property.settings', {
                url: '/settings',
                controller: 'PropertySettingsController',
                controllerAs: 'vm',
                templateUrl: 'app/modules/core/standard/views/property/settings.html',
            })
            .state('property.inventory', {
                url: '/inventory',
                //controller: 'propertyInventoryController',
                //templateUrl: 'app/modules/core/standard/views/property/inventory.html',
                template: '<property-inventory></property-inventory>',
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