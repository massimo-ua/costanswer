(function(){
    angular.module('costAnswer.manual', [
        'costAnswer.manual.services',
        'costAnswer.manual.controllers'
    ]);
    function ManualConfig($stateProvider) {
        $stateProvider
            .state('manual', {
                url: '/manual',
                redirectTo: 'manual/fixed-manufacturing-overhead',
                views: {
                    "main": {
                        template: '<manual-home></manual-home>'
                    }
                }
            })
            .state('manual/fixed-manufacturing-overhead', {
                url: '/fixed-manufacturing-overhead',
                parent: 'manual',
                templateUrl: 'app/modules/manual/views/fixed-manufacturing-overhead.html',
            })
            .state('manual/instant-calculation-results', {
                url: '/instant-calculation-results',
                parent: 'manual',
                templateUrl: 'app/modules/manual/views/instant-calculation-results.html',
            })
            .state('manual/operating-controls', {
                url: '/operating-controls',
                parent: 'manual',
                templateUrl: 'app/modules/manual/views/operating-controls.html',
            })
            .state('manual/project-setup', {
                url: '/project-setup',
                parent: 'manual',
                templateUrl: 'app/modules/manual/views/project-setup.html',
            })
            .state('manual/reports', {
                url: '/reports',
                parent: 'manual',
                templateUrl: 'app/modules/manual/views/reports.html',
            })
           .state('manual-standard-costing', {
                url: '/manual-standard-costing',
                redirectTo: 'manual-standard-costing/inventory',
                views: {
                    "main": {
                        template: '<manual-standard-costing></manual-standard-costing>'
                    }
                }
            })
            .state('manual-standard-costing/inventory', {
                url: '/inventory',
                parent: 'manual-standard-costing',
                templateUrl: 'app/modules/manual/views/standard-costing-inventory.html',
            })
            .state('manual-standard-costing/machine-hours', {
                url: '/machine-hours',
                parent: 'manual-standard-costing',
                templateUrl: 'app/modules/manual/views/standard-costing-machine-hours.html',
            })
            .state('manual-standard-costing/markup', {
                url: '/markup',
                parent: 'manual-standard-costing',
                templateUrl: 'app/modules/manual/views/standard-costing-markup.html',
            })
            .state('manual-standard-costing/vmoh', {
                url: '/vmoh',
                parent: 'manual-standard-costing',
                templateUrl: 'app/modules/manual/views/standard-costing-vmoh.html',
            })
            .state('manual-standard-costing/wip-ending', {
                url: '/wip-ending',
                parent: 'manual-standard-costing',
                templateUrl: 'app/modules/manual/views/standard-costing-wip-ending.html',
            })
            .state('manual-standard-costing/direct-labor', {
                url: '/direct-labor',
                parent: 'manual-standard-costing',
                templateUrl: 'app/modules/manual/views/standard-costing-direct-labor.html',
            })
            .state('manual-standard-costing/direct-materials', {
                url: '/direct-materials',
                parent: 'manual-standard-costing',
                templateUrl: 'app/modules/manual/views/standard-costing-direct-materials.html',
            })
            .state('manual-standard-costing/product-creation', {
                url: '/product-creation',
                parent: 'manual-standard-costing',
                templateUrl: 'app/modules/manual/views/standard-costing-product-creation.html',
            })
            .state('manual-standard-costing/production-plan', {
                url: '/production-plan',
                parent: 'manual-standard-costing',
                templateUrl: 'app/modules/manual/views/standard-costing-production-plan.html',
            })
            .state('manual-standard-costing/sales-plan', {
                url: '/sales-plan',
                parent: 'manual-standard-costing',
                templateUrl: 'app/modules/manual/views/standard-costing-sales-plan.html',
            })
            .state('manual-standard-costing/wip-beginning', {
                url: '/wip-beginning',
                parent: 'manual-standard-costing',
                templateUrl: 'app/modules/manual/views/standard-costing-wip-beginning.html',
            });
    }
    ManualConfig.$inject = ['$stateProvider'];
    angular.module('costAnswer.manual').config(ManualConfig);
}());

 