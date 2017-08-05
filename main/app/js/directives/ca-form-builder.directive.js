(function(){
    'use strict';
    angular.module('costAnswer.directives')
        .directive('caFormBuilder', caFormBuilder);

    function caFormBuilder() {
        return {
            link: linkFn,
            restrict: 'A',
            scope: {
                config: '=',
                model: '='
            }
        };
        function linkFn(scope, element, attrs){
            element.attr('name',scope.config.formName);
            //main loop over config properties
            scope.config.properties.forEach(function(property,index,properties){
                var inputBlock = angular.element('<div></div>');
                var labelBlock = angular.element('<div></div>');
                inputBlock.attr('class',property.input.wrapperClass);
                labelBlock.attr('class',property.label.wrapperClass);
                var errorWrapper = angular.element('<div></div>');
                errorWrapper.attr('ng-class','{\'has-error\': ' + scope.config.formName + '.'+property.input.attributes.name+'.$dirty && ' + scope.config.formName + '.'+property.input.attributes.name+'.$invalid}');
                errorWrapper.attr('class', 'form-group');

                var inputElement;
                switch (property.input.key) {
                    case "input":
                        inputElement = angular.element('<input></input>');
                        break;
                }
                for(var attribute in property.input.attributes) {
                    if(property.input.attributes.hasOwnProperty(attribute)) inputElement.attr(attribute, property.input.attributes[attribute]);
                }
                var labelElement = angular.element('<label></label>');
                for(var attribute in property.label.attributes) {
                    if(property.label.attributes.hasOwnProperty(attribute)) labelElement.attr(attribute, property.label.attributes[attribute]);
                }
                if(property.label.text !== undefined) labelElement.text(property.label.text);
                errorWrapper.append(inputElement);
                errorWrapper.append('<div class="help-block error" ng-show="' + scope.config.formName + '.'+property.input.attributes.name+'.$dirty && ' + scope.config.formName + '.'+property.input.attributes.name+'.$error.required">'+property.errorText+'</div>');
                inputBlock.append(errorWrapper);
                labelBlock.append(labelElement);
                element.append(labelBlock);
                element.append(inputBlock);
            });
        }
    }
}());