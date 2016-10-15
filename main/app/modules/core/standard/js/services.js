(function(){
    angular.module('costAnswer.core.standard.services',[]);
    angular.module('costAnswer.core.standard.services')
    .factory('standardService', ['$rootScope', '$localStorage', '$http', 'API_PREFIX', 'DataModel', function($rootScope, $localStorage, $http, API_PREFIX, DataModel){
        return {
            productsList: function(uuid) {
                var config = {
                    method: 'GET',
                    url: API_PREFIX + '/products/1/'+uuid
                }
                return $http(config);
            },
            productPropeties: function(product_id) {
                if(product_id == undefined) return [];
                return [
                    {"id": 1, "name": "Settings", "sref": "property.settings", "iconClass": "ion-settings"},
                    {"id": 2, "name": "Inventory", "sref": "property.inventory", "iconClass": "ion-paintbucket"},
                    {"id": 3, "name": "Production Plan", "sref": "property.pp", "iconClass": "ion-ios-briefcase"},
                    {"id": 4, "name": "Sales Plan", "sref": "property.sp", "iconClass": "ion-cash"},
                    {"id": 5, "name": "WIP Beginning", "sref": "property.wb", "iconClass": "ion-calculator"},
                    {"id": 6, "name": "Direct Materials", "sref": "property.dm", "iconClass": "ion-ios-people"},
                    {"id": 7, "name": "Direct Labor", "sref": "property.dl", "iconClass": "ion-android-bus"},
                    {"id": 8, "name": "Variable Overhead", "sref": "property.vo", "iconClass": "ion-ios-cart"},
                    {"id": 9, "name": "Machine Hours", "sref": "property.mh", "iconClass": "ion-arrow-graph-down-right"},
                    {"id": 10, "name": "WIP Ending", "sref": "property.we", "iconClass": "ion-arrow-graph-down-right"},
                    {"id": 11, "name": "Mark Up", "sref": "property.mu", "iconClass": "ion-arrow-graph-down-right"},
                    {"id": 12, "name": "Report", "sref": "property.report", "iconClass": "ion-clipboard"}
                ]
            }
        }
    }]);
}());