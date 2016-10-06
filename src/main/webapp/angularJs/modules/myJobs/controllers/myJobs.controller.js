(function(){
	
	function myJobsController($scope,myJobsFactory){
		
		
		$scope.fetchMyJobs=function(status){
//			myJobsFactory.fetchMyJobs(status).then(function(response){
//				$scope.myJobs=response;
//				$scope.status=status;
//			}).catch(function(){
//				
//			});
			$scope.status=status;
		};
		
		$scope.fetchMyJobs("active");
		
		$scope.myJobs=[{"templateId":15,"hmDetails":"8","title":"test","location":"t","positionType":0,"startDate":"2016-09-27T07:00:00.000Z","description":"ww","skills":"dd,ss,sss","compensation":2,"experience":12,"status":"active"},
		               {"templateId":14,"hmDetails":"8","title":"test","location":"t","positionType":0,"startDate":"2016-09-27T07:00:00.000Z","description":"ww","skills":"dd,ss,sss","compensation":2,"experience":12,"status":"active"},
		               {"templateId":13,"hmDetails":"8","title":"test","location":"t","positionType":0,"startDate":"2016-09-27T07:00:00.000Z","description":"ww","skills":"dd,ss,sss","compensation":2,"experience":12,"status":"active"}];
	
		$scope.changeStatus=function(status,job,index){
			myJobsFactory.changeStatusOfJob(status,job.id).then(function(){
				$scope.myJobs.splice(index, 1);
			}).catch(function(){
				
			});
		};
		
	};
	
	myJobsController.$inject=['$scope','myJobsFactory'];
	
	angular.module('vResume.myJobs').controller("myJobsController",myJobsController);
	
})();