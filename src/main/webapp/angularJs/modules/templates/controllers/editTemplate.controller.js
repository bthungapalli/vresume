(function(){
	
	function editTemplateController(templatesService,editTemplateFactory,$scope,$compile,$state,$loading){
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
			$loading.start("main");
			angular.forEach($scope.template.sections,function(section,i){
				if(section===null || section.trim()===""){
					$scope.template.sections.splice(i,1);
				}
			});
			editTemplateFactory.updateTemplate($scope.template).then(function(){
				$loading.finish("main");
				$state.go('main.templates');
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
		
	};
	
	editTemplateController.$inject=['templatesService','editTemplateFactory','$scope','$compile','$state','$loading'];
	
	angular.module('vResume.templates').controller("editTemplateController",editTemplateController);
	
})();