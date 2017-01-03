(function(){
	
	angular.module('vResume.myJobs').constant("MYJOBS_CONSTANTS",{
		"FETCH_TEMPLATES_AND_HR_DETAILS_URL":"/vresume/job/fetJobTemplate",
		"POSTJOB_URL":"/vresume/job",
		"FETCH_JOBS_BY_STATUS_URL":"/vresume/job/fetchJobs/",
		"UPDATE_JOB_URL":"/vresume/job",
		"DELETE_JOB_URL":"/vresume/job/",
        "USERS_SUBMISSIONS_URL":"/vresume/submissions/job/",
        "SUBMISSION_FOR_USER_URL":"/vresume/submissions/job/",
        "UPDATE_SUBMISSION_URL":"/vresume/submissions/updateStatus",
        "RESUME_DOWNLOAD_URL":"/vresume/submissions/filedownload?fileIs=",
        "EDIT_AVAILABILITIES":"/vresume/"
       
	});
	
})();