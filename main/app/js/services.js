(function(){
    angular.module('costAnswer.services', []);
    angular.module('costAnswer.services').value('PROJECT_TYPES', {1: 'Forecast', 2: 'Actual', 3: 'Variance'});
    angular.module('costAnswer.services').value('CURRENCIES', [{charCode: 'USD', code: 840, name: 'US Dollars'}, {charCode: 'EUR', code: 978, name: 'Euro'}, {charCode: 'GBP', code: 826, name: 'Great Britain Pounds'}]);
    angular.module('costAnswer.services').value('MONTHES', [
        {number: 1, short: 'JAN', full: 'January'},
        {number: 2, short: 'FEB', full: 'February'}, 
        {number: 3, short: 'MAR', full: 'March'},
        {number: 4, short: 'APR', full: 'April'},
        {number: 5, short: 'MAY', full: 'May'},
        {number: 6, short: 'JUN', full: 'June'},
        {number: 7, short: 'JUL', full: 'July'},
        {number: 8, short: 'AUG', full: 'August'},
        {number: 9, short: 'SEP', full: 'September'},
        {number: 10, short: 'OCT', full: 'October'},
        {number: 11, short: 'NOV', full: 'November'},
        {number: 12, short: 'DEC', full: 'December'}
        ]);
    angular.module('costAnswer.services').value('MOH_ALLOCATION_BASE', [
        {"id": 1, "name": "Direct Labour"},
        {"id": 2, "name": "Labour Hours"},
        {"id": 3, "name": "Direct Materials"},
        {"id": 4, "name": "Prime Cost"},
        {"id": 5, "name": "Machine Hours"}
    ]);
    angular.module('costAnswer.services').value('MOH_CALCULATION_BASE', [
        {"id": 1, "name": "Predetermined Overhead Rate"},
        {"id": 2, "name": "Full Cost Applied"}
    ])
    angular.module('costAnswer.services').value('MOH_CATEGORY', [
        {"id": 1, "name": "Settings", "sref": "moh.settings", "iconClass": "ion-settings"},
        {"id": 2, "name": "Indirect Materials", "sref": "moh.im", "iconClass": "ion-paintbucket"},
        {"id": 3, "name": "Production managers salaries", "sref": "moh.pms", "iconClass": "ion-ios-briefcase"},
        {"id": 4, "name": "Production facilities insurance", "sref": "moh.pfi", "iconClass": "ion-cash"},
        {"id": 5, "name": "Production property taxes", "sref": "moh.ppt", "iconClass": "ion-calculator"},
        {"id": 6, "name": "Indirect labor", "sref": "moh.il", "iconClass": "ion-ios-people"},
        {"id": 7, "name": "Production machinery rent", "sref": "moh.pmr", "iconClass": "ion-android-bus"},
        {"id": 8, "name": "Production utilities and other overhead expences", "sref": "moh.puooe", "iconClass": "ion-ios-cart"},
        {"id": 9, "name": "Production facilities amortization", "sref": "moh.pfa", "iconClass": "ion-arrow-graph-down-right"},
        {"id": 10, "name": "Report", "sref": "moh.report", "iconClass": "ion-clipboard"}
    ]);
    angular.module('costAnswer.services').value('DATAINPUT_HEADER', [
        {"id": 1, "name": "Manufacturing Overhead", "sref": "moh"},
        {"id": 2, "name": "Standard Costing", "sref": "standard"},
        {"id": 3, "name": "Process Costing", "sref": "processCosting"},
        {"id": 4, "name": "Job Order Costing", "sref": "jobOrderCosting"}
    ]);
    angular.module('costAnswer.services').value('DATAINPUT_FOOTER', [
        {"id": 1, "name": "Clear", "sref": null},
        {"id": 2, "name": "Save", "sref": null},
        {"id": 3, "name": "Save As", "sref": null},
        {"id": 4, "name": "Project Report", "sref": "projectReport"}
    ]);
    angular.module('costAnswer.services').value('DATAINPUT_BUSINESS_PROFILE', [
        "Retail",
        "Wholesale",
        "Manufacturing",
        "Professional services",
        "Technology",
        "Other"
    ]);
    angular.module('costAnswer.services').factory('monthService', ['MONTHES', function(MONTHES) {
        var factory = {
            Month: function(number) {
                var number = parseInt(number);
                if( number == NaN || number < 1 || number > 12 ) {
                    return {};
                }
                if(typeof MONTHES[number-1] === 'undefined') {
                    return {};
                }
                return MONTHES[number-1];
            },
            AbsoluteMonth: function(month,start_month) {
                if(start_month == undefined || start_month < 1 || start_month > 12) {
                    start_month = 0;
                }
                else {
                    start_month = start_month - 1;
                }
                if(month == undefined || month < 1 || month > 12) {
                    month = 0;
                }
                else {
                    month = month - 1;
                }
                month = start_month + month;
                if(month > 11) {
                    month = month - 12;
                }
                return MONTHES[month];
            },
            AbsoluteMonthes: function(start_month) {
                var result = [];
                for(i=0; i < MONTHES.length; i++) {
                    result.push(factory.AbsoluteMonth(i+1, start_month));
                }
                return result;
            }
        }
        return factory;
    }]);
    angular.module('costAnswer.services').factory('currencyService', ['CURRENCIES', function(CURRENCIES) {
        return {
            getCurrency: function(code) {
                for(var i = 0; i < CURRENCIES.length; i++) {
                    if(code == CURRENCIES[i].code) return CURRENCIES[i];
                }
                return {}
            }
        }
    }]);
    angular.module('costAnswer.services').value('AUTH_PREFIX','http://www.acl.pp.ua:10101/auth');
}());