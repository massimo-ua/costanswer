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
                  var component = $localStorage.Project.moh.mohComponents[componentName];
                  var grid = [];
                  grid.push({"Property": componentPluralName ? componentPluralName : componentName});
                  switch(componentName) {
                      case "indirectMaterials":
                      case "productionFacilitiesInsurance":
                      case "productionPropertyTaxes":
                      case "productionMachineryRent":
                      case "productionUtilitiesAndOtherOverheadExpences":
                      case "productionFacilitiesAmortization":
                        var monthlySum = getMonthlySum(component);
                        for(var i=0;i<MONTHES.length;i++) {
                            grid[0][MONTHES[i]["short"]] = monthlySum.toFixed(2);
                        }
                      break;
                      case "productionManagersSalaries":
                      case "indirectLabor":
                        var monthlySums = getMonthlySum(component,'annualGrowthBased');
                        for(var i=0;i<MONTHES.length;i++) {
                            grid[0][MONTHES[i]["short"]] = monthlySums[i].toFixed(2);
                        }
                      break;
                  }
                grid.push(calculateMohTotal());
                for(var i=0;i<grid.length;i++) {
                        var total_sum = 0;
                        for(var component in grid[i]){
                            if(component != "Property") {
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
                        return {
                            enableSorting: false,
                            enableColumnMenu: false,
                            columnDefs: [
                                { name:'Property',minWidth: 150, pinnedLeft:true, enableColumnMenu: false },
                                { name:'JAN', minWidth: 100,  enableColumnMenu: false },
                                { name:'FEB', minWidth: 100, enableColumnMenu: false },
                                { name:'MAR', minWidth: 100, enableColumnMenu: false },
                                { name:'APR', minWidth: 100, enableColumnMenu: false },
                                { name:'MAY', minWidth: 100, enableColumnMenu: false },
                                { name:'JUN', minWidth: 100, enableColumnMenu: false },
                                { name:'JUL', minWidth: 100, enableColumnMenu: false },
                                { name:'AUG', minWidth: 100, enableColumnMenu: false },
                                { name:'SEP', minWidth: 100, enableColumnMenu: false },
                                { name:'OCT', minWidth: 100, enableColumnMenu: false },
                                { name:'NOV', minWidth: 100, enableColumnMenu: false },
                                { name:'DEC', minWidth: 100, enableColumnMenu: false },
                                { name:'Total', minWidth: 100, pinnedRight:true, enableColumnMenu: false },
                        ]
                        }
                    
                  }

              }
          }
          function calculateMohTotal() {
              var result = {};
              result.Property = "Total MOH";
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
                  result[MONTHES[m]["short"]] = sum.toFixed(2);
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
                            for(var i=0;i<dataObject.length;i++) {
                                if(m == 0) {
                                    tmp = dataObject[i].salary + dataObject[i].payrollTaxes;
                                } else {
                                    tmp = roundToTwo(prevSum[m-1][i] + prevSum[m-1][i]*(dataObject[i].annualGrowthRate/1200));
                                }
                                monthly_sum += parseFloat(tmp);
                                sum.push(parseFloat(tmp));  
                            }
                            prevSum.push(sum);
                            componentSums.push(monthly_sum);
                        }
                        return componentSums;
                default:
                    var monthlySum = 0;
                    for(var i=0;i<dataObject.length;i++) {
                        monthlySum += dataObject[i].costPerMonth;
                    }
                    return monthlySum;
              }
          }
            function roundToTwo(num) {    
                return +(Math.round(num + "e+2")  + "e-2");
            }

/*







                        
                            var sum = [];
                            for(var m=0;m<MONTHES.length;m++) {
                                var monthly_sum = 0;
                                if(m == 0) {
                                    monthly_sum = dataObject[i].salary + dataObject[i].payrollTaxes;
                                }
                                else {
                                    monthly_sum = (dataObject[i].salary + dataObject[i].payrollTaxes) + (sum[i-1]*(dataObject[i].annualGrowthRate/1200)).toFixed(2);
                                }
                                sum.push(monthly_sum);
                            }
                            componentSums.push(sum);
                        }
                        return {
                            "static": false,
                            "sum": componentSums
                        };
              }
          }  */
        }]);
}());