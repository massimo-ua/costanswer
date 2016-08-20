(function(){
	'use strict'
	angular.module('costAnswer.directives',[]);
	angular.module('costAnswer.directives')
    .directive('dateNow', ['$filter', function($filter) {
    return {
            link: function( $scope, $element, $attrs) {
            $element.text($filter('date')(new Date(), $attrs.dateNow));
        }
    };
}]);
}());