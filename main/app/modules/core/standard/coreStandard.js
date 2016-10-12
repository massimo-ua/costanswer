(function(){
    angular.module('costAnswer.core')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('standard', {
                url: '/standard',
                redirectTo: 'standard.product',
                parent: "projectDataInput",
                controller: 'standardController',
                templateUrl: 'app/modules/core/standard/views/home.html'
            })
            .state('standard.product', {
                url: '/product/:id',
                controller: 'standardProductController',
                templateUrl: 'app/modules/core/standard/views/product.html',
            });
    }]);
}());