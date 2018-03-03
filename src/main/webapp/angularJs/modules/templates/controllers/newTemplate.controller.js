(function(){
	
	function newTemplateController($scope,$compile,newTemplateFactory,$state,$loading){
	    var index=0;
	   
		
		$scope.initializeTemplate=function(){
			$scope.template={
			"templateName":"",
		   "templateSections":[{
			           "sectionName":"",
			           "durations":"",
			           "priority":""
			          }]
			};
		};
		$scope.initializeTemplate();
		
		$scope.addNewSection=function(){
			    index++;
			   var element=angular.element("#newTemplateForm");
				var section='<div id='+index+' class="form-group">'+
				'<label for="section" class="col-sm-1 col-xs-12 control-label">Section<span class="text-red">*</span></label>'+
				'<div class="col-sm-5 col-xs-12">'+
				'<input type="text" class="form-control" name="section'+index+'" ng-model="template.templateSections['+index+'].sectionName"  id="section" placeholder="Section" required="required">'+
				'</div>'+
				'<label for="section" class="col-sm-2 col-xs-12 control-label">Video Duration<span class="text-red">*</span></label>'+
				'<div class="col-sm-3 col-xs-12">'+
				'<input type="number"  min="30" max="120" class="form-control" name="duration'+index+'" ng-model="template.templateSections['+index+'].durations"  id="duration" placeholder="Duration In Secs" required="required">'+
				'</div>'+
				'<div class="col-sm-1 col-xs-1">'+
				'	<a class="btn btn-danger" ng-click="removeSection('+index+')" role="button"><span class="glyphicon glyphicon-remove"></span></a>'+
				'</div>'+
			    '</div>';
				var elem =$compile(section)($scope);
				element.append(elem);
		};
		$scope.removeSection=function(id){
			   angular.element("#"+id).remove();
			  };
		
		
		$scope.createTemplate=function(){
			var temp={"templateName":$scope.template.templateName,
					"templateSections":$scope.template.templateSections
			};
				$loading.start("main");
			
				newTemplateFactory.createTemplate(temp).then(function(){
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