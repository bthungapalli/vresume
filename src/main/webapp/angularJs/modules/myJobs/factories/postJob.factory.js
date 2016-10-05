(function(){
	
	function postJobFactory($http,MYJOBS_CONSTANTS,$q){
		
		function fetchTemplatesAndHMDetails(){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.FETCH_TEMPLATES_AND_HR_DETAILS_URL).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function createPost(postJob){
			var defered=$q.defer();
			$http.post(MYJOBS_CONSTANTS.POSTJOB_URL,postJob).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		return {
		 fetchTemplatesAndHMDetails:fetchTemplatesAndHMDetails,
		 createPost:createPost
		};
	};
	
	postJobFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('postJobFactory',postJobFactory);
	
})();



