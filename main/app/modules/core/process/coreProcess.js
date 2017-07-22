(function(){
    angular.module('costAnswer.core.process',[
        'costAnswer.core.process.components',
        'costAnswer.core.process.services'
        ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('process', {
                url: '/process',
                redirectTo: 'process.start',
                parent: "projectDataInput",
                template: '<ca-process-home></ca-process-home>'
            })
            .state('process.start', {
                url: '/start',
                template: '<ca-costing-start next-sref="process.newProduct"></ca-costing-start>'
            })
            .state('process.newProduct', {
                url: '/product/new',
                template: '<property-settings costing-method="2" return-sref="process.singleProduct"></property-settings>'
            })
            .state('process.singleProduct', {
                url: '/product/:id',
                redirectTo: 'property',
                template: '<h1>Single product #:id page</h1>'
            })
            .state('property', {
                parent: "process.singleProduct",
                redirectTo: 'property.inventory',
                url: "/property",
                controller: 'propertyController',
                templateUrl: 'app/modules/core/process/views/property/home.html'
            })
            .state('property.inventory', {
                url: '/inventory',
                //template: '<property-inventory></property-inventory>'
                template: '<h1>property-inventory</h1>'
            })
            .state('property.settings', {
                url: '/settings',
                template: '<property-settings></property-settings>'
            });   
    }]);
}());
