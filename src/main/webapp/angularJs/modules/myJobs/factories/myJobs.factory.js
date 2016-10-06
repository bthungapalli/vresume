(function(){
	
	function myJobsFactory($http,MYJOBS_CONSTANTS,$q){
		
		function fetchMyJobs(status){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.FETCH_JOBS_BY_STATUS_URL+status).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function changeStatusOfJob(status,jobId){
			var defered=$q.defer();
			var payload={
					"status":status,
					"id":jobId
			};
			$http.put(MYJOBS_CONSTANTS.CHANGE_JOB_STATUS_URL,payload).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
		fetchMyJobs:fetchMyJobs,
		changeStatusOfJob:changeStatusOfJob
		};
	};
	
	myJobsFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('myJobsFactory',myJobsFactory);
	
})();



