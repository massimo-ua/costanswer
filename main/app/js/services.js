(function(){
    angular.module('costAnswer.services', []);
    angular.module('costAnswer.services').value('PROJECT_TYPES', {1: 'Actual Project', 2: 'Forecast Project', 3: 'Variance Project'});
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
        {"id": 1, "name": "Indirect Materials"},
        {"id": 2, "name": "Production managers salaries"},
        {"id": 3, "name": "Production facilities insurance"},
        {"id": 4, "name": "Production property taxes"},
        {"id": 5, "name": "Indirect labour"},
        {"id": 6, "name": "Production machinery rent"},
        {"id": 7, "name": "Production utilities and other overhead expences"},
        {"id": 7, "name": "Production facilities amortization"}
    ]);
}());