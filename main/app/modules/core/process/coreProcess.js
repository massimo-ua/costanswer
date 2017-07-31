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
                redirectTo: 'process-property',
                template: '<ca-product-home costing-method-name="process"></ca-product-home>'
            })
            .state('process-property', {
                parent: "process.singleProduct",
                redirectTo: 'process-property.inventory',
                url: '/property',
                template: '<ca-property-home></ca-property-home>'
            })
            .state('process-property.inventory', {
                url: '/inventory',
                template: '<ca-process-product-inventory></ca-process-product-inventory>'
            })
            .state('process-property.settings', {
                url: '/settings',
                template: '<property-settings></property-settings>'
            })
            .state('process-property.processes', {
                url: '/processes',
                template: '<div ui-view></div>'
            })
            .state('process-property.sp', {
                url: '/sales-plan',
                template: '<ca-process-product-sales-plan></ca-process-product-sales-plan>'
            })
            .state('process-property.mu', {
                url: '/markup',
                template: '<ca-process-product-markup></ca-process-product-markup>'
            })
            .state('process-property.report', {
                url: '/report',
                template: '<ca-process-product-report></ca-process-product-report>'
            })
            .state('product-process', {
                url: '',
                parent: 'process-property.processes',
                template: '<ca-process-product-process></ca-process-product-process>'
            })
            /*.state('product-process.new', {
              url: '/p/new',
              template: '<h1>product-process.new</h1>'
            })
            .state('product-process.process', {
              url: '/p/:processId',
              template: '<h1>product-process.process</h1>'
            })*/;
    }]);
}());
