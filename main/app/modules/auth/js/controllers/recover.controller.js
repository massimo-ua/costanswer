(function(){
    'use strict'
    angular.module('costAnswer.auth.controllers');
    //controller functions definitions
    function AuthRecoverController(authService, $log, $state, $stateParams) {
        var vm = this;
        function init() {
            vm.buttonText = "Recover";
            vm.auth = {};
            vm.success = false;
        }
        init();
        vm.recoverPassword = function() {
            if(vm.auth.password === vm.auth.confirmpassword) {
                if($stateParams.uuid) {
                    vm.buttonText = "Recovering...";
                    authService.recoverPassword($stateParams.uuid, vm.auth.password)
                        .then(function(response){
                            vm.messageHeader = "Congratulations!";
                            vm.messageText = "Password succesfully recovered!";
                            vm.success = true;
                        })
                        .catch(function(err){
                            vm.messageHeader = "Sorry.";
                            vm.messageText = "There was a problem with recovering your password!";
                            vm.success = false;
                        })
                        .finally(function(){
                            vm.buttonText = "Recover";
                        })
                }
            }
            return;
        }
    }
    //dependencies injection block
    AuthRecoverController.$inject = ['authService','$log','$state','$stateParams'];
    //controller function linking
    angular.module('costAnswer.auth.controllers')
        .controller('AuthRecoverController', AuthRecoverController)
}());