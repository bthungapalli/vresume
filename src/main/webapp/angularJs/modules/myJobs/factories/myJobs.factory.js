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
		
		function changeStatusOfJob(job){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.UPDATE_JOB_URL,job).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function deleteJob(jobId){
			var defered=$q.defer();
			$http.delete(MYJOBS_CONSTANTS.DELETE_JOB_URL+jobId).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
		fetchMyJobs:fetchMyJobs,
		changeStatusOfJob:changeStatusOfJob,
		deleteJob:deleteJob
		};
	};
	
	myJobsFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('myJobsFactory',myJobsFactory);
	
})();



