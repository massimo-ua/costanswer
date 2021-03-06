angular.module('costAnswer.core.controllers',[
    'costAnswer.core.moh.controllers',
    'costAnswer.core.standard.controllers'
    ]);
angular.module('costAnswer.core.controllers')
        .controller('descriptionCoreController',['$scope', '$stateParams', function($scope, $stateParams){
            var descriptionKey = ($stateParams.costingMethod === undefined) ? 'standard-costing' : $stateParams.costingMethod;
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
            };
        }]);
        var ProjectReportController = function(toastr, $log, $localStorage, DataModel, monthService, CurrencyService, PROJECT_TYPES, standardService, EXPORT_PREFIX, FileDownloaderService, $http, $window, $document) {
            var vm = this;
            vm.someText = "ProjectReportController";
            vm.reportHeader = [];
            function init() {
                var projectUuid = $localStorage.uuid;
                if($localStorage.uuid !== undefined) {
                        DataModel.Project.uuid({ uuid: projectUuid })
                            .$promise
                                .then(function(response){
                                    vm.reportHeader[0] = [];
                                    vm.reportHeader[0][0] = {name: "Company name", value: response.company_name};
                                    vm.reportHeader[0][1] = {name: "Month to begin", value: monthService.Month(response.begin_month).short};
                                    vm.reportHeader[1] = [];
                                    CurrencyService.getCurrency(response.currency_id)
                                        .then(function(currency){
                                            vm.reportHeader[1][0] = {name: "Currency", value: currency.charcode};
                                        });
                                    vm.reportHeader[1][1] = {name: "Time mode", value: PROJECT_TYPES[response.type_id]};
                                    vm.reportHeader[2] = [];
                                    vm.reportHeader[2][0] = {name: "Year to begin", value: response.begin_year};
                                    vm.reportHeader[2][1] = {name: "", value: ""};
                                });
                        standardService.getTotalProjectReport(projectUuid)
                                .then(function(response){
                                    vm.report = response.data.reportdata;
                                    vm.reportstyles = response.data.reportstyles;
                                },function(error){
                                    $log.debug(error);
                                });
                    }
            }
            init();
            vm.getDownloadLink = function(type) {
                    if($localStorage.uuid) {
                        return EXPORT_PREFIX + '/project/' + $localStorage.uuid + '/' + type;
                    }
                    return; 
            };
            /*vm.downloadReport = function(reporttype) {
                //FileDownloaderService.getProjectReport($localStorage.uuid,reporttype);
                var config = {
                method: 'GET',
                responseType : 'arraybuffer',
                headers : {
                    'Content-type' : 'application/' + reporttype,
                },
                url: EXPORT_PREFIX + '/project/' + $localStorage.uuid + '/' + reporttype
            };
            $http(config)
                .then(function(response){
                    var file = new Blob([response.data], {type: 'application/pdf'});

                var isChrome = !!$window.chrome && !!$window.chrome.webstore;
                var isIE = /*@cc_on!@*//*false || !!$document.documentMode;
                var isEdge = !isIE && !!$window.StyleMedia;


                if (isChrome){
                    var url = $window.URL || $window.webkitURL;
                    var downloadLink = angular.element('<a></a>');
                    downloadLink.attr('href', url.createObjectURL(file));
                    downloadLink.attr('target','_self');
                    downloadLink.attr('download', 'invoice.pdf');
                    downloadLink[0].click();
                }
                else if(isEdge || isIE){
                    $window.navigator.msSaveOrOpenBlob(file,'invoice.pdf');

                }
                else {
                    var fileURL = URL.createObjectURL(file);
                    $window.open(fileURL);
                }
                });
            };*/
        };
        //
        ProjectReportController.$inject = ['toastr','$log','$localStorage','DataModel','monthService','CurrencyService','PROJECT_TYPES','standardService', 'EXPORT_PREFIX', 'FileDownloaderService', '$http', '$window', '$document'];
        //
        angular.module('costAnswer.core.controllers').controller('ProjectReportController', ProjectReportController);