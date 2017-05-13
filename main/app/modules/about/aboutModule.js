(function(){
    angular.module('costAnswer.about', [
        'costAnswer.about.services',
        'costAnswer.about.controllers'
    ]);
    function AboutConfig($stateProvider) {
        $stateProvider
            .state('about', {
                url: '/about',
                redirectTo: 'about.what-is-costanswer',
                views: {
                    "main": {
                        templateUrl: 'app/modules/about/views/home.html',
                        controller: 'AboutHomeController',
                        controllerAs: 'vm',
                    }
                }
            })
            .state('about.what-is-costanswer', {
                url: '/what-is-costanswer',
                parent: 'about',
                templateUrl: 'app/modules/about/views/what-is-costanswer.html',
            })
            .state('about.product-cost-vs-service-cost', {
                url: '/product-cost-vs-service-cost',
                parent: 'about',
                templateUrl: 'app/modules/about/views/product-cost-vs-service-cost.html',
            })
            .state('about.process-costing', {
                url: '/process-costing',
                parent: 'about',
                templateUrl: 'app/modules/about/views/process-costing.html',
            })
            .state('about.per-batch-approach', {
                url: '/per-batch-approach',
                parent: 'about',
                templateUrl: 'app/modules/about/views/per-batch-approach.html',
            })
            .state('about.checkups', {
                url: '/checkups',
                parent: 'about',
                templateUrl: 'app/modules/about/views/checkups.html',
            })
            .state('about.theory-in-brief', {
                url: '/theory-in-brief',
                parent: 'about',
                templateUrl: 'app/modules/about/views/theory-in-brief.html',
            })
            .state('about.inventory-accounting', {
                url: '/inventory-accounting',
                parent: 'about',
                templateUrl: 'app/modules/about/views/inventory-accounting.html',
            })
            .state('about.job-order-costing', {
                url: '/job-order-costing',
                parent: 'about',
                templateUrl: 'app/modules/about/views/job-order-costing.html',
            })
            .state('about.variable-overhead', {
                url: '/variable-overhead',
                parent: 'about',
                templateUrl: 'app/modules/about/views/variable-overhead.html',
            });
            
    }
    AboutConfig.$inject = ['$stateProvider'];
    angular.module('costAnswer.about').config(AboutConfig);
}());

 