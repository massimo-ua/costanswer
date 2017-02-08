(function(){
    'use strict'
    angular.module('costAnswer.auth.controllers');
    //controller functions definitions
    function AuthRequestRecoveryController($log, authService) {
        var vm = this;
        function init() {
            vm.auth = {};
            vm.buttonText = "Send request";
            vm.success = false;
        }
        init();
        vm.requestRecovery = function() {
            vm.buttonText = "Sending request...";
            authService.requestRecovery(vm.auth.email)
                .then(function(response){
                    vm.messageHeader = "Request successfully sent!";
                    vm.messageText = "Check your mailbox for further instructions.";
                    vm.success = true;
                })
                .catch(function(err){
                    $log.error(err);
                })
                .finally(function(){
                    vm.buttonText = "Send request";
                });
        }
    }
    //dependencies injection block
    AuthRequestRecoveryController.$inject = ['$log','authService'];
    //controller function linking
    angular.module('costAnswer.auth.controllers')
        .controller('AuthRequestRecoveryController', AuthRequestRecoveryController)
}());