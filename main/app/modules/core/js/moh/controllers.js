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
                try{
                        $localStorage.Project.moh.method = $scope.mohSettings.calculationBase;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $localStorage.Project.moh = {
                            "method": $scope.mohSettings.calculationBase
                        } 
                    }
                }
                $scope.saveAllocationBase = function() {
                    if($scope.mohSettings.allocationBase == undefined) return;
                    $localStorage.Project.moh.allocation = $scope.mohSettings.allocationBase;
                }
                function init() {
                    $scope.mohSettings = {};
                    $scope.moh_allocation_base = MOH_ALLOCATION_BASE;
                    $scope.moh_calculation_base = MOH_CALCULATION_BASE;
                    try {
                        $scope.mohSettings.allocationBase = $localStorage.Project.moh.allocation;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.mohSettings.allocationBase = $scope.moh_allocation_base[0];
                    }
                    try {
                        $scope.mohSettings.calculationBase = $localStorage.Project.moh.method;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.mohSettings.allocationBase = {};
                    }
                };
                init();
            }])
            .controller('mohIndirectMaterialsController', [
            '$scope', '$state', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    $scope.form = {};
                    try {
                        $scope.indirectMaterials = $localStorage.Project.moh.mohComponents.indirectMaterials;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.indirectMaterials = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    }
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