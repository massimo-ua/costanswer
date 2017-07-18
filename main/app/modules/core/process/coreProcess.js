(function(){
    angular.module('costAnswer.core.process',[
        'costAnswer.core.process.components',
        'costAnswer.core.process.services'
        ])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('process', {
                url: '/process',
                //redirectTo: 'process.start',
                parent: "projectDataInput",
                template: '<ca-process-home></ca-process-home>'
                //template: '<coming-soon></coming-soon>'
            })
            /*.state('process.start', {
                url: '/start',
                controller: 'startProductController',
                templateUrl: 'app/modules/core/process/views/start.html',
            })
            .state('process.newProduct', {
                url: '/product/new',
                template: '<property-settings></property-settings>'
            })
            .state('process.singleProduct', {
                url: '/product/:id',
                redirectTo: 'property',
                controller: 'singleProductController',
                templateUrl: 'app/modules/core/process/views/single-product.html',
            })
            .state('property', {
                parent: "process.singleProduct",
                redirectTo: 'property.inventory',
                url: "/property",
                controller: 'propertyController',
                templateUrl: 'app/modules/core/process/views/property/home.html'
            })
            .state('property.settings', {
                url: '/settings',
                template: '<property-settings></property-settings>'
            })*/;   
    }]);
}());
