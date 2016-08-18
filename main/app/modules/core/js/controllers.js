angular.module('costAnswer.core.controllers',['costAnswer.core.moh.controllers']);
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
        .controller('startCoreController', ['$scope', 'toastr', function($scope, toastr){

        }])
        .controller('quickStartController', ['$scope', 'toastr', function($scope, toastr){
            $scope.showOnNext = true;
            $scope.showOnNextSave = function() {
                toastr.info('Setting successfuly saved', 'Information');
            }
        }])
        .controller('newProjectTypeController', ['$scope', '$state', '$localStorage', 'toastr', function($scope, $state, $localStorage, toastr) {
            $scope.setProjectType = function(type) {
                if(type == undefined) {
                    return;
                }
                $localStorage.projectType = type;
                $state.go('projectSettings');
            }
        }])
        .controller('projectSettingsController', ['$scope', '$state', 'toastr', '$localStorage', 'PROJECT_TYPES', 'CURRENCIES', 'MONTHES', function($scope, $state, toastr, $localStorage, PROJECT_TYPES, CURRENCIES, MONTHES) {
            function init() {
                $scope.settings = {};
                $scope.projectType = PROJECT_TYPES[$localStorage.projectType];
                $scope.currencies = CURRENCIES;
                $scope.monthes = MONTHES;
                $scope.settings.currency = $scope.currencies[0];
                var currentTime = new Date();
                $scope.settings.yearToBegin = currentTime.getFullYear(); 
                $scope.settings.monthToBegin = $scope.monthes[currentTime.getMonth()];
                $scope.settings.considerMOH = true;
            }
            init();
            $scope.next = function() {
                $localStorage.projectSettings = $scope.settings;
                /*if($scope.settings.considerMOH) {
                    $state.go('mohDataInput.home');
                }
                else {*/
                    $state.go('moh');
                /*}*/
            }
        }])
        .controller('mohDataInputMainController', [
            '$scope', 'toastr', '$localStorage', 'PROJECT_TYPES', 'MOH_ALLOCATION', 'MOH_METHOD', 'MOH_CATEGORY',
            function($scope, toastr, $localStorage, PROJECT_TYPES, MOH_ALLOCATION, MOH_METHOD, MOH_CATEGORY){
                function init() {
                    $scope.projectType = PROJECT_TYPES[$localStorage.projectType];
                    $scope.moh_allocation = MOH_ALLOCATION;
                    $scope.moh_method = MOH_METHOD;
                    $scope.moh_category = MOH_CATEGORY;
                    $scope.mohMethod = $localStorage.projectSettings.mohMethod;
                    $scope.mohAllocation = $localStorage.projectSettings.mohAllocation;
                    $scope.list = {
                        "window": 3,
                        "start": 0
                    };
                }
                init();
                $scope.setMOHmethod = function (item) {
                    $localStorage.projectSettings.mohMethod = item.id;
                    $scope.mohMethod = item.id;
                }
                $scope.setMOHallocation = function (item) {
                    $localStorage.projectSettings.mohAllocation = item.id;
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
                
        
        }])
        .controller('projectDataInputMainController', [
            '$scope', 'toastr', '$localStorage', 'PROJECT_TYPES', 'DATAINPUT_HEADER',
            function($scope, toastr, $localStorage, PROJECT_TYPES, DATAINPUT_HEADER){
                function init() {
                    $scope.projectType = PROJECT_TYPES[$localStorage.projectType];
                    $scope.datainput_header = DATAINPUT_HEADER;
                }
                init();

            }]);