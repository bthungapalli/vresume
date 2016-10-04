(function(){
	
	function editTemplateController(templatesService,editTemplateFactory,$scope,$compile,$state){
		var ediTemplate=angular.copy(templatesService.template);
		ediTemplate.sections=ediTemplate.sections.split(',');
		$scope.template=ediTemplate;
		var index=ediTemplate.sections.length;
		
		$scope.addNewSection=function(index1){
			if(index1+1===index){
				var element=angular.element("#editTemplateForm");
				var section='<div id='+index+' class="form-group">'+
				'<label for="section" class="col-sm-1 col-xs-12 control-label">Section</label>'+
				'<div class="col-sm-10 col-xs-10">'+
				'<input type="text" class="form-control" ng-model="template.sections['+index+']" ng-focus="addNewSection('+index+');" id="section" placeholder="Section">'+
				'</div>'+
				'<div class="col-sm-1 col-xs-1">'+
				'	<a class="btn btn-danger" ng-click="removeSection('+index+')" role="button"><span class="glyphicon glyphicon-remove"></span></a>'+
				'</div>'+
			    '</div>';
				var elem =$compile(section)($scope);
				element.append(elem);
				index++;
			}
		};
		
		$scope.removeSection=function(id){
			$scope.template.sections.splice(id,1);
			angular.element("#"+id).remove();
		};
		
		$scope.updateTemplate=function(){
			angular.forEach($scope.template.sections,function(section,i){
				if(section===null){
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