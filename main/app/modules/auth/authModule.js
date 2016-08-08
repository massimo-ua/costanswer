(function(){
    angular.module('costAnswer.auth', ['costAnswer.auth.controllers', 'costAnswer.auth.services']);
    angular.module('costAnswer.auth')
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('authLogin', {
                    url: '/login',
                    controller: 'authLoginController',
                    templateUrl: 'app/modules/auth/views/login.html'
                })
                .state('authSignup', {
                    url: '/signup',
                    controller: 'authSignupController',
                    templateUrl: 'app/modules/auth/views/login.html'
                }); 
        }]);
}());