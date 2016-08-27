(function(){
    'use strict'
    angular.module('costAnswer.core.directives',[]);
    angular.module('costAnswer.core.directives')
        .directive('caThumbler', [function() {
            return {
                restrict: 'AEC',
                replace: true,
                scope: {
                    displayBlock: '=',
                    itemsList: '=',
                    itemForm: '=',
                    itemModel: '=',
                    controls: '='
                },
                templateUrl: 'app/modules/core/views/directives/ca-thumbler.html',
                link: function(scope, elem, attrs) {
                    function init() {
                        scope.itemModel = {};
                        scope.startItem = 1;
                        scope.activeItem = undefined;
                    };
                    init();
                    scope.displayBlock = parseInt(scope.displayBlock);
                    scope.controls.addItem = function(newItem) {
                        if(newItem === undefined) return;
                        var copyOfNewItem = {};
                        angular.copy(newItem, copyOfNewItem);
                        if(scope.activeItem === undefined) {
                            scope.itemsList.push(copyOfNewItem);
                            scope.move(1);
                        }
                        else {
                            try {
                                scope.itemsList[scope.activeItem-1] = copyOfNewItem;
                            } catch(err) {
                                console.log(err.name + ' ' + err.message);
                            }

                        }
                        
                    };
                    scope.loadItem = function(index) {
                        scope.activeItem = index+1;
                        angular.copy(scope.itemsList[index], scope.itemModel);
                        scope.controls.buttonText = "Update";
                    };
                    scope.clearForm = function() {
                        scope.itemModel = {};
                        scope.activeItem = undefined;
                        scope.itemForm.$setPristine();
                        scope.controls.buttonText = "Add";
                    }
                    scope.removeItem = function(index) {
                        scope.itemsList.splice(index,1);
                        scope.itemModel = {};
                        scope.activeItem = undefined;
                        scope.itemForm.$setPristine();
                        scope.controls.buttonText = "Add";
                        scope.move(-1);
                    }
                    
                    scope.range = function(start,total) {
                        if(scope.itemsList.length == 0) return;
                        var result = [];
                        var i = 1;
                        start = start > 0 ? start : 1;
                        var end = (scope.itemsList.length >= (start + total-1)) ? start + total - 1 : scope.itemsList.length; 
                        for(i=start;i<=end;i++) {
                            result.push(i);
                        }
                        return result;
                    }
                    scope.move = function(i) {
                        if(i > 0 && (scope.startItem + scope.displayBlock) > scope.itemsList.length) {
                            return;
                        };
                        if(i < 0 && scope.startItem < 2) {
                            return;
                        };
                        scope.startItem += i;
                    };
                }
            };
        }]);
        angular.module('costAnswer.core.directives')
            .directive('footedTabs', [function(){
                return {
                    restrict: 'AEC',
                    replace: true,
                    scope: {
                        tabsList: '=',
                        initialState: '@'
                    },
                    templateUrl: 'app/modules/core/views/directives/footed-tabs.html',
                    link: function(scope, elem, attrs) {
                        var i;
                        function init() {
                            for(i=0;i<scope.tabsList.length;i++) {
                                if(scope.tabsList[i].sref == scope.initialState) {
                                    scope.tabText = scope.tabsList[i].name;
                                }
                            }
                        }
                        init();
                    }
                }
            }]);
}());