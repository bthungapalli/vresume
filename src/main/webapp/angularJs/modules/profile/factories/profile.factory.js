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
				 payload.append('defaultResumePath', profileDetails.defaultResumePath);
			 }/*else if(profileDetails.role===1){
				 payload.append('hms', profileDetails.hms);
			 }else if(profileDetails.role===2){
				 payload.append('cms', profileDetails.cms);
			 }*/
			 
			 if(profileDetails.profileImage!==null){
				 payload.append('profileImage', profileDetails.profileImage);
			 }
			 if(profileDetails.defaultResume!==null){
				 payload.append('defaultResume', profileDetails.defaultResume);
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
		
		function fetchAllCMS(){
			var defered=$q.defer();
			 $http.get(PROFILE_CONSTANTS.FETCH_ALL_CMS_URL).success(function(response){
				 defered.resolve(response);
			 }).error(function(){
				 defered.reject("error");
			 });
			return defered.promise;
		};
		
		function checkEmailAvailable(emailId){
			var defered=$q.defer();
			$http.get(PROFILE_CONSTANTS.CHECK_EMAIL_AVAILABLE+emailId).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function removeCmOrHm(user){
			var defered=$q.defer();
			var body = user;
			$http.post(PROFILE_CONSTANTS.REMOVE_CM_OR_HM,body).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function addCmOrHm(newUser){
			var defered=$q.defer();
			$http.post(PROFILE_CONSTANTS.ADD_CM_OR_HM,newUser).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function saveAlreadyExistingCms(data){
			var defered=$q.defer();
			$http.post(PROFILE_CONSTANTS.SAVE_ALREADY_EXISTING_CMS,data).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function downloadFile(path){
			var defered=$q.defer();
			$http.get(PROFILE_CONSTANTS.DOWNLOAD_URL+path).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function deleteVideo(id){
			var defered=$q.defer();
			$http.delete(PROFILE_CONSTANTS.DELETE_VIDEO_URL+id).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		
		
		function uploadDefaultVideo(defaultVideo){
			var defered=$q.defer();
			 var payload = new FormData();
			
				 payload.append('defaultVideo', defaultVideo.defaultVideo);
				 payload.append('videoTitle', defaultVideo.videoTitle);
			 
			 $.ajax({
					type : 'POST',
					url : PROFILE_CONSTANTS.UPLOAD_DEFAULT_VIDEO_URL,
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
		
		function getCalenders(){
			var defered=$q.defer();
			$http.get(PROFILE_CONSTANTS.GET_CALENDER_URL).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function fecthUser(token){
			var defered=$q.defer();
			$http.get(PROFILE_CONSTANTS.FETCH_USER+token).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
			updateProfile:updateProfile,
			fetchAllCMS:fetchAllCMS,
			checkEmailAvailable:checkEmailAvailable,
			removeCmOrHm:removeCmOrHm,
			addCmOrHm :addCmOrHm,
			saveAlreadyExistingCms:saveAlreadyExistingCms,
			downloadFile:downloadFile,
			uploadDefaultVideo:uploadDefaultVideo,
			deleteVideo:deleteVideo,
			getCalenders:getCalenders,
			fecthUser:fecthUser
		};
	};
	
	profileFactory.$inject=['$q','PROFILE_CONSTANTS','$http'];
	
	angular.module('vResume.profile').factory('profileFactory',profileFactory);
	
})();



