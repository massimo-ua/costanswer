(function(){
    'use strict';
    angular.module('costAnswer.core')
        .run(coreRun);
    function coreRun(formlyConfig, $templateCache){
        formlyConfig.setType({
            name: 'input',
            template: '<input class="form-control costanswer" ng-model="model[options.key]" />'
        });
        formlyConfig.setWrapper([
            {
                /*template: [
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
                ].join(' '),*/
                template:
                    [
                        '<div class="col-xs-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4 form-group text-center m-t-10px" ng-class="{\'has-error\': options.formControl.$dirty && options.formControl.$invalid}">',
                        '<label class="control-label m-t-10px" for="{{::id}}">{{to.label}}:</label>',
                        '<formly-transclude></formly-transclude>',
                        '<div class="help-block error" ng-show="options.validation.errorExistsAndShouldBeVisible">{{ to.errorText }}</div>',
                        '</div>'
                    ].join(' '),
                types: 'input'
            }
        ]);
    }
    coreRun.$inject = ['formlyConfig', '$templateCache'];
}());