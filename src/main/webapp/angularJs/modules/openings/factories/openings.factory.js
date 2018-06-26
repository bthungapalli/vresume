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
				 if(section.videoFile){
					 payload.append('videoFile', section.videoFile);
				 }
				 if( section.defaultVideo){
					 payload.append('defaultVideoPath', section.defaultVideo.defaultVideoPath);
					 payload.append('defaultVideoFileName', section.defaultVideo.fileName);
				 }
				
				
				
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
			 if( resume.defaultResume){
				 payload.append('defaultResume', resume.defaultResume);
			 }else{
				 payload.append('resume', resume.attachment);
			 }
			 
			
			 var availability= resume.interviewAvailability;
			 
			 var month11= availability[0].date.getMonth()+1;
			 var month22= availability[1].date.getMonth()+1;
			 var month33= availability[2].date.getMonth()+1;
			 
			 
			 var month1= month11>9?month11:"0"+month11;
			 var month2= month22>9?month22:"0"+month22;
			 var month3= month33>9?month33:"0"+month33;
			 availability[0].date=availability[0].date.getFullYear()+"-"+month1+"-"+availability[0].date.getDate()+"T18:30:00.000Z";
			 availability[1].date=availability[1].date.getFullYear()+"-"+month2+"-"+availability[1].date.getDate()+"T18:30:00.000Z";
			 availability[2].date=availability[2].date.getFullYear()+"-"+month3+"-"+availability[2].date.getDate()+"T18:30:00.000Z";
			 
			payload.append('availablities', JSON.stringify(availability));
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



