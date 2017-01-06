(function(){
    angular.module('costAnswer.dashboard', [
        'costAnswer.dashboard.controllers',
        'costAnswer.dashboard.services'
        ]);
    function DashboardConfig($stateProvider) {
        $stateProvider
            .state('dashboard', {
                url: '/dashboard',
                redirectTo: 'dashboard.projects',
                views: {
                    "main": {
                        controller: 'DashboardHomeController',
                        controllerAs: 'vm',
                        templateUrl: 'app/modules/dashboard/views/home.html'
                    }
                }
            })
            .state('dashboard.projects', {
                url: '/projects',
                parent: 'dashboard',
                controller: 'DashboardProjectsController',
                controllerAs: 'vm',
                templateUrl: 'app/modules/dashboard/views/projects.html'
            })
            .state('dashboard.settings', {
                url: '/settings',
                parent: 'dashboard',
                controller: 'DashboardSettingsController',
                controllerAs: 'vm',
                templateUrl: 'app/modules/dashboard/views/settings.html'
            });
    }
    DashboardConfig.$inject = ['$stateProvider'];
    angular.module('costAnswer.dashboard').config(DashboardConfig);
}());