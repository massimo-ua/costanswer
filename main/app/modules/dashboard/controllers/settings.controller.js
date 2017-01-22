(function(){
    'use strict';
    function DashboardSettingsController($log,authService,DATAINPUT_BUSINESS_PROFILE,popupService,$scope,$state) {
        var vm = this;
        function init() {
            vm.settings = {};
            authService.fullProfile()
                .then(function(response){
                    vm.settings.display_name = response.data.display_name;
                    vm.settings.business_profile = response.data.business_profile;
                    vm.settings.city = response.data.city;
                    vm.settings.company_name = response.data.company_name;
                    vm.settings.country = response.data.country;
                    vm.settings.website = response.data.website;
                })
                .catch(function(err){
                    $log.error(err);
                });
            vm.business_profiles = DATAINPUT_BUSINESS_PROFILE;
            vm.buttonText = "Update";
            vm.blockHeader = "Profile settings";
        }
        init();
        vm.updateSettings = function() {
            vm.buttonText = "Updating...";
            var settings = {};
                settings.display_name = vm.settings.display_name;
                settings.business_profile = vm.settings.business_profile;
                settings.city = vm.settings.city;
                settings.company_name = vm.settings.company_name;
                settings.country = vm.settings.country;
                settings.website = vm.settings.website;
            authService.updateFullProfile(settings)
                .catch(function(err){
                    $log.error(err);
                })
                .finally(function(){
                    vm.buttonText = "Update";
                });
        }
        vm.changePassword = function() {
            popupService.ChangePassword()
                .then(function(value){
                    authService.changePassword(value)
                        .catch(function(err){
                            $log.error(err);
                        });
                });
        }
        vm.deleteAccount = function() {
            popupService.ConfirmAction('Are you shure want to delete your account with all saved projects?')
            .then(
                function(value) {
                    authService.deleteAccount()
                        .then(function(response){
                            authService.logout()
                                .then(function(){
                                    $scope.$emit('USER_LOGOUT_EVENT');
                                    $state.go('startCore');
                                });
                        });
                },
                function(value){
                    $log.debug('Cancel deletion');
                });
        }
    }
    DashboardSettingsController.$inject = ['$log','authService','DATAINPUT_BUSINESS_PROFILE','popupService','$scope','$state'];
    angular.module('costAnswer.dashboard.controllers')
        .controller('DashboardSettingsController', DashboardSettingsController);
}());