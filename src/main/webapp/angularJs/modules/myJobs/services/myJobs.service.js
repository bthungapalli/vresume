(function(){
	
	function myJobsService(){
	
		this.editJob=null;
		this.viewSubmissionJob=null;
		this.viewTechSubmissionJob=null;
	};
	
	myJobsService.$inject=[];
	
	angular.module('vResume.myJobs').service('myJobsService',myJobsService);
	
})();



