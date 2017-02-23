(function(){
	
	function openingsController($rootScope,$scope,$state,openingsFactory,openingsService,$loading){
		$loading.start("main");
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
	};
	
	openingsController.$inject=['$rootScope','$scope','$state','openingsFactory','openingsService','$loading'];
	
	angular.module('vResume.openings').controller("openingsController",openingsController);
	
})();