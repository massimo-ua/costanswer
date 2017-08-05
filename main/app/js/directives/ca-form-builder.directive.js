(function(){
    'use strict';
    angular.module('costAnswer.directives')
        .directive('caFormBuilder', caFormBuilder);

    function caFormBuilder() {
        return {
            link: linkFn,
            restrict: 'A',
            scope: {
                config: '&',
                model: '='
            }
        };
        function linkFn(scope, element, attrs){
            //main loop over config properties
            console.log(scope.config);
            scope.config.properties.forEach(function(index,property,properties){
                var inputBlock = angular.element('<div></div>');
                var labelBlock = angular.element('<div></div>');
                inputBlock.attr('class',property.input.wrapperClass);
                labelBlock.attr('class',property.label.wrapperClass);
                var inputElement;
                switch (property.input.key) {
                    case "input":
                        inputElement = angular.element('<input></input>');
                        break;
                }
                inputElement.attr('type', property.input.text);
                if(property.input.minLength !== undefined) inputElement.attr('minLength', property.input.minLength);
                if(property.input.maxLength !== undefined) inputElement.attr('maxLength', property.input.maxLength);
                if(property.input.name !== undefined) inputElement.attr('name', property.input.name);
                if(property.input.required !== undefined) inputElement.attr('ng-required', property.input.required);
                if(property.input.minLength !== undefined) inputElement.attr('minLength', property.input.minLength);
                if(property.input.model !== undefined) inputElement.attr('ng-model', scope.model[property.input.model]);
                if(property.input.class !== undefined) inputElement.attr('class', property.input.class);
                if(property.input.placeholder !== undefined) inputElement.attr('placeholder', property.input.placeholder);
                var labelElement = angular.element('<label></label>');
                if(property.label.for !== undefined) labelElement.attr('for', property.label.for);
                if(property.label.class !== undefined) labelElement.attr('class', property.label.class);
                if(property.label.text !== undefined) labelElement.text(property.label.text);
                inputBlock.append(inputElement);
                labelBlock.append(labelElement);
                element.append(labelBlock);
                element.append(inputBlock);
            });
        }
    }
}());