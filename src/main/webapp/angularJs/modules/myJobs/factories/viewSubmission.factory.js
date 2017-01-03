(function(){
	
	function viewSubmissionFactory($http,MYJOBS_CONSTANTS,$q){
		
		function fetchUsersSubmissions(jobId,status){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.USERS_SUBMISSIONS_URL+jobId+"?status="+status).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getSubmissionsForUser(jobId,userId,status){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.SUBMISSION_FOR_USER_URL+jobId+"/user/"+userId+"?status="+status).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function updateSubmission(submission){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.UPDATE_SUBMISSION_URL,submission).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function fileDownload(submission){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.RESUME_DOWNLOAD_URL+submission.userId+'\\'+submission.resumePath).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function updateAvailabilities(availabilities){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.EDIT_AVAILABILITIES,availabilities).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		
		return {
			fetchUsersSubmissions:fetchUsersSubmissions,
			getSubmissionsForUser:getSubmissionsForUser,
			updateSubmission:updateSubmission,
			fileDownload:fileDownload,
			updateAvailabilities:updateAvailabilities
		};
	};
	
	viewSubmissionFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('viewSubmissionFactory',viewSubmissionFactory);
	
})();




