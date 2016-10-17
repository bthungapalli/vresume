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
	};
	
	openingsController.$inject=['$rootScope','$scope','$state','openingsFactory','openingsService','$loading'];
	
	angular.module('vResume.openings').controller("openingsController",openingsController);
	
})();