(function(){
	'use strict'
	angular.module('costAnswer.filters',[]);
	angular.module('costAnswer.filters').filter('range', function(){
  				return function(input, total, start) {
					var start = start === undefined ? 0 : parseInt(start);
    				total = parseInt(total);
    				if(start < 0) start = 0;
    				if(start >= total) {
    					return input;
    				}
    				for(var i=start; i<=total; i++) {
      					input.push(i);
    				}
    				return input;
  				}
			});

}());