(function(){
	
	function myJobsController($scope,myJobsFactory,$state,myJobsService){
		
		$scope.postJob=function(){
			myJobsService.editJob=null;
			$state.go('main.postJob');
		};
		
		$scope.fetchMyJobs=function(status){
			myJobsFactory.fetchMyJobs(status).then(function(response){
				$scope.myJobs=response;
				$scope.status=status;
			}).catch(function(){
				
			});
			$scope.status=status;
		};
		
		$scope.fetchMyJobs("active");

		$scope.changeStatus=function(status,job,index){
			job.status=status;
			myJobsFactory.changeStatusOfJob(job).then(function(){
				$scope.myJobs.splice(index, 1);
			}).catch(function(){
				
			});
		};
		
		$scope.deleteJob=function(job,index){
			myJobsFactory.deleteJob(job.id).then(function(){
				$scope.myJobs.splice(index, 1);
			}).catch(function(){
				
			});
		};
		
		$scope.editJob=function(job){
			myJobsService.editJob=job;
			$state.go('main.postJob');
		};
	};
	
	myJobsController.$inject=['$scope','myJobsFactory','$state','myJobsService'];
	
	angular.module('vResume.myJobs').controller("myJobsController",myJobsController);
	
})();