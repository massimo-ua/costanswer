(function(){
    angular.module('costAnswer.core.moh.controllers',[]);
    angular.module('costAnswer.core.moh.controllers')
        .controller('mohController', [
            '$scope', '$state', 'toastr', '$localStorage', 'MOH_CATEGORY',
            function($scope, $state, toastr, $localStorage, MOH_CATEGORY) {
                function init() {
                    $scope.moh_category = MOH_CATEGORY;
                    $scope.initialState = $state.current.name;
                };
                init();
            }])
        .controller('mohSettingsController', [
            '$scope', 'toastr', '$localStorage', 'MOH_ALLOCATION_BASE', 'MOH_CALCULATION_BASE',
            function($scope, toastr, $localStorage, MOH_ALLOCATION_BASE, MOH_CALCULATION_BASE) {
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
                        $scope.mohSettings.allocationBase = $scope.moh_allocation_base[0].id;
                    }
                    try {
                        $scope.mohSettings.calculationBase = $localStorage.Project.moh.method;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.mohSettings.allocationBase = undefined;
                    }
                };
                init();
            }])
            .controller('mohIndirectMaterialsController', [
            '$scope', 'toastr', '$localStorage',
            function($scope, toastr, $localStorage) {
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
                    };
                    $scope.nameProperty = "itemName";
                };
                init();
                
            }])
            .controller('mohProductionManagersSalariesController', [
            '$scope', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    $scope.form = {};
                    try {
                        $scope.productionManagersSalaries = $localStorage.Project.moh.mohComponents.productionManagersSalaries;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionManagersSalaries = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "personelName";
                };
                init();        
            }])
            .controller('mohProductionFacilitiesInsuranceController', [
            '$scope', 'toastr', '$localStorage',
            function($scope, toastr, $localStorage) {
                function init() {
                    $scope.form = {};
                    try {
                        $scope.productionFacilitiesInsurance = $localStorage.Project.moh.mohComponents.productionFacilitiesInsurance;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionFacilitiesInsurance = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "insuaranceType";
                };
                init();
            }])
            .controller('mohProductionPropertyTaxesController', [
            '$scope', 'toastr', '$localStorage',
            function($scope, toastr, $localStorage) {
                function init() {
                    $scope.form = {};
                    try {
                        $scope.productionPropertyTaxes = $localStorage.Project.moh.mohComponents.productionPropertyTaxes;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionPropertyTaxes = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "taxName";
                };
                init();
            }])
            .controller('mohIndirectLaborController', [
            '$scope', 'toastr', '$localStorage',
            function($scope, toastr, $localStorage) {
                function init() {
                    $scope.form = {};
                    try {
                        $scope.indirectLabor = $localStorage.Project.moh.mohComponents.indirectLabor;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.indirectLabor = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "personelName";
                };
                init();
            }])
            .controller('mohProductionMachineryRentController', [
            '$scope', 'toastr', '$localStorage',
            function($scope, toastr, $localStorage) {
                function init() {
                    $scope.form = {};
                    try {
                        $scope.productionMachineryRent = $localStorage.Project.moh.mohComponents.productionMachineryRent;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionMachineryRent = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "rentName";
                };
                init();
            }])
            .controller('mohProductionUtilitiesAndOtherOverheadExpencesController', [
            '$scope', 'toastr', '$localStorage',
            function($scope, toastr, $localStorage) {
                function init() {
                    $scope.form = {};
                    try {
                        $scope.productionUtilitiesAndOtherOverheadExpences = $localStorage.Project.moh.mohComponents.productionUtilitiesAndOtherOverheadExpences;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionUtilitiesAndOtherOverheadExpences = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "expenceName";
                };
                init();
            }])
            .controller('mohProductionFacilitiesAmortizationController', [
            '$scope', '$state', 'toastr', '$localStorage',
            function($scope, $state, toastr, $localStorage) {
                function init() {
                    $scope.form = {};
                    try {
                        $scope.productionFacilitiesAmortization = $localStorage.Project.moh.mohComponents.productionFacilitiesAmortization;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionFacilitiesAmortization = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "assetName";
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