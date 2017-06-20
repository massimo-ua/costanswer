(function(){
    angular.module('costAnswer.core.moh.controllers',[]);
    angular.module('costAnswer.core.moh.controllers')
        .controller('mohController', [
            '$scope', '$state', 'toastr', '$localStorage', 'MOH_CATEGORY', '$log', 'DataModel',
            function($scope, $state, toastr, $localStorage, MOH_CATEGORY, $log, DataModel) {
                function init() {
                    $scope.moh_category = MOH_CATEGORY.getCategories();
                    if($localStorage.uuid != undefined) {
                        DataModel.Moh.getWithUuid({ uuid: $localStorage.uuid }, function(response){
                            $scope.moh_category = MOH_CATEGORY.getCategories(parseInt(response.calculation_base_id));
                        });
                    }
                    $scope.initialState = $state.current.name;
                };
                init();
                $scope.$on('MOH_CALCULATION_CHANGE',function(event, data){
                    $scope.moh_category = MOH_CATEGORY.getCategories(data);
                });
            }])
            .controller('mohIndirectMaterialsController', [
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel', 'ProjectDataService',
            function($scope, toastr, $localStorage, mohService, DataModel, ProjectDataService) {
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
                        //topHeader: "Choose material",
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
                    ProjectDataService.list()
                        .then(function(response){
                            $scope.controls.costPlaceholder = response.currency.symbol;
                        });
                }
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
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel', 'ProjectDataService',
            function($scope, toastr, $localStorage, mohService, DataModel, ProjectDataService) {
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
                        //topHeader: "Choose manager",
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
                    ProjectDataService.list()
                        .then(function(response){
                            $scope.controls.salaryPlaceholder = response.currency.symbol;
                            $scope.controls.taxPlaceholder = response.currency.symbol;
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
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel', 'ProjectDataService',
            function($scope, toastr, $localStorage, mohService, DataModel, ProjectDataService) {
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
                        //topHeader: "Choose insurance",
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
                    ProjectDataService.list()
                        .then(function(response){
                            $scope.controls.costPlaceholder = response.currency.symbol;
                    });
                    //if($scope.indirectMaterials && $scope.indirectMaterials.length > 0) {
                    //$scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                    //}
                }
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
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel', 'ProjectDataService',
            function($scope, toastr, $localStorage, mohService, DataModel, ProjectDataService) {
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
                        //topHeader: "Choose tax",
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
                    ProjectDataService.list()
                        .then(function(response){
                            $scope.controls.costPlaceholder = response.currency.symbol;
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
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel', 'ProjectDataService',
            function($scope, toastr, $localStorage, mohService, DataModel, ProjectDataService) {
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
                        //topHeader: "Choose worker",
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
                    ProjectDataService.list()
                        .then(function(response){
                            $scope.controls.salaryPlaceholder = response.currency.symbol;
                            $scope.controls.taxPlaceholder = response.currency.symbol;
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
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel', 'ProjectDataService',
            function($scope, toastr, $localStorage, mohService, DataModel, ProjectDataService) {
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
                        //topHeader: "Choose rent",
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
                    ProjectDataService.list()
                        .then(function(response){
                            $scope.controls.costPlaceholder = response.currency.symbol;
                    });
                    //if($scope.indirectMaterials && $scope.indirectMaterials.length > 0) {
                    //$scope.gridOptions.data = mohService.getInstanceResult("indirectMaterials", "Indirect Materials");
                    //}
                }
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
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel', 'ProjectDataService',
            function($scope, toastr, $localStorage, mohService, DataModel, ProjectDataService) {
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
                        //topHeader: "Choose utility",
                        nameMain: "Name of expense",
                        namePlaceholder: "Name",
                        nameErrorText: "Please, fill in Name of expense",
                        costMain: "Monthly payment",
                        costPlaceholder: "$",
                        costErrorText: "Please, fill in Monthly payment"
                    };
                    $scope.nameProperty = "name";
                    $scope.reportId = "puaooe";
                    mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                        $scope.instantReport = response;
                    });
                    ProjectDataService.list()
                        .then(function(response){
                            $scope.controls.costPlaceholder = response.currency.symbol;
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
            '$scope', 'toastr', '$localStorage', 'mohService', 'DataModel', 'ProjectDataService',
            function($scope, toastr, $localStorage, mohService, DataModel, ProjectDataService) {
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
                        //topHeader: "Choose facility",
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
                    ProjectDataService.list()
                        .then(function(response){
                            $scope.controls.costPlaceholder = response.currency.symbol;
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
            '$scope', '$state', 'toastr', '$localStorage', 'mohService', 'DataModel', 'monthService', 'currencyService', 'PROJECT_TYPES', 'EXPORT_PREFIX',
            function($scope, $state, toastr, $localStorage, mohService, DataModel, monthService, currencyService, PROJECT_TYPES, EXPORT_PREFIX) {
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
                                if(response.calculation_base_id == 1) {
                                    $scope.reportHeader[3][1] = { name: "Rate (" + mohService.getAllocationBase(response.allocation_base_id).measures + ")", value: parseFloat(response.por_rate) };
                                }
                            });
                        }
                    }
                };
                init();
                $scope.getDownloadLink = function(type) {
                    if($localStorage.uuid) {
                        return EXPORT_PREFIX + '/moh/' + $localStorage.uuid + '/' + type;
                    }
                    return; 
                } 
            }]);
}());