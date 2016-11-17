(function(){
	
	function usersController($scope,usersFactory,$loading){
		$scope.fetchAllUsers=function(){
	    	$loading.start("main");
	    	usersFactory.fetchAllUsers().then(function(response){
				$scope.allUsers=response;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
            });
		};
		$scope.fetchAllUsers();
			
	    $scope.activateUser=function(user,index){
	    	$loading.start("main");
			usersFactory.activateUser(user.email).then(function(response){
				$scope.allUsers[index].verification=true;
				$scope.fetchAllUsers();
				}).catch(function(){
					$loading.finish("main");
	            });
		};
		
		$scope.deActivateUser=function(user,index){
			$loading.start("main");
			usersFactory.deActivateUser(user.email).then(function(response){
				$scope.allUsers[index].verification=false;
				$scope.fetchAllUsers();
				}).catch(function(){
					$loading.finish("main");
	            });
		};
		
	};
	
	usersController.$inject=['$scope','usersFactory','$loading'];
	
	angular.module('vResume.users').controller("usersController",usersController);
	
})();