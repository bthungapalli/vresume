(function(){
	
	function editTemplateFactory(TEMPLATES_CONSTANTS,$q,$http){
		
		function updateTemplate(template){
			var tempTemplate=angular.copy(template);
			/*tempTemplate.sections=tempTemplate.sections.toString();
			tempTemplate.durations=tempTemplate.durations.toString();
			tempTemplate.internalSections=template.internalSections.toString();
			tempTemplate.orders=template.orders.toString();
			*/
			
			var finalObj={
					"templateName":tempTemplate.templateName,
					"sections":[],
					"durations":[],
					"internalSections":[],
					"orders":[],
					"templateId": tempTemplate.templateId,
					"userId": tempTemplate.userId
			};
			
			angular.forEach(tempTemplate.orders,function(order,index){
				finalObj.sections[order-1]=tempTemplate.sections[index];
				finalObj.durations[order-1]=tempTemplate.durations[index];
				finalObj.internalSections[order-1]=tempTemplate.internalSections[index];
				finalObj.orders[order-1]=tempTemplate.orders[index];
			});
			finalObj.sections=finalObj.sections.toString();
			finalObj.durations=finalObj.durations.toString();
			finalObj.internalSections=finalObj.internalSections.toString();
			finalObj.orders=finalObj.orders.toString();
			
			
			var defered=$q.defer();
			$http.put(TEMPLATES_CONSTANTS.UPDATE_TEMPLATE_URL,finalObj).success(function(response){
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



