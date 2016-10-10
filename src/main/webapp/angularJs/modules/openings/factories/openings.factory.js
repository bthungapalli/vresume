(function(){
	
	function openingsFactory($http,OPENINGS_CONSTANTS,$state,$q){
		
		function fetchOpenings(){
			var defered=$q.defer();
			$http.get(OPENINGS_CONSTANTS.OPENINGS_URL).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function getSections(templateId){
			var defered=$q.defer();
			$http.get(OPENINGS_CONSTANTS.FETCH_SECTIONS_URL+templateId).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		return {
			fetchOpenings:fetchOpenings,
			getSections:getSections
		};
	};
	
	openingsFactory.$inject=['$http','OPENINGS_CONSTANTS','$state','$q'];
	
	angular.module('vResume.openings').factory('openingsFactory',openingsFactory);
	
})();



