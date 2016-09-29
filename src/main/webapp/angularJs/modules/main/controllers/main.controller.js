(function(){
	
	function mainController($rootScope,$scope,$state,roleService){
		
		$scope.userDetails=$rootScope.user;
		
		$scope.authorities=roleService.roleAuthorities($scope.userDetails.role);
		
	};
	
	mainController.$inject=['$rootScope','$scope','$state','roleService'];
	
	angular.module('vResume.login').controller("mainController",mainController);
	
})();