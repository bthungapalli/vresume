(function(){
	
	angular.module('vResume.login').constant("LOGIN_CONSTANTS",{
		"LOGIN_URL":"/vresume/login",
		"SIGNUP_URL":"/vresume/registration",
		"CHECK_EMAIL_AVAILABLE":"/vresume/emailValidation?emailId="
	});
	
})();