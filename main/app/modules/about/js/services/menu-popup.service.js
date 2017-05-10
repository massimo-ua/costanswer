(function(){
    'use strict';
    angular.module('costAnswer.about.services')
    .factory('menuPopupService', menuPopupService);
    function menuPopupService(ngDialog, $log, menuListService) {
        return {
            open: function() {
                var config = {
                    template: 'app/modules/about/views/dialogs/about-menu.html',
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
                    vm.listItems = menuListService.list();
                }
            }
        };
    }
    menuPopupService.$inject = ['ngDialog','$log','menuListService'];
}());