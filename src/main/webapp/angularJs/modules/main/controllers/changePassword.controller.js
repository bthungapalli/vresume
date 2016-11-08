(function(){
	
	function changePasswordController($rootScope,$scope,$state,roleService,mainFactory,$loading){
		$loading.start("main");
		$scope.changePassword={
				"password":"",
				"confirmPassword":""
		};
		$scope.error="";
		$scope.success="";
		
		$scope.changePassword=function(){
			$scope.error="";
			$scope.success="";
			if($scope.changePassword.password===$scope.changePassword.confirmPassword){
				
				mainFactory.changePassword($scope.changePassword.password).then(function(response){
					$scope.success="Password changed successfully";
				}).catch(function(error){
					$scope.error="Something went wrong";
				});
			}else{
				$scope.error="Passwords did not match";
			}
		};
		$loading.finish("main");
	};
	
	changePasswordController.$inject=['$rootScope','$scope','$state','roleService','mainFactory','$loading'];
	
	angular.module('vResume.login').controller("changePasswordController",changePasswordController);
	
})();