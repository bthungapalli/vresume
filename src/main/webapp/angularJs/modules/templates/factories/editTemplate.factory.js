(function(){
	
	function editTemplateFactory(TEMPLATES_CONSTANTS,$q,$http){
		
		function updateTemplate(template){
			var tempTemplate=angular.copy(template);
			tempTemplate.sections=tempTemplate.sections.toString();
			tempTemplate.durations=tempTemplate.durations.toString();
			var defered=$q.defer();
			$http.put(TEMPLATES_CONSTANTS.UPDATE_TEMPLATE_URL,tempTemplate).success(function(response){
				 defered.resolve(response);
			}).error(function(error){
				 defered.reject(error);
			});
			return defered.promise;
		};
		
		return{
			updateTemplate:updateTemplate
		};
	};
	
	editTemplateFactory.$inject=['TEMPLATES_CONSTANTS','$q','$http'];
	
	angular.module('vResume.templates').factory('editTemplateFactory',editTemplateFactory);
	
})();



