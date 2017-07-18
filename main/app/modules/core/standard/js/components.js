(function(){
    'use strict';
    angular.module('costAnswer.core.standard.components',[]);
    angular.module('costAnswer.core.standard.components')
        .component('caReport', {
            templateUrl: 'app/modules/core/views/directives/ca-report.html',
            controller: CaReportController,
            controllerAs: 'crc',
            bindings: {
                report: '=',
                reportstyles: '=',
                header: '='
            }
        });
        function CaReportController($log) {
            var vm = this;
        }
        CaReportController.$inject = ['$log'];
})();