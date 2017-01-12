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
            '$scope', '$log', '$localStorage', 'MOH_ALLOCATION_BASE', 'MOH_CALCULATION_BASE', 'DataModel',
            function($scope, $log, $localStorage, MOH_ALLOCATION_BASE, MOH_CALCULATION_BASE, DataModel) {
                /*$scope.saveCalculationBase = function() {
                if($scope.mohSettings.calculationBase == undefined) return;
                try{
                        $localStorage.Project.moh.method = $scope.mohSettings.calculationBase;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $localStorage.Project.moh = {
                            "method": $scope.mohSettings.calculationBase
                        } 
                    }
                }*/
                $scope.saveAllocationBase = function() {
                    if(!$localStorage.moh) {
                        if(!$localStorage.uuid || $scope.mohSettings.allocation_base_id == undefined || $scope.mohSettings.calculation_base_id == undefined) return;
                        var moh = new DataModel.Moh();
                        moh.project_uuid = $localStorage.uuid;
                        moh.calculation_base_id = $scope.mohSettings.calculation_base_id;
                        moh.allocation_base_id = $scope.mohSettings.allocation_base_id;
                        moh.$saveWithUuid(function(response){
                            $localStorage.moh = response.id;
                        },
                        function(err){
                            $log.debug(err);
                        });
                    } else {
                        if(!$localStorage.uuid || $scope.mohSettings.allocation_base_id == undefined) return;
                        var moh = {};
                        moh.project_uuid = $localStorage.uuid;
                        moh.allocation_base_id = $scope.mohSettings.allocation_base_id;
                        $log.debug(moh);
                        DataModel.Moh.updateWithUuid(moh).$promise
                            .catch(function(err){
                                $log.debug(err);
                            });
                    }

                }
                function init() {
                    $scope.mohSettings = {};
                    $scope.uuid = $localStorage.uuid;
                    if($scope.uuid != undefined) {
                        DataModel.Moh.getWithUuid({ uuid: $scope.uuid }, function(response){
                            $scope.mohSettings.calculation_base_id = parseInt(response.calculation_base_id);
                            $scope.mohSettings.allocation_base_id = parseInt(response.allocation_base_id);
                        });
                    }
                    $scope.moh_allocation_base = MOH_ALLOCATION_BASE;
                    $scope.moh_calculation_base = MOH_CALCULATION_BASE;
                };
                init();
            }])
            .controller('mohIndirectMaterialsController', [
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel',
            function($scope, toastr, $localStorage, mohService, DataModel) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    $scope.year_number = 1;
                    $scope.month_number = 0;
                    $scope.component = 'indirectmaterials';
                    $scope.mohId = $localStorage.moh;
                    $scope.itemsList = [];
                    DataModel.Moh.getMohComponents({ moh_id: $scope.mohId, component: $scope.component }, function(response){
                        $scope.itemsList = mohService.parseMohResponse(response,"fc-full-cost");
                    });
                    $scope.controls = {
                        buttonText: "Add",
                        topHeader: "Choose material",
                        nameMain: "Name of material",
                        namePlaceholder: "Name",
                        nameErrorText: "Please, fill in material name",
                        costMain: "Cost per month",
                        costPlaceholder: "$",
                        costErrorText: "Please, fill in material monthly cost"
                    };
                    $scope.nameProperty = "name";
                    $scope.reportId = 'im';
                    mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                        $scope.instantReport = response;
                    });
                    //if($scope.indirectMaterials && $scope.indirectMaterials.length > 0) {
                    //$scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                    //}
                };
                init();
                $scope.onSave = function(newItem, callback) {
                    mohService.onSave($scope.mohId, $scope.component, $scope.year_number, $scope.month_number, newItem, function(response){
                        callback(response);
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onUpdate = function(item, callback) {
                    mohService.onUpdate($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onDelete = function(item, callback) {
                    mohService.onDelete($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
            }])
            .controller('mohProductionManagersSalariesController', [
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel',
            function($scope, toastr, $localStorage, mohService, DataModel) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    $scope.year_number = 1;
                    $scope.month_number = 0;
                    $scope.component = 'productionmanagerssalaries';
                    $scope.mohId = $localStorage.moh;
                    $scope.itemsList = [];
                    DataModel.Moh.getMohComponents({ moh_id: $scope.mohId, component: $scope.component }, function(response){
                        $scope.itemsList = mohService.parseMohResponse(response,"fc-full-cost");
                    });
                    $scope.controls = {
                        buttonText: "Add",
                        topHeader: "Choose manager",
                        nameMain: "Worker name/title",
                        namePlaceholder: "Name",
                        nameErrorText: "Please, fill in Name of personnel",
                        salaryMain: "Salary",
                        salaryPlaceholder: "$",
                        salaryErrorText: "Please, fill in Salary",
                        taxMain: "Payroll taxes",
                        taxPlaceholder: "$",
                        taxErrorText: "Please, fill in Payroll taxes",
                        growthMain: "Annual Growth Rate",
                        growthPlaceholder: "%",
                        growthErrorText: "Please, fill in Annual Growth Rate"
                    };
                    $scope.nameProperty = "name";
                    $scope.reportId = 'pms';
                    mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                        $scope.instantReport = response;
                    });
                    //if($scope.indirectMaterials && $scope.indirectMaterials.length > 0) {
                    //$scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                    //}
                };
                init();
                $scope.onSave = function(newItem, callback) {
                    mohService.onSave($scope.mohId, $scope.component, $scope.year_number, $scope.month_number, newItem, function(response){
                        callback(response);
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onUpdate = function(item, callback) {
                    mohService.onUpdate($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onDelete = function(item, callback) {
                    mohService.onDelete($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
            }])
            .controller('mohProductionFacilitiesInsuranceController', [
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel',
            function($scope, toastr, $localStorage, mohService, DataModel) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    $scope.year_number = 1;
                    $scope.month_number = 0;
                    $scope.component = 'productionfacilitiesinsurance';
                    $scope.mohId = $localStorage.moh;
                    $scope.itemsList = [];
                    DataModel.Moh.getMohComponents({ moh_id: $scope.mohId, component: $scope.component }, function(response){
                        $scope.itemsList = mohService.parseMohResponse(response,"fc-full-cost");
                    });
                    $scope.controls = {
                        buttonText: "Add",
                        topHeader: "Choose insurance",
                        nameMain: "Type of insuarance",
                        namePlaceholder: "Name",
                        nameErrorText: "Please, fill in Type of insuarance",
                        costMain: "Monthly payment",
                        costPlaceholder: "$",
                        costErrorText: "Please, fill in Monthly payment"
                    };
                    $scope.nameProperty = "name";
                    $scope.reportId = 'pfi';
                    mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                        $scope.instantReport = response;
                    });
                    //if($scope.indirectMaterials && $scope.indirectMaterials.length > 0) {
                    //$scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                    //}
                };
                init();
                $scope.onSave = function(newItem, callback) {
                    mohService.onSave($scope.mohId, $scope.component, $scope.year_number, $scope.month_number, newItem, function(response){
                        callback(response);
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onUpdate = function(item, callback) {
                    mohService.onUpdate($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onDelete = function(item, callback) {
                    mohService.onDelete($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
            }])
            .controller('mohProductionPropertyTaxesController', [
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel',
            function($scope, toastr, $localStorage, mohService, DataModel) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    $scope.year_number = 1;
                    $scope.month_number = 0;
                    $scope.component = 'productionpropertytaxes';
                    $scope.mohId = $localStorage.moh;
                    $scope.itemsList = [];
                    DataModel.Moh.getMohComponents({ moh_id: $scope.mohId, component: $scope.component }, function(response){
                        $scope.itemsList = mohService.parseMohResponse(response,"fc-full-cost");
                    });
                    $scope.controls = {
                        buttonText: "Add",
                        topHeader: "Choose tax",
                        nameMain: "Type of tax",
                        namePlaceholder: "Name",
                        nameErrorText: "Please, fill in Type of tax",
                        costMain: "Monthly payment",
                        costPlaceholder: "$",
                        costErrorText: "Please, fill in Monthly payment"
                    };
                    $scope.nameProperty = "name";
                    $scope.reportId = "ppt";
                    mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                        $scope.instantReport = response;
                    });
                    //if($scope.indirectMaterials && $scope.indirectMaterials.length > 0) {
                    //$scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                    //}
                };
                init();
                $scope.onSave = function(newItem, callback) {
                    mohService.onSave($scope.mohId, $scope.component, $scope.year_number, $scope.month_number, newItem, function(response){
                        callback(response);
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onUpdate = function(item, callback) {
                    mohService.onUpdate($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onDelete = function(item, callback) {
                    mohService.onDelete($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
            }])
            .controller('mohIndirectLaborController', [
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel',
            function($scope, toastr, $localStorage, mohService, DataModel) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    $scope.year_number = 1;
                    $scope.month_number = 0;
                    $scope.component = 'indirectlabor';
                    $scope.mohId = $localStorage.moh;
                    $scope.itemsList = [];
                    DataModel.Moh.getMohComponents({ moh_id: $scope.mohId, component: $scope.component }, function(response){
                        $scope.itemsList = mohService.parseMohResponse(response,"fc-full-cost");
                    });
                    $scope.controls = {
                        buttonText: "Add",
                        topHeader: "Choose worker",
                        nameMain: "Worker name/title",
                        namePlaceholder: "Name",
                        nameErrorText: "Please, fill in Name of personnel",
                        salaryMain: "Salary",
                        salaryPlaceholder: "$",
                        salaryErrorText: "Please, fill in Salary",
                        taxMain: "Payroll taxes",
                        taxPlaceholder: "$",
                        taxErrorText: "Please, fill in Payroll taxes",
                        growthMain: "Annual Growth Rate",
                        growthPlaceholder: "%",
                        growthErrorText: "Please, fill in Annual Growth Rate"
                    };
                    $scope.nameProperty = "name";
                    $scope.reportId = "il";
                    mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                        $scope.instantReport = response;
                    });
                    //if($scope.indirectMaterials && $scope.indirectMaterials.length > 0) {
                    //$scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                    //}
                };
                init();
                $scope.onSave = function(newItem, callback) {
                    mohService.onSave($scope.mohId, $scope.component, $scope.year_number, $scope.month_number, newItem, function(response){
                        callback(response);
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onUpdate = function(item, callback) {
                    mohService.onUpdate($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onDelete = function(item, callback) {
                    mohService.onDelete($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
            }])
            .controller('mohProductionMachineryRentController', [
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel',
            function($scope, toastr, $localStorage, mohService, DataModel) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    $scope.year_number = 1;
                    $scope.month_number = 0;
                    $scope.component = 'productionmachineryrent';
                    $scope.mohId = $localStorage.moh;
                    $scope.itemsList = [];
                    DataModel.Moh.getMohComponents({ moh_id: $scope.mohId, component: $scope.component }, function(response){
                        $scope.itemsList = mohService.parseMohResponse(response,"fc-full-cost");
                    });
                    $scope.controls = {
                        buttonText: "Add",
                        topHeader: "Choose rent",
                        nameMain: "Type of rental",
                        namePlaceholder: "Name",
                        nameErrorText: "Please, fill in Name of Rent",
                        costMain: "Monthly payment",
                        costPlaceholder: "$",
                        costErrorText: "Please, fill in Monthly payment"
                    };
                    $scope.nameProperty = "name";
                    $scope.reportId = "pmr";
                    mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                        $scope.instantReport = response;
                    });
                    //if($scope.indirectMaterials && $scope.indirectMaterials.length > 0) {
                    //$scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                    //}
                };
                init();
                $scope.onSave = function(newItem, callback) {
                    mohService.onSave($scope.mohId, $scope.component, $scope.year_number, $scope.month_number, newItem, function(response){
                        callback(response);
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onUpdate = function(item, callback) {
                    mohService.onUpdate($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onDelete = function(item, callback) {
                    mohService.onDelete($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
            }])
            .controller('mohProductionUtilitiesAndOtherOverheadExpencesController', [
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel',
            function($scope, toastr, $localStorage, mohService, DataModel) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    $scope.year_number = 1;
                    $scope.month_number = 0;
                    $scope.component = 'productionutilitiesandotheroverheadexpences';
                    $scope.mohId = $localStorage.moh;
                    $scope.itemsList = [];
                    DataModel.Moh.getMohComponents({ moh_id: $scope.mohId, component: $scope.component }, function(response){
                        $scope.itemsList = mohService.parseMohResponse(response,"fc-full-cost");
                    });
                    $scope.controls = {
                        buttonText: "Add",
                        topHeader: "Choose utility",
                        nameMain: "Name of expence",
                        namePlaceholder: "Name",
                        nameErrorText: "Please, fill in Name of expence",
                        costMain: "Monthly payment",
                        costPlaceholder: "$",
                        costErrorText: "Please, fill in Monthly payment"
                    };
                    $scope.nameProperty = "name";
                    $scope.reportId = "puaooe";
                    mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                        $scope.instantReport = response;
                    });
                    //if($scope.indirectMaterials && $scope.indirectMaterials.length > 0) {
                    //$scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                    //}
                };
                init();
                $scope.onSave = function(newItem, callback) {
                    mohService.onSave($scope.mohId, $scope.component, $scope.year_number, $scope.month_number, newItem, function(response){
                        callback(response);
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onUpdate = function(item, callback) {
                    mohService.onUpdate($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onDelete = function(item, callback) {
                    mohService.onDelete($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
            }])
            .controller('mohProductionFacilitiesAmortizationController', [
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel',
            function($scope, toastr, $localStorage, mohService, DataModel) {
                function init() {
                    $scope.gridOptions = mohService.getGridOptions('ICR');
                    $scope.form = {};
                    $scope.year_number = 1;
                    $scope.month_number = 0;
                    $scope.component = 'productionfacilitiesamortization';
                    $scope.mohId = $localStorage.moh;
                    $scope.itemsList = [];
                    DataModel.Moh.getMohComponents({ moh_id: $scope.mohId, component: $scope.component }, function(response){
                        $scope.itemsList = mohService.parseMohResponse(response,"fc-full-cost");
                    });
                    $scope.controls = {
                        buttonText: "Add",
                        topHeader: "Choose facility",
                        nameMain: "Name of asset",
                        namePlaceholder: "Name",
                        nameErrorText: "Please, fill in Name of asset",
                        costMain: "Amount for amortization",
                        costPlaceholder: "$",
                        costErrorText: "Please, fill in Monthly payment"
                    };
                    $scope.nameProperty = "name";
                    $scope.reportId = "pfa";
                    mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                        $scope.instantReport = response;
                    });
                    //if($scope.indirectMaterials && $scope.indirectMaterials.length > 0) {
                    //$scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                    //}
                };
                init();
                $scope.onSave = function(newItem, callback) {
                    mohService.onSave($scope.mohId, $scope.component, $scope.year_number, $scope.month_number, newItem, function(response){
                        callback(response);
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onUpdate = function(item, callback) {
                    mohService.onUpdate($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
                $scope.onDelete = function(item, callback) {
                    mohService.onDelete($scope.component, item, function(){
                        callback();
                        mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                            $scope.instantReport = response;
                        });
                    });
                }
            }])
            .controller('mohReportController', [
            '$scope', '$state', 'toastr', '$localStorage', 'mohService', 'DataModel', 'monthService', 'currencyService', 'PROJECT_TYPES',
            function($scope, $state, toastr, $localStorage, mohService, DataModel, monthService, currencyService, PROJECT_TYPES) {
                function init() {
                    $scope.reportHeader = [];
                    for(var i=0;i<4;i++) {
                        $scope.reportHeader[i] = [];
                    }
                    if($localStorage.uuid) {
                        mohService.getTotalMohReport($localStorage.uuid)
                        .then(function(response){
                            $scope.report = response.data.reportdata;
                            $scope.reportstyles = response.data.reportstyles;
                        }, function(response){
                            console.log(response);
                        });
                        DataModel.Project.uuid({ uuid: $localStorage.uuid })
                            .$promise
                                .then(function(response){
                                    $scope.reportHeader[0][0] = {name: "Company name", value: response.company_name};
                                    $scope.reportHeader[1][0] = {name: "Currency", value: currencyService.getCurrency(response.currency_id).charCode};
                                    $scope.reportHeader[2][0] = {name: "Year to begin", value: response.begin_year};
                                    $scope.reportHeader[2][1] = {name: "Month to begin", value: monthService.Month(response.begin_month).short};
                                    $scope.reportHeader[3][0] = {name: "Time mode", value: PROJECT_TYPES[response.type_id]};
                                    $scope.reportHeader[3][1] = {name: "", value: ""};
                                });
                        if($localStorage.moh != undefined) {
                            DataModel.Moh.get({ id: $localStorage.moh }, function(response){
                                $scope.reportHeader[0][1] = {name: "Calculation based on", value: mohService.getCalculationBase(response.calculation_base_id).name};
                                $scope.reportHeader[1][1] = {name: "Allocation based on", value: mohService.getAllocationBase(response.allocation_base_id).name};
                            });
                        }
                    }
                };
                init(); 
            }]);
}());