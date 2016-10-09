(function(){
	
	function openingsController($rootScope,$scope,$state,openingsFactory){
		
		
		
		openingsFactory.fetchOpenings().then(function(response){
				$scope.openings=response;
			}).catch(function(){
				
			});
		
	};
	
	openingsController.$inject=['$rootScope','$scope','$state','openingsFactory'];
	
	angular.module('vResume.openings').controller("openingsController",openingsController);
	
})();