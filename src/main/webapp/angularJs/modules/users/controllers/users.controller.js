(function(){
	
	function usersController($scope,usersFactory){
		
			usersFactory.fetchAllUsers().then(function(response){
					$scope.allUsers=response;
				}).catch(function(error){
	            });
			
	    $scope.activateUser=function(user,index){
			usersFactory.activateUser(user.email).then(function(response){
				$scope.allUsers[index].verification=true;
				}).catch(function(error){
	            });
		};
		
		$scope.deActivateUser=function(user,index){
			usersFactory.deActivateUser(user.email).then(function(response){
				$scope.allUsers[index].verification=false;
				}).catch(function(error){
	            });
		};
		
	};
	
	usersController.$inject=['$scope','usersFactory'];
	
	angular.module('vResume.users').controller("usersController",usersController);
	
})();