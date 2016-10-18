(function(){
	
	function viewSubmissionFactory($http,MYJOBS_CONSTANTS,$q){
		
		function fetchUsersSubmissions(id){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.USERS_SUBMISSIONS_URL+id).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
			fetchUsersSubmissions:fetchUsersSubmissions
		};
	};
	
	viewSubmissionFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('viewSubmissionFactory',viewSubmissionFactory);
	
})();




