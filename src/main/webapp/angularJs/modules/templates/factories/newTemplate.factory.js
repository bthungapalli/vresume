(function(){
	
	function newTemplateFactory(TEMPLATES_CONSTANTS,$q,$http){
		function createTemplate(template){
			/*template.sections=template.sections.toString();
			template.durations=template.durations.toString();
			template.internalSections=template.internalSections.toString();
			template.orders=template.orders.toString();*/
			
//			var sections = template.sections.split(',');
//			var durations = template.durations.split(',');
//			var internalSections = template.internalSections.split(',');
//			var orders = template.orders.split(',');
			
			var finalObj={
					"templateName":template.templateName,
					"sections":[],
					"durations":[],
					"internalSections":[],
					"orders":[]
			};
			
			angular.forEach(template.orders,function(order,index){
				finalObj.sections[order-1]=template.sections[index];
				finalObj.durations[order-1]=template.durations[index];
				finalObj.internalSections[order-1]=template.internalSections[index];
				finalObj.orders[order-1]=template.orders[index];
			});
			finalObj.sections=finalObj.sections.toString();
			finalObj.durations=finalObj.durations.toString();
			finalObj.internalSections=finalObj.internalSections.toString();
			finalObj.orders=finalObj.orders.toString();
			
			var defered=$q.defer();
			$http.post(TEMPLATES_CONSTANTS.CREATE_TEMPLATE_URL,finalObj).success(function(response){
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



