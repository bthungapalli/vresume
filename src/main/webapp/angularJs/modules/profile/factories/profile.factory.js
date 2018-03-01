(function(){
	
	function profileFactory($q,PROFILE_CONSTANTS,$http){
		
		function updateProfile(profileDetails){
			var defered=$q.defer();
			 var payload = new FormData();
			 payload.append('firstName', profileDetails.firstName);
			 payload.append('lastName', profileDetails.lastName);
			 payload.append('phone', profileDetails.phone);
			 payload.append('location', profileDetails.location);
			 payload.append('currentJobTitle', profileDetails.currentJobTitle);
			 payload.append('currentEmployer', profileDetails.currentEmployer);
			 if(profileDetails.role===0){
				 payload.append('middleName', profileDetails.middleName);
				 payload.append('experience', profileDetails.experience);
				 payload.append('currentSalary', profileDetails.currentSalary);
				 payload.append('expectedSalary',profileDetails.expectedSalary);
				 payload.append('primarySkills', profileDetails.primarySkills);
				 payload.append('secondarySkills', profileDetails.secondarySkills);
				 payload.append('prefredLocations', profileDetails.prefredLocations);
				 payload.append('workAuthorization', profileDetails.workAuthorization);
				 payload.append('jobType', profileDetails.jobType);
				 
				 
			 }
			 
		
			 if(profileDetails.profileImage!==null){
				 payload.append('profileImage', profileDetails.profileImage);
			 }
				 
            
			 $.ajax({
					type : 'POST',
					url : PROFILE_CONSTANTS.PROFILE_UPDATE_URL,
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
		
		//sending list of values for emp details to service
		
		function insertexpdetails(addExpFields){
		      
			   var expDetails = JSON.stringify(addExpFields);
			      var defered=$q.defer();
			      var payload = new FormData();
			   
			       payload.append('employer',expDetails.employer);
			       payload.append('jobTitle', expDetails.jobTitle);
			       payload.append('joiningDate', expDetails.joiningDate);
			        payload.append('releavingDate', expDetails.releavingDate);
			     
			    
			        $.ajax({
			         type : 'POST',
			         url : PROFILE_CONSTANTS.PREVIOUSEMPLOYER_URL,
			         data : expDetails,
			         processData : false,
			         contentType : false,
			               dataType: 'json',
			         headers: {
			                   'Content-Type': 'application/json'
			               },
			         success : function(response) {
			           defered.resolve(response);
			         },
			         error : function(xhr, status) {
			           defered.reject("error");
			         }
			      });
			     return defered.promise;
			    };
			    function updateexpdetails(addExpFields){
			    	console.log("sent 22");
					   var expDetails = JSON.stringify(addExpFields);
					      var defered=$q.defer();
					      var payload = new FormData();
					   
					       payload.append('employer',expDetails.employer);
					       payload.append('jobTitle', expDetails.jobTitle);
					       payload.append('joiningDate', expDetails.joiningDate);
					        payload.append('releavingDate', expDetails.releavingDate);
					     
					    
					        $.ajax({
					         type : 'PUT',
					         url : PROFILE_CONSTANTS.UPDATE_EXP_DETAILS_URL,
					         data : expDetails,
					         processData : false,
					         contentType : false,
					               dataType: 'json',
					         headers: {
					                   'Content-Type': 'application/json'
					               },
					         success : function(response) {
					           defered.resolve(response);
					         },
					         error : function(xhr, status) {
					           defered.reject("error");
					         }
					      });
					     return defered.promise;
					    };
               function removeDetails(id){
            	   var defered=$q.defer();
            	   
            	   $.ajax({
   					type : 'DELETE',
   					url : PROFILE_CONSTANTS.REMOVE_EXP_DETAILS_URL+"/"+id,
   					data : id,
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
			    function fetchuserexperiences(){
					var defered=$q.defer();
					 $http.get(PROFILE_CONSTANTS.FETCH_EXP_DETAILS_URL).success(function(response){
						 defered.resolve(response);
					 }).error(function(){
						 defered.reject("error");
					 });
					return defered.promise;
				};
				
		return {
			updateProfile:updateProfile,
			insertexpdetails:insertexpdetails,
			updateexpdetails:updateexpdetails,
			removeDetails:removeDetails,
			fetchuserexperiences:fetchuserexperiences
		};
			
	};
	
	profileFactory.$inject=['$q','PROFILE_CONSTANTS','$http'];
	
	angular.module('vResume.profile').factory('profileFactory',profileFactory);
	
})();



