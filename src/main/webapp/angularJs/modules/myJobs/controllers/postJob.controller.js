(function(){
	
	function postJobController($scope,postJobFactory,$state){
		
		$scope.initializePostJob=function(){
			$scope.postJob={
					"templateId":$scope.templates[0].templateId,
					"hiringUserId":"Select Hiring Manager",
					"title":"",
					"location":"",
					"positionType":0,
					"startDate":"",
					"description":"",
					"skills":"",
					"compensation":0,
					"experience":0,
					"status":"active"
			};
		};
		
		postJobFactory.fetchTemplatesAndHMDetails().then(function(response){
			$scope.templates=response.templates;
			$scope.HMDetails=response.hiringMgr;
			$scope.initializePostJob();
		}).catch(function(){
			
		});
		
		$scope.createJob=function(){
			postJobFactory.createPost($scope.postJob).then(function(){
				$scope.initializePostJob();
				$state.go("main.myJobsConsultancy");
			}).catch(function(){
				
			});
		};
	
	};
	
	postJobController.$inject=['$scope','postJobFactory','$state'];
	
	angular.module('vResume.myJobs').controller("postJobController",postJobController);
})();