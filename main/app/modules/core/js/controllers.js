angular.module('costAnswer.core.controllers',[]);
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
        .controller('newProjectTypeController', ['$scope', function($scope) {

        }]);