(function(){
	
	function viewResumeController($rootScope,$scope,$state,mySubmissionsFactory,$loading,mySubmissionsService){
		$loading.start("main");
		
		$scope.activeSection=0;
		$scope.title=mySubmissionsService.jobTitle;
		mySubmissionsFactory.getMySubmission(mySubmissionsService.jobId,$scope.userDetails.id).then(function(response){
			$scope.mySubmission=response;
			 var myVideo = document.getElementsByTagName('video')[0];
			 myVideo.src = $scope.mySubmission.sections[$scope.activeSection].videoPath;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		
		$scope.changeSection=function(index){
			$loading.start("main");
			$scope.error="";
			$scope.activeSection=index;
			 var myVideo = document.getElementsByTagName('video')[0];
			 myVideo.src = $scope.mySubmission.sections[$scope.activeSection].videoPath;
			$loading.finish("main");
		};
	
		
	};
	
	viewResumeController.$inject=['$rootScope','$scope','$state','mySubmissionsFactory','$loading','mySubmissionsService'];
	
	angular.module('vResume.openings').controller("viewResumeController",viewResumeController);
	
})();