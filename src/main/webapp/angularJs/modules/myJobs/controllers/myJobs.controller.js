(function(){
	
	function myJobsController($scope,myJobsFactory){
		
		myJobsFactory.fetchMyJobs().then(function(response){
			$scope.myJobs=response;
		}).catch(function(){
			
		});
	
	};
	
	myJobsController.$inject=['$scope','myJobsFactory'];
	
	angular.module('vResume.myJobs').controller("myJobsController",myJobsController);
	
})();