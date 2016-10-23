(function(){
	
	function mySubmissionsController($rootScope,$scope,$state,openingsFactory,openingsService,$loading){
		$loading.start("main");
		mySubmissionsFactory.fetchMySubmissions($scope.userDetails.id).then(function(response){
			$scope.mySubmissions=response;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		
	};
	
	mySubmissionsController.$inject=['$rootScope','$scope','$state','mySubmissionsFactory','openingsService','$loading'];
	
	angular.module('vResume.openings').controller("mySubmissionsController",mySubmissionController);
	
})();