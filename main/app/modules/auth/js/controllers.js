(function(){
    'use strict'
    angular.module('costAnswer.auth.controllers',[]);
    //controller functions definitions
    function AuthLoginController(authService, $log, $state, $scope, toastr) {
        var vm = this;
        vm.login = function() {
            vm.buttonText = 'Loging in ...'
            authService.login(vm.auth.email, vm.auth.password)
            .then(function(response){
                //if login succesful emit broadcast message for changes in profile menu
                $scope.$emit('USER_LOGIN_EVENT');
                $state.go('startCore');
            })
            .catch(function(error){
                    $log.error(error);
                    toastr.error('Sorry, we encountered error during authorization handling. Please, check if your credentials are correct', 'Authorization error');
                    vm.invalidLogin = error.data.message;
            })
            .finally(function(){
                vm.buttonText = 'Login';
            });
        }
    }
    function AuthSignupController(authService, $log, $state, $scope) {
        var vm = this;
        function init() {
            vm.auth = {};
            vm.buttonText = 'Sign up';
        }
        init();        
        vm.signup = function() {
            var user = {};
            if(vm.auth.password != vm.auth.confirmpassword) {
                vm.signupForm.confirmpassword.$invalid = true;
                vm.signupForm.password.$invalid = true;
                vm.passwordmismatch = true;
                return;
            }
            user.email = vm.auth.email;
            user.password = vm.auth.password;
            user.display_name = vm.auth.display_name;
            vm.buttonText = 'Signing Up...';
            authService.signup(user)
                .then(function(){
                    $scope.$emit('USER_LOGIN_EVENT');
                    $state.go('authSignupGreetings');
                })
                .catch(function(error){
                    $log.error(error);
                    vm.invalidSignUp = error.data.message;
                })
                .finally(function(){
                    vm.buttonText = 'Sign up';
                    vm.auth = {};
                });
        }
    }
    function AuthMenuController(authService,$log,$scope,$state,$localStorage) {
        var vm = this;
        function init() {
            if(authService.isAuthenticated()) {
                if(!vm.userProfile) {
                    vm.userProfile = authService.profile();
                }
            }
        }
        init();
        vm.logout = function() {
            authService.logout()
                .then(function(response){
                    $scope.$emit('USER_LOGOUT_EVENT');
                    $state.go('startCore');
                });
        }
        $scope.$on('USER_LOGIN_EVENT', function() {
            vm.userProfile = authService.profile(); 
        });
        $scope.$on('USER_LOGOUT_EVENT', function() {
            vm.userProfile = undefined;
            $localStorage.$reset();
        });
    }
    //dependencies injection block
    AuthLoginController.$inject = ['authService','$log','$state','$scope','toastr'];
    AuthSignupController.$inject = ['authService','$log','$state','$scope'];
    AuthMenuController.$inject = ['authService','$log','$scope','$state','$localStorage'];
    //controller function linking
    angular.module('costAnswer.auth.controllers')
        .controller('AuthLoginController', AuthLoginController)
        .controller('AuthSignupController', AuthSignupController)
        .controller('AuthMenuController', AuthMenuController);
}());