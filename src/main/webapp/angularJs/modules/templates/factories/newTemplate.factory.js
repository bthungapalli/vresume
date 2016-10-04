(function(){
	
	function newTemplateFactory(TEMPLATES_CONSTANTS,$q,$http){
		function createTemplate(template){
			var tempTemplate=angular.copy(template);
			tempTemplate.sections=tempTemplate.sections.toString();
			var defered=$q.defer();
			$http.post(TEMPLATES_CONSTANTS.CREATE_TEMPLATE_URL,tempTemplate).success(function(response){
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



