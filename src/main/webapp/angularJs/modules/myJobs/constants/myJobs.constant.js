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
        "EDIT_AVAILABILITIES":"/vresume/",
        "BULK_UPLOAD_URL":"/vresume/job/uploadBulkJobs",
        "BULK_SUBMISSION_URL":"/vresume/submissions/bulkSubmission",
        "FETCH_JOB_URL":"/vresume/job/viewJob/",
        "UPDATE_AVAILABILITY_URL":"/vresume/job/updateAvailability",
        "SAVE_TECH_URL":"/vresume/submissions/saveTech",
        "FETCH_SAVE_TECH_URL":"/vresume/submissions/fetchSaveTech/",
        "FETCH_TECH_JOBS":"/vresume/job/techJobs/",
        "TECH_USERS_SUBMISSIONS_URL":"/vresume/submissions/techJob/",
        "TECH_SUBMISSION_FOR_USER_URL":"/vresume/submissions/techJob/",
        "UPDATE_TECH_SUBMISSION_URL":"/vresume/submissions/updateTechStatus",
        "FETCH_TECH_COMMENTS_URL":"/vresume/submissions/techDetails/",
        "POST_HM_TECH_COMMENT_URL":"/vresume/submissions/hmComment/"
	});
	
})();