(function(){
    'use strict';
    function StartCoreController(
        $log,
        $state,
        authService,
        popupService
        ){
        var vm = this;
        function init() {
            vm.isAuthenticated = authService.isAuthenticated();
        }
        init();
        vm.Open = function(){
            if(authService.isAuthenticated()) {
                $state.go('dashboard.Projects');
            } else {
                popupService.OptionNotAllowed();
            }
        }
    }
    StartCoreController.$inject = [
        '$log',
        '$state',
        'authService',
        'popupService'
    ];
    angular.module('costAnswer.core.controllers')
        .controller('StartCoreController', StartCoreController);
}());