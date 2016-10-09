(function(){
	
	function registrationConfirmationController($scope,$state,loginFactory,$location){
				loginFactory.registrationConfirmation($location.search().token).then(function(response){
					if(response.success!==undefined){
						$scope.success=response.success;
					}else{
						$scope.error=response.error;
					}
				}).catch(function(error){
					
	            });
		
	};
	
	registrationConfirmationController.$inject=['$scope','$state','loginFactory','$location'];
	
	angular.module('vResume.login').controller("registrationConfirmationController",registrationConfirmationController);
	
})();