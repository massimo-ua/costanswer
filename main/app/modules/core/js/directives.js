(function(){
    'use strict'
    angular.module('costAnswer.core.directives',[]);
    angular.module('costAnswer.core.directives')
        .directive('caThumbler', function() {
            return {
                restrict: 'AEC',
                replace: true,
                templateUrl: 'app/modules/core/views/directives/ca-thumbler.html',
                link: function(scope, elem, attrs) {
                    scope.form = {};
                    scope.items = [];
                    scope.activeItem = null;
                    scope.addItem = function(newItem) {
                        var copyOfNewItem = {};
                        angular.copy(newItem, copyOfNewItem);
                        scope.items.push(copyOfNewItem);
                        console.log(scope.items);
                    };
                    scope.loadItem = function(index) {
                        scope.activeItem = index;
                        angular.copy(scope.items[index], scope.form);
                    };
                }
            };
        });
}());