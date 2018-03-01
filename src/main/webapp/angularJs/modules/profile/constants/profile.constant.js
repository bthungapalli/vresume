(function(){
	
	angular.module('vResume.profile').constant("PROFILE_CONSTANTS",{
		"PROFILE_UPDATE_URL":"/vresume/updateProfile",
		"PREVIOUSEMPLOYER_URL":"/vresume/addexperience",
		"FETCH_EXP_DETAILS_URL":"/vresume/fetchuserexperiences",
		"UPDATE_EXP_DETAILS_URL":"/vresume/updateuserexperience",
		"REMOVE_EXP_DETAILS_URL":"/vresume/removeexperiences"
	});
	
})();