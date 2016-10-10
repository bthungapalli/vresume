(function(){
	
	function openingsController($rootScope,$scope,$state,openingsFactory,openingsService){
		
		
		
		openingsFactory.fetchOpenings().then(function(response){
				$scope.openings=response;
			}).catch(function(){
				
			});
		
		$scope.applyJob=function(opening){
			openingsService.opening=opening;
			$state.go("main.applyJob");
		};
	};
	
	openingsController.$inject=['$rootScope','$scope','$state','openingsFactory','openingsService'];
	
	angular.module('vResume.openings').controller("openingsController",openingsController);
	
})();