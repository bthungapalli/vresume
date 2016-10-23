(function(){
	
	function mySubmissionsController($rootScope,$scope,$state,mySubmissionsFactory,$loading,mySubmissionsService){
		$loading.start("main");
		mySubmissionsFactory.fetchMySubmissions($scope.userDetails.id).then(function(response){
			$scope.mySubmissions=response;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		
		$scope.getJobDetails=function(jobId,index){
			
			if(	$scope.mySubmissions[index].jobDetails===undefined){
				mySubmissionsFactory.getJobDetails(jobId).then(function(response){
					$scope.mySubmissions[index].jobDetails={};
					$scope.mySubmissions[index].jobDetails=response;
					$scope.mySubmissions[index].showDescription=true;
					$loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
			}else{
				$scope.mySubmissions[index].showDescription=!$scope.mySubmissions[index].showDescription;
			}
		};
		
        $scope.showResume=function(jobId,jobTitle){
        	mySubmissionsService.jobId=jobId;
        	mySubmissionsService.jobTitle=jobTitle;
        	$state.go("main.viewResume");
		};
		
	};
	
	mySubmissionsController.$inject=['$rootScope','$scope','$state','mySubmissionsFactory','$loading','mySubmissionsService'];
	
	angular.module('vResume.openings').controller("mySubmissionsController",mySubmissionsController);
	
})();