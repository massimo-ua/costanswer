(function(){
    'use strict';
    angular.module('costAnswer.core.services')
        .factory('popupService', popupService);
    function popupService(ngDialog, $log) {
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
            }
        }
    }
    popupService.$inject = ['ngDialog','$log'];
}());