(function(){
	
	function registrationConfirmationController($scope,$state,loginFactory,$location,$loading){
		        $loading.start('register');
				loginFactory.registrationConfirmation($location.search().token).then(function(response){
					if(response.success!==undefined){
						$scope.success=response.success;
					}
					$loading.finish('register');
				}).catch(function(error){
					$scope.error=error.failed;
					$loading.finish('register');
	            });
	};
	
	
	
	registrationConfirmationController.$inject=['$scope','$state','loginFactory','$location','$loading'];
	
	angular.module('vResume.login').controller("registrationConfirmationController",registrationConfirmationController);
	
})();