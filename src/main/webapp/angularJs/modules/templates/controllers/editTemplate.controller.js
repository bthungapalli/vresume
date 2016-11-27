(function(){
	
	function editTemplateController(templatesService,editTemplateFactory,$scope,$compile,$state,$loading){
		var ediTemplate=angular.copy(templatesService.template);
		ediTemplate.sections=ediTemplate.sections.split(',');
		$scope.template=ediTemplate;
		var index=ediTemplate.sections.length-1;
		
		$scope.addNewSection=function(){
			$scope.template.sections[$scope.template.sections.length]="";
		};
		
		$scope.removeSection=function(id){
			$scope.template.sections.splice(id,1);
		};
		
		$scope.updateTemplate=function(){
			$loading.start("main");
			var temp={"templateName":$scope.template.templateName,
					"userId":ediTemplate.userId,
                     "templateId":ediTemplate.templateId,
					  "sections":[]};
			angular.forEach($scope.template.sections,function(section,index){
				if(section.trim()!==""){
					temp.sections.push(section);
				}
			});
			editTemplateFactory.updateTemplate(temp).then(function(){
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