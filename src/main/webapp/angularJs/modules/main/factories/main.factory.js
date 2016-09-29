(function(){
	
	function mainFactory($rootScope,$http,MAIN_CONSTANTS,$state){
		
		function logout(){
			$http.get(MAIN_CONSTANTS.LOGOUT_URL).then(function(){
				$rootScope.user=null;
				$state.go("login");
			});
		}
		
		return {
		logout:logout
		};
	};
	
	mainFactory.$inject=['$rootScope','$http','MAIN_CONSTANTS','$state'];
	
	angular.module('vResume.main').factory('mainFactory',mainFactory);
	
})();



