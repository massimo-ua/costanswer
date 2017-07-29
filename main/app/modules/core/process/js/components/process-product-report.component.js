(function(){
    'use strict';
    angular.module('costAnswer.core.process.components')
        .component('caProcessProductReport', {
            templateUrl: 'app/modules/core/process/views/report.html',
            controller: caProcessProductReportController
        });
    function caProcessProductReportController(
      $localStorage,
      entityService,
      $log,
      $stateParams,
      monthService,
      DataModel,
      PROJECT_TYPES,
      CurrencyService,
      EXPORT_PREFIX
    ) {
        var vm = this;
        vm.$onInit = function() {
          if($localStorage.uuid !== undefined) {
              vm.reportHeader = [];
              for(var i=0;i<5;i++) {
                  vm.reportHeader[i] = [];
              }
              DataModel.Project.uuid({ uuid: $localStorage.uuid })
                  .$promise
                      .then(function(response){
                          vm.reportHeader[0][0] = {name: "Company name", value: response.company_name};
                          CurrencyService.getCurrency(response.currency_id)
                              .then(function(currency){
                                  vm.reportHeader[1][0] = {name: "Currency", value: currency.charcode};
                              });
                          vm.reportHeader[4][0] = {name: "Time mode", value: PROJECT_TYPES[response.type_id]};
                          vm.reportHeader[2][0] = {name: "Year to begin", value: response.begin_year};
                          vm.reportHeader[3][0] = {name: "Month to begin", value: monthService.Month(response.begin_month).short};
                      });
              DataModel.Product.get({ id: $stateParams.id })
                  .$promise
                      .then(function(response){
                          vm.reportHeader[0][1] = {name: "Product/Service", value: response.name};
                          vm.reportHeader[1][1] = {name: "Meas. Unit", value: response.measurement_unit};
                          vm.reportHeader[2][1] = {name: "Division", value: response.division};
                          vm.reportHeader[3][1] = {name: "Order #", value: response.order_number};
                          vm.reportHeader[4][1] = {name: "Standard quantity per", value: standardService.quantityCalculationMethods(parseInt(response.quantity_calculation_method_id)).shortName };
                      })
                      .catch(function(error){
                          $log.debug(error);
                      });

          }
          if($stateParams.id !== undefined) {
              entityService.getTotalProductReport($stateParams.id)
              .then(function(response){
                  vm.report = response.data.reportdata;
                  vm.reportstyles = response.data.reportstyles;
              });
          }
        };
    }
    caProcessProductReportController.$inject = [
      '$localStorage',
      'entityService',
      '$log',
      '$stateParams',
      'monthService',
      'DataModel',
      'PROJECT_TYPES',
      'CurrencyService',
      'EXPORT_PREFIX'
  ];
}());
