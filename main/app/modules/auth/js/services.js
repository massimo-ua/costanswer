(function(){
    angular.module('costAnswer.auth.services',[])
        .factory('authService', [function(){
            return {
                isAuthenticated: function() {
                    return false;
                }
            }
        }]);
}());