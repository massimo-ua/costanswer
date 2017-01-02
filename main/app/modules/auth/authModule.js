(function(){
    angular.module('costAnswer.auth', ['costAnswer.auth.controllers', 'costAnswer.auth.services']);
    angular.module('costAnswer.auth')
        .config(['$stateProvider', function($stateProvider){
            $stateProvider
                .state('authLogin', {
                    url: '/login',
                    views: {
                        "main": {
                            controller: 'AuthLoginController',
                            controllerAs: 'vm',
                            templateUrl: 'app/modules/auth/views/login.html'
                        }
                    }

                })
                .state('authSignup', {
                    url: '/signup',
                    views: {
                        "main": {
                            controller: 'AuthSignupController',
                            controllerAs: 'vm',
                            templateUrl: 'app/modules/auth/views/signup.html'
                        }
                    }
                }); 
        }]);
}());