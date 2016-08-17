(function(){
    angular.module('costAnswer.services', []);
    angular.module('costAnswer.services').value('PROJECT_TYPES', {1: 'Actual', 2: 'Forecast', 3: 'Variance'});
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
    angular.module('costAnswer.services').value('MOH_ALLOCATION', [
        {"id": 1, "name": "Direct Labour"},
        {"id": 2, "name": "Labour Hours"},
        {"id": 3, "name": "Direct Materials"},
        {"id": 4, "name": "Prime Cost"},
        {"id": 5, "name": "Machine Hours"}
    ]);
    angular.module('costAnswer.services').value('MOH_METHOD', [
        {"id": 1, "name": "Monthly Costs"},
        {"id": 2, "name": "Predetermined Overhead Rate"}
    ]);
    angular.module('costAnswer.services').value('MOH_CATEGORY', [
        {"id": 1, "name": "Settings", "sref": "moh.settings"},
        {"id": 2, "name": "Indirect Materials", "sref": "moh.im"},
        {"id": 3, "name": "Production managers salaries", "sref": "moh.pms"},
        {"id": 4, "name": "Production facilities insurance", "sref": "moh.pfi"},
        {"id": 5, "name": "Production property taxes", "sref": "moh.ppt"},
        {"id": 6, "name": "Indirect labour", "sref": "moh.il"},
        {"id": 7, "name": "Production machinery rent", "sref": "moh.pmr"},
        {"id": 8, "name": "Production utilities and other overhead expences", "sref": "moh.puooe"},
        {"id": 9, "name": "Production facilities amortization", "sref": "moh.pfa"}
    ]);
    angular.module('costAnswer.services').value('DATAINPUT_HEADER', [
        {"id": 1, "name": "Manufacturing Overhead", "sref": "moh"},
        {"id": 2, "name": "Standard Costing", "sref": "standardCosting"},
        {"id": 3, "name": "Process Costing", "sref": "processCosting"},
        {"id": 4, "name": "Job Order Costing", "sref": "jobOrderCosting"}
    ]);
    angular.module('costAnswer.services').value('DATAINPUT_FOOTER', [
        {"id": 1, "name": "Clear", "sref": null},
        {"id": 2, "name": "Save", "sref": null},
        {"id": 3, "name": "Save As", "sref": null},
        {"id": 4, "name": "Project Report", "sref": "projectReport"}
    ]);
}());