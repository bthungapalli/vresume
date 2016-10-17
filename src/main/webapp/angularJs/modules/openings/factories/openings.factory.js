(function(){
	
	function openingsFactory($http,OPENINGS_CONSTANTS,$state,$q){
		
		function fetchOpenings(){
			var defered=$q.defer();
			$http.get(OPENINGS_CONSTANTS.OPENINGS_URL).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function getSections(templateId){
			var defered=$q.defer();
			$http.get(OPENINGS_CONSTANTS.FETCH_SECTIONS_URL+templateId).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function applyJob(resume,jobDetails){
			var defered=$q.defer();
			var payload = new FormData();
			
			 payload.append('jobId', jobDetails.id);
			 payload.append('resumeName', resume.attachmentName);
			 payload.append('resume', resume.attachment);
			// payload.append('sections', resume.sections);
			//payload.append('availablities', JSON.stringify(resume.interviewAvailability));
			 
           
			 $.ajax({
					type : 'POST',
					url : OPENINGS_CONSTANTS.APPLY_JOB_URL,
					data : payload,
					contentType: false,
					processData : false,
					success : function(response) {
						 defered.resolve(response);
					},
					error : function(xhr, status) {
						 defered.reject("error");
					}
				});
			return defered.promise;
		}
		
		return {
			fetchOpenings:fetchOpenings,
			getSections:getSections,
			applyJob:applyJob
		};
	};
	
	openingsFactory.$inject=['$http','OPENINGS_CONSTANTS','$state','$q'];
	
	angular.module('vResume.openings').factory('openingsFactory',openingsFactory);
	
})();



