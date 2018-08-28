(function(){
	
	function editTemplateController(templatesService,editTemplateFactory,$scope,$compile,$state,$loading){
		$scope.errorMessage="";
		var ediTemplate=angular.copy(templatesService.template);
		ediTemplate.sections=ediTemplate.sections.split(',');
		ediTemplate.internalSections=ediTemplate.internalSections.split(',');
		
		angular.forEach(ediTemplate.internalSections,function(internalSections,index){
			if(internalSections==='true'){
				ediTemplate.internalSections[index]=true;
			}else{
				ediTemplate.internalSections[index]=false;
			}
		});
		
		$scope.defaultDurations=function(){
			var durations=[];
			angular.forEach(ediTemplate.sections,function(section){
				durations.push(60);
			});
			return durations;
		};
		
		$scope.defaultOrders=function(){
			var orders=[];
			/*angular.forEach(ediTemplate.sections,function(section){
				orders.push(60);
			});*/
			return orders;
		};
		
		$scope.toInt=function(stringDuration){
			var intDurations=[];
			angular.forEach(stringDuration,function(duration){
				intDurations.push(parseInt(duration));
			});
			return intDurations;
		};
		
		ediTemplate.durations=ediTemplate.durations!==undefined || ediTemplate.durations!==null?$scope.toInt(ediTemplate.durations.split(',')):$scope.defaultDurations();
		ediTemplate.orders=ediTemplate.orders?$scope.toInt(ediTemplate.orders.split(',')):$scope.defaultOrders();

		$scope.template=ediTemplate;
		var index=ediTemplate.sections.length-1;
		
		$scope.addNewSection=function(){
			$scope.template.sections[$scope.template.sections.length]="";
			$scope.template.durations[$scope.template.durations.length]="";
			$scope.template.internalSections[$scope.template.internalSections.length]=false;
			$scope.template.orders[$scope.template.durations.length]="";
		};
		
		$scope.removeSection=function(id){
			$scope.template.sections.splice(id,1);
			$scope.template.durations.splice(id,1);
			$scope.template.internalSections.splice(id,1);
			$scope.template.orders.splice(id,1);
		};
		
		$scope.updateTemplate=function(){
			$scope.errorMessage="";
			if($scope.findDuplicateInArray($scope.template.orders).length===0){
				var temp={"templateName":$scope.template.templateName,
						"userId":ediTemplate.userId,
	                     "templateId":ediTemplate.templateId,
						  "sections":[],
						  "durations":[],
						  "internalSections":[],
						  "orders":[]
				};
				angular.forEach($scope.template.sections,function(section,index){
					if(section.trim()!==""){
						temp.sections.push(section);
						temp.durations.push($scope.template.durations[index]);
						temp.internalSections.push($scope.template.internalSections[index]);
						temp.orders.push($scope.template.orders[index]);
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
			}else{
				$scope.errorMessage="Duplicate Section Order";
			}
			
		};
		
		$scope.findDuplicateInArray=function(arra1) {
	        var object = {};
	        var result = [];
	        arra1.forEach(function (item,index) {
	        	
	        		if(!object[item]){
	  	              object[item] = 0;
	  	            object[item] += 1;
	  	        }else{
	  	        	object[item] += 1;
	  	        }
	        	
	          
	        });

	        for (var prop in object) {
	           if(object[prop] >= 2) {
	               result.push(prop);
	           }
	        }

	        return result;

	    };
		
	};
	
	editTemplateController.$inject=['templatesService','editTemplateFactory','$scope','$compile','$state','$loading'];
	
	angular.module('vResume.templates').controller("editTemplateController",editTemplateController);
	
})();