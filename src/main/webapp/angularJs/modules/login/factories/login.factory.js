(function(){
	
	function loginFactory($q,$http,LOGIN_CONSTANTS){
		
		
		function submitLogin(loginDetails){
			var defered=$q.defer();
			var headers =  {authorization : "Basic "+ btoa(loginDetails.emailId + ":" + loginDetails.password)};
			$http.get(LOGIN_CONSTANTS.LOGIN_URL, {headers : headers}).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function signup(loginDetails){
			var defered=$q.defer();
			var body =  {"email" : loginDetails.emailId,"password": loginDetails.password,"role":loginDetails.role};
			$http.post(LOGIN_CONSTANTS.SIGNUP_URL,body).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		
		return {
			submitLogin:submitLogin,
			signup:signup
		};
	};
	
	loginFactory.$inject=['$q','$http','LOGIN_CONSTANTS'];
	
	angular.module('vResume.login').factory('loginFactory',loginFactory);
	
})();



