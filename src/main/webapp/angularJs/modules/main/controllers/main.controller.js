(function(){
	
	function mainController($rootScope,$scope,$state,roleService,mainFactory){
		
		$scope.userDetails=$rootScope.user;
		
		$scope.authorities=roleService.roleAuthorities($scope.userDetails.role);
		
		$scope.logout=function(){
			mainFactory.logout();
		};
		
		$state.go("main.profile");
		
	};
	
	mainController.$inject=['$rootScope','$scope','$state','roleService','mainFactory'];
	
	angular.module('vResume.login').controller("mainController",mainController);
	
})();