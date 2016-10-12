(function(){
    angular.module('costAnswer.core.standard.controllers',[]);
    angular.module('costAnswer.core.standard.controllers')
    .controller('standardController', ['$scope', 'ngDialog', function($scope, ngDialog){
        $scope.addNewProduct = function() {
            ngDialog.open({
                template: '<p>Standard Costing Home</p>',
                plain: true
            });
        }
    }]);
    angular.module('costAnswer.core.standard.controllers')
    .controller('standardProductController', ['$scope', function($scope){
        console.log('Standard Costing Product Home');
    }]);
}());