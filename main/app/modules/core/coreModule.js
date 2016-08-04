angular.module('costAnswer.core', ['costAnswer.core.controllers']);
angular.module('costAnswer.core')
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('description', {
                url: '/description/:costingMethod',
                controller: 'descriptionController',
                templateUrl: 'app/modules/core/views/description.html'
            });
        $urlRouterProvider.otherwise('/description/standard-costing');
    }]);