(function(){
    'use strict';
    angular.module('costAnswer.services')
    .factory('menuPopupService', menuPopupService);
    function menuPopupService(ngDialog, $log) {
        return {
            open: function(list) {
                var config = {
                    template: 'app/views/dialogs/menu.html',
                    className: 'ngdialog-theme-plain custom-width-90prc',
                    closeByDocument: false,
                    closeByEscape: false,
                    showClose: true,
                    closeByNavigation: true,
                    controller: MenuPopupController,
                    controllerAs: 'vm'
                };
                ngDialog.open(config);
                function MenuPopupController() {
                    var vm = this;
                    vm.listItems = list;
                }
            }
        };
    }
    menuPopupService.$inject = ['ngDialog','$log'];
}());