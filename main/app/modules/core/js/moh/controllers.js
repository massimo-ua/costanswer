(function(){
    angular.module('costAnswer.core.moh.controllers',[]);
    angular.module('costAnswer.core.moh.controllers')
        .controller('mohController', [
            '$scope', 'toastr', '$localStorage', 'MOH_CATEGORY',
            function($scope, toastr, $localStorage, MOH_CATEGORY) {
                function init() {
                    $scope.moh_category = MOH_CATEGORY;
                };
                init();
            }])
        .controller('mohSettingsController', [
            '$scope', '$state', 'toastr', '$localStorage', 'MOH_ALLOCATION_BASE', 'MOH_CALCULATION_BASE',
            function($scope, $state, toastr, $localStorage, MOH_ALLOCATION_BASE, MOH_CALCULATION_BASE) {
                $scope.saveCalculationBase = function() {
                    if($scope.mohSettings.calculationBase == undefined) return;
                    $localStorage.mohSettings.calculationBase = $scope.mohSettings.calculationBase;
                }
                $scope.saveAllocationBase = function() {
                    if($scope.mohSettings.allocationBase == undefined) return;
                    $localStorage.mohSettings.allocationBase = $scope.mohSettings.allocationBase;
                }
                function init() {
                    $scope.mohSettings = {};
                    $localStorage.mohSettings = {};
                    $scope.moh_allocation_base = MOH_ALLOCATION_BASE;
                    $scope.moh_calculation_base = MOH_CALCULATION_BASE;
                    $scope.mohSettings.allocationBase = $scope.moh_allocation_base[0];
                    $scope.saveCalculationBase();
                    $scope.saveAllocationBase();
                };
                init();
            }])
            .controller('mohIndirectMaterialsController', [
            '$scope', '$state', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    console.log('AAAAAAAAAAAAAAAAA');
                };
                init();
                
            }])
            .controller('mohProductionManagersSalariesController', [
            '$scope', '$state', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    console.log('AAAAAAAAAAAAAAAAA');
                };
                init();
                
            }])
            .controller('mohProductionFacilitiesInsuranceController', [
            '$scope', '$state', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    console.log('AAAAAAAAAAAAAAAAA');
                };
                init();
                
            }])
            .controller('mohProductionPropertyTaxesController', [
            '$scope', '$state', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    console.log('AAAAAAAAAAAAAAAAA');
                };
                init();
                
            }])
            .controller('mohIndirectLabourController', [
            '$scope', '$state', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    console.log('AAAAAAAAAAAAAAAAA');
                };
                init();
                
            }])
            .controller('mohProductionMachineryRentController', [
            '$scope', '$state', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    console.log('AAAAAAAAAAAAAAAAA');
                };
                init();
                
            }])
            .controller('mohProductionUtilitiesAndOtherOverheadExpencesController', [
            '$scope', '$state', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    console.log('AAAAAAAAAAAAAAAAA');
                };
                init();
                
            }])
            .controller('mohProductionFacilitiesAmortizationController', [
            '$scope', '$state', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    console.log('AAAAAAAAAAAAAAAAA');
                };
                init();
                
            }])
            .controller('mohReportController', [
            '$scope', '$state', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    console.log('AAAAAAAAAAAAAAAAA');
                };
                init();
                
            }]);
}());