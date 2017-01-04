(function(){
    angular.module('costAnswer.dashboard', [
        'costAnswer.dashboard.controllers',
        'costAnswer.dashboard.services'
        ]);
    function DashboardConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                views: {
                    "main": {
                        controller: 'DashboardHomeController',
                        controllerAs: 'vm',
                        templateUrl: 'app/modules/dashboard/views/home.html'
                    }
                }
            });
    }
    DashboardConfig.$inject = ['$stateProvider'];
    angular.module('costAnswer.dashboard').config(DashboardConfig);
}());