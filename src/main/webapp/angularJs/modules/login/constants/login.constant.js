(function(){
	
	angular.module('vResume.login').constant("LOGIN_CONSTANTS",{
		"LOGIN_URL":"/vresume/login",
		"SIGNUP_URL":"/vresume/registration",
		"CHECK_EMAIL_AVAILABLE":"/vresume/emailValidation?emailId=",
		"REGISTRATION_CONFIRMATION_URL":"/vresume/registration/registrationConfirmation?token=",
		"FORGOT_PASSWORD_URL":"/vresume/forgotPassword",
		"CONFIRMATION_INSTRUCTIONS_URL":"/vresume/updateToken?email="
	});
	
})();