angular.module('costAnswer.core.controllers',[
    'costAnswer.core.moh.controllers',
    'costAnswer.core.standard.controllers'
    ]);
angular.module('costAnswer.core.controllers')
        .controller('descriptionCoreController',['$scope', '$stateParams', function($scope, $stateParams){
            console.log('descriptionCoreController reached!');
            var descriptionKey = ($stateParams.costingMethod == undefined) ? 'standard-costing' : $stateParams.costingMethod;
            $scope.description = null;
            function search(){
                for (var i=0,len=$scope.data.length;i<len;i++) {
                    if($scope.data[i].key == descriptionKey) {
                        $scope.description = $scope.data[i].description;
                        break;
                    }
                }
            }
            $scope.data = [
           {   'key': 'standard-costing', 
               'description': {
                    'header': "Standard Costing",
                    'content': "<b>Standard costing</b> is more suitable for organizations with mass production of homogeneous line of products or repetitive assembly work cycle. The large scale of mass production allows the average consumption of resources to be determined. <b>Standard costing</b> is less suitable for organizations that produce non-homogeneous products or where the level of human participation is high."
                }
            },
            {   'key': 'process-costing', 
               'description': {
                    'header': "Process Costing",
                    'content': "<b>Process costing</b> means that there are 1, 2 or more different technological processes (or departments) that produce one product or deliver the same service. It can be used for mass production of many identical products, for example, the production of canned meat, soda bottles, beer, tins of paint and so on."
                }
            },
            {   'key': 'job-order-costing', 
               'description': {
                    'header': "Job Order Costing",
                    'content': "This is, probably, the most suitable method for small craft businesses, repair shops, service firms, etc. This method is a form of specific order costing and it is used when a customer orders a specific job to be done. Where each job is priced separately and each job is <b>unique</b>."
                }
            }
            ];
            search();
        }])
        .controller('startCoreController', ['$scope', '$state', '$localStorage', 'toastr', function($scope, $state, $localStorage, toastr){

        }])
        .controller('quickStartController', ['$scope', '$state', '$localStorage', 'toastr', function($scope, $state, $localStorage, toastr){
            $scope.showOnNext = $localStorage.showOnNext;
            $scope.next = function() {
                $localStorage.showOnNext = $scope.showOnNext;
                $state.go('newProjectType');
            }
        }])
        .controller('newProjectTypeController', ['$scope', '$state', '$localStorage', 'toastr', function($scope, $state, $localStorage, toastr) {
            function init() {
                $scope.varianceDisabled = true;
            }
            init();
            $scope.setProjectType = function(type) {
                if(type == undefined) {
                    return;
                }
                $localStorage.type = type;
                $state.go('projectSettings');
            }
        }])
        .controller('projectSettingsController', ['$scope', '$state', 'toastr', '$localStorage', 'PROJECT_TYPES', 'CURRENCIES', 'MONTHES', 'DataModel', function($scope, $state, toastr, $localStorage, PROJECT_TYPES, CURRENCIES, MONTHES, DataModel) {
            function init() {
                $scope.nextNew = true;
                try {
                    $scope.projectUuid = $localStorage.uuid;
                } catch(err) {
                    console.log(err.name + ' ' + err.message);
                }
                if($scope.projectUuid != undefined) {
                    DataModel.Project.uuid({ uuid: $scope.projectUuid },
                    function(response){
                        $scope.settings.begin_month = parseInt(response.begin_month);
                        $scope.settings.begin_year = parseInt(response.begin_year);
                        $scope.settings.currency_id = parseInt(response.currency_id);
                        $scope.settings.company_name = response.company_name;
                        $scope.nextNew = false;
                    },
                    function(err){
                        console.log(err);
                    });

                }
                $scope.settings = {};
                $scope.currencies = CURRENCIES;
                $scope.monthes = MONTHES;
            }
            init();
            $scope.next = function() {
                if($scope.nextNew) {
                    var project = new DataModel.Project();
                    project.begin_month = $scope.settings.begin_month;
                    project.begin_year = $scope.settings.begin_year;
                    project.currency_id = $scope.settings.currency_id;
                    project.company_name = $scope.settings.company_name;
                    project.type_id = $localStorage.type;
                    project.$save(function(response){
                        console.log(response);
                        $localStorage.uuid = response.uuid;
                        $state.go('moh');
                    });
                } else {
                    //todo: update project settings
                    $state.go('moh');
                }
            }
        }])
        .controller('projectDataInputMainController', [
            '$scope', 'toastr', '$localStorage', 'PROJECT_TYPES', 'DATAINPUT_HEADER', '$state',
            function($scope, toastr, $localStorage, PROJECT_TYPES, DATAINPUT_HEADER, $state){
                function init() {
                    $scope.projectType = PROJECT_TYPES[$localStorage.type];
                    $scope.datainput_header = DATAINPUT_HEADER;
                }
                init();
                $scope.clearAll = function() {
                    $localStorage.$reset();
                    $state.go('startCore');
                };
            }]);

        var ProjectReportController = function(toastr, $log) {
            var vm = this;
            vm.someText = "ProjectReportController";
        }
        //
        ProjectReportController.$inject = ['toastr','$log'];
        //
        angular.module('costAnswer.core.controllers').controller('ProjectReportController', ProjectReportController);