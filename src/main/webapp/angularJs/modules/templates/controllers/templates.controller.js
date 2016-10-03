(function(){
	
	function templatesController(templatesFactory){
	
		templatesFactory.fetchTemplates().then(function(response){
			$scope.templates=response;
		}).catch(function(){
			
		});
	};
	
	templatesController.$inject=['templatesFactory'];
	
	angular.module('vResume.templates').controller("templatesController",templatesController);
	
})();