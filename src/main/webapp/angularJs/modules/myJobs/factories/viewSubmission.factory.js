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
		
		function bulkSubmission(submission){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.BULK_SUBMISSION_URL,{"submission":submission}).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function saveTech(submmision,techUserIds){
			var defered=$q.defer();
			var body={
				"submissionId":submmision.id,
				"jobId":submmision.jobId,
				"techUserIds":techUserIds
			};
			$http.post(MYJOBS_CONSTANTS.SAVE_TECH_URL,body).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function fetchSaveTech(submmision){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.FETCH_SAVE_TECH_URL+submmision.jobId+"/"+submmision.id).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function fetchTechUsersSubmissions(jobId,status){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.TECH_USERS_SUBMISSIONS_URL+jobId+"?status="+status).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getTechSubmissionsForUser(jobId,userId,status){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.TECH_SUBMISSION_FOR_USER_URL+jobId+"/user/"+userId+"?status="+status).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function updateTechSubmission(submission){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.UPDATE_TECH_SUBMISSION_URL,submission).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function fetchTechComments(id,submmisionId){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.FETCH_TECH_COMMENTS_URL+id+"/"+submmisionId).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function submitComment(id,comment,submmisionId){
			var defered=$q.defer();
			var body={
				"techSubmissionId":id,
				"comment":comment,
				"submmisionId":submmisionId
			};
			$http.post(MYJOBS_CONSTANTS.POST_HM_TECH_COMMENT_URL,body).success(function(response) {
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
			updateAvailabilities:updateAvailabilities,
			bulkSubmission:bulkSubmission,
			saveTech:saveTech,
			fetchSaveTech:fetchSaveTech,
			fetchTechUsersSubmissions:fetchTechUsersSubmissions,
			getTechSubmissionsForUser:getTechSubmissionsForUser,
			updateTechSubmission:updateTechSubmission,
			fetchTechComments:fetchTechComments,
			submitComment:submitComment
		};
	};
	
	viewSubmissionFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('viewSubmissionFactory',viewSubmissionFactory);
	
})();




