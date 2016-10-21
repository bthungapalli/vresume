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
			$http.get(MYJOBS_CONSTANTS.UPDATE_SUBMISSION_URL).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
			fetchUsersSubmissions:fetchUsersSubmissions,
			getSubmissionsForUser:getSubmissionsForUser
		};
	};
	
	viewSubmissionFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('viewSubmissionFactory',viewSubmissionFactory);
	
})();




