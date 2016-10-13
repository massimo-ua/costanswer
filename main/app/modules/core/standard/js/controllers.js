(function(){
    angular.module('costAnswer.core.standard.controllers',[]);
    angular.module('costAnswer.core.standard.controllers')
    .controller('standardController', ['$scope', 'ngDialog', function($scope, ngDialog){
        function init() {
            $scope.nameProperty = "name";
            $scope.itemsList = [];
            $scope.form = {};
            $scope.controls = {
                buttonText: "Add",
                confirmButtonText: "Save",
                addButtonActive: false
            };
        }
        function resetForm() {
            $scope.form = {};
            $scope.controls.addButtonActive = false;
        }
        init();
        $scope.addProduct = function() {
            ngDialog.openConfirm({
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
                });
        }
    }]);
    angular.module('costAnswer.core.standard.controllers')
    .controller('standardProductController', ['$scope', function($scope){
        console.log('Standard Costing Product Home');
    }]);
}());