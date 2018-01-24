(function(){
	
	function mainController($rootScope,$scope,$state,roleService,mainFactory,$loading,myJobsService){
		$loading.start("main");
		$scope.currentView=".openings";
		$scope.currentView=".myJobs";
		
		  var pageredirect = true;
		   if(pageredirect===true){
			$scope.value=function(userDetails){
				$scope.userDetails=userDetails;
				$scope.authorities=roleService.roleAuthorities($scope.userDetails.role);
				if($scope.userDetails.role===0){
					$state.go("main.openings");
				}
				else if($scope.userDetails.role===1 || $scope.userDetails.role===2 ){
					$state.go("main.myJobs");
				}
				$loading.finish("main");	
			};
	     }
		else{
			$scope.currentView=".profile";
			$scope.value=function(userDetails){
				$scope.userDetails=userDetails;
				$state.go("main.profile");
				$scope.authorities=roleService.roleAuthorities($scope.userDetails.role);
				$loading.finish("main");
			};
		}
		
		
		if($rootScope.user===undefined){
			mainFactory.checkUser().then(function(response){
				$rootScope.user=response.user;
				$scope.value(response.user);
			}).catch(function(){
				
			});
		}else{
			$scope.value($rootScope.user);
		}
		
		$scope.logout=function(){
			$loading.start("main");
			mainFactory.logout();
		};
		
		$scope.setSideBarActive=function(view){
			if(view===".postJob"){
				myJobsService.editJob=null;
			}
			$scope.currentView=view;
		};
		
		$scope.$on('sideBarViewEvent', function(event, data) {
			$scope.currentView=data;
		});
		
	};
	
	mainController.$inject=['$rootScope','$scope','$state','roleService','mainFactory','$loading','myJobsService'];
	
	angular.module('vResume.login').controller("mainController",mainController);
	
})();