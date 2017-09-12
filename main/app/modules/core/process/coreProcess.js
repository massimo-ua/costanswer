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
                parent: 'projectDataInput',
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
                redirectTo: 'product-process',
                template: '<ca-process-product-processes></ca-process-product-processes>'
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
                url: '/property',
                redirectTo: 'product-process.home',
                parent: 'process-property.processes',
                template: '<ca-process-product-process></ca-process-product-process>'
            })
            .state('product-process.home', {
                url: '/home',
                template: '<ca-costing-start next-sref="product-process.new" button-text="Create new process"></ca-costing-start>'
            })
            .state('product-process.new', {
              url: '/new',
              template: '<ca-process-product-process-settings></ca-process-product-process-settings>'
            })
            .state('product-process.process', {
              url: '/:processId',
                redirectTo: 'product-process-component',
              template: '<ca-process-product-process-container></ca-process-product-process-container>'
            })
            .state('product-process-component', {
                parent: 'product-process.process',
                redirectTo: 'product-process-component.settings',
                url: '/c',
                template: '<div ui-view></div>'
            })
            .state('product-process-component.settings', {
                url: '/settings',
                template: '<ca-process-product-process-settings></ca-process-product-process-settings>'
            })
            .state('product-process-component.wb', {
                url: '/wip-beginning',
                template: '<ca-process-product-process-wb></ca-process-product-process-wb>'
            })
            .state('product-process-component.pp', {
                url: '/production-plan',
                template: '<ca-process-product-process-pp></ca-process-product-process-pp>'
            })
            .state('product-process-component.dm', {
                url: '/direct-materials',
                template: '<ca-process-product-process-dm></ca-process-product-process-dm>'
            })
            .state('product-process-component.dl', {
                url: '/direct-labor',
                template: '<ca-process-product-process-dl></ca-process-product-process-dl>'
            })
            .state('product-process-component.vo', {
                url: '/variable-overhead',
                template: '<ca-process-product-process-vo></ca-process-product-process-vo>'
            });
    }]);
}());
