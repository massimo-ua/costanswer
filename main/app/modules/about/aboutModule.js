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
            });
    }
    AboutConfig.$inject = ['$stateProvider'];
    angular.module('costAnswer.about').config(AboutConfig);
}());

 