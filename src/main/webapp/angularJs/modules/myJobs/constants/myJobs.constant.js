(function(){
	
	angular.module('vResume.myJobs').constant("MYJOBS_CONSTANTS",{
		"FETCH_TEMPLATES_AND_HR_DETAILS_URL":"/vresume/job/fetJobTemplate",
		"POSTJOB_URL":"/vresume/job",
		"FETCH_JOBS_BY_STATUS_URL":"/vresume/job/fetchJobs/",
		"UPDATE_JOB_URL":"/vresume/job",
		"DELETE_JOB_URL":"/vresume/job/"
	});
	
})();