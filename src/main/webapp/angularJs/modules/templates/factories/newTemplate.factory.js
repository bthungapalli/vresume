(function(){
	
	function newTemplateFactory(TEMPLATES_CONSTANTS,$q,$http){
		function createTemplate(template){
			template.sections=template.sections.toString();
			template.durations=template.durations.toString();
			var defered=$q.defer();
			$http.post(TEMPLATES_CONSTANTS.CREATE_TEMPLATE_URL,template).success(function(response){
				 defered.resolve(response);
			}).error(function(error){
				 defered.reject(error);
			});
			return defered.promise;
		};
		
		return{
			createTemplate:createTemplate
		};
	};
	
	newTemplateFactory.$inject=['TEMPLATES_CONSTANTS','$q','$http'];
	
	angular.module('vResume.templates').factory('newTemplateFactory',newTemplateFactory);
	
})();



