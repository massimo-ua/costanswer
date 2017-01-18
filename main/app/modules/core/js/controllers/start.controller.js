(function(){
    'use strict';
    function StartCoreController(
        $log,
        $state,
        $localStorage,
        authService,
        popupService
        ){
        var vm = this;
        function init() {
            vm.isAuthenticated = authService.isAuthenticated();
        }
        init();
        vm.newProject = function() {
            $localStorage.$reset();
            $state.go('quickStart');
        }
        vm.openProject = function(){
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
        '$localStorage',
        'authService',
        'popupService'
    ];
    angular.module('costAnswer.core.controllers')
        .controller('StartCoreController', StartCoreController);
}());