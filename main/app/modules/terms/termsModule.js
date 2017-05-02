(function(){
    angular.module('costAnswer.terms', []);
    function TermsConfig($stateProvider) {
        $stateProvider
            .state('TermsOfUse', {
                url: '/terms-of-use',
                views: {
                    "main": {
                        templateUrl: 'app/modules/terms/views/terms-of-use.html'
                    }
                }
            })
            .state('PrivacyPolicy', {
                url: '/privacy-policy',
                views: {
                    "main": {
                        templateUrl: 'app/modules/terms/views/privacy-policy.html'
                    }
                }
            });
    }
    TermsConfig.$inject = ['$stateProvider'];
    angular.module('costAnswer.terms').config(TermsConfig);
}());

 