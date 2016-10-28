(function(){
    angular.module('costAnswer.core.standard.services',[]);
    angular.module('costAnswer.core.standard.services')
    .factory('standardService', ['$rootScope', '$localStorage', '$http', 'API_PREFIX', 'DataModel', function($rootScope, $localStorage, $http, API_PREFIX, DataModel){
        return {
            productsList: function(uuid) {
                var config = {
                    method: 'GET',
                    url: API_PREFIX + '/products/list/1/'+uuid
                }
                return $http(config);
            },
            productPropeties: function() {
                return [
                    {"id": 1, "name": "Product Settings", "sref": "property.settings", "iconClass": "ion-settings"},
                    {"id": 2, "name": "Inventory", "sref": "property.inventory", "iconClass": "ion-ios-home"},
                    {"id": 3, "name": "Production Plan", "sref": "property.pp", "iconClass": "ion-social-buffer"},
                    {"id": 4, "name": "Sales Plan", "sref": "property.sp", "iconClass": "ion-connection-bars"},
                    {"id": 5, "name": "WIP Beginning", "sref": "property.wb", "iconClass": "ion-ios-alarm-outline"},
                    {"id": 6, "name": "Direct Materials", "sref": "property.dm", "iconClass": "ion-paintbucket"},
                    {"id": 7, "name": "Direct Labor", "sref": "property.dl", "iconClass": "ion-ios-people"},
                    {"id": 8, "name": "Variable Overhead", "sref": "property.vo", "iconClass": "ion-ios-pie"},
                    {"id": 9, "name": "Machine Hours", "sref": "property.mh", "iconClass": "ion-ios-cog"},
                    {"id": 10, "name": "WIP Ending", "sref": "property.we", "iconClass": "ion-ios-alarm"},
                    {"id": 11, "name": "Mark Up", "sref": "property.mu", "iconClass": "ion-pricetags"},
                    {"id": 12, "name": "Report", "sref": "property.report", "iconClass": "ion-clipboard"}
                ]
            },
            DMList: function(product_id, callback) {
                if(!product_id) return;
                var list = [];
                DataModel.Product.getDirectMaterial({ id: product_id })
                    .$promise
                        .then(function(response){
                            for(var i=0; i<response.length; i++) {
                                list.push(DMParamsConverter(response[i]));
                            }
                        })
                        .finally(function(){
                            callback(list);
                        });
            },
            onDMSave: function(product_id, year_number, data, callback) {
                if(product_id && year_number) {
                    var payload = DMPayloadConverter(year_number, data);
                    DataModel.Product.saveDirectMaterial({ id: product_id }, payload)
                        .$promise
                            .then(function(response){
                                callback(DMParamsConverter(response));
                            })
                            .catch(function(){
                                callback(null);
                            });
                }
                return;
            },
            onDMUpdate: function(year_number, data, callback) {
                if(year_number) {
                    var payload = DMPayloadConverter(year_number, data);
                    DataModel.Product.updateDirectMaterial({ id: data.id }, payload)
                        .$promise
                            .then(function(response){
                                callback();
                            })
                            .catch(function(){
                                callback(null);
                            });
                }
                return;
            },
            onDMDelete: function(data, callback) {
                if(data && data.id) {
                    DataModel.Product.deleteDirectMaterial({ id: data.id })
                        .$promise
                            .then(function(response){
                                callback();
                            });
                }
                return;
            },
            DLList: function(product_id, callback) {
                if(!product_id) return;
                var list = [];
                DataModel.Product.getDirectLabor({ id: product_id })
                    .$promise
                        .then(function(response){
                            for(var i=0; i<response.length; i++) {
                                list.push(DLFCParamsConverter(response[i]));
                            }
                        })
                        .finally(function(){
                            callback(list);
                        });
            },
            onDLSave: function(product_id, year_number, data, callback) {
                if(product_id && year_number) {
                    var payload = DLFCPayloadConverter(year_number, data);
                    DataModel.Product.saveDirectLabor({ id: product_id }, payload)
                        .$promise
                            .then(function(response){
                                callback(DLFCParamsConverter(response));
                            });
                }
                return;
            },
            onDLUpdate: function(year_number, data, callback) {
                if(year_number) {
                    var payload = DLFCPayloadConverter(year_number, data);
                    DataModel.Product.updateDirectLabor({ id: data.id }, payload)
                        .$promise
                            .then(function(response){
                                callback();
                            });
                }
                return;
            },
            onDLDelete: function(data, callback) {
                if(data && data.id) {
                    DataModel.Product.deleteDirectLabor({ id: data.id })
                        .$promise
                            .then(function(response){
                                callback();
                            });
                }
                return;
            },
        }
        function DMParamsConverter(response) {
            var item = {};
            item.id = response.id;
            item.name = response.name;
            item.measurement_unit = response.measurement_unit;
            for(var i=0; i<response.params.length; i++) {
                if(response.params[i].material_beginning) {
                    item.material_beginning = response.params[i].material_beginning / 100;
                }
                if(response.params[i].batch_quantity_required) {
                    item.batch_quantity_required = response.params[i].batch_quantity_required / 100;
                }
                if(response.params[i].purchasing_price_per_unit) {
                    item.purchasing_price_per_unit = response.params[i].purchasing_price_per_unit / 100;
                }
                if(response.params[i].normal_waste) {
                    item.normal_waste = response.params[i].normal_waste * 100;
                }
                if(response.params[i].safety_stock && response.params[i].month_number > 0) {
                    if(item.safety_stock === undefined) {
                        item.safety_stock = {};
                    }
                    var month = +i - 1;
                    item.safety_stock[month] = {};
                    item.safety_stock[month].value = response.params[i].safety_stock * 100;
                }
                if(response.params[i].season_price_change_rate && response.params[i].month_number > 0) {
                    if(item.season_price_change_rate === undefined) {
                        item.season_price_change_rate = {};
                    }
                    var month = +i - 1;
                    item.season_price_change_rate[month] = {};
                    item.season_price_change_rate[month].value = response.params[i].season_price_change_rate * 100;
                }
            }
            return item;
        }
        function DMPayloadConverter(year_number, data) {
            var payload = {};
            payload.name = data.name;
            payload.measurement_unit = data.measurement_unit;
            payload.year_number = year_number;
            payload.data = {};
            payload.data[0] = {};
            payload.data[0].month_number = 0;
            payload.data[0].batch_quantity_required = Math.round(data.batch_quantity_required * 100);
            payload.data[0].purchasing_price_per_unit = Math.round(data.purchasing_price_per_unit * 100);
            payload.data[0].normal_waste = data.normal_waste / 100;
            payload.data[1] = {};
            payload.data[1].month_number = 1;
            payload.data[1].material_beginning = Math.round(data.material_beginning * 100);
            for(var i in data.season_price_change_rate) {
                var month = +i + 1;
                if(payload.data[month] === undefined) {
                    payload.data[month] = {};
                }
                payload.data[month].month_number = month;
                payload.data[month].season_price_change_rate = data.season_price_change_rate[i].value / 100;
            }
            payload.data[1].season_price_change_rate = 0;
            for(var i in data.safety_stock) {
                var month = +i + 1;
                if(payload.data[month] === undefined) {
                    payload.data[month] = {};
                }
                payload.data[month].month_number = month;
                payload.data[month].safety_stock = data.safety_stock[i].value / 100;
            }
            return payload;
        }
        function DLFCPayloadConverter(year_number, data) {
            var payload = {};
            payload.worker = data.worker;
            payload.year_number = year_number;
            payload.params = {};
            payload.params[0] = {};
            payload.params[0].month_number = 0;
            payload.params[0].hours_per_batch_required = Math.round(data.hours_per_batch_required * 100);
            payload.params[0].hourly_rate = Math.round(data.hourly_rate * 100);
            payload.params[0].payroll_taxes = Math.round(data.payroll_taxes * 100);
            payload.params[0].annual_growth_rate = data.annual_growth_rate / 100;
            return payload;
        }
        function DLFCParamsConverter(response){
            var item = {};
            item.id = response.id;
            item.worker = response.worker;
            if(response.params[0].hours_per_batch_required) {
                item.hours_per_batch_required = response.params[0].hours_per_batch_required / 100;
            }
            if(response.params[0].hourly_rate) {
                item.hourly_rate = response.params[0].hourly_rate / 100;
            }
            if(response.params[0].payroll_taxes) {
                item.payroll_taxes = response.params[0].payroll_taxes / 100;
            }
            if(response.params[0].annual_growth_rate) {
                item.annual_growth_rate = response.params[0].annual_growth_rate * 100;
            }
            return item;
        }
    }]);
}());