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
		
		function submitSections(resume,submissionId,defered){
			
			angular.forEach(resume.sections,function(section,index){
				
				var payload = new FormData();
				
				 payload.append('sectionName', section.sectionName);
				 payload.append('submissionId', submissionId);
				 payload.append('userRating', section.userRating);
				payload.append('videoFile', section.videoFile);
				
				 $.ajax({
						type : 'POST',
						url : OPENINGS_CONSTANTS.INSERT_SECTIONS_URL,
						data : payload,
						contentType: false,
						processData : false,
						success : function(response) {
							if(index===resume.sections.length-1){
								defered.resolve("");
							};
						},
						error : function(xhr, status) {
							defered.reject("error");
						}
					});
			});
			
			
		}
		
		
		
		function applyJob(resume,jobDetails){
			var defered=$q.defer();
			var payload = new FormData();
			
			 payload.append('jobId', jobDetails.id);
			 payload.append('resumeName', resume.attachmentName);
			 payload.append('resume', resume.attachment);
			payload.append('availablities', JSON.stringify(resume.interviewAvailability));
			payload.append('notes', resume.notes);
			 
           
			 $.ajax({
					type : 'POST',
					url : OPENINGS_CONSTANTS.APPLY_JOB_URL,
					data : payload,
					contentType: false,
					processData : false,
					success : function(response) {
						submitSections(resume,response,defered);
					},
					error : function(xhr, status) {
						 defered.reject("error");
					}
				});
			return defered.promise;
		}
		
		function getApplyFlag(jobId,userId){
			var defered=$q.defer();
			$http.get(OPENINGS_CONSTANTS.GET_APPLY_FLAG+jobId+"/"+userId).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		return {
			fetchOpenings:fetchOpenings,
			getSections:getSections,
			applyJob:applyJob,
			submitSections:submitSections,
			getApplyFlag:getApplyFlag
		};
	};
	
	openingsFactory.$inject=['$http','OPENINGS_CONSTANTS','$state','$q'];
	
	angular.module('vResume.openings').factory('openingsFactory',openingsFactory);
	
})();



