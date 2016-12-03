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
	angular.module('costAnswer.filters').filter('naFilter', function(){
  				return function(input, value, replace) {
					if(input === false) return '';
					else {
						return input == value ? replace : input;
					}
  				}
			});
	angular.module('costAnswer.filters').filter('toFixed', function(){
  		return function(input, value) {
			try {
				return (parseFloat(input) || input == 0) ? input.toFixed(value) : input;
			}
			catch(err) {
				 return input;
			}
  		}
	});
}());