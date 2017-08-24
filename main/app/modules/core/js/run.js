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
            template: [
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">',
                '<table class="table table-condensed">',
                '<thead>',
                '<tr>',
                '<th class="text-center" ng-repeat="month in data.monthes">{{ month.short }}</th>',
                '</tr>',
                '</thead>',
                '<tbody>',
                '<tr>',
                '<td ng-repeat="month in data.monthes"><input name="goods" ng-class="{\'has-error\': itemForm.goods.$dirty && itemForm.goods[$index].$invalid}" type="number" ng-required="true" ng-model="model[options.key][$index]" min="{{ min($index) }}" class="form-control costanswer" placeholder="{{ controls.namePlaceholder }}" /></td>', '        '</tr>',
                '</tbody>',
                '</table>',
                '</div>',
                '<rep>{{ data }}</rep>'
            ].join(' ')
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
                    '<div>',
                    '<formly-transclude></formly-transclude>',
                    '</div>'
                ].join(' '),
                types: 'annualMonthly'
            }
        ]);
    }
    coreRun.$inject = ['formlyConfig', '$templateCache'];
}());