(function(){
    angular.module('costAnswer.core.services', []);
    /*.factory('projectSettingsService', [function(){
        var settings = {};
        return {
            set: function(key, value, replace) {
                if((replace == undefined || replace == false) && settings.hasOwnProperty(key)) {
                    return false;
                } 
                try {
                    settings[key] = value;
                    console.log(settings);
                    return true;
                }
                catch(err) {
                    console.log(err.message);
                    return false;
                }
            },
            get: function(key){
                try {
                    return settings[key];
                }
                catch(err) {
                    console.log(err.message);
                    return false;
                }
            },
            getAll: function() {
                return settings;
            }
        }
    }]);*/
}());