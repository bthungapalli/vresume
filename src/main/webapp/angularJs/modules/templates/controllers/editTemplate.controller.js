(function(){
	
	function editTemplateController(templatesService,editTemplateFactory,$scope,$compile,$state,$loading){
		
		var ediTemplate=angular.copy(templatesService.template);
		ediTemplate.sections=ediTemplate.sections.split(',');
		$scope.defaultDurations=function(){
			var durations=[];
			angular.forEach(ediTemplate.sections,function(section){
				durations.push(60);
			});
			return durations;
		};
		
		$scope.toInt=function(stringDuration){
			var intDurations=[];
			angular.forEach(stringDuration,function(duration){
				intDurations.push(parseInt(duration));
			});
			return intDurations;
		};
		
		ediTemplate.durations=ediTemplate.durations!==undefined || ediTemplate.durations!==null?$scope.toInt(ediTemplate.durations.split(',')):$scope.defaultDurations();
		$scope.template=ediTemplate;
		var index=ediTemplate.sections.length-1;
		
		$scope.addNewSection=function(){
			$scope.template.sections[$scope.template.sections.length]="";
			$scope.template.durations[$scope.template.durations.length]="";
		};
		
		$scope.removeSection=function(id){
			$scope.template.sections.splice(id,1);
			$scope.template.durations.splice(id,1);
		};
		
		$scope.updateTemplate=function(){
			
			var temp={"templateName":$scope.template.templateName,
					"userId":ediTemplate.userId,
                     "templateId":ediTemplate.templateId,
					  "sections":[],
					  "durations":[]
			};
			angular.forEach($scope.template.sections,function(section,index){
				if(section.trim()!==""){
					temp.sections.push(section);
					temp.durations.push($scope.template.durations[index]);
				}
			});
			if(temp.sections.length>0){
				$loading.start("main");
				editTemplateFactory.updateTemplate(temp).then(function(){
					$loading.finish("main");
					$state.go('main.templates');
				}).catch(function(){
					$loading.finish("main");
				});
			}
			
		};
		
		
	};
	
	editTemplateController.$inject=['templatesService','editTemplateFactory','$scope','$compile','$state','$loading'];
	
	angular.module('vResume.templates').controller("editTemplateController",editTemplateController);
	
})();