(function(){
    angular.module('costAnswer.core.services', [
        'costAnswer.core.moh.services',
        'costAnswer.core.standard.services'
        ]);
    angular.module('costAnswer.core.services')
    .factory('DataModel', ['$resource', 'API_PREFIX', 'helperService', function($resource, API_PREFIX, helperService){
        return {
            Project: $resource(API_PREFIX+'/projects/:id', { id: '@_id' }, {
                update: { method: 'PUT' },
                uuid: {
                    method: 'GET',
                    params: { uuid: '@uuid' },
                    url: API_PREFIX+'/projects/uuid/:uuid'
                },
                setName: { 
                    method: 'PUT',
                    params: { uuid: '@uuid' },
                    url: API_PREFIX+'/projects/name/:uuid'
                },
                saveAs: { 
                    method: 'POST',
                    params: { uuid: '@uuid' },
                    url: API_PREFIX+'/projects/clone/:uuid'
                },
                delete: {
                    method: 'DELETE',
                    params: { uuid: '@uuid' },
                    url: API_PREFIX+'/projects/:uuid'
                }
            }),
            Process: $resource(API_PREFIX+'/processes/:id', { id: '@_id' }, {
                update: { method: 'PUT' },
                getWip: {
                    method: 'GET',
                    params: { id: '@id' },
                    url: API_PREFIX+'/processes/:id/wip'
                },
                saveWip: {
                    method: 'POST',
                    params: { id: '@id' },
                    url: API_PREFIX+'/processes/:id/wip'
                },
                productionPlan: {
                    method: 'GET',
                    params: { id: '@id' },
                    url: API_PREFIX+'/processes/:id/inventory',
                    transformResponse: processProductionPlanResponseConverter
                },
                saveProductionPlan: {
                    method: 'POST',
                    params: { id: '@id' },
                    url: API_PREFIX+'/processes/:id/inventory',
                    transformRequest: processProductionPlanRequestConverter
                },
                saveDirectMaterial: {
                    method: 'POST',
                    params: { id: '@id' },
                    url: API_PREFIX+'/processes/:id/directmaterial',
                    transformRequest: processDirectMaterialsRequestConverter
                },
                directMaterial: {
                    method: 'GET',
                    params: { id: '@id' },
                    url: API_PREFIX+'/processes/:id/directmaterial',
                    isArray: true,
                    transformResponse: processDirectMaterialsResponseConverter
                }

            }),
            Moh: $resource(API_PREFIX + '/moh/:id', {id: '@_id'}, {
                update: {method: 'PUT'},
                saveWithUuid: {
                    method: 'POST',
                    url: API_PREFIX + '/moh/uuid'
                },
                updateWithUuid: {
                    method: 'PUT',
                    url: API_PREFIX + '/moh/uuid'
                },
                getWithUuid: {
                    method: 'GET',
                    params: {uuid: '@uuid'},
                    url: API_PREFIX + '/moh/uuid/:uuid'
                },
                addMohComponent: {
                    method: 'POST',
                    params: {moh_id: '@moh_id', component: '@component'},
                    url: API_PREFIX + '/moh/:moh_id/:component'
                },
                updateMohComponent: {
                    method: 'PUT',
                    params: {id: '@id', component: '@component'},
                    url: API_PREFIX + '/:component/:id/'
                },
                deleteMohComponent: {
                    method: 'DELETE',
                    params: {id: '@id', component: '@component'},
                    url: API_PREFIX + '/:component/:id/'
                },
                addComponentParam: {
                    method: 'POST',
                    params: {component: '@component', component_id: '@component_id'},
                    url: API_PREFIX + '/:component/:component_id/params'
                },
                updateComponentParam: {
                    method: 'PUT',
                    params: {component: '@component', id: '@id'},
                    url: API_PREFIX + '/:component/:id/params'
                },
                getMohComponent: {
                    method: 'GET',
                    params: {id: '@id', component: '@component'},
                    url: API_PREFIX + '/:component/:id'
                },
                getMohComponents: {
                    method: 'GET',
                    params: {moh_id: '@moh_id', component: '@component'},
                    isArray: true,
                    url: API_PREFIX + '/moh/:moh_id/:component'
                }
            }),
            Product: $resource(API_PREFIX + '/products/:id', {id: '@_id'}, {
                update: {method: 'PUT'},
                saveWithUuid: {
                    method: 'POST',
                    url: API_PREFIX + '/products/uuid'
                },
                getInventory: {
                    method: 'GET',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/inventory'
                },
                saveInventory: {
                    method: 'POST',
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/inventory'
                },
                updateInventory: {
                    method: 'PUT',
                    params: {id: '@id'},
                    url: API_PREFIX + '/inventory/:id'
                },
                getWip: {
                    method: 'GET',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/wip'
                },
                saveWip: {
                    method: 'POST',
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/wip'
                },
                updateWip: {
                    method: 'PUT',
                    params: {id: '@id'},
                    url: API_PREFIX + '/wip/:id'
                },
                getMachineHours: {
                    method: 'GET',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/machinehours'
                },
                saveMachineHours: {
                    method: 'POST',
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/machinehours'
                },
                updateMachineHours: {
                    method: 'PUT',
                    params: {id: '@id'},
                    url: API_PREFIX + '/machinehours/:id'
                },
                getProductionPlan: {
                    method: 'GET',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/productionplan'
                },
                saveProductionPlan: {
                    method: 'POST',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/productionplan'
                },
                getSalesPlan: {
                    method: 'GET',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/salesplan'
                },
                saveSalesPlan: {
                    method: 'POST',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/salesplan'
                },
                getWipEnding: {
                    method: 'GET',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/wipending'
                },
                saveWipEnding: {
                    method: 'POST',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/wipending'
                },
                saveDirectMaterial: {
                    method: 'POST',
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/directmaterial'
                },
                getDirectMaterial: {
                    method: 'GET',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/directmaterial'
                },
                updateDirectMaterial: {
                    method: 'PUT',
                    params: {id: '@id'},
                    url: API_PREFIX + '/directmaterial/:id'
                },
                deleteDirectMaterial: {
                    method: 'DELETE',
                    params: {id: '@id'},
                    url: API_PREFIX + '/directmaterial/:id'
                },
                saveDirectLabor: {
                    method: 'POST',
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/directlabor'
                },
                getDirectLabor: {
                    method: 'GET',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/directlabor'
                },
                deleteDirectLabor: {
                    method: 'DELETE',
                    params: {id: '@id'},
                    url: API_PREFIX + '/directlabor/:id'
                },
                updateDirectLabor: {
                    method: 'PUT',
                    params: {id: '@id'},
                    url: API_PREFIX + '/directlabor/:id'
                },
                saveVariableOverhead: {
                    method: 'POST',
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/variableoverhead'
                },
                getVariableOverhead: {
                    method: 'GET',
                    isArray: true,
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/variableoverhead'
                },
                deleteVariableOverhead: {
                    method: 'DELETE',
                    params: {id: '@id'},
                    url: API_PREFIX + '/variableoverhead/:id'
                },
                updateVariableOverhead: {
                    method: 'PUT',
                    params: {id: '@id'},
                    url: API_PREFIX + '/variableoverhead/:id'
                },
                getMarkUp: {
                    method: 'GET',
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/markup'
                },
                saveMarkUp: {
                    method: 'POST',
                    params: {id: '@id'},
                    url: API_PREFIX + '/products/:id/markup'
                }
            }),
            Wip: $resource(API_PREFIX + '/wip/:id', {id: '@_id'}, {
                update: {method: 'PUT'}
            })
        };

        function processDirectMaterialsResponseConverter(response) {
            var data = JSON.parse(response);
            var models = [];
            for(var i = 0; i < data.length; i++) {
                models[i] = {};
                models[i].id = data[i].id;
                models[i].name = data[i].name;
                models[i].measurement_unit = data[i].measurement_unit;
                for(var y = 0; y < data[i].params.length; y++) {
                    models[i][y] = {};
                    if(y == 0) {
                        models[i].batch_quantity_required = helperService.unit2form(data[i].params[y].batch_quantity_required);
                        models[i].material_beginning = helperService.unit2form(data[i].params[y].material_beginning);
                        models[i].purchasing_price_per_unit = helperService.unit2form(data[i].params[y].purchasing_price_per_unit);
                        models[i].normal_waste = helperService.percent2form(data[i].params[y].normal_waste);
                    }
                    models[i][y].safety_stock = helperService.percent2form(data[i].params[y].safety_stock);
                    models[i][y].season_price_change_rate = helperService.percent2form(data[i].params[y].season_price_change_rate);
                }
                return models;
            }
        }
        function processDirectMaterialsRequestConverter(form) {
            var data = {};
            form = JSON.parse(angular.toJson(form));
            for(var k = 0; k < 12; k++) {
                data[k] = {};
                data[k].month_number = +k + 1;
                data[k].safety_stock = form[k].safety_stock / 100;
                data[k].season_price_change_rate = (form[k].season_price_change_rate || 0) / 100;
            }
            // create output object structure
            var dm = {};
            dm.year_number = form.year_number;
            dm.data = data;
            dm.data[0].batch_quantity_required = form.batch_quantity_required * 100;
            dm.data[0].material_beginning = form.material_beginning * 100;
            dm.measurement_unit = form.measurement_unit;
            dm.name = form.name;
            dm.data[0].normal_waste = form.normal_waste / 100;
            dm.data[0].purchasing_price_per_unit = form.purchasing_price_per_unit * 100;
            // serializing object before return
            return angular.toJson(dm);
        }

        function processProductionPlanRequestConverter(form) {
            // prepare data in correct format to meet backend requirements
            var data = {};
            form = JSON.parse(angular.toJson(form));
            for(var k in form.data) {
                data[k] = {};
                data[k].month_number = +k + 1;
                data[k].goods_started_in_production = Math.round(form.data[k].goods_started_in_production * 100);
                data[k].goods_transfered_out = Math.round(form.data[k].goods_transfered_out * 100);
            }
            // create output object structure
            var plan = {};
            plan.year_number = form.year_number;
            plan.data = data;
            // serializing object before return
            return angular.toJson(plan);
        }

        function processProductionPlanResponseConverter(response) {
            var data = JSON.parse(response);
            var model = {};
            for(var i = 0; i < data.length; i++) {
                model[i] = {};
                model[i]["goods_started_in_production"] = parseInt(data[i]["goods_started_in_production"]) / 100;
                model[i]["goods_transfered_out"] = parseInt(data[i]["goods_transfered_out"]) / 100;
            }
            return model;
        }
    }]);
}());