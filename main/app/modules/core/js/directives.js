(function(){
    'use strict'
    angular.module('costAnswer.core.directives',[]);
    angular.module('costAnswer.core.directives')
        .directive('caThumbler', function() {
            return {
                restrict: 'AEC',
                replace: true,
                scope: {
                    displayBlock: '@displayBlock',
                    itemsList: '=itemsList'
                },
                templateUrl: 'app/modules/core/views/directives/ca-thumbler.html',
                link: function(scope, elem, attrs) {
                    function init() {
                        scope.form = {};
                        scope.startItem = 1;
                        scope.buttonText = "Add";
                        scope.activeItem = undefined;
                    }
                    init();
                    var displayBlock = parseInt(scope.displayBlock);
                    scope.addItem = function(newItem, position) {
                        if(newItem === undefined) return;
                        var copyOfNewItem = {};
                        angular.copy(newItem, copyOfNewItem);
                        if(position === undefined) {
                            scope.itemsList.push(copyOfNewItem);
                            scope.next();
                        }
                        else {
                            try {
                                scope.itemsList[position-1] = copyOfNewItem;
                            } catch(err) {
                                console.log(err.name + ' ' + err.message);
                            }

                        }
                        
                    };
                    scope.loadItem = function(index) {
                        scope.activeItem = index+1;
                        angular.copy(scope.itemsList[index], scope.form);
                        scope.buttonText = "Update";
                    };
                    scope.clearForm = function() {
                        scope.form = {};
                        scope.activeItem = undefined;
                        scope.itemForm.$setPristine();
                        scope.buttonText = "Add";
                    }
                    scope.removeItem = function(index) {
                        scope.itemsList.splice(index,1);
                        init();
                        scope.prev();
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
                    scope.next = function() {
                        console.log([scope.startItem,displayBlock,scope.itemsList.length]);
                        if((scope.startItem + displayBlock) > scope.itemsList.length) {
                            return;
                        }
                        scope.startItem += 1; 
                    }
                    scope.prev = function() {
                        if(scope.startItem < 2) {
                            return;
                        }
                        scope.startItem -= 1; 
                    }

                }
            };
        });
}());