(function(){
	
	function loginController($rootScope,$scope,$state,loginService,loginFactory,$cookies){
		
		$state.go("login.loginTemplate");
		$scope.rememberMe=false;
		
		$scope.assignState=function(state){
			$rootScope.activeState=state;
		};
		
		$scope.rememberMe1=function(){
			$scope.rememberMe=!$scope.rememberMe;
		};
		
		$scope.assignState('login.loginTemplate');
		
		$scope.resetUserDetails=function() {
			$scope.userDetails = {
				"emailId" : "",
				"password" : "",
				"confirmPassword" : "",
				"role" : 0
			};
		};
		
		$scope.resetMessages=function() {
			
			$scope.loginMessageDetails = {
				"errorMessage" : {
					"login" : "",
					"signup_emailId" : "",
					"signup_confirmPassword":""
				},
				"successMessage" : {
					"login" : "",
					"signup_emailId" : "",
					"signup_confirmPassword":""
				}
			};
		};
		
     $scope.checkForRememberMe=function() {
    	 var emailId=$cookies.get("emailId");
 		if(emailId!==undefined){
 			$scope.userDetails.emailId=emailId;
 			$scope.rememberMe=true;
 		}
		
		};
		 
		$scope.resetUserDetails();
		$scope.resetMessages();
		$scope.checkForRememberMe();
		
		$scope.roles=loginService.getRoles();
		
		
		$scope.checkEmailAvailable=function(){
			$scope.loginMessageDetails.errorMessage.signup_emailId="";
			if($scope.userDetails.emailId!==""){
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
		
		$scope.checkConfirmPassword=function(){
			$scope.loginMessageDetails.errorMessage.signup_confirmPassword="";
			if($scope.userDetails.password!==$scope.userDetails.confirmPassword){
				$scope.loginMessageDetails.errorMessage.signup_confirmPassword="Password and Confirm Password din't match";
				return false;
			}
			return true;
		};
		
		$scope.login=function(){
			$scope.resetMessages();
			loginFactory.submitLogin($scope.userDetails).then(function(response){
				if(response.user===undefined){
					$scope.loginMessageDetails.errorMessage.login=response[0];
				}else{
					if($scope.rememberMe){
						$cookies.put("emailId", $scope.userDetails.emailId);
					}else{
						$cookies.remove("emailId");
					}
					$rootScope.user=response.user;
					$state.go("main");
				}
			}).catch(function(error){
				$scope.loginMessageDetails.errorMessage.login="Either Email or Password is incorrect ";
            });
		};
		
		$scope.signup=function(){
			if($scope.checkConfirmPassword()){
				$scope.resetMessages();
				loginFactory.signup($scope.userDetails).then(function(response){
					$scope.loginMessageDetails.successMessage.signup_emailId=response.success;
					$scope.resetUserDetails();
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Something went wrong  please contact administrator";
	            });
			}
		};
		
	};
	
	loginController.$inject=['$rootScope','$scope','$state','loginService','loginFactory','$cookies'];
	
	angular.module('vResume.login').controller("loginController",loginController);
	
})();