(function(){
    angular.module('costAnswer.core.standard.controllers',[]);
    angular.module('costAnswer.core.standard.controllers')
    .controller('standardController', ['$scope', 'standardService', '$localStorage', 'DataModel', '$state', function($scope, standardService, $localStorage, DataModel, $state){
        function init() {
            $scope.nameProperty = "name";
            $scope.productsList = [];
            if($localStorage.uuid) {
                standardService.productsList($localStorage.uuid).then(function(response){
                    $scope.productsList = response.data;
                });
            }
        }
        init();
        $scope.$on('NEW_ST_PRODUCT', function(event, data) {
            $scope.productsList.push(data);
            event.stopPropagation();
        });
        $scope.onDelete = function(item, callback) {
            DataModel.Product.remove({id: item.id})
                .$promise
                    .then(function(response){
                        callback();
                        $state.go('standard.start', undefined, {
                            reload: true
                        });
                    })
                    .catch(function(error){
                        callback(error);
                    });
               //mohService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
               //    $scope.instantReport = response;
               //});
        }
            
            
            
            /*ngDialog.openConfirm({
                        template: 'app/modules/core/standard/views/dialogs/add-product.html',
                        className: 'ngdialog-theme-plain',
                        closeByDocument: false,
                        closeByEscape: false,
                        showClose: true,
                        scope: $scope
            })
            .then(
                function(value) {
                    console.log(value);
                    $scope.itemsList.push(value);
                    resetForm();
                },
                function(value){
                    console.log(value);
                    resetForm();
                });*/
    }])
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
        }
    }])
    .controller('startProductController', ['$scope', function($scope){

    }])
    .controller('singleProductController', ['$scope', '$state', 'standardService', '$stateParams', function($scope, $state, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.productPropeties = standardService.productPropeties();
            $scope.initialState = $state.current.name;
        }
        init();
    }])
    .controller('propertyController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
        }
        init();
    }])
    .controller('propertySettingsController', ['$scope', 'standardService', '$stateParams', 'DataModel', function($scope, standardService, $stateParams, DataModel){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
            $scope.form = {};
            $scope.item = {};
            $scope.controls = {
                buttonText: "Update",
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
            DataModel.Product.get({ id: $stateParams.id })
                .$promise
                    .then(function(response){
                        $scope.item = response;
                        $scope.form.name = response.name;
                        $scope.form.measurement_unit = response.measurement_unit;
                        $scope.form.division = response.division;
                        $scope.form.order_number = response.order_number;
                    })
                    .catch(function(error){
                        console.log(error);
                    });

        }
        init();
        $scope.onSave = function(form) {
            $scope.controls.buttonText = "Updating...";
            $scope.item.name = form.name;
            $scope.item.measurement_unit = form.measurement_unit;
            $scope.item.division = form.division;
            $scope.item.order_number = form.order_number;
            $scope.item.$update({ id: $stateParams.id })
                .catch(function(error){
                    console.log(error);
                })
                .finally(function(){
                    $scope.controls.buttonText = "Update";
                });
        }
    }])
    .controller('propertyInventoryController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
            $scope.reportId = 'inventory';
            $scope.form = {};
            $scope.month_number = 1;
            $scope.year_number = 1;
            $scope.instantReport = [];
            $scope.controls = {
                buttonText: "Save",
                nameMain: "Finished goods beginning",
                namePlaceholder: "Units",
                nameErrorText: "Please, fill in amount of finished goods"
            }
            DataModel.Product.getInventory({ id: $scope.product_id })
                .$promise
                    .then(function(response){
                        $scope.id = response[0].id;
                        $scope.controls.buttonText = "Update";
                        $scope.form.finished_goods_beginning = parseInt(response[0].finished_goods_beginning) / 100;
                    })
                    .catch(function(){
                        $scope.id = undefined;            
                    })
            if($localStorage.uuid !== undefined) {
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            $scope.project = response;
                            $scope.controls.namePlaceholder = $scope.controls.namePlaceholder + ',' + monthService.Month(response.begin_month).full;
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
            var inventory = new DataModel.Product();
            if($scope.id == undefined) {
                $scope.controls.buttonText = "Saving...";
                inventory.finished_goods_beginning = Math.round($scope.form.finished_goods_beginning * 100);
                inventory.month_number = $scope.month_number;
                inventory.year_number = $scope.year_number;
                inventory.$saveInventory({ id: $scope.product_id })
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
                inventory.finished_goods_beginning = Math.round($scope.form.finished_goods_beginning * 100);
                inventory.$updateInventory({ id: $scope.id })
                    .then(function(){
                        refreshReport();
                    })
                    .catch(function(error){
                        console.log(error);
                    })
                    .finally(function(){
                        $scope.controls.buttonText = "Update";
                    });
            }
        }
    }])
    .controller('propertyProductionPlanController', ['$scope', '$localStorage', 'standardService', '$stateParams', 'monthService', 'DataModel', '$log', function($scope, $localStorage, standardService, $stateParams, monthService, DataModel, $log){
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
            }
            $scope.controls = {
                buttonText: "Save",
                nameMain: "Finished goods manufactured",
                namePlaceholder: "Units",
                nameErrorText: "Please, fill in amount of finished goods"
            }
            if($localStorage.uuid !== undefined) {
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            $scope.monthes = monthService.AbsoluteMonthes(response.begin_month);
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
                    })
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
                        $log.debug(error);
                    })
                    .finally(function(){
                        $scope.controls.buttonText = $scope.updateMode ? "Update" : "Save";
                        $scope.controls.formDisabled = false;
                    });
        }
    }])
    .controller('propertySalesPlanController', ['$scope', '$localStorage', 'standardService', '$stateParams', 'monthService', 'DataModel', '$log', function($scope, $localStorage, standardService, $stateParams, monthService, DataModel, $log){
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
            }
            $scope.controls = {
                buttonText: "Save",
                nameMain: "Finished goods sold",
                namePlaceholder: "Units",
                nameErrorText: "Please, fill in amount of finished goods"
            }
            if($localStorage.uuid !== undefined) {
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            $scope.monthes = monthService.AbsoluteMonthes(response.begin_month);
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
                    })
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
                        $log.debug(error);
                    })
                    .finally(function(){
                        $scope.controls.buttonText = $scope.updateMode ? "Update" : "Save";
                        $scope.controls.formDisabled = false;
                    });
        }
    }])
    .controller('propertyWipBeginningController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
            $scope.form = {};
            $scope.month_number = 1;
            $scope.year_number = 1;
            $scope.instantReport = [];
            $scope.reportId = 'wip';
            $scope.controls = {
                buttonText: "Save",
                nameMain: "Work in process (WIP) beginning",
                namePlaceholder: "$",
                nameErrorText: "Please, fill in amount of beginning WIP costs (0 allowed)"
            }
            DataModel.Product.getWip({ id: $scope.product_id })
                .$promise
                    .then(function(response){
                        $scope.id = response[0].id;
                        $scope.controls.buttonText = "Update";
                        $scope.form.beginning_costs = parseInt(response[0].beginning_costs) / 100;
                    })
                    .catch(function(){
                        $scope.id = undefined;            
                    })
            if($localStorage.uuid !== undefined) {
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            $scope.project = response;
                            $scope.controls.namePlaceholder = $scope.controls.namePlaceholder + ',' + monthService.Month(response.begin_month).full;
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
            var wip = new DataModel.Product();
            if($scope.id == undefined) {
                $scope.controls.buttonText = "Saving...";
                wip.beginning_costs = Math.round($scope.form.beginning_costs * 100);
                wip.month_number = $scope.month_number;
                wip.year_number = $scope.year_number;
                wip.$saveWip({ id: $scope.product_id })
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
                wip.beginning_costs = Math.round($scope.form.beginning_costs * 100);
                wip.$updateWip({ id: $scope.id })
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
        }
    }])
    .controller('propertyDirectMaterialsController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService){
        function init() {
            $scope.form = {};
            $scope.product_id = $stateParams.id;
            $scope.year_number = 1;
            $scope.itemsList = [];
            $scope.nameProperty = "name";
            $scope.controls = {
                buttonText: "Add",
                aMain: "Name of raw material",
                aPlaceholder: "Name",
                aErrorText: "Please, fill in Name of material",
                bMain: "Measurement unit",
                bPlaceholder: "Unit",
                bErrorText: "Please, fill in Measurement unit name",
                cMain: "Batch quantity required",
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
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            $scope.project = response;
                            $scope.controls.gPlaceholder = $scope.controls.gPlaceholder + ', s' + monthService.Month(response.begin_month).full;
                            $scope.controls.cPlaceholder = $scope.controls.cPlaceholder + 's, ' + monthService.Month(response.begin_month).full;
                            $scope.monthes = monthService.AbsoluteMonthes(response.begin_month);
                        });
            }
            standardService.DMList($scope.product_id, function(itemsList){
                $scope.itemsList = itemsList;
            });
        }
        init();
        $scope.onSave = function(newItem, callback) {
            standardService.onDMSave($scope.product_id, $scope.year_number, newItem, function(response){
                callback(response);
                //standardService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                //    $scope.instantReport = response;
                //});
            });
        }
        $scope.onUpdate = function(item, callback) {
            standardService.onDMUpdate($scope.year_number, item, function(){
                callback();
                //standardService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                //    $scope.instantReport = response;
                //});
            });
        }
        $scope.onDelete = function(item, callback) {
            standardService.onDMDelete(item, function(){
                callback();
                //standardService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                //    $scope.instantReport = response;
                //});
            });
        }
    }])
    .controller('propertyDirectLaborController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService){
        function init() {
            $scope.product_id = $stateParams.id;
            $scope.year_number = 1;
            $scope.month_number = 0;
            $scope.itemsList = [];
            $scope.nameProperty = "worker";
            $scope.controls = {
                buttonText: "Add",
                aMain: "Worker name/title",
                aPlaceholder: "Name",
                aErrorText: "Please, fill in worker name/title",
                bMain: "Hours per batch required",
                bPlaceholder: "Unit",
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
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            $scope.controls.bPlaceholder = $scope.controls.bPlaceholder + 's, ' + monthService.Month(response.begin_month).full;
                        });
            }
            standardService.DLList($scope.product_id, function(itemsList){
                $scope.itemsList = itemsList;
            });
        }
        init();
        $scope.onSave = function(newItem, callback) {
            standardService.onDLSave($scope.product_id, $scope.year_number, newItem, function(response){
                callback(response);
                //standardService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                //    $scope.instantReport = response;
                //});
            });
        }
        $scope.onUpdate = function(item, callback) {
            standardService.onDLUpdate($scope.year_number, item, function(){
                callback();
                //standardService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                //    $scope.instantReport = response;
                //});
            });
        }
        $scope.onDelete = function(item, callback) {
            standardService.onDLDelete(item, function(){
                callback();
                //standardService.getInstantMohReport($localStorage.uuid, $scope.reportId, function(response){
                //    $scope.instantReport = response;
                //});
            });
        }
    }])
    .controller('propertyVariableOverheadController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService){
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
                bMain: "Amount per batch",
                bPlaceholder: "$",
                bErrorText: "Please, fill in amount required per batch"
            };
            if($localStorage.uuid !== undefined) {
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            $scope.controls.bPlaceholder = $scope.controls.bPlaceholder + ', ' + monthService.Month(response.begin_month).full;
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
    .controller('propertyMachineHoursController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService){
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
                nameMain: "Machine hours per batch required",
                namePlaceholder: "Unit",
                nameErrorText: "Please, fill in machine hours per batch (0 allowed)",
                rateMain: "Hourly rate",
                ratePlaceholder: "$",
                rateErrorText: "Please, fill in hourly rate (0 allowed)"
            }
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
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            $scope.controls.namePlaceholder = $scope.controls.namePlaceholder + 's, ' + monthService.Month(response.begin_month).full;
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
        }
    }])
    .controller('propertyWipEndingController', ['$scope', '$localStorage', 'standardService', '$stateParams', 'monthService', 'DataModel', '$log', function($scope, $localStorage, standardService, $stateParams, monthService, DataModel, $log){
        function init() {
            $scope.form = {};
            $scope.form.amount = [];
            $scope.product_id = $stateParams.id;
            $scope.year_number = 1;
            $scope.updateMode = false;
            $scope.reportId = 'wip';
            $scope.min = function(index) {
                return 0;
            }
            $scope.controls = {
                buttonText: "Save",
                nameMain: "Work in process (WIP) ending",
                namePlaceholder: "$",
                nameErrorText: "Please, fill in WIP costing amount"
            }
            if($localStorage.uuid !== undefined) {
                DataModel.Project.uuid({ uuid: $localStorage.uuid })
                    .$promise
                        .then(function(response){
                            $scope.monthes = monthService.AbsoluteMonthes(response.begin_month);
                        });
            }
            DataModel.Product.getWipEnding({ id: $scope.product_id })
                .$promise
                    .then(function(response){
                        var emptyCounter = 0;
                        for(var i=0; i < response.length; i++) {
                            if(response[i].ending_costs) {
                                $scope.form.amount[response[i].month_number-1] = {};
                                $scope.form.amount[response[i].month_number-1].value = parseInt(response[i].ending_costs) / 100;
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
                    })
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
                data[k].ending_costs = Math.round(form.amount[k].value * 100);
            }
            var plan = {};
            plan.year_number = $scope.year_number;
            plan.data = data;
            DataModel.Product.saveWipEnding({ id: $scope.product_id }, plan)
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
    .controller('propertyMarkUpController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', '$log', function($scope, $localStorage, $stateParams, DataModel, monthService, standardService, $log){
        function init() {
            $scope.product_id = $stateParams.id;
            $scope.year_number = 1;
            $scope.month_number = 0;
            $scope.form = {};
            $scope.updateMode = false;
            $scope.controls = {
                buttonText: "Save",
                aMain: "Mark Up",
                aPlaceholder: "%",
                aErrorText: "Please, fill in mark up rate",
                bMain: "VAT (IFRS countries)",
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
    .controller('propertyReportController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
    }]);
}());