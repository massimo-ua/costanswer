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
            '$scope', 'toastr', '$localStorage', 'MOH_ALLOCATION_BASE', 'MOH_CALCULATION_BASE', 'DataModel',
            function($scope, toastr, $localStorage, MOH_ALLOCATION_BASE, MOH_CALCULATION_BASE, DataModel) {
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
                            console.log(err);
                        });
                    } else {
                        //todo update moh settings
                    }

                }
                function init() {
                    $scope.mohSettings = {};
                    $scope.mohId = $localStorage.moh;
                    if($scope.mohId != undefined) {
                        DataModel.Moh.get({ id: $localStorage.moh }, function(response){
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
                        buttonText: "Add"
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
                        buttonText: "Add"
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
                        buttonText: "Add"
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
                        buttonText: "Add"
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
                        buttonText: "Add"
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
                        buttonText: "Add"
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
                        buttonText: "Add"
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
                        buttonText: "Add"
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
            '$scope', '$state', 'toastr', '$localStorage', 'mohService',
            function($scope, $state, toastr, $localStorage, mohService) {
                function init() {
                    if($localStorage.uuid) {
                        mohService.getTotalMohReport($localStorage.uuid)
                        .then(function(response){
                            $scope.report = response.data;
                        }, function(response){
                            console.log(response);
                        });
                    }
                };
                init(); 
            }]);
}());