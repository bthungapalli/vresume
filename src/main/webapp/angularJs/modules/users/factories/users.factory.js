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
		
		function activateUser(email){
			var defered=$q.defer();
			 $http.post(USERS_CONSTANTS.ACTIVATE_USER_URL+email).success(function(response){
				 defered.resolve(response);
			 }).error(function(){
				 defered.reject("error");
			 });
			return defered.promise;
		};
		
		function deActivateUser(email){
			var defered=$q.defer();
			 $http.post(USERS_CONSTANTS.DEACTIVATE_USER_URL+email).success(function(response){
				 defered.resolve(response);
			 }).error(function(){
				 defered.reject("error");
			 });
			return defered.promise;
		};
		
		return {
			fetchAllUsers:fetchAllUsers,
			activateUser:activateUser,
			deActivateUser:deActivateUser
		};
	};
	
	usersFactory.$inject=['$q','USERS_CONSTANTS','$http'];
	
	angular.module('vResume.users').factory('usersFactory',usersFactory);
	
})();



