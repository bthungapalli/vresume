(function(){
	
	function templatesFactory(TEMPLATES_CONSTANTS,$q,$http){
		
		function fetchTemplates(){
			var defered=$q.defer();
			$http.get(TEMPLATES_CONSTANTS.FETCH_TEMPLATES_URL).success(function(response){
				 defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return{
			fetchTemplates:fetchTemplates
		};
	};
	
	templatesFactory.$inject=['TEMPLATES_CONSTANTS','$q','$http'];
	
	angular.module('vResume.templates').factory('templatesFactory',templatesFactory);
	
})();



