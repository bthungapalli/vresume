(function(){
	
	function showTemplateController(){
		$scope.template=templatesService.template;
	};
	
	showTemplateController.$inject=['templatesService'];
	
	angular.module('vResume.templates').controller("showTemplateController",showTemplateController);
	
})();