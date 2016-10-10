(function(){
	
	function applyJobController($scope,$state,openingsFactory,openingsService){
		
		$scope.resume={
				"sections":[],
				"interviewAvailability":[],
				"available":[],
				"attachment":"",
				"attachmentName":""
		};
		
		$scope.opening=openingsService.opening;
		openingsFactory.getSections($scope.opening.templateId).then(function(response){
			$scope.sections=response.sections;
		}).catch(function(){
			
		});
		
		
		$scope.applyJob=function(){
			openingsFactory.applyJob($scope.resume).then(function(response){
				
			}).catch(function(){
				
			});
		};
		
	};
	
	applyJobController.$inject=['$scope','$state','openingsFactory','openingsService'];
	
	angular.module('vResume.openings').controller("applyJobController",applyJobController);
	
})();