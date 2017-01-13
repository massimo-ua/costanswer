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
                }
            })
            .state('dashboard.Projects', {
                url: '/projects',
                controller: 'DashboardProjectsController',
                controllerAs: 'vm',
                templateUrl: 'app/modules/dashboard/views/projects.html'
            })
            .state('dashboard.Settings', {
                url: '/settings',
                controller: 'DashboardSettingsController',
                controllerAs: 'vm',
                templateUrl: 'app/modules/dashboard/views/settings.html'
            });
    }
    DashboardConfig.$inject = ['$stateProvider'];
    angular.module('costAnswer.dashboard').config(DashboardConfig);
}());