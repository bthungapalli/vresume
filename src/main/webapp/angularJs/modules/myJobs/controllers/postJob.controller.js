(function(){
	
	function postJobController($scope,postJobFactory,$state,myJobsService){
		
		$scope.initializePostJob=function(){
			$scope.postJob={
					"templateId":$scope.templates[0].templateId,
					"hiringUserId":"Select Hiring Manager",
					"title":"",
					"location":"",
					"jobType":0,
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
			if(myJobsService.editJob===null){
				$scope.postOrUpdateLabel="POST";
				$scope.initializePostJob();
			}else{
				$scope.postOrUpdateLabel="UPDATE";
				$scope.postJob=myJobsService.editJob;
				$scope.postJob.compensation=parseInt($scope.postJob.compensation);
				$scope.postJob.experience=parseInt($scope.postJob.experience);
				$scope.postJob.hiringUserId=($scope.postJob.hiringUserId).toString();
			}
			
		}).catch(function(){
			
		});
		
		$scope.createJob=function(){
			postJobFactory.createPost($scope.postJob).then(function(){
				$scope.initializePostJob();
				$state.go("main.myJobsConsultancy");
			}).catch(function(){
				
			});
		};
		
		$scope.updateJob=function(){
			postJobFactory.updateJob($scope.postJob).then(function(){
				$state.go("main.myJobsConsultancy");
			}).catch(function(){
				
			});
		};
	
	};
	
	postJobController.$inject=['$scope','postJobFactory','$state','myJobsService'];
	
	angular.module('vResume.myJobs').controller("postJobController",postJobController);
})();