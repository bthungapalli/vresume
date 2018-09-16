(function(){
	
	function techJobsController($scope,myJobsFactory,$state,myJobsService,$loading){
		
		$scope.fetchTechJobs=function(){
			$loading.start("main");
			myJobsFactory.fetchTechJobs().then(function(response){
				$scope.myJobs=response;
				$scope.status=status;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
			$scope.status=status;
		};
		
		$scope.fetchTechJobs();

		$scope.viewSubmissions=function(job){
			myJobsService.viewTechSubmissionJob=job;
			$state.go('main.viewTechSubmission');
		};
	};
	
	techJobsController.$inject=['$scope','myJobsFactory','$state','myJobsService','$loading'];
	
	angular.module('vResume.myJobs').controller("techJobsController",techJobsController);
	
})();