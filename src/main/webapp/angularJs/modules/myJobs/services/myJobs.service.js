(function(){
	
	function myJobsService(){
	
		this.editJob=null;
	};
	
	myJobsService.$inject=[];
	
	angular.module('vResume.myJobs').service('myJobsService',myJobsService);
	
})();



