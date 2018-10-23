(function(){
	
	function postJobFactory($http,MYJOBS_CONSTANTS,$q,$rootScope){
		
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
		
		function updateJob(job){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.UPDATE_JOB_URL,job).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function updateBulkJob(profileDetails){
			var defered=$q.defer();
			 var payload = new FormData();
			 
				 payload.append('jobs', profileDetails.bulkUpload);
				 
			 $.ajax({
					type : 'POST',
					url : MYJOBS_CONSTANTS.BULK_UPLOAD_URL,
					headers: {
				        "JSessionId":$rootScope.JSessionId
					},
					data : payload,
					contentType : false,
					processData : false,
					success : function(response) {
						 defered.resolve(response);
					},
					error : function(xhr, status) {
						 defered.reject("error");
					}
		
				});
			return defered.promise;
		};
		
		return {
		 fetchTemplatesAndHMDetails:fetchTemplatesAndHMDetails,
		 createPost:createPost,
		 updateJob:updateJob,
		 updateBulkJob:updateBulkJob
		};
	};
	
	postJobFactory.$inject=['$http','MYJOBS_CONSTANTS','$q','$rootScope'];
	
	angular.module('vResume.myJobs').factory('postJobFactory',postJobFactory);
	
})();



