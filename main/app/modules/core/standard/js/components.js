(function(){
    'use strict';
    angular.module('costAnswer.core.standard.components',[]);
    angular.module('costAnswer.core.standard.components')
        .component('caReport', {
            templateUrl: 'app/modules/core/views/ca-report.html',
            controller: CaReportController,
            bindings: {
                report: '<',
                reportstyles: '<',
                header: '<'
            }
        });
        function CaReportController($log, $localStorage, EXPORT_PREFIX, $stateParams) {
            var vm = this;
            vm.getDownloadLink = function(type) {
                if($localStorage.uuid !== undefined) {
                    return EXPORT_PREFIX + '/product/' + $stateParams.id + '/' + type;
                }
                return;
            }
        }
        CaReportController.$inject = ['$log','$localStorage','EXPORT_PREFIX','$stateParams'];
})();
