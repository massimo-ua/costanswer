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
                })
                .state('authActivate', {
                    url: '/activate/:uuid',
                    views: {
                        "main": {
                            controller: 'AuthActivateController',
                            controllerAs: 'vm',
                            templateUrl: 'app/modules/auth/views/activate.html'
                        }
                    }
                })
                .state('authRequestRecovery', {
                    url: '/request/recovery',
                    views: {
                        "main": {
                            controller: 'AuthRequestRecoveryController',
                            controllerAs: 'vm',
                            templateUrl: 'app/modules/auth/views/request-recovery.html'
                        }
                    }
                })
                .state('authSignupGreetings', {
                    url: '/signup/greetings',
                    views: {
                        "main": {
                            templateUrl: 'app/modules/auth/views/greetings.html'
                        }
                    }
                })
                .state('authRecover', {
                    url: '/recover/:uuid',
                    views: {
                        "main": {
                            controller: 'AuthRecoverController',
                            controllerAs: 'vm',
                            templateUrl: 'app/modules/auth/views/recover.html'
                        }
                    }
                }); 
        }]);
}());