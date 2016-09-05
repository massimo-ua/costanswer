(function(){
    'use restrict'
    angular.module('costAnswer.core.moh.services', [])
        .factory('mohService',['$localStorage','MONTHES', function($localStorage, MONTHES){
          return {
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
                var startMonth = ($localStorage.Project.settings.globals.monthToBegin.number) ? $localStorage.Project.settings.globals.monthToBegin.number-1 : 0;
                var month = startMonth + month;
                if(month > 11) {
                    month = month - 12;
                }
                return MONTHES[month];
            }
        }]);
}());