(function(){
	
	function myJobsFactory($http,MYJOBS_CONSTANTS,$q){
		
		function fetchMyJobs(){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.FETCH_JOBS).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
		fetchMyJobs:fetchMyJobs
		};
	};
	
	myJobsFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('myJobsFactory',myJobsFactory);
	
})();



