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
                $scope.clearAll = function() {
                    $localStorage.Project = {};
                    $state.go('startCore');
                };
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
            '$scope', 'toastr', '$localStorage', 'mohService',
            function($scope, toastr, $localStorage, mohService) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    try {
                        $scope.indirectMaterials = ($localStorage.Project.moh.mohComponents.indirectMaterials == undefined) ? [] : $localStorage.Project.moh.mohComponents.indirectMaterials;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.indirectMaterials = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "itemName";
                    //if($scope.indirectMaterials && $scope.indirectMaterials.length > 0) {
                        $scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                    //}
                };
                init();
                $scope.onSave = function() {
                try {
                        $localStorage.Project.moh.mohComponents.indirectMaterials = $scope.indirectMaterials;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        if(err.name == 'TypeError') {
                            $localStorage.Project.moh.mohComponents = {
                                "indirectMaterials": $scope.indirectMaterials
                            }
                        } 
                    }
                $scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                
            }
            }])
            .controller('mohProductionManagersSalariesController', [
            '$scope', 'toastr', '$localStorage', 'mohService',
            function($scope, toastr, $localStorage, mohService) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    try {

                        $scope.productionManagersSalaries = ($localStorage.Project.moh.mohComponents.productionManagersSalaries == undefined) ? [] : $localStorage.Project.moh.mohComponents.productionManagersSalaries;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionManagersSalaries = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "personelName";
                    //if($scope.productionManagersSalaries && $scope.productionManagersSalaries.length > 0) {
                        $scope.gridOptions.data = mohService.getInstanceResult("productionManagersSalaries", "Production Managers Salaries");
                    //}
                };
                init();
                $scope.onSave = function() {
                try {
                        $localStorage.Project.moh.mohComponents.productionManagersSalaries = $scope.productionManagersSalaries;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        if(err.name == 'TypeError') {
                            $localStorage.Project.moh.mohComponents = {
                                "productionManagersSalaries": $scope.productionManagersSalaries
                            }
                        } 
                    }
                $scope.gridOptions.data = mohService.getInstanceResult("productionManagersSalaries", "Production Managers Salaries");
                }        
            }])
            .controller('mohProductionFacilitiesInsuranceController', [
            '$scope', 'toastr', '$localStorage', 'mohService',
            function($scope, toastr, $localStorage, mohService) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    try {
                        $scope.productionFacilitiesInsurance = ($localStorage.Project.moh.mohComponents.productionFacilitiesInsurance == undefined) ? [] : $localStorage.Project.moh.mohComponents.productionFacilitiesInsurance;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionFacilitiesInsurance = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "insuaranceType";
                    //if($scope.productionFacilitiesInsurance && $scope.productionFacilitiesInsurance.length > 0) {
                        $scope.gridOptions.data = mohService.getInstanceResult("productionFacilitiesInsurance", "Production Facilities Insurance");
                    //}
                };
                init();
                $scope.onSave = function() {
                try {
                        $localStorage.Project.moh.mohComponents.productionFacilitiesInsurance = $scope.productionFacilitiesInsurance;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        if(err.name == 'TypeError') {
                            $localStorage.Project.moh.mohComponents = {
                                "productionFacilitiesInsurance": $scope.productionFacilitiesInsurance
                            }
                        } 
                    }
                $scope.gridOptions.data = mohService.getInstanceResult("productionFacilitiesInsurance", "Production Facilities Insurance");
                
            }
            }])
            .controller('mohProductionPropertyTaxesController', [
            '$scope', 'toastr', '$localStorage', 'mohService',
            function($scope, toastr, $localStorage, mohService) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    try {
                        $scope.productionPropertyTaxes = ($localStorage.Project.moh.mohComponents.productionPropertyTaxes == undefined) ? [] : $localStorage.Project.moh.mohComponents.productionPropertyTaxes;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionPropertyTaxes = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "taxName";
                    //if($scope.productionPropertyTaxes && $scope.productionPropertyTaxes.length > 0) {
                        $scope.gridOptions.data = mohService.getInstanceResult("productionPropertyTaxes", "Production Property Taxes");
                    //}
                };
                init();
                $scope.onSave = function() {
                try {
                        $localStorage.Project.moh.mohComponents.productionPropertyTaxes = $scope.productionPropertyTaxes;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        if(err.name == 'TypeError') {
                            $localStorage.Project.moh.mohComponents = {
                                "productionPropertyTaxes": $scope.productionPropertyTaxes
                            }
                        } 
                    }
                $scope.gridOptions.data = mohService.getInstanceResult("productionPropertyTaxes", "Production Property Taxes");
            }
            }])
            .controller('mohIndirectLaborController', [
            '$scope', 'toastr', '$localStorage', 'mohService',
            function($scope, toastr, $localStorage, mohService) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    try {
                        $scope.indirectLabor = ($localStorage.Project.moh.mohComponents.indirectLabor == undefined) ? [] : $localStorage.Project.moh.mohComponents.indirectLabor;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.indirectLabor = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "personelName";
                    //if($scope.indirectLabor && $scope.indirectLabor.length > 0) {
                        $scope.gridOptions.data = mohService.getInstanceResult("indirectLabor", "Indirect Labor");
                    //}
                };
                init();
                $scope.onSave = function() {
                try {
                        $localStorage.Project.moh.mohComponents.indirectLabor = $scope.indirectLabor;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        if(err.name == 'TypeError') {
                            $localStorage.Project.moh.mohComponents = {
                                "indirectLabor": $scope.indirectLabor
                            }
                        } 
                    }
                $scope.gridOptions.data = mohService.getInstanceResult("indirectLabor", "Indirect Labor");
                }        
            }])
            .controller('mohProductionMachineryRentController', [
            '$scope', 'toastr', '$localStorage', 'mohService',
            function($scope, toastr, $localStorage, mohService) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    try {
                        $scope.productionMachineryRent = ($localStorage.Project.moh.mohComponents.productionMachineryRent == undefined) ? [] : $localStorage.Project.moh.mohComponents.productionMachineryRent;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionMachineryRent = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "rentName";
                    //if($scope.productionMachineryRent && $scope.productionMachineryRent.length > 0) {
                        $scope.gridOptions.data = mohService.getInstanceResult("productionMachineryRent", "Production Machinery Rent");
                    //}
                };
                init();
                $scope.onSave = function() {
                try {
                        $localStorage.Project.moh.mohComponents.productionMachineryRent = $scope.productionMachineryRent;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        if(err.name == 'TypeError') {
                            $localStorage.Project.moh.mohComponents = {
                                "productionMachineryRent": $scope.productionMachineryRent
                            }
                        } 
                    }
                $scope.gridOptions.data = mohService.getInstanceResult("productionMachineryRent", "Production Machinery Rent");
            }
            }])
            .controller('mohProductionUtilitiesAndOtherOverheadExpencesController', [
            '$scope', 'toastr', '$localStorage', 'mohService',
            function($scope, toastr, $localStorage, mohService) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    try {
                        $scope.productionUtilitiesAndOtherOverheadExpences = ($localStorage.Project.moh.mohComponents.productionUtilitiesAndOtherOverheadExpences == undefined) ? [] : $localStorage.Project.moh.mohComponents.productionUtilitiesAndOtherOverheadExpences;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionUtilitiesAndOtherOverheadExpences = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "expenceName";
                    //if($scope.productionUtilitiesAndOtherOverheadExpences && $scope.productionUtilitiesAndOtherOverheadExpences.length > 0) {
                        $scope.gridOptions.data = mohService.getInstanceResult("productionUtilitiesAndOtherOverheadExpences", "Production Utilities And Other Overhead Expences");
                    //}
                };
                init();
                $scope.onSave = function() {
                try {
                        $localStorage.Project.moh.mohComponents.productionUtilitiesAndOtherOverheadExpences = $scope.productionUtilitiesAndOtherOverheadExpences;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        if(err.name == 'TypeError') {
                            $localStorage.Project.moh.mohComponents = {
                                "productionUtilitiesAndOtherOverheadExpences": $scope.productionUtilitiesAndOtherOverheadExpences
                            }
                        } 
                    }
                $scope.gridOptions.data = mohService.getInstanceResult("productionUtilitiesAndOtherOverheadExpences", "Production Utilities And Other Overhead Expences");
            }
            }])
            .controller('mohProductionFacilitiesAmortizationController', [
            '$scope', '$state', 'toastr', '$localStorage', 'mohService',
            function($scope, $state, toastr, $localStorage, mohService) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    try {
                        $scope.productionFacilitiesAmortization = ($localStorage.Project.moh.mohComponents.productionFacilitiesAmortization == undefined) ? [] : $localStorage.Project.moh.mohComponents.productionFacilitiesAmortization;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $scope.productionFacilitiesAmortization = [];
                    }
                    $scope.controls = {
                        buttonText: "Add"
                    };
                    $scope.nameProperty = "assetName";
                    //if($scope.productionFacilitiesAmortization && $scope.productionFacilitiesAmortization.length > 0) {
                        $scope.gridOptions.data = mohService.getInstanceResult("productionFacilitiesAmortization", "Production Facilities Amortization");
                    //}
                };
                init();
                $scope.onSave = function() {
                try {
                        $localStorage.Project.moh.mohComponents.productionFacilitiesAmortization = $scope.productionFacilitiesAmortization;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        if(err.name == 'TypeError') {
                            $localStorage.Project.moh.mohComponents = {
                                "productionFacilitiesAmortization": $scope.productionFacilitiesAmortization
                            }
                        } 
                    }
                $scope.gridOptions.data = mohService.getInstanceResult("productionFacilitiesAmortization", "Production Facilities Amortization");
            }
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