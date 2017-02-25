(function(){
    'use restrict'
    angular.module('costAnswer.core.moh.services', [])
        .factory('mohService',[
            '$localStorage',
            '$http',
            'MONTHES',
            'API_PREFIX',
            'DataModel',
            'MOH_ALLOCATION_BASE',
            'MOH_CALCULATION_BASE',
            function(
                $localStorage,
                $http,
                MONTHES,
                API_PREFIX,
                DataModel,
                MOH_ALLOCATION_BASE,
                MOH_CALCULATION_BASE
                ){
          return {
              getTotalMohReport: function(uuid){
                //uuid = 'ac34501b-7abb-11e6-a3d8-021001c1a794';
                var config = {
                    method: 'GET',
                    url: API_PREFIX + '/report/moh/total/'+uuid
                }
                return $http(config);
              },
              getInstantMohReport: function(uuid, component, callback){
                //uuid = 'ac34501b-7abb-11e6-a3d8-021001c1a794';
                var config = {
                    method: 'GET',
                    url: API_PREFIX + '/report/moh/instant/'+uuid+'/'+convertReportSectionName(component)
                }
                $http(config).then(function(response){
                    callback(response.data);
                });
              },
              getAllocationBase: function(id) {
                for(var i = 0; i < MOH_ALLOCATION_BASE.length; i++) {
                    if(id == MOH_ALLOCATION_BASE[i].id) return MOH_ALLOCATION_BASE[i];
                }
                return {}
              },
              getCalculationBase: function(id) {
                for(var i = 0; i < MOH_CALCULATION_BASE.length; i++) {
                    if(id == MOH_CALCULATION_BASE[i].id) return MOH_CALCULATION_BASE[i];
                }
                return {}
              },
              parseMohResponse: function(response, mode) {
                  switch(mode){
                      case "fc-predeterm-rate":
                        return [];
                      case "ac-full-cost":
                        return [];
                      case "fc-full-cost":
                        var result = [];
                        for(var i=0; i<response.length; i++){
                            var chunk = {};
                            chunk.id = response[i].id;
                            chunk.name = response[i].name;
                            if(response[i].params[0].id) {
                                chunk.param_id = parseInt(response[i].params[0].id);
                            }
                            if(response[i].params[0].cost_per_month) {
                                chunk.cost_per_month = parseInt(response[i].params[0].cost_per_month)/100;
                            }
                            if(response[i].params[0].salary) {
                                chunk.salary = parseInt(response[i].params[0].salary)/100;
                            }
                            if(response[i].params[0].annual_growth) {
                                chunk.annual_growth = parseFloat(response[i].params[0].annual_growth)*100;
                            }
                            if(response[i].params[0].payroll_tax) {
                                chunk.payroll_tax = parseInt(response[i].params[0].payroll_tax)/100;
                            }
                            result.push(chunk);
                        }
                        return result;
                  }
              },
              onSave: function(mohId, componentName, year_number, month_number, newItem, callback) {
                    if(mohId != undefined) {
                        var component = new DataModel.Moh();
                        component.name = newItem.name;
                        component.$addMohComponent({ moh_id: mohId, component: componentName }, function(response){
                            newItem.id = response.id;
                            var param = new DataModel.Moh();
                            if(typeof newItem.cost_per_month !== 'undefined') {
                                newItem.cost_per_month = roundToTwo(newItem.cost_per_month);
                                param.cost_per_month = Math.round(newItem.cost_per_month * 100);
                            }
                            if(typeof newItem.salary !== 'undefined') {
                                newItem.salary = roundToTwo(newItem.salary);
                                param.salary = Math.round(newItem.salary * 100);
                            }
                            if(typeof newItem.payroll_tax !== 'undefined') {
                                newItem.payroll_tax = roundToTwo(newItem.payroll_tax);
                                param.payroll_tax = Math.round(newItem.payroll_tax * 100);
                            }
                            if(typeof newItem.annual_growth !== 'undefined') {
                                newItem.annual_growth = roundToTwo(newItem.annual_growth);
                                param.annual_growth = newItem.annual_growth / 100;
                            }
                            param.year_number = year_number;
                            param.month_number = month_number;
                            param.$addComponentParam({ component: componentName, component_id: response.id }, function(response){ 
                                newItem.param_id = response.id;
                                callback(newItem);
                            });
                        });
                    } else {
                        return;
                    }
            },
            onUpdate: function(componentName, item, callback) {
                var component = new DataModel.Moh();
                component.name = item.name;
                component.$updateMohComponent({ id: item.id, component: componentName }, function(response){
                    var param = new DataModel.Moh();
                    if(typeof item.cost_per_month !== 'undefined') {
                        item.cost_per_month = roundToTwo(item.cost_per_month);
                        param.cost_per_month = Math.round(item.cost_per_month * 100);
                    }
                    if(typeof item.salary !== 'undefined') {
                        item.salary = roundToTwo(item.salary);
                        param.salary = Math.round(item.salary * 100);
                    }
                    if(typeof item.payroll_tax !== 'undefined') {
                        item.payroll_tax = roundToTwo(item.payroll_tax);
                        param.payroll_tax = Math.round(item.payroll_tax * 100);
                    }
                    if(typeof item.annual_growth !== 'undefined') {
                        item.annual_growth = roundToTwo(item.annual_growth);
                        param.annual_growth = item.annual_growth / 100;
                    }
                    param.$updateComponentParam({ component: componentName, id: item.param_id }, function(response){
                        callback();
                    });
                }); 
            },
            onDelete: function(componentName, item, callback) {
                DataModel.Moh.deleteMohComponent({ id: item.id, component: componentName }, function(response){
                    callback();
                });
            },
              getInstanceResult: function(componentName, componentPluralName) {
                  /*
                  *Return array that represents instance report for MOH component
                  *first row represents current component sums
                  *second row represents total amount calculated on MOH data
                  */
                  try {
                      var component = $localStorage.Project.moh.mohComponents[componentName];
                  } catch(err) {
                      return;
                  }
                  var grid = [];
                  grid.push({"Section": componentPluralName ? componentPluralName : componentName});
                  switch(componentName) {
                      case "indirectMaterials":
                      case "productionFacilitiesInsurance":
                      case "productionPropertyTaxes":
                      case "productionMachineryRent":
                      case "productionUtilitiesAndOtherOverheadExpences":
                      case "productionFacilitiesAmortization":
                        var monthlySum = getMonthlySum(component);
                        for(var i=0;i<MONTHES.length;i++) {
                            grid[0][getAbsoluteMonth(i)["short"]] = monthlySum.toFixed(2);
                        }
                      break;
                      case "productionManagersSalaries":
                      case "indirectLabor":
                        var monthlySums = getMonthlySum(component,'annualGrowthBased');
                        for(var i=0;i<MONTHES.length;i++) {
                            grid[0][getAbsoluteMonth(i)["short"]] = monthlySums[i].toFixed(2);
                        }
                      break;
                  }
                grid.push(calculateMohTotal());
                for(var i=0;i<grid.length;i++) {
                        var total_sum = 0;
                        for(var component in grid[i]){
                            if(component != "Section") {
                                total_sum += parseFloat(grid[i][component]);
                            }
                        }
                        grid[i]["Total"] = total_sum.toFixed(2);
                    }
                return grid;
              },
              getGridOptions: function(type) {
                  switch(type) {
                      case "ICR":
                        var columnDefs = [{ name:'Section',minWidth: 150, pinnedLeft:true, enableColumnMenu: false }];
                        for(var i=0;i<MONTHES.length;i++) {
                            columnDefs.push({ name: getAbsoluteMonth(i)["short"], minWidth: 100,  enableColumnMenu: false });
                        }
                        columnDefs.push({ name:'Total', minWidth: 100, pinnedRight:true, enableColumnMenu: false });
                        return {
                            enableSorting: false,
                            enableColumnMenu: false,
                            columnDefs: columnDefs
                        }
                    
                  }

              },
              roundToTwo: function(num) {    
                return +(Math.round(num + "e+2")  + "e-2");
            }
          }
          function calculateMohTotal() {
              var result = {};
              result.Section = "Total MOH";
              var values = [];
              for(var component in $localStorage.Project.moh.mohComponents) {
                  switch(component) {
                      case "indirectMaterials":
                      case "productionFacilitiesInsurance":
                      case "productionPropertyTaxes":
                      case "productionMachineryRent":
                      case "productionUtilitiesAndOtherOverheadExpences":
                      case "productionFacilitiesAmortization":
                        var components = $localStorage.Project.moh.mohComponents[component];
                        var sum = getMonthlySum(components);
                        values.push({ "static": true, "sum": sum });
                      break;
                      case "productionManagersSalaries":
                      case "indirectLabor":
                        var components = $localStorage.Project.moh.mohComponents[component];
                        values.push({"static": false, "sum": getMonthlySum(components,'annualGrowthBased')});
                      break;
                  }
              }
              for(var m=0;m<MONTHES.length;m++) {
                  var sum = 0;
                  for(var i=0;i<values.length;i++) {
                      sum += (values[i].static) ? values[i].sum : values[i]["sum"][m];
                  }
                  result[getAbsoluteMonth(m)["short"]] = sum.toFixed(2);
              }
              return result;
          }
          function getMonthlySum(dataObject, type) {
              switch(type) {
                  case "annualGrowthBased":
                        var componentSums = [];
                        var prevSum = [];
                        for(var m=0;m<MONTHES.length;m++) {
                            var sum = [];
                            var tmp = 0;
                            var monthly_sum = 0;
                            if(dataObject != undefined) {
                                for(var i=0;i<dataObject.length;i++) {
                                    if(m == 0) {
                                        tmp = dataObject[i].salary + dataObject[i].payrollTaxes;
                                    } else {
                                        tmp = roundToTwo(prevSum[m-1][i] + prevSum[m-1][i]*(dataObject[i].annualGrowthRate/1200));
                                    }
                                    monthly_sum += parseFloat(tmp);
                                    sum.push(parseFloat(tmp));  
                                }
                            }
                            prevSum.push(sum);
                            componentSums.push(monthly_sum);
                        }
                        return componentSums;
                default:
                    var monthlySum = 0;
                    if(dataObject != undefined) {
                        for(var i=0;i<dataObject.length;i++) {
                            monthlySum += dataObject[i].costPerMonth;
                        }
                    }
                    return monthlySum;
              }
          }
            function roundToTwo(num) {    
                return +(Math.round(num + "e+2")  + "e-2");
            }
            function getAbsoluteMonth(month) {
                try {
                    var startMonth = ($localStorage.Project.settings.globals.monthToBegin.number) ? $localStorage.Project.settings.globals.monthToBegin.number-1 : 0;
                } catch(err) {
                    var startMonth = 0;
                }
                var month = startMonth + month;
                if(month > 11) {
                    month = month - 12;
                }
                return MONTHES[month];
            }
            function convertReportSectionName(code) {
                switch(code) {
                    case "im":
                        return "indirect_material";
                    case "il":
                        return "indirect_labor";
                    case "pms":
                        return "production_manager_salary";
                    case "pfi":
                        return "production_facilities_insurance";
                    case "pfa":
                        return "production_facilities_amortization";
                    case "pmr":
                        return "production_machinery_rent";
                    case "ppt":
                        return "production_property_tax";
                    case "puaooe":
                        return "production_utilities_and_other_overhead_expence";
                    default:
                        return "";
                }
            }
        }]);
}());