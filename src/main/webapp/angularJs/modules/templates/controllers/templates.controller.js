(function(){
	
	function templatesController($scope,templatesFactory,$state,templatesService){
	
		templatesFactory.fetchTemplates().then(function(response){
			$scope.templates=response;
		}).catch(function(){
			
		});
		
		$scope.editOrShow=function(templateObj,view){
			templatesService.template=templateObj;
			$state.go(view);
		};
		
		$scope.deleteTemplate=function(template,index){
			templatesFactory.deleteTemplate(template.templateId).then(function(){
				$scope.templates.splice(index,1);
			}).catch(function(){
				
			});
		};
	};
	
	templatesController.$inject=['$scope','templatesFactory',"$state",'templatesService'];
	
	angular.module('vResume.templates').controller("templatesController",templatesController);
	
})();