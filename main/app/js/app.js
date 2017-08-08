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
        'angularUtils.directives.dirPagination',
        'formly',
        'formlyBootstrap',
        'costAnswer.services',
        'costAnswer.filters',
        'costAnswer.controllers',
        'costAnswer.directives',
        'costAnswer.core',
        'costAnswer.auth',
        'costAnswer.dashboard',
        'costAnswer.terms',
        'costAnswer.about',
        'costAnswer.manual'
    ])
    .run(['$rootScope', '$state', '$stateParams','authService', 'CurrencyService', 'formlyConfig', '$templateCache', function($rootScope, $state, $stateParams, authService, CurrencyService, formlyConfig, $templateCache) {
        CurrencyService.list();
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
        /*formlyConfig.setWrapper([
            {
                template: [
                    '<div class="form-group"',
                    'ng-class="{\'has-error\': options.formControl.$invalid}">',
                    '<label for="{{::id}}">{{options.templateOptions.required ? \'*\' : \'\'}}{{options.templateOptions.label}}</label>',
                    '<formly-transclude></formly-transclude>',
                    '<div class="validation"',
                    //'ng-if="options.validation.errorExistsAndShouldBeVisible"',
                    'ng-messages="options.formControl.$error">',
                    '<div ng-messages-include="validation.html"></div>',
                    '<div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages">',
                    '{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}}',
                    '</div>',
                    '</div>',
                    '</div>'
                ].join(' ')
            }
        ]);
        $templateCache.put('validation.html',
        ['<div ng-message="required">Please fill this out, it is required.</div>'
        ,'<div ng-message="minlength">Your answer is too short, please add more characters</div>'
        ,'<div ng-message="maxlength">Your answer is too long, please shorten it.</div>'
        ,'<div ng-message="email">Please provide a valid Email address</div>'
        ,'<div ng-message="pattern">Value does not match expected pattern, please try again.</div>'
        ,'<div ng-message="number">Please only enter a numerical answer</div>'
        ,'<div ng-message="date">Please enter a valid date</div>'].join('')
        );*/
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