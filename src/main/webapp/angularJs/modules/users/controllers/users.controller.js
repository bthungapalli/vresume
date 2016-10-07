(function(){
	
	function usersController($scope,usersFactory){
		
		
		
		//$scope.fetchAllUsers=function(){
			usersFactory.fetchAllUsers().then(function(response){
					$scope.allUsers=response;
				}).catch(function(error){
	            });
		//};
		
	};
	
	usersController.$inject=['$scope','usersFactory'];
	
	angular.module('vResume.users').controller("usersController",usersController);
	
})();