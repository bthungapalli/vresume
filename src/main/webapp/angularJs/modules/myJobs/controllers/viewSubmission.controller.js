(function(){
	
	function viewSubmissionController($scope,viewSubmissionFactory,$state,myJobsService,$loading){
		$scope.status='new';
		var job= myJobsService.viewSubmissionJob;
		
			$loading.start("main");
			viewSubmissionFactory.fetchUsersSubmissions(job.id).then(function(response){
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		
			
			$scope.fetchSubmissions=function(status){
				$scope.status=status;
			};
	};
	
	viewSubmissionController.$inject=['$scope','viewSubmissionFactory','$state','myJobsService','$loading'];
	
	angular.module('vResume.myJobs').controller("viewSubmissionController",viewSubmissionController);
	
})();