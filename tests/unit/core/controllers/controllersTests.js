describe("CostAnswer.Core StartCoreController Test\n", function() {
	var StartCoreController;
    beforeEach(function(){
        module('ui.router');
        module('ngStorage');
        module('satellizer');
        module('ngDialog');
        module('ngResource');
        module('costAnswer.services');
        module('costAnswer.core.controllers');
        module('costAnswer.auth.services');
        module('costAnswer.core.services');
        module(function($provide) {
            $provide.factory('authService', function() {
                this.isAuthenticated = jasmine.createSpy('isAuthenticated').and.callFake(function() {
                    return true;
                });
                return this;
            });
        });
    });
    it('StartCoreController should be created successfully', inject(function(
        $controller,
        $log,
        $state,
        $localStorage,
        authService,
        popupService) {
            StartCoreController = $controller('StartCoreController', {
                '$log': $log,
                '$state': $state,
                '$localStorage': $localStorage,
                'authService': authService,
                'popupService': popupService
            });
            expect(StartCoreController).toBeDefined();
    }));
    /*describe("StartCoreController unit testing", function() {
        it("StartCoreController should be created successfully", function() {
            expect(StartCoreController).toBeDefined();
        });
    });*/
    
    
    
    /*it('StartCoreController initialization test', inject(function(
        $controller,
        $log,
        $state,
        $localStorage,
        authService,
        popupService
        ){
            var $scope=$rootScope.$new();
            var controller = $controller('StartCoreController',{
                $scope:$scope,
                $log:$log,
                $state:$state,
                $localStorage:$localStorage,
                authService:authService,
                popupService:popupService
            });
            expect(controller).toBeDefined();
    }));



	var $controller;

	beforeEach(angular.mock.inject(function(_$controller_){
	  $controller = _$controller_;
	}));
    it('should have a StartCoreController controller', function() {
        var $scope = {};
        var controller = $controller('StartCoreController', { $scope: $scope });
        expect(controller).toBeDefined();
    });
    it("Always good test", function() {
        a = true;
        expect(a).toBe(true);
    });
    it("Always failed test", function() {
        a = true;
        expect(a).toBe(false);
    });*/
});