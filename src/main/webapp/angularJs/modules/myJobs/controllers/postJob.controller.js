(function(){
	
	function postJobController($scope,postJobFactory){
		
		$scope.initializePostJob=function(){
			$scope.postJob={
					"templateId":$scope.templates[0].templateId,
					"hmDetails":$scope.HMDetails[0].userId,
					"title":"",
					"location":"",
					"positionType":0,
					"startDate":"",
					"description":"",
					"skills":"",
					"compensation":0,
					"experience":0
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
			}).catch(function(){
				
			});
		};
	
	};
	
	postJobController.$inject=['$scope','postJobFactory'];
	
	angular.module('vResume.myJobs').controller("postJobController",postJobController);
})();