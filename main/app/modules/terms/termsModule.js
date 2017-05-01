(function(){
    angular.module('costAnswer.terms', []);
    function TermsConfig($stateProvider) {
        $stateProvider
            .state('terms', {
                url: '/terms',
                redirectTo: 'terms.OfUse',
                views: {
                    "main": {
                        templateUrl: 'app/modules/terms/views/home.html'
                    }
                }
            })
            .state('terms.OfUse', {
                url: '/terms-of-use',
                templateUrl: 'app/modules/terms/views/terms-of-use.html',
            });
    }
    TermsConfig.$inject = ['$stateProvider'];
    angular.module('costAnswer.terms').config(TermsConfig);
}());