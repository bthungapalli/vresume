(function(){
	
	function mainController($rootScope,$scope,$state,roleService,mainFactory,$loading,myJobsService,$cookies,$location){
		$loading.start("main");
		$scope.currentView=".openings";
		$scope.currentView=".myJobs";
		 var searchObject = $location.search();
		 if(searchObject.id){
			 $rootScope.JSessionId=searchObject.id;
			$cookies.put("loginJSessionId", searchObject.id);
		 }
		 alert( searchObject.id );
		  var pageredirect = true;
		   if(pageredirect===true){
			$scope.value=function(userDetails){
				$scope.userDetails=userDetails;
				$scope.authorities=roleService.roleAuthorities($scope.userDetails.role);
				if($scope.userDetails.role===0){
					$state.go("main.openings");
				}
				else if($scope.userDetails.role===1 || $scope.userDetails.role===2 || $scope.userDetails.role===7 ){
					$state.go("main.myJobs");
				}else if ($scope.userDetails.role===8){
					$state.go("main.techJobs");
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
			var loginJSessionId=$cookies.get("loginJSessionId");
			$rootScope.JSessionId=loginJSessionId;
			mainFactory.checkUser().then(function(response){
				$rootScope.user=response.user;
				$rootScope.JSessionId=response.JSessionId;
				$cookies.put("loginJSessionId", response.JSessionId);
				$scope.value(response.user);
			}).catch(function(){
				
			});
		}else{
			$scope.value($rootScope.user);
		}
		
		$scope.logout=function(){
			$loading.start("main");
			$cookies.remove("loginJSessionId");
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
	
	mainController.$inject=['$rootScope','$scope','$state','roleService','mainFactory','$loading','myJobsService','$cookies','$location'];
	
	angular.module('vResume.login').controller("mainController",mainController);
	
})();