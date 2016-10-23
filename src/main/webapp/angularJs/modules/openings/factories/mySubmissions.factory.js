(function(){
	
	function openingsFactory($http,MYSUBMISSIONS_CONSTANTS,$state,$q){
		
		function fetchMySubmissions(id){
			var defered=$q.defer();
			$http.get(MYSUBMISSIONS_CONSTANTS.FETCH_MYSUBMISSIONS_URL+id).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		
		
		return {
			fetchMySubmissions:fetchMySubmissions
		};
	};
	
	openingsFactory.$inject=['$http','OPENINGS_CONSTANTS','$state','$q'];
	
	angular.module('vResume.openings').factory('openingsFactory',openingsFactory);
	
})();



