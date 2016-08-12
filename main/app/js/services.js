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
}());