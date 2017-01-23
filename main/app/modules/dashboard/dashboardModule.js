(function(){
    angular.module('costAnswer.dashboard', [
        'costAnswer.dashboard.controllers',
        'costAnswer.dashboard.services'
        ]);
    function DashboardConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                redirectTo: 'dashboard.Projects',
                views: {
                    "main": {
                        controller: 'DashboardHomeController',
                        controllerAs: 'vm',
                        templateUrl: 'app/modules/dashboard/views/home.html'
                    }
                },
                data: {requiredLogin: true}
            })
            .state('dashboard.Projects', {
                url: '/projects',
                controller: 'DashboardProjectsController',
                controllerAs: 'vm',
                templateUrl: 'app/modules/dashboard/views/projects.html',
                data: {requiredLogin: true}
            })
            .state('dashboard.Settings', {
                url: '/settings',
                controller: 'DashboardSettingsController',
                controllerAs: 'vm',
                templateUrl: 'app/modules/dashboard/views/settings.html',
                data: {requiredLogin: true}
            })
            .state('dashboard.Billing', {
                url: '/billing',
                controller: 'DashboardBillingsController',
                controllerAs: 'vm',
                templateUrl: 'app/modules/dashboard/views/billing.html',
                data: {requiredLogin: true}
            });
    }
    DashboardConfig.$inject = ['$stateProvider'];
    angular.module('costAnswer.dashboard').config(DashboardConfig);
}());