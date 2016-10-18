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
    .controller('propertyInventoryController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', function($scope, $localStorage, $stateParams, DataModel, monthService){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
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
                            $scope.month = monthService.Month(response.begin_month);
                        });
            }
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
                    })
                    .catch(function(error){
                        $scope.controls.buttonText = "Save";
                    });
            }
            else {
                $scope.controls.buttonText = "Updating...";
                inventory.finished_goods_beginning = Math.round($scope.form.finished_goods_beginning * 100);
                inventory.$updateInventory({ id: $scope.id })
                    .catch(function(error){
                        console.log(error);
                    })
                    .finally(function(){
                        $scope.controls.buttonText = "Update";
                    });
            }
        }
    }])
    .controller('propertyProductionPlanController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
    }])
    .controller('propertySalesPlanController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
    }])
    .controller('propertyWipBeginningController', ['$scope', '$localStorage', '$stateParams', 'DataModel', 'monthService', function($scope, $localStorage, $stateParams, DataModel, monthService){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
            $scope.form = {};
            $scope.month_number = 1;
            $scope.year_number = 1;
            $scope.instantReport = [];
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
                            $scope.month = monthService.Month(response.begin_month);
                        });
            }
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
                    })
                    .catch(function(error){
                        $scope.controls.buttonText = "Save";
                    });
            }
            else {
                $scope.controls.buttonText = "Updating...";
                wip.beginning_costs = Math.round($scope.form.beginning_costs * 100);
                wip.$updateWip({ id: $scope.id })
                    .catch(function(error){
                        console.log(error);
                    })
                    .finally(function(){
                        $scope.controls.buttonText = "Update";
                    });
            }
        }
    }])
    .controller('propertyDirectMaterialsController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
    }])
    .controller('propertyDirectLaborController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
    }])
    .controller('propertyVariableOverheadController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
    }])
    .controller('propertyMachineHoursController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
    }])
    .controller('propertyWipEndingController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
    }])
    .controller('propertyMarkUpController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
    }])
    .controller('propertyReportController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
    }]);
}());