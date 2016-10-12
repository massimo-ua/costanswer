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
                //$scope.settings.currency = $scope.currencies[0];
                //var currentTime = new Date();
                //$scope.settings.yearToBegin = currentTime.getFullYear(); 
                //$scope.settings.monthToBegin = $scope.monthes[currentTime.getMonth()];
                //$scope.settings.considerMOH = true;
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
                //$localStorage.Project.settings.globals = $scope.settings;
                /*if($scope.settings.considerMOH) {
                    $state.go('mohDataInput.home');
                }
                else {*/
                    //$state.go('moh');
                /*}*/
            }
        }])
        /*.controller('mohDataInputMainController', [
            '$scope', 'toastr', '$localStorage', 'PROJECT_TYPES', 'MOH_ALLOCATION', 'MOH_METHOD', 'MOH_CATEGORY',
            function($scope, toastr, $localStorage, PROJECT_TYPES, MOH_ALLOCATION, MOH_METHOD, MOH_CATEGORY){
                function init() {
                    $scope.projectType = PROJECT_TYPES[$localStorage.projectType];
                    $scope.moh_allocation = MOH_ALLOCATION;
                    $scope.moh_method = MOH_METHOD;
                    $scope.moh_category = MOH_CATEGORY;
                    $scope.mohMethod = $localStorage.Project.moh.method;
                    $scope.mohAllocation = $localStorage.Project.moh.allocation;
                    $scope.list = {
                        "window": 3,
                        "start": 0
                    };
                }
                init();
                $scope.setMOHmethod = function (item) {
                    try{
                        $localStorage.Project.moh.method = item.id;
                    } catch(err) {
                        console.log(err.name + ' ' + err.message);
                        $localStorage.Project.moh = {
                            "method": item.id
                        } 
                    }
                    $scope.mohMethod = item.id;
                }
                $scope.setMOHallocation = function (item) {
                    $localStorage.Project.moh.allocation = item.id;
                    $scope.mohAllocation = item.id;
                }
                $scope.moveNav= function(target) {
                    if(target < 0) return;
                    if(target > $scope.moh_category.length - $scope.list.window - 1) return;
                    $scope.list.start = target; 
                }
            }])
        .controller('mohDataInputHomeController', [
            '$scope', 'toastr', '$localStorage', 'PROJECT_TYPES', 'CURRENCIES', 'MONTHES',
            function($scope, toastr, $localStorage, PROJECT_TYPES, CURRENCIES, MONTHES){
                
        
        }])*/
        .controller('projectDataInputMainController', [
            '$scope', 'toastr', '$localStorage', 'PROJECT_TYPES', 'DATAINPUT_HEADER',
            function($scope, toastr, $localStorage, PROJECT_TYPES, DATAINPUT_HEADER){
                function init() {
                    $scope.projectType = PROJECT_TYPES[$localStorage.type];
                    $scope.datainput_header = DATAINPUT_HEADER;
                }
                init();

            }]);