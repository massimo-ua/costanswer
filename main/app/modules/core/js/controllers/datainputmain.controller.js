(function(){
    'use strict';
    function ProjectDataInputMainController(toastr, $localStorage, PROJECT_TYPES, DATAINPUT_HEADER, $state){
        var vm = this;
        function init() {
            vm.projectType = PROJECT_TYPES[$localStorage.type];
            vm.datainput_header = DATAINPUT_HEADER;
        }
        init();
        vm.clearAll = function() {
            $localStorage.$reset();
            $state.go('startCore');
        };
    }
    ProjectDataInputMainController.$inject = ['toastr', '$localStorage', 'PROJECT_TYPES', 'DATAINPUT_HEADER', '$state'];
    angular.module('costAnswer.core.controllers')
        .controller('ProjectDataInputMainController', ProjectDataInputMainController);
}());