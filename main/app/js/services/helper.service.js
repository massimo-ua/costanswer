(function(){
    'use strict';
    angular.module('costAnswer.services')
    .factory('helperService', helperService);
    function helperService() {
        var storage = {};
        var factory = {};
        factory.form2percent = function(value) {
            try {
                return roundToTwo(parseFloat(value)) / 100;
            } catch(err) {
                return 0;
            }
        };
        factory.percent2form = function(value) {
            try {
                return roundToTwo(parseFloat(value) * 100);
            } catch(err) {
                return 0;
            }
        };
        factory.form2unit = function(value) {
            try {
                return Math.round(parseFloat(value) * 100);
            } catch(err) {
                return 0;
            }
        };
        factory.unit2form = function(value) {
            try {
                return roundToTwo(parseInt(value) / 100);
            } catch(err) {
                return 0;
            }
        };
        factory.int2form = function(value) {
          return parseInt(value);
        };
        function roundToTwo(num) {
            return +(Math.round(num + "e+2")  + "e-2");
        }
        factory.setValue = function(key, value) {
            storage[key] = value;
        };
        factory.getValue = function(key) {
            if(hasOwnProperty(storage, key)) return storage[key];
            else return undefined;
        };
        return factory;
    }
}());