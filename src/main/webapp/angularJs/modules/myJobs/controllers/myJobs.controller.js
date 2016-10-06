(function(){
	
	function myJobsController($scope,myJobsFactory){
		
		
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
	};
	
	myJobsController.$inject=['$scope','myJobsFactory'];
	
	angular.module('vResume.myJobs').controller("myJobsController",myJobsController);
	
})();