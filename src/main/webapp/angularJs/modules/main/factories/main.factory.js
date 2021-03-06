(function(){
	
	function mainFactory($rootScope,$http,$window,MAIN_CONSTANTS,$state,$q){
		
		function logout(){
			$http.get(MAIN_CONSTANTS.LOGOUT_URL+$rootScope.JSessionId).then(function(){
				$rootScope.user=null;
				$rootScope.JSessionId=undefined;
				$window.location.href = 'http://www.facemyresume.com?logout=true';
			});
		}
		
		function checkUser(){
			var defered=$q.defer();
			$http.get(MAIN_CONSTANTS.CHECK_USER_URL).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				$state.go("login");
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function changePassword(password){
			var defered=$q.defer();
			var data={"password":password};
			$http.post(MAIN_CONSTANTS.CHANGE_PASSWORD_URL,data).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		return {
		logout:logout,
		checkUser:checkUser,
		changePassword:changePassword
		};
	};
	
	mainFactory.$inject=['$rootScope','$http','$window','MAIN_CONSTANTS','$state','$q'];
	
	angular.module('vResume.main').factory('mainFactory',mainFactory);
	
})();



