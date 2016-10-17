(function(){
	
	function newTemplateController($scope,$compile,newTemplateFactory,$state,$loading){
	    var index=1;
		
		$scope.initializeTemplate=function(){
			$scope.template={
					"templateName":"",
					"sections":[]
			};
		};
		
		$scope.initializeTemplate();
		
		$scope.addNewSection=function(index1){
			if(index1+1===index){
				var element=angular.element("#newTemplateForm");
				var section='<div id='+index+' class="form-group">'+
				'<label for="section" class="col-sm-1 col-xs-12 control-label">Section</label>'+
				'<div class="col-sm-10 col-xs-10">'+
				'<input type="text" class="form-control" name="section'+index+'" ng-model="template.sections['+index+']" ng-focus="addNewSection('+index+');" id="section" placeholder="Section">'+
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
		
		$scope.createTemplate=function(){
			$loading.start("main");
			angular.forEach($scope.template.sections,function(section,i){
				if(section===null){
					$scope.template.sections.splice(i,1);
				}
			});
			newTemplateFactory.createTemplate($scope.template).then(function(){
				$scope.initializeTemplate();
				$state.go('main.templates');
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
	};
	
	newTemplateController.$inject=['$scope','$compile','newTemplateFactory','$state','$loading'];
	
	angular.module('vResume.templates').controller("newTemplateController",newTemplateController);
	
})();