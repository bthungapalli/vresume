(function(){
	
	function loginController($rootScope,$scope,$state,loginService,loginFactory){
		
		$state.go("login.loginTemplate");
		
		$scope.assignState=function(state){
			$rootScope.activeState=state;
		};
		
		$scope.assignState('login.loginTemplate');
		
		$scope.resetUserDetails=function(){
		$scope.userDetails={
				"emailId":"",
				"password":"",
				"confirmPassword":"",
				"role":0
		};
		};
		
		$scope.resetUserDetails();
		
		$scope.roles=loginService.getRoles();
		
		$scope.login=function(){
			loginFactory.submitLogin($scope.userDetails).then(function(response){
				$state.go("main");
			}).catch(function(error){
            	
            });
		};
		
		$scope.signup=function(){
			loginFactory.signup($scope.userDetails).then(function(response){
				$scope.resetUserDetails();
				$state.go("main");
			}).catch(function(error){
            	
            });
		};
		
	};
	
	loginController.$inject=['$rootScope','$scope','$state','loginService','loginFactory'];
	
	angular.module('vResume.login').controller("loginController",loginController);
	
})();