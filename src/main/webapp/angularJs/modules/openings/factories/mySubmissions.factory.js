(function(){
	
	function mySubmissionsFactory($http,MYSUBMISSIONS_CONSTANTS,$state,$q){
		
		function fetchMySubmissions(id){
			var defered=$q.defer();
			$http.get(MYSUBMISSIONS_CONSTANTS.FETCH_MYSUBMISSIONS_URL+id).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function getJobDetails(jobId){
			var defered=$q.defer();
			$http.get(MYSUBMISSIONS_CONSTANTS.FETCH_JOB_DETAILS_URL+jobId).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function getMySubmission(jobId,userId){
			var defered=$q.defer();
			$http.get(MYSUBMISSIONS_CONSTANTS.FETCH_MY_SUBMISSION_URL+jobId+"/user/"+userId).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		
		return {
			fetchMySubmissions:fetchMySubmissions,
			getJobDetails:getJobDetails,
			getMySubmission:getMySubmission
		};
	};
	
	mySubmissionsFactory.$inject=['$http','MYSUBMISSIONS_CONSTANTS','$state','$q'];
	
	angular.module('vResume.openings').factory('mySubmissionsFactory',mySubmissionsFactory);
	
})();



