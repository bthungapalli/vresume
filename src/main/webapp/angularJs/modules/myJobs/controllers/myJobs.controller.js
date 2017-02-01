(function(){
	
	function myJobsController($scope,myJobsFactory,$state,myJobsService,$loading){
		
		$scope.postJob=function(){
			myJobsService.editJob=null;
			$scope.$emit('sideBarViewEvent', ".postJob");
			$state.go('main.postJob');
		};
		
		$scope.fetchMyJobs=function(status){
			$loading.start("main");
			myJobsFactory.fetchMyJobs(status).then(function(response){
				$scope.myJobs=response;
				$scope.status=status;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
			$scope.status=status;
		};
		
		$scope.fetchMyJobs("active");

		$scope.changeStatus=function(status,job,index){
			$loading.start("main");
			job.status=status;
			myJobsFactory.changeStatusOfJob(job).then(function(){
				$scope.myJobs.splice(index, 1);
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
		$scope.deleteJob=function(job,index){
			$loading.start("main");
			myJobsFactory.deleteJob(job.id).then(function(){
				$scope.myJobs.splice(index, 1);
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
		$scope.editJob=function(job){
			myJobsService.editJob=job;
			$state.go('main.postJob');
		};
		
		$scope.viewSubmissions=function(job){
			myJobsService.viewSubmissionJob=job;
			$state.go('main.viewSubmission');
		};
	};
	
	myJobsController.$inject=['$scope','myJobsFactory','$state','myJobsService','$loading'];
	
	angular.module('vResume.myJobs').controller("myJobsController",myJobsController);
	
})();