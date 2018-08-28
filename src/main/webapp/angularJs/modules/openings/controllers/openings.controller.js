(function(){
	
	function openingsController($rootScope,$scope,$state,openingsFactory,openingsService,$loading,$location){
		$loading.start("main");
		
		$scope.url=$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/#/viewJob/" ;
		$scope.jobUrl='';
		
		openingsFactory.fetchOpenings().then(function(response){
			
			$scope.openings=response;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		
		$scope.applyJob=function(opening){
			openingsService.opening=opening;
			$state.go("main.applyJob");
		};
		
		$scope.buildJobUrl=function(opening){
			$scope.jobUrl=$scope.url+opening.id;
		};
		
		$scope.getFilteredSections=function(opening){
			if(opening.internalSections){
				var temp=[];
				var sections = opening.sections.split(',');
				var internalSections = opening.internalSections.split(',');
				angular.forEach(sections,function(section,index){
					if(internalSections[index]==='false'){
						temp.push(section);
					}
				});
				return temp.toString();
			}else{
				return opening.sections;
			}
		};
		
		$scope.getApplyFlag=function(opening){
			
			if(!opening.openDescription){
				$loading.start("main");
				openingsFactory.getApplyFlag(opening.id,$scope.userDetails.id).then(function(response){
					opening.applied=response;
					opening.openDescription=true;
					$loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
			}else{
				opening.openDescription=false;
			}
		};
		
		$scope.onSuccess=function(){
			alert("Copied");
		};
		
	};
	
	openingsController.$inject=['$rootScope','$scope','$state','openingsFactory','openingsService','$loading','$location'];
	
	angular.module('vResume.openings').controller("openingsController",openingsController);
	
})();