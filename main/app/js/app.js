angular.module('costAnswer', [
    'ui.router',
    'satellizer',
    'ngResource',
    'ngSanitize',
    'toastr',
    'ngStorage',
    'ui.grid',
    'ui.grid.pinning',
    'angular-loading-bar',
    'ngAnimate',
    'costAnswer.services',
    'costAnswer.filters',
    'costAnswer.directives',
    'costAnswer.core',
    'costAnswer.auth'
])
.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$on('$stateChangeStart', function(evt, to, params) {
      if (to.redirectTo) {
        evt.preventDefault();
        $state.go(to.redirectTo, params);
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
;