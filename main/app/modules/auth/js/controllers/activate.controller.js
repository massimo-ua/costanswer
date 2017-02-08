(function(){
    'use strict'
    angular.module('costAnswer.auth.controllers');
    //controller functions definitions
    function AuthActivateController(authService, $log, $state, $stateParams) {
        var vm = this;
        if($stateParams.uuid) {
            authService.activateAccount($stateParams.uuid)
                .then(function(response){
                    vm.messageHeader = "Congratulations!";
                    vm.messageText = "Account activated succesfully!";
                    vm.success = true;
                })
                .catch(function(err){
                    vm.messageHeader = "Sorry.";
                    vm.messageText = "There was a problem with activating your account!";
                    vm.success = false;
                })
        }
    }
    //dependencies injection block
    AuthActivateController.$inject = ['authService','$log','$state','$stateParams'];
    //controller function linking
    angular.module('costAnswer.auth.controllers')
        .controller('AuthActivateController', AuthActivateController)
}());