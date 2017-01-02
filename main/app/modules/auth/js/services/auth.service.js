(function(){
    'use strict';
    angular
        .module('costAnswer.auth.services')
        .factory('authService', authService);
    authService.$inject = ['$auth', '$http', '$log', 'AUTH_PREFIX'];
    function authService($auth, $http, $log, AUTH_PREFIX) {
        return {
            login: function(email, password) {
                var user = {};
                user.email = email;
                try {
                    user.password = CryptoJS.SHA256(password).toString();
                }
                catch(err) {
                    $log.error(err);
                    user.password = undefined;
                }
                return $auth.login(user, {
                    method: 'POST',
                    url: AUTH_PREFIX+'/login'
                });
            },
            logout: function() {
                return $auth.logout();
            },
            profile: function() {
                return $auth.getPayload();
            },
            isAuthenticated: function() {
                return $auth.isAuthenticated();
            },
            isStaff: function() {
                return $auth.getPayload().isStaff || false;
            },
            setStorageType: function(StorageType) {
                return $auth.setStorageType(StorageType);
            },
            signup: function(user) {
                $log.debug(user);
                try {
                    user.password = CryptoJS.SHA256(user.password).toString();
                }
                catch(err) {
                    $log.error(err);
                    user.password = undefined;
                }
                return $auth.signup(user, {
                    method: 'POST',
                    url: AUTH_PREFIX+'/signup'
                });
            }
        }
    }
}());