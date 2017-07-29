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
                    controls: '=',
                    nameProperty: '=',
                    onSave: '&',
                    onUpdate: '&',
                    onDelete: '&',
                    onLoad: '&'
                },
                templateUrl: 'app/modules/core/views/directives/ca-thumbler.html',
                link: function(scope, elem, attrs) {
                    function init() {
                        scope.itemModel = {};
                        scope.startItem = 1;
                        scope.activeItem = undefined;
                        scope.displayBlock = parseInt(scope.displayBlock);
                    };
                    init();
                    scope.controls.addItem = function(newItem) {
                        if(newItem === undefined) return;
                        scope.controls.formDisabled = true;
                        var copyOfNewItem = {};
                        angular.copy(newItem, copyOfNewItem);
                        if(scope.activeItem === undefined) {
                            scope.onSave()(copyOfNewItem, function(response){
                                scope.itemsList.push(response);
                                scope.move(1);
                                scope.clearForm();
                                scope.controls.formDisabled = false;
                            });
                        }
                        else {
                            scope.onUpdate()(copyOfNewItem, function(){
                                scope.itemsList[scope.activeItem-1] = copyOfNewItem;
                                scope.clearForm();
                                scope.controls.formDisabled = false;
                            });
                        }
                    };
                    scope.loadItem = function(index) {
                        scope.activeItem = index+1;
                        angular.copy(scope.itemsList[index], scope.itemModel);
                        scope.controls.buttonText = "Update";
                        if(scope.onLoad() !== undefined) {
                            scope.onLoad()(scope.itemsList[index].id);
                        }
                    };
                    scope.clearForm = function() {
                        scope.itemModel = {};
                        scope.activeItem = undefined;
                        scope.itemForm.$setPristine();
                        scope.controls.buttonText = "Add";
                    }
                    scope.removeItem = function(index) {
                        scope.controls.formDisabled = true;
                        scope.onDelete()(scope.itemsList[index], function(){
                            scope.itemsList.splice(index,1);
                            scope.clearForm();
                            scope.move(-1);
                            scope.controls.formDisabled = false;
                        });
                    }

                    scope.range = function(start,total) {
                        if(scope.itemsList == undefined || scope.itemsList.length == 0) return;
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
            .directive('caFootedTabs', [function(){
                return {
                    restrict: 'AEC',
                    replace: true,
                    scope: {
                        tabsList: '=',
                        initialState: '@'
                    },
                    templateUrl: 'app/modules/core/views/directives/ca-footed-tabs.html',
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
                        scope.disabled = function() {
                            return;
                        }
                    }
                }
            }]);
        angular.module('costAnswer.core.directives')
            .directive('caInstantReport', [function(){
                return {
                    restrict: 'AEC',
                    replace: true,
                    scope: {
                        reportData: '='
                    },
                    templateUrl: 'app/modules/core/views/directives/ca-instant-report.html'
                };
            }]);
        angular.module('costAnswer.core.directives')
            .directive('caProductMenu', [function(){
                return {
                    restrict: 'AEC',
                    replace: true,
                    scope: {
                        displayBlock: '=',
                        nameProperty: '=',
                        itemsList: '=',
                        onDelete: '&'
                    },
                    templateUrl: 'app/modules/core/views/directives/ca-product-menu.html',
                    link: function(scope, elem, attrs) {
                        function init() {
                            scope.startItem = 1;
                            scope.activeItem = undefined;
                            scope.displayBlock = parseInt(scope.displayBlock);
                        }
                        init();
                        scope.range = function(start,total) {
                            if(scope.itemsList === undefined || scope.itemsList.length == 0) return;
                            var result = [];
                            var i = 1;
                            start = start > 0 ? start : 1;
                            var end = (scope.itemsList.length >= (start + total-1)) ? start + total - 1 : scope.itemsList.length;
                            for(i=start;i<=end;i++) {
                                result.push(i);
                            }
                            return result;
                        };
                        scope.move = function(i) {
                            if(i > 0 && (scope.startItem + scope.displayBlock) > scope.itemsList.length) {
                                return;
                            }
                            if(i < 0 && scope.startItem < 2) {
                                return;
                            }
                            scope.startItem += i;
                        };
                        scope.removeItem = function(index) {
                            scope.onDelete()(scope.itemsList[index], function(error){
                                if(error) {
                                    console.log(error);
                                    return;
                                }
                                scope.itemsList.splice(index,1);
                                scope.move(-1);
                            });
                        };

                    }
                };
            }]);
}());
