(function(){
	
	function newUserController($scope,loginFactory,loginService){
		
		$scope.roles=loginService.getRoles();
		
		$scope.resetUserDetails=function() {
			$scope.userDetails = {
				"emailId" : "",
				"password" : "",
				"role" : 0
			};
		};
		
		$scope.resetMessages=function() {
			$scope.loginMessageDetails = {
				"errorMessage" : {
					"signup_emailId" : ""
				},
				"successMessage" : {
					"signup_emailId" : ""
				}
			};
		};
		 
		$scope.resetUserDetails();
		$scope.resetMessages();
		
		$scope.checkEmailAvailable=function(){
			if($scope.userDetails.emailId!==''){
				$scope.loginMessageDetails.errorMessage.signup_emailId="";
				loginFactory.checkEmailAvailable($scope.userDetails.emailId).then(function(response){
					if(response[0]==='alreadyExist'){
						$scope.loginMessageDetails.errorMessage.signup_emailId="Email already exist.";
					}else{
						$scope.resetMessages();
					}
				}).catch(function(error){
	            });
			}
		};
		
		$scope.signup=function(){
				$scope.resetMessages();
				loginFactory.signup($scope.userDetails).then(function(response){
					$scope.loginMessageDetails.successMessage.signup_emailId="New User Created";
					$scope.resetUserDetails();
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Something went wrong  please contact administrator";
	            });
		};
	};
	
	newUserController.$inject=['$scope','loginFactory','loginService'];
	
	angular.module('vResume.login').controller("newUserController",newUserController);
	
})();