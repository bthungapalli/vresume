(function(){
	
	function editTemplateController(templatesService,editTemplateFactory,$scope,$compile,$state){
		var ediTemplate=angular.copy(templatesService.template);
		ediTemplate.sections=ediTemplate.sections.split(',');
		$scope.template=ediTemplate;
		var index=ediTemplate.sections.length;
		
		$scope.addNewSection=function(index1){
			if(index1+1===index){
				$scope.template.sections[index1+1]="";
				index++;
			}
		};
		
		$scope.removeSection=function(id){
			$scope.template.sections.splice(id,1);
			angular.element("#"+id).remove();
			index--;
		};
		
		$scope.updateTemplate=function(){
			angular.forEach($scope.template.sections,function(section,i){
				if(section===null || section.trim()===""){
					$scope.template.sections.splice(i,1);
				}
			});
			editTemplateFactory.updateTemplate($scope.template).then(function(){
				$state.go('main.templates');
			}).catch(function(){
				
			});
		};
		
		
	};
	
	editTemplateController.$inject=['templatesService','editTemplateFactory','$scope','$compile','$state'];
	
	angular.module('vResume.templates').controller("editTemplateController",editTemplateController);
	
})();