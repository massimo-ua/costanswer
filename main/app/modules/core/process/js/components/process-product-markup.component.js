(function(){
	'use strict';
	angular.module('costAnswer.core.process.components')
		.component('caProcessProductMarkup', {
			templateUrl: 'app/modules/core/process/views/product-markup.html',
			controller: caProcessProductMarkup
});
function caProcessProductMarkup($localStorage, $stateParams, DataModel, monthService, standardService, $log){
	var vm = this;
	vm.$onInit = function() {
			vm.year_number = 1;
			vm.month_number = 0;
			vm.form = {};
			vm.updateMode = false;
			vm.reportId = 'markup';
			vm.controls = {
					buttonText: "Save",
					formDisabled: false,
					//aMain: "Mark Up",
					aPlaceholder: "%",
					aErrorText: "Please, fill in mark up rate",
					bMain: "VAT (non-US companies)",
					bPlaceholder: "%",
					bErrorText: "Please, fill in VAT rate"
			};
			if($localStorage.uuid !== undefined) {
					DataModel.Project.uuid({ uuid: $localStorage.uuid })
							.$promise
									.then(function(response){
											vm.project = response;
											vm.controls.monthes = monthService.AbsoluteMonthes(response.begin_month);
									});
			}
			if($stateParams.id !== undefined) {
					DataModel.Product.getMarkUp({ id: $stateParams.id })
							.$promise
									.then(function(response){
											vm.form = standardService.MUFCParamsConverter(response);
											if(response.id != undefined) {
													vm.controls.buttonText = "Update";
													vm.updateMode = true;
											}
									});
			}
			refreshReport();
	}
	function refreshReport() {
			if($stateParams.id) {
					standardService.getInstantReport($stateParams.id, vm.reportId, function(response){
							vm.instantReport = response;
					});
			}
			return;
	}
	vm.onSave = function(form) {
			vm.controls.buttonText = vm.updateMode ? "Updating..." : "Saving...";
			vm.controls.formDisabled = true;
			var payload = standardService.MUFCPayloadConverter(vm.year_number, form);
			DataModel.Product.saveMarkUp({ id: $stateParams.id }, payload)
					.$promise
							.then(function(){
									vm.updateMode = true;
									refreshReport();
							})
							.finally(function(){
									vm.controls.buttonText = vm.updateMode ? "Update" : "Save";
									vm.controls.formDisabled = false;
							});
	}
}
caProcessProductMarkup.$inject = ['$localStorage', '$stateParams', 'DataModel', 'monthService', 'standardService', '$log'];
})();
