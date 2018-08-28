(function(){
	
	angular.module('vResume.profile').constant("PROFILE_CONSTANTS",{
		"PROFILE_UPDATE_URL":"/vresume/updateProfile",
		"FETCH_ALL_CMS_URL":"/vresume/allCms",
		"CHECK_EMAIL_AVAILABLE":"/vresume/emailValidation?emailId=",
		"REMOVE_CM_OR_HM":"/vresume/removeCmOrHm",
		"ADD_CM_OR_HM":"/vresume/addCmOrHm",
		"SAVE_ALREADY_EXISTING_CMS":"/vresume/existingCms",
		"UPLOAD_DEFAULT_VIDEO_URL":"/vresume/uplaodDefaultVideo",
		"DELETE_VIDEO_URL":"/vresume/deleteDefaultVideo/",
		"GET_CALENDER_URL":"/vresume/calender"
	});
	
})();