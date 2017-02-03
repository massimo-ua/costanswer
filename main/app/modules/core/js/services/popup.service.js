(function(){
    'use strict';
    angular.module('costAnswer.core.services')
        .factory('popupService', popupService);
    function popupService(ngDialog, $log, DataModel, $q) {
        return {
            OptionNotAllowed: function() {
                ngDialog.open({
                    template: 'app/modules/core/views/dialogs/option-not-allowed.html',
                    className: 'ngdialog-theme-plain',
                    closeByDocument: false,
                    closeByEscape: false,
                    showClose: true
                });
            },
            ConfirmAction: function(text) {
                var config = {
                    template: 'app/modules/core/views/dialogs/confirm-action.html',
                    className: 'ngdialog-theme-plain',
                    closeByDocument: true,
                    closeByEscape: true,
                    showClose: true,
                    controller: ConfirmActionController,
                    controllerAs: 'vm',
                    resolve: {
                        text: function() {
                            return text;
                        }
                    }
                }
                return ngDialog.openConfirm(config);
                function ConfirmActionController($log,text){
                    var vm = this;
                    vm.text = text;
                }
                ConfirmActionController.$inject = ['$log','text'];
            },
            ChangePassword: function() {
                var config = {
                    template: 'app/modules/core/views/dialogs/change-password.html',
                    className: 'ngdialog-theme-plain',
                    closeByDocument: true,
                    closeByEscape: true,
                    showClose: true,
                    controller: ChangePasswordController,
                    controllerAs: 'vm'
                }
                return ngDialog.openConfirm(config);
                function ChangePasswordController() {
                    var vm = this;
                    function init() {
                        vm.form = {}; 
                        vm.passwordPlaceholder = 'Password';
                        vm.passwordHelpText = 'Please, fill in Password (min 8 characters)';
                        vm.confirmPlaceholder = 'Confirm password';
                        vm.confirmHelpText = 'Please, confirm Password (min 8 characters)';
                        vm.actionText = 'Change';
                    }
                    init();
                    vm.checkPassword = function() {
                        return vm.form.password === vm.form.confirm;
                    }
                }
                ChangePasswordController.$inject['$log'];
            },
            DuplicateProject: function(project) {
                    var vm = this;
                    var defer = $q.defer();
                    ngDialog.openConfirm({
                        template: 'app/modules/core/views/dialogs/set-project-name.html',
                        className: 'ngdialog-theme-plain',
                        closeByDocument: true,
                        closeByEscape: true,
                        showClose: true
                    })
                    .then(
                        function(value) {
                            var newProject = new DataModel.Project();
                            newProject.name = value.name;
                            newProject.$saveAs({ uuid: project.uuid })
                                .then(function(response){
                                    defer.resolve(response);
                                })
                                .catch(function(err){
                                    defer.reject(err);
                                });
                        });
                    return defer.promise;
            }
        }
    }
    popupService.$inject = ['ngDialog','$log','DataModel','$q'];
}());