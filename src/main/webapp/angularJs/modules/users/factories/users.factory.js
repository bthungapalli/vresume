(function(){
	
	function usersFactory($q,USERS_CONSTANTS,$http){
		
		function fetchAllUsers(){
			var defered=$q.defer();
			 
			 $http.get(USERS_CONSTANTS.FETCH_ALL_USERS_URL).success(function(response){
				 defered.resolve(response);
			 }).error(function(){
				 defered.reject("error");
			 });
			return defered.promise;
		};
		
		return {
			fetchAllUsers:fetchAllUsers
		};
	};
	
	usersFactory.$inject=['$q','USERS_CONSTANTS','$http'];
	
	angular.module('vResume.users').factory('usersFactory',usersFactory);
	
})();



