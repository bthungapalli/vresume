(function(){
	
	function viewSubmissionController($scope,viewSubmissionFactory,$state,myJobsService,$loading){
		$loading.start("main");
		$scope.status='NEW';
		$scope.job= myJobsService.viewSubmissionJob;
		$scope.activeUser=0;
		$scope.activeSection=0;
		$scope.sectionRating=[];
		
		$scope.initializeStatusCount=function(){
			$scope.statuses={
					"NEW":0,
					"SUBMITTEDTOHM":0,
					"UNDECIDED":0,
					"PROCESSING":0,
					"HIRED":0,
					"REJECTED":0
				};
		};
		
		$scope.initializeStatusCount();
			
		$scope.statusCount=function(statusCounts){
			angular.forEach(statusCounts,function(statusObj){
				$scope.statuses[statusObj.status]=$scope.statuses[statusObj.status]+statusObj.count;
			});
		};
			
			$scope.fetchUsersSubmissionsForStatus=function(){
				$loading.start("main");
				viewSubmissionFactory.fetchUsersSubmissions($scope.job.id,$scope.status).then(function(response){
					$scope.viewSubmission=response;

					$scope.initializeStatusCount();
					$scope.statusCount($scope.viewSubmission.statusCounts);
					$loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
			};
			
			$scope.fetchUsersSubmissionsForStatus();
			
			
		
			$scope.changeSection=function(index){
				$loading.start("main");
				$scope.activeSection=index;
				 var myVideo = document.getElementsByTagName('video')[0];
				 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
				$loading.finish("main");
			};
			
			$scope.fetchSubmissions=function(status){
				$scope.status=status;
				$scope.fetchUsersSubmissionsForStatus();
			};
			
			$scope.getSubmissionsForUser=function(user,index){
				$loading.start("main");
				viewSubmissionFactory.getSubmissionsForUser($scope.job.id,user.userId,$scope.status).then(function(response){
					$scope.viewSubmission.submmision=response;
				 var myVideo = document.getElementsByTagName('video')[0];
				 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
				$scope.sectionRating=[];
				$scope.activeUser=index;
					$loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
				
			
				
			};
	};
	
	viewSubmissionController.$inject=['$scope','viewSubmissionFactory','$state','myJobsService','$loading'];
	
	angular.module('vResume.myJobs').controller("viewSubmissionController",viewSubmissionController);
	
})();