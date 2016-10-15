(function(){
    angular.module('costAnswer.core.standard.controllers',[]);
    angular.module('costAnswer.core.standard.controllers')
    .controller('standardController', ['$scope', 'standardService', '$localStorage', function($scope, standardService, $localStorage){
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
        }
    }])
    .controller('standardProductController', ['$scope', function($scope){
        console.log('Standard Costing Product Home');
    }])
    .controller('newProductController', ['$scope', '$rootScope', 'standardService', '$localStorage', 'DataModel', function($scope, $rootScope, standardService, $localStorage, DataModel){
        function init() {
            $scope.form = {};
            $scope.costingMethod = 1;
            $scope.controls = {
                buttonText: "Save"
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
                    console.log(response);
                    $scope.$emit('NEW_ST_PRODUCT', response);
                    $scope.form = {};
                    $scope.itemForm.$setPristine();
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
            $scope.productPropeties = standardService.productPropeties($stateParams.id);
            $scope.initialState = $state.current.name;
        }
        init();
    }])
    .controller('propertyController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            console.log($stateParams);
        }
        init();
    }])
    .controller('propertySettingsController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
    }])
    .controller('propertyInventoryController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
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
    .controller('propertyWipBeginningController', ['$scope', 'standardService', '$stateParams', function($scope, standardService, $stateParams){
        //console.log('singleProductController');
        function init() {
            $scope.product_id = $stateParams.id;
        }
        init();
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