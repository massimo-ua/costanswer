(function(){
    'use strict';
    angular.module('costAnswer', [
        'ui.router',
        'satellizer',
        'ngResource',
        'ngSanitize',
        'toastr',
        'ngStorage',
        //'ui.grid',
        //'ui.grid.pinning',
        'angular-loading-bar',
        'ngAnimate',
        'ngDialog',
        'costAnswer.services',
        'costAnswer.filters',
        'costAnswer.directives',
        'costAnswer.core',
        'costAnswer.auth',
        'costAnswer.dashboard'
    ])
    .run(['$rootScope', '$state', '$stateParams','authService', function ($rootScope, $state, $stateParams, authService) {
        $rootScope.$state = $state;
        authService.setStorageType('localStorage');
        $rootScope.$on('$stateChangeStart', function(event, toState, params) {
            if(authService.isAuthenticated()) {
                if(!$rootScope.userProfile) {
                    $rootScope.userProfile = authService.profile();
                }
            }
            else {
                if(toState.data && toState.data.requiredLogin) {
                    event.preventDefault();
                    $state.go('authLogin');
                }
            }
            if (toState.redirectTo) {
                event.preventDefault();
                $state.go(toState.redirectTo, params);
            }
        });
    }]);

    /*
    toastr.options = {
        "closeButton": true, // true/false
        "debug": false, // true/false
        "newestOnTop": false, // true/false
        "progressBar": false, // true/false
        "positionClass": "toast-top-right", // toast-top-right / toast-top-left / toast-bottom-right / toast-bottom-left
        "preventDuplicates": false, true/false
        "onclick": null,
        "showDuration": "300", // in milliseconds
        "hideDuration": "1000", // in milliseconds
        "timeOut": "5000", // in milliseconds
        "extendedTimeOut": "1000", // in milliseconds
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    */
}());