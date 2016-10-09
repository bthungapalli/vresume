(function(){
	
	angular.module('vResume.users').constant("USERS_CONSTANTS",{
		"FETCH_ALL_USERS_URL":"/vresume/fetchAllUsers",
		"ACTIVATE_USER_URL":"/vresume/activateUser?username=",
		"DEACTIVATE_USER_URL":"/vresume/deactivateUser?username="
	});
	
})();