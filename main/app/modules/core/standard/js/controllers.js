(function(){
    angular.module('costAnswer.core.standard.controllers',[]);
    angular.module('costAnswer.core.standard.controllers')
    .controller('standardProductController', ['$scope', function($scope){
        console.log('Standard Costing Product Home');
    }])
    .controller('newProductController', ['$scope', '$localStorage', '$state', 'DataModel', function($scope, $localStorage, $state, DataModel){
        function init() {
            $scope.form = {};
            $scope.costingMethod = 1;
            $scope.controls = {
                buttonText: "Save",
                nameMain: "Product/Service name",
                namePlaceholder: "Name",
                nameErrorText: "Please, fill in product name",
                unitMain: "Measurement unit",
                unitPlaceholder: "Unit",
                unitErrorText: "Please, fill in product measurement unit",
                divisionMain: "Division",
                divisionPlaceholder: "Name",
                orderMain: "Order #",
                orderPlaceholder: "Name"
            }
        }
        init();
        $scope.onSave = function(form) {
            if(!$localStorage.uuid || $scope.costingMethod == undefined) return;
            $scope.controls.formDisabled = true;
            $scope.controls.buttonText = "Saving...";
            var product = new DataModel.Product();
            product.project_uuid = $localStorage.uuid;
            product.name = form.name;
            product.costing_method_id = $scope.costingMethod;
            product.measurement_unit = form.measurement_unit;
            product.division = form.division;
            product.order_number = form.order_number;
            product.$save()
                .then(function(response){
                    $scope.$emit('NEW_ST_PRODUCT', response);
                    $scope.form = {};
                    $scope.itemForm.$setPristine();
                    $state.go('standard.singleProduct', { id: response.id }, {
                        reload: true
                    });
                })
                .catch(function(err){
                    console.log(err);
                })
                .finally(function(){
                    $scope.controls.formDisabled = false;
                    $scope.controls.buttonText = "Save";
                });
        };
    }])
    .controller('singleProductController', ['$scope', '$state', 'standardService', '$stateParams', function($scope, $state, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.productPropeties = standardService.productPropeties();
            $scope.initialState = $state.current.name;
        }
        init();
    }])
    .controller('propertyProductionPlanController', ['$scope', '$localStorage', 'standardService', '$stateParams', 'monthService', 'DataModel', '$log', 'toastr', 'ProjectDataService', function($scope, $localStorage, standardService, $stateParams, monthService, DataModel, $log, toastr, ProjectDataService){
        function init() {
            $scope.form = {};
            $scope.form.amount = [];
            $scope.product_id = $stateParams.id;
            $scope.year_number = 1;
            $scope.updateMode = false;
            $scope.instantReport = [];
            $scope.reportId = 'inventory';
            $scope.min = function(index) {
                return index === 0 ? 1 : 0;
            };
            $scope.controls = {
                buttonText: "Save",
                nameMain: "Finished goods manufactured",
                namePlaceholder: "Units",
                nameErrorText: "Please, fill in amount of finished goods"
            };
            if($localStorage.uuid !== undefined) {
                ProjectDataService.list()
                    .then(function(response){
                        $scope.monthes = monthService.AbsoluteMonthes(response.begin_month);
                        $scope.begin_month = response.begin_month;
                });
            }
            DataModel.Product.getProductionPlan({ id: $scope.product_id })
                .$promise
                    .then(function(response){
                        var emptyCounter = 0;
                        for(var i=0; i < response.length; i++) {
                            if(response[i].finished_goods_manufactured) {
                                $scope.form.amount[response[i].month_number-1] = {};
                                $scope.form.amount[response[i].month_number-1].value = parseInt(response[i].finished_goods_manufactured) / 100;
                            } else {
                                emptyCounter += 1;
                            }
                        }
                        if(response.length == 12 && emptyCounter == 0) {
                            $scope.controls.buttonText = "Update";
                            $scope.updateMode = true;
                        }
                    })
                    .catch(function(error){
                        $log.debug(error);
                    });
            refreshReport();
        }
        function refreshReport() {
            if($scope.product_id) {
                standardService.getInstantReport($scope.product_id, $scope.reportId, function(response){
                    $scope.instantReport = response;
                });
            }
            return;
        }
        init();
        $scope.onSave = function(form) {
            $scope.controls.buttonText = $scope.updateMode ? "Updating..." : "Saving...";
            $scope.controls.formDisabled = true;
            var data = {};
            for(var k in form.amount) {
                data[k] = {};
                data[k].month_number = +k + 1;
                data[k].finished_goods_manufactured = Math.round(form.amount[k].value * 100);
            }
            var plan = {};
            plan.year_number = $scope.year_number;
            plan.data = data;
            DataModel.Product.saveProductionPlan({ id: $scope.product_id }, plan)
                .$promise
                    .then(function(){
                        $scope.updateMode = true;
                        refreshReport();
                    })
                    .catch(function(error){
                        if(error.status == 422) {
                            var suggestedValue = parseInt(error.data.errors[0].suggestion) / 100;
                            toastr.error('Insufficient inventory in ' + monthService.AbsoluteMonth(error.data.errors[0].month, $scope.begin_month).full + '. Please, change your input data and try again. Suggested value: ' + suggestedValue, 'Аttention!');
                        }
                    })
                    .finally(function(){
                        $scope.controls.buttonText = $scope.updateMode ? "Update" : "Save";
                        $scope.controls.formDisabled = false;
                    });
        }
    }])
    .controller('propertySalesPlanController', ['$scope', '$localStorage', 'standardService', '$stateParams', 'monthService', 'DataModel', '$log', 'toastr', 'ProjectDataService', function($scope, $localStorage, standardService, $stateParams, monthService, DataModel, $log, toastr, ProjectDataService){
        function init() {
            $scope.form = {};
            $scope.form.amount = [];
            $scope.product_id = $stateParams.id;
            $scope.year_number = 1;
            $scope.updateMode = false;
            $scope.instantReport = [];
            $scope.reportId = 'inventory';
            $scope.min = function(index) {
                return 0;
            };
            $scope.controls = {
                buttonText: "Save",
                nameMain: "Finished goods sold",
                namePlaceholder: "Units",
                nameErrorText: "Please, fill in amount of finished goods"
            };
            if($localStorage.uuid !== undefined) {
                ProjectDataService.list()
                    .then(function(response){
                        $scope.monthes = monthService.AbsoluteMonthes(response.begin_month);
                        $scope.begin_month = response.begin_month;
                });
            }
            DataModel.Product.getSalesPlan({ id: $scope.product_id })
                .$promise
                    .then(function(response){
                        var emptyCounter = 0;
                        for(var i=0; i < response.length; i++) {
                            if(response[i].finished_goods_sold) {
                                $scope.form.amount[response[i].month_number-1] = {};
                                $scope.form.amount[response[i].month_number-1].value = parseInt(response[i].finished_goods_sold) / 100;
                            } else {
                                emptyCounter += 1;
                            }
                        }
                        if(response.length == 12 && emptyCounter == 0) {
                            $scope.controls.buttonText = "Update";
                            $scope.updateMode = true;
                        }
                    })
                    .catch(function(error){
                        $log.debug(error);
                    });
                    refreshReport();
        }
        function refreshReport() {
            if($scope.product_id) {
                standardService.getInstantReport($scope.product_id, $scope.reportId, function(response){
                    $scope.instantReport = response;
                });
            }
            return;
        }
        init();
        $scope.onSave = function(form) {
            $scope.controls.buttonText = $scope.updateMode ? "Updating..." : "Saving...";
            $scope.controls.formDisabled = true;
            var data = {};
            for(var k in form.amount) {
                data[k] = {};
                data[k].month_number = +k + 1;
                data[k].finished_goods_sold = Math.round(form.amount[k].value * 100);
            }
            var plan = {};
            plan.year_number = $scope.year_number;
            plan.data = data;
            DataModel.Product.saveSalesPlan({ id: $scope.product_id }, plan)
                .$promise
                    .then(function(){
                        $scope.updateMode = true;
                        refreshReport();
                    })
                    .catch(function(error){
                        if(error.status == 422) {
                            var suggestedValue = parseInt(error.data.errors[0].suggestion) / 100;
                            toastr.error('Insufficient inventory in ' + monthService.AbsoluteMonth(error.data.errors[0].month, $scope.begin_month).full + '. Please, change your input data and try again. Suggested value: ' + suggestedValue, 'Аttention!');
                        }
                    })
                    .finally(function(){
                        $scope.controls.buttonText = $scope.updateMode ? "Update" : "Save";
                        $scope.controls.formDisabled = false;
                    });
        };
    }])
    .controller('propertyDirectMaterialsController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', 'ProjectDataService', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService, ProjectDataService){
        function init() {
            $scope.form = {};
            $scope.product_id = $stateParams.id;
            $scope.year_number = 1;
            $scope.itemsList = [];
            $scope.nameProperty = "name";
            $scope.reportId = "directmaterials";
            $scope.controls = {
                buttonText: "Add",
                aMain: "Name of raw material",
                aPlaceholder: "Name",
                aErrorText: "Please, fill in Name of material",
                bMain: "Measurement unit",
                bPlaceholder: "Unit",
                bErrorText: "Please, fill in Measurement unit name",
                cMain: "Standard quantity required",
                cPlaceholder: "Unit",
                cErrorText: "Please, fill in quantity required per batch",
                dMain: "Price per unit",
                dPlaceholder: "$",
                dErrorText: "Please, fill in price per unit value",
                eMain: "Normal waste",
                ePlaceholder: "%",
                eErrorText: "Please, fill in normal waste value",
                fMain: "Safety stock",
                fPlaceholder: "%",
                fErrorText: "Please, fill in safety stock value",
                gMain: "Cost of raw material beginning",
                gPlaceholder: "$",
                gErrorText: "Please, fill in beginning material cost",
                hMain: "Season price change",
                hPlaceholder: "+-%"
            };
            if($localStorage.uuid !== undefined) {
                ProjectDataService.list()
                    .then(function(response){
                        $scope.project = response;
                        $scope.monthes = monthService.AbsoluteMonthes(response.begin_month);
                        $scope.begin_month = response.begin_month;
                        $scope.controls.gPlaceholder = monthService.Month(response.begin_month).full + ', ' + response.currency.symbol;
                        $scope.controls.dPlaceholder = response.currency.symbol;
                        DataModel.Product.get({ id: $stateParams.id })
                            .$promise
                                .then(function(response){
                                    if(standardService.isBatchMode(response.quantity_calculation_method_id)) {
                                        //$scope.controls.gPlaceholder = 'Units, Batch';
                                        $scope.controls.cPlaceholder = 'Batch, Units';
                                    }
                        });
                });
            }
            standardService.DMList($scope.product_id, function(itemsList){
                $scope.itemsList = itemsList;
            });
            refreshReport($scope.itemsList);
        }
        function refreshReport(component_id) {
            if($scope.product_id) {
                standardService.getInstantReport($scope.product_id, $scope.reportId, function(response){
                    $scope.instantReport = response;
                }, component_id);
            }
            return;
        }
        init();
        $scope.onSave = function(newItem, callback) {
            standardService.onDMSave($scope.product_id, $scope.year_number, newItem, function(response){
                callback(response);
                refreshReport();
            });
        }
        $scope.onUpdate = function(item, callback) {
            standardService.onDMUpdate($scope.year_number, item, function(){
                callback();
                refreshReport();
            });
        }
        $scope.onDelete = function(item, callback) {
            standardService.onDMDelete(item, function(){
                callback();
                refreshReport();
            });
        }
        $scope.onLoad = function(component_id) {
            refreshReport(component_id);
        };
    }])
    .controller('propertyDirectLaborController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', 'ProjectDataService', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService, ProjectDataService){
        function init() {
            $scope.product_id = $stateParams.id;
            $scope.year_number = 1;
            $scope.month_number = 0;
            $scope.itemsList = [];
            $scope.nameProperty = "worker";
            $scope.reportId = "directlabor";
            $scope.controls = {
                buttonText: "Add",
                aMain: "Worker name/title",
                aPlaceholder: "Name",
                aErrorText: "Please, fill in worker name/title",
                bMain: "Standard quantity of hours",
                bPlaceholder: "Hour",
                bErrorText: "Please, fill in amount of hours required per batch",
                cMain: "Hourly rate",
                cPlaceholder: "$",
                cErrorText: "Please, fill in hourly rate",
                dMain: "Payroll taxes",
                dPlaceholder: "$",
                dErrorText: "Please, fill in payroll tax value",
                eMain: "Annual growth rate",
                ePlaceholder: "%",
                eErrorText: "Please, fill in annual growth rate value"
            };
            if($localStorage.uuid !== undefined) {
                ProjectDataService.list()
                    .then(function(response){
                        $scope.controls.bPlaceholder = $scope.controls.bPlaceholder + 's, ' + monthService.Month(response.begin_month).full;
                        $scope.controls.cPlaceholder = response.currency.symbol;
                        $scope.controls.dPlaceholder = response.currency.symbol;
                        DataModel.Product.get({ id: $stateParams.id })
                            .$promise
                                .then(function(response){
                                    if(standardService.isBatchMode(response.quantity_calculation_method_id)) {
                                        $scope.controls.bPlaceholder = 'Batch, Hours';
                                        $scope.controls.dPlaceholder = $scope.controls.dPlaceholder + ' per Batch';
                                    }
                                    else {
                                        $scope.controls.dPlaceholder = $scope.controls.dPlaceholder + ' per Month';
                                    }
                        });
                });
            }
            standardService.DLList($scope.product_id, function(itemsList){
                $scope.itemsList = itemsList;
            });
            refreshReport();
        }
        function refreshReport(component_id) {
            if($scope.product_id) {
                standardService.getInstantReport($scope.product_id, $scope.reportId, function(response){
                    $scope.instantReport = response;
                }, component_id);
            }
            return;
        }
        init();
        $scope.onSave = function(newItem, callback) {
            standardService.onDLSave($scope.product_id, $scope.year_number, newItem, function(response){
                callback(response);
                refreshReport();
            });
        }
        $scope.onUpdate = function(item, callback) {
            standardService.onDLUpdate($scope.year_number, item, function(){
                callback();
                refreshReport();
            });
        }
        $scope.onDelete = function(item, callback) {
            standardService.onDLDelete(item, function(){
                callback();
                refreshReport();
            });
        }
        $scope.onLoad = function(component_id) {
            refreshReport(component_id);
        }
    }])
    .controller('propertyVariableOverheadController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', 'ProjectDataService', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService, ProjectDataService){
        function init() {
            $scope.product_id = $stateParams.id;
            $scope.year_number = 1;
            $scope.month_number = 0;
            $scope.itemsList = [];
            $scope.nameProperty = "name";
            $scope.reportId = "variableoverhead";
            $scope.controls = {
                buttonText: "Add",
                aMain: "Name of variable overhead",
                aPlaceholder: "Name",
                aErrorText: "Please, fill in variable overhead name",
                bMain: "Standard cost",
                bPlaceholder: "$",
                bErrorText: "Please, fill in amount required per batch"
            };
            if($localStorage.uuid !== undefined) {
                ProjectDataService.list()
                    .then(function(response){
                        $scope.controls.bPlaceholder = response.currency.symbol + ', ' + monthService.Month(response.begin_month).full;
                        $scope.currency_symbol = response.currency.symbol;
                        DataModel.Product.get({ id: $stateParams.id })
                            .$promise
                                .then(function(response){
                                    if(standardService.isBatchMode(response.quantity_calculation_method_id)) {
                                        $scope.controls.bPlaceholder = 'Batch, ' + $scope.currency_symbol;
                                    }
                        });
                    });
            }
            standardService.VOList($scope.product_id, function(itemsList){
                $scope.itemsList = itemsList;
            });
            refreshReport();
        }
        function refreshReport(component_id) {
            if($scope.product_id) {
                standardService.getInstantReport($scope.product_id, $scope.reportId, function(response){
                    $scope.instantReport = response;
                }, component_id);
            }
            return;
        }
        init();
        $scope.onSave = function(newItem, callback) {
            standardService.onVOSave($scope.product_id, $scope.year_number, newItem, function(response){
                callback(response);
                refreshReport();
            });
        }
        $scope.onUpdate = function(item, callback) {
            standardService.onVOUpdate($scope.year_number, item, function(){
                callback();
                refreshReport();
            });
        }
        $scope.onDelete = function(item, callback) {
            standardService.onVODelete(item, function(){
                callback();
                refreshReport();
            });
        }
        $scope.onLoad = function(component_id) {
            refreshReport(component_id);
        }
    }])
    .controller('propertyMachineHoursController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', 'ProjectDataService', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService, ProjectDataService){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
            $scope.form = {};
            $scope.month_number = 0;
            $scope.year_number = 1;
            $scope.instantReport = [];
            $scope.reportId = 'machinehours';
            $scope.controls = {
                buttonText: "Save",
                nameMain: "Standard quantity required",
                namePlaceholder: "Unit",
                nameErrorText: "Please, fill in machine hours per batch (0 allowed)",
                rateMain: "Hourly rate",
                ratePlaceholder: "$",
                rateErrorText: "Please, fill in hourly rate (0 allowed)"
            };
            DataModel.Product.getMachineHours({ id: $scope.product_id })
                .$promise
                    .then(function(response){
                        $scope.id = response[0].id;
                        $scope.controls.buttonText = "Update";
                        $scope.form.hours_per_batch_required = parseInt(response[0].hours_per_batch_required) / 100;
                        $scope.form.hourly_rate = parseInt(response[0].hourly_rate) / 100;
                    })
                    .catch(function(){
                        $scope.id = undefined;
                    });
            if($localStorage.uuid !== undefined) {
                ProjectDataService.list()
                    .then(function(response){
                        $scope.controls.namePlaceholder = $scope.controls.namePlaceholder + 's, ' + monthService.Month(response.begin_month).full;
                        $scope.controls.ratePlaceholder = response.currency.symbol;
                        DataModel.Product.get({ id: $stateParams.id })
                            .$promise
                                .then(function(response){
                                        if(standardService.isBatchMode(response.quantity_calculation_method_id)) {
                                            $scope.controls.namePlaceholder = 'Batch, Units';
                                        }
                        });
                    });
            }
            refreshReport();
        }
        function refreshReport() {
            if($scope.product_id) {
                standardService.getInstantReport($scope.product_id, $scope.reportId, function(response){
                    $scope.instantReport = response;
                });
            }
            return;
        }
        init();
        $scope.onSave = function(form) {
            var mh = new DataModel.Product();
            if($scope.id == undefined) {
                $scope.controls.buttonText = "Saving...";
                mh.hours_per_batch_required = Math.round($scope.form.hours_per_batch_required * 100);
                mh.hourly_rate = Math.round($scope.form.hourly_rate * 100);
                mh.month_number = $scope.month_number;
                mh.year_number = $scope.year_number;
                mh.$saveMachineHours({ id: $scope.product_id })
                    .then(function(response){
                        $scope.controls.buttonText = "Update";
                        $scope.id = response.id;
                        refreshReport();
                    })
                    .catch(function(error){
                        $scope.controls.buttonText = "Save";
                    });
            }
            else {
                $scope.controls.buttonText = "Updating...";
                mh.hours_per_batch_required = Math.round($scope.form.hours_per_batch_required * 100);
                mh.hourly_rate = Math.round($scope.form.hourly_rate * 100);
                mh.$updateMachineHours({ id: $scope.id })
                    .then(function(response){
                        refreshReport();
                    })
                    .catch(function(error){
                        console.log(error);
                    })
                    .finally(function(){
                        $scope.controls.buttonText = "Update";
                    });
            }
        };
    }])
    .controller('propertyMarkUpController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', '$log', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService, $log){
        function init() {
            $scope.product_id = $stateParams.id;
            $scope.year_number = 1;
            $scope.month_number = 0;
            $scope.form = {};
            $scope.updateMode = false;
            $scope.reportId = 'markup';
            $scope.controls = {
                buttonText: "Save",
                //aMain: "Mark Up",
                aPlaceholder: "%",
                aErrorText: "Please, fill in mark up rate",
                bMain: "VAT (non-US companies)",
                bPlaceholder: "%",
                bErrorText: "Please, fill in VAT rate"
            };
            if($localStorage.uuid !== undefined) {
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            $scope.project = response;
                            $scope.monthes = monthService.AbsoluteMonthes(response.begin_month);
                        });
            }
            if($scope.product_id) {
                DataModel.Product.getMarkUp({ id: $scope.product_id })
                    .$promise
                        .then(function(response){
                            $scope.form = standardService.MUFCParamsConverter(response);
                            if(response.id != undefined) {
                                $scope.controls.buttonText = "Update";
                                $scope.updateMode = true;
                            }
                        })
                        .catch(function(error){
                            $log.debug(error);
                        })
            }
            refreshReport();
        }
        function refreshReport() {
            if($scope.product_id) {
                standardService.getInstantReport($scope.product_id, $scope.reportId, function(response){
                    $scope.instantReport = response;
                });
            }
            return;
        }
        init();
        $scope.onSave = function(form) {
            $scope.controls.buttonText = $scope.updateMode ? "Updating..." : "Saving...";
            $scope.controls.formDisabled = true;
            var payload = standardService.MUFCPayloadConverter($scope.year_number, form);
            DataModel.Product.saveMarkUp({ id: $scope.product_id }, payload)
                .$promise
                    .then(function(){
                        $scope.updateMode = true;
                        refreshReport();
                    })
                    .catch(function(error){
                        $log.debug(error);
                    })
                    .finally(function(){
                        $scope.controls.buttonText = $scope.updateMode ? "Update" : "Save";
                        $scope.controls.formDisabled = false;
                    });
        }
    }])
    .controller('propertyReportController', [
            '$scope', '$localStorage', 'standardService', '$log',
            '$stateParams', 'monthService', 'DataModel', 'PROJECT_TYPES',
            'CurrencyService',
            'EXPORT_PREFIX', 'quantityCalculationMethod',
            function($scope, $localStorage, standardService, $log,
            $stateParams, monthService, DataModel, PROJECT_TYPES, CurrencyService, EXPORT_PREFIX, quantityCalculationMethod
            ) {
                function init() {
                    if($localStorage.uuid !== undefined) {
                        $scope.reportHeader = [];
                        for(var i=0;i<5;i++) {
                            $scope.reportHeader[i] = [];
                        }
                        DataModel.Project.uuid({ uuid: $localStorage.uuid })
                            .$promise
                                .then(function(response){
                                    $scope.reportHeader[0][0] = {name: "Company name", value: response.company_name};
                                    CurrencyService.getCurrency(response.currency_id)
                                        .then(function(currency){
                                            $scope.reportHeader[1][0] = {name: "Currency", value: currency.charcode};
                                        });
                                    $scope.reportHeader[4][0] = {name: "Time mode", value: PROJECT_TYPES[response.type_id]};
                                    $scope.reportHeader[2][0] = {name: "Year to begin", value: response.begin_year};
                                    $scope.reportHeader[3][0] = {name: "Month to begin", value: monthService.Month(response.begin_month).short};
                                });
                        DataModel.Product.get({ id: $stateParams.id })
                            .$promise
                                .then(function(response){
                                    $scope.reportHeader[0][1] = {name: "Product/Service", value: response.name};
                                    $scope.reportHeader[1][1] = {name: "Meas. Unit", value: response.measurement_unit};
                                    $scope.reportHeader[2][1] = {name: "Division", value: response.division};
                                    $scope.reportHeader[3][1] = {name: "Order #", value: response.order_number};
                                    $scope.reportHeader[4][1] = {name: "Standard quantity per", value: quantityCalculationMethod.get(parseInt(response.quantity_calculation_method_id)).shortName };
                                })
                                .catch(function(error){
                                    $log.debug(error);
                                });

                    }
                    $scope.product_id = $stateParams.id;
                    if($scope.product_id) {
                        entityService.getTotalProductReport($scope.product_id)
                        .then(function(response){
                            $scope.report = response.data.reportdata;
                            $scope.reportstyles = response.data.reportstyles;
                        }, function(response){
                            $log.debug(response);
                        });
                    }
                };
                init();
            }]);
}());
