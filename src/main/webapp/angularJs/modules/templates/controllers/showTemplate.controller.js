(function(){
	
	function showTemplateController(templatesService,$scope){
		$scope.template=templatesService.template;
	};
	
	showTemplateController.$inject=['templatesService','$scope'];
	
	angular.module('vResume.templates').controller("showTemplateController",showTemplateController);
	
})();