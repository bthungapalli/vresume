(function(){
	
	function myJobsService(){
	
		this.editJob=null;
		this.viewSubmissionJob=null;
	};
	
	myJobsService.$inject=[];
	
	angular.module('vResume.myJobs').service('myJobsService',myJobsService);
	
})();



