(function(){
	
	function contactUsController($rootScope,$scope,$state,loginService,loginFactory,$cookies,$loading,$location,LOGIN_CONSTANTS){
		
		$scope.successMessage="";
		$scope.failureMessage="";
		
		$scope.resetUserDetails=function() {
			$scope.userDetails = {
				"name":"",
				"businessName":"",
				"website":"",
				"emailId" : "",
				"contactNumber" : "",
				"country" : ""
			};
		};

		$scope.resetUserDetails();
		
		$scope.contactUs=function(){
			$loading.start('contactUs');
			$scope.successMessage="";
			$scope.failureMessage="";
			loginFactory.submitContactUs($scope.userDetails).then(function(response){
				$scope.successMessage="Mail Sent Successfully";
				 $loading.finish('contactUs');
			}).catch(function(error){
				$scope.failureMessage="Something Went Wrong";
				$loading.finish('contactUs');
            });
		};
		
	};
	
	contactUsController.$inject=['$rootScope','$scope','$state','loginService','loginFactory','$cookies','$loading','$location','LOGIN_CONSTANTS'];
	
	angular.module('vResume.login').controller("contactUsController",contactUsController);
	
})();