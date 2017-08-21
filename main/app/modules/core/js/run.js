(function(){
    'use strict';
    angular.module('costAnswer.core')
        .run(coreRun);
    function coreRun(formlyConfig, $templateCache){
        formlyConfig.setType({
            name: 'input',
            template: '<input class="form-control costanswer" ng-model="model[options.key]" />'
        });
        formlyConfig.setType({
            name: 'annualMonthly',
            templateUrl: 'app/modules/core/views/annual-monthly.html'
        });
        formlyConfig.setWrapper([
            {
                template:
                    [
                        '<div class="col-xs-12 col-md-4 col-lg-4 col-md-offset-4 col-lg-offset-4 form-group text-center m-t-10px" ng-class="{\'has-error\': options.formControl.$dirty && options.formControl.$invalid}">',
                        '<label class="control-label m-t-10px" for="{{::id}}">{{to.label}}:</label>',
                        '<formly-transclude></formly-transclude>',
                        '<div class="help-block error" ng-show="options.validation.errorExistsAndShouldBeVisible">{{ to.errorText }}</div>',
                        '</div>'
                    ].join(' '),
                types: 'input'
            },
            {
                template: [

                ].join(' '),
                types: 'annualMonthly'
            }
        ]);
    }
    coreRun.$inject = ['formlyConfig', '$templateCache'];
}());