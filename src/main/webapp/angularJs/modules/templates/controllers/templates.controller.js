(function(){
	
	function templatesController($scope,templatesFactory,$state,templatesService,$loading){
		$loading.start("main");
		templatesFactory.fetchTemplates().then(function(response){
			$scope.templates=response;
			$loading.finish("main");
		}).catch(function(){
			
		});
		
		$scope.editOrShow=function(templateObj,view){
			templatesService.template=templateObj;
			$state.go(view);
		};
		
		$scope.deleteTemplate=function(template,index){
			$loading.start("main");
			templatesFactory.deleteTemplate(template.templateId).then(function(){
				$scope.templates.splice(index,1);
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
	};
	
	templatesController.$inject=['$scope','templatesFactory',"$state",'templatesService','$loading'];
	
	angular.module('vResume.templates').controller("templatesController",templatesController);
	
})();