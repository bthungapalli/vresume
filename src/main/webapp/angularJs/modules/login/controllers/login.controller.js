(function(){
	
	function loginController($rootScope,$scope,$state,loginService,loginFactory,$cookies,$loading){
		
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
				"firstName":"",
				"lastName":"",
				"phone":"",
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
						$scope.loginMessageDetails.errorMessage.signup_emailId="Email Id already exist.";
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
				$loading.finish('login');
				return false;
			}
			return true;
		};
		
		$scope.login=function(){
			$loading.start('login');
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
				 $loading.finish('login');
			}).catch(function(error){
				$scope.loginMessageDetails.errorMessage.login="Either Email or Password is incorrect ";
				$loading.finish('login');
            });
		};
		
		$scope.signup=function(){
			$loading.start('login');
			if($scope.checkConfirmPassword()){
				$scope.resetMessages();
				loginFactory.signup($scope.userDetails).then(function(response){
					$scope.loginMessageDetails.successMessage.signup_emailId=response.success;
					$scope.resetUserDetails();
					$loading.finish('login');
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Something went wrong  please contact administrator";
					$loading.finish('login');
	            });
			}
		};
		
		$scope.defaultLogins=function(emailId,password) {
			$scope.userDetails.emailId=emailId;
			$scope.userDetails.password=password;
			$scope.login();			
		};
		
		
		$scope.forgotPassword=function(){
			$loading.start('login');
				loginFactory.forgotPassword($scope.userDetails).then(function(response){
					$scope.loginMessageDetails.successMessage.signup_emailId=response.success;
					$scope.resetUserDetails();
					$loading.finish('login');
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Something went wrong  please contact administrator";
					$loading.finish('login');
	            });
		};
		
		$scope.confirmationInstructions=function(){
			$loading.start('login');
				loginFactory.confirmationInstructions($scope.userDetails).then(function(response){
					$scope.loginMessageDetails.successMessage.signup_emailId=response.success;
					$scope.resetUserDetails();
					$loading.finish('login');
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Something went wrong  please contact administrator";
					$loading.finish('login');
	            });
		};
	};
	
	loginController.$inject=['$rootScope','$scope','$state','loginService','loginFactory','$cookies','$loading'];
	
	angular.module('vResume.login').controller("loginController",loginController);
	
})();