(function(){
	
	function newTemplateController($scope,$compile,newTemplateFactory,$state,$loading){
		$scope.index=1;
		$scope.deletedSections=[]; 
		$scope.errorMessage="";
		$scope.initializeTemplate=function(){
			$scope.template={
					"templateName":"",
					"sections":[],
					"durations":[],
					"internalSections":[false],
					"orders":[]
			};
		};
		
		$scope.initializeTemplate();
		
		$scope.addNewSection=function(){
			    
				var element=angular.element("#newTemplateForm");
//				var section='<div id='+index+' class="form-group">'+
//				'<label for="section" class="col-sm-1 col-xs-12 control-label">Section<span class="text-red">*</span></label>'+
//				'<div class="col-sm-5 col-xs-12">'+
//				'<input type="text" class="form-control" name="section'+index+'" ng-model="template.sections['+index+']"  id="section" placeholder="Section" required="required">'+
//				'</div>'+
//				'<label for="section" class="col-sm-2 col-xs-12 control-label">Video Duration<span class="text-red">*</span></label>'+
//				'<div class="col-sm-3 col-xs-12">'+
//				'<input type="number"  min="3" max="120" class="form-control" name="duration'+index+'" ng-model="template.durations['+index+']"  id="duration" placeholder="Duration In Secs" required="required">'+
//				'</div>'+
//				'<div class="col-sm-1 col-xs-1">'+
//				'	<a class="btn btn-danger" ng-click="removeSection('+index+')" role="button"><span class="glyphicon glyphicon-remove"></span></a>'+
//				'</div>'+
//			    '</div>';
				
				var section='<div id='+$scope.index+' class="form-group">'+
				
				'<label for="section" class="col-sm-1 col-xs-12 control-label">Section<span class="text-red">*</span></label>'+
				'<div class="col-sm-3 col-xs-12">'+
					'<input type="text" class="form-control" name="section'+$scope.index+'" ng-model="template.sections['+$scope.index+']"  id="section" placeholder="Section" required="required">'+
				'</div>'+
				'<label for="section" class="col-sm-1 col-xs-12 control-label">Video Duration<span class="text-red">*</span></label>'+
				'<div class="col-sm-2 col-xs-12">'+
					'<input type="number"  min="30" max="120" class="form-control" name="duration'+$scope.index+'" ng-model="template.durations['+$scope.index+']"  id="duration" placeholder="Video Duration In Secs" required="required">'+
				'</div>'+
				'<label for="order" class="col-sm-1 col-xs-12 control-label">Order<span class="text-red">*</span></label>'+
				'<div class="col-sm-2 col-xs-12">'+
					'<input type="number" class="form-control" min="1" max="{{index}}" name="order" ng-model="template.orders['+$scope.index+']"  id="order" placeholder="Order" required="required">'+
				'</div>'+
				'<div class="col-sm-2 col-xs-12">'+
				'<input type="checkbox" ng-model="template.internalSections['+$scope.index+']" > Internal Section  '+
				'	<a  class="btn btn-xs btn-danger" ng-click="removeSection('+$scope.index+')" role="button"><span class="glyphicon glyphicon-remove"></span></a>'+
				'</div>'+
				'</div>';
				
				var elem =$compile(section)($scope);
				element.append(elem);
				$scope.template.internalSections[$scope.index]=false;
				$scope.index++;
		};
		
		$scope.removeSection=function(id){
			$scope.deletedSections.push(id);
			angular.element("#"+id).remove();
		};
		
		$scope.createTemplate=function(){
			$scope.errorMessage="";
			
			if($scope.checkComma($scope.template.orders)){
				$scope.errorMessage="Please remove comma in section";
			}else{
				if($scope.findDuplicateInArray($scope.template.orders).length===0){
					var temp={"templateName":$scope.template.templateName,
							  "sections":[],
							  "durations":[],
							  "internalSections":[],
							  "orders":[]
					};
					angular.forEach($scope.template.sections,function(section,index){
						if(section.trim()!=="" && $scope.deletedSections.indexOf(index)===-1){
							temp.sections.push(section);
							temp.durations.push($scope.template.durations[index]);
							temp.internalSections.push($scope.template.internalSections[index]);
							temp.orders.push($scope.template.orders[index]);
						}
					});
					if(temp.sections.length>0){
						$loading.start("main");
						newTemplateFactory.createTemplate(temp).then(function(){
							$scope.deletedSections=[];
							$scope.initializeTemplate();
							$state.go('main.templates');
							$loading.finish("main");
						}).catch(function(){
							$loading.finish("main");
						});
					}
				}else{
					$scope.errorMessage="Duplicate Section Order";
				}
			}
		};
		
		$scope.findDuplicateInArray=function(arra1) {
	        var object = {};
	        var result = [];
	        arra1.forEach(function (item,index) {
	        	if($scope.deletedSections.indexOf(index)===-1){
	        		if(!object[item]){
	  	              object[item] = 0;
	  	            object[item] += 1;
	  	        }else{
	  	        	object[item] += 1;
	  	        }
	        	}
	          
	        });

	        for (var prop in object) {
	           if(object[prop] >= 2) {
	               result.push(prop);
	           }
	        }

	        return result;

	    };
		
	    
	    $scope.checkComma=function() {
	    	var result = false;
	    	$scope.template.sections.forEach(function (item,index) {
	    		if(item.includes(",")){
	    			result = true;
	    		}
		    });
	    	return result;
	    };
	};
	
	newTemplateController.$inject=['$scope','$compile','newTemplateFactory','$state','$loading'];
	
	angular.module('vResume.templates').controller("newTemplateController",newTemplateController);
	
})();