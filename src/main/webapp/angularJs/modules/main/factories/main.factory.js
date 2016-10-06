(function(){
	
	function mainFactory($rootScope,$http,MAIN_CONSTANTS,$state,$q){
		
		function logout(){
			$http.get(MAIN_CONSTANTS.LOGOUT_URL).then(function(){
				$rootScope.user=null;
				$state.go("login");
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
		
		return {
		logout:logout,
		checkUser:checkUser
		};
	};
	
	mainFactory.$inject=['$rootScope','$http','MAIN_CONSTANTS','$state','$q'];
	
	angular.module('vResume.main').factory('mainFactory',mainFactory);
	
})();



