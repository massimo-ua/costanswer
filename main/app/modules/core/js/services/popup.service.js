(function(){
    'use strict';
    angular.module('costAnswer.core.services')
        .factory('popupService', popupService);
    function popupService(ngDialog) {
        return {
            OptionNotAllowed: function() {
                ngDialog.openConfirm({
                    template: 'app/modules/core/views/dialogs/option-not-allowed.html',
                    className: 'ngdialog-theme-plain',
                    closeByDocument: false,
                    closeByEscape: false,
                    showClose: true
                });
            }
        }

    }
    popupService.$inject = ['ngDialog'];
}());