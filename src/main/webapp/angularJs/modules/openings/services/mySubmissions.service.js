(function(){
	
	function mySubmissionsService(){
	
		this.jobId=null;
		this.jobTitle=null;
	};
	
	mySubmissionsService.$inject=[];
	
	angular.module('vResume.openings').service('mySubmissionsService',mySubmissionsService);
	
})();



