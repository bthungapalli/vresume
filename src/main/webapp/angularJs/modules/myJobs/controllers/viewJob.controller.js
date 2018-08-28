(function(){
	
	function viewJobController($scope,$state,myJobsFactory,$loading,$location,$stateParams){
		
		$scope.url=$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/#/viewJob/" ;
		$scope.jobUrl=$stateParams.jobId;
		$scope.loading=true;
		$scope.loadingUpdateAvailabilityMessage="";
		$scope.searchVariables = $location.search();
		
		$scope.getJob=function(){
			$scope.loading=true;
			$loading.start("viewjob");
			myJobsFactory.fecthjob($stateParams.jobId).then(function(response){
				$scope.opening=response;
				$scope.loading=false;
				$loading.finish("viewjob");
			}).catch(function(){
				$scope.loading=false;
				$loading.finish("viewjob");
			});
		};
		
		$scope.getJob();
		
		$scope.updateAvailability=function(){
			$scope.loadingUpdateAvailabilityMessage="";
			$loading.start("viewjob");
			$scope.searchVariables["status"];
			$scope.searchVariables["avlId"];
			$scope.searchVariables["jobId"]=$stateParams.jobId;
			myJobsFactory.updateAvailability($scope.searchVariables).then(function(response){
				$scope.loadingUpdateAvailabilityMessage="Successfully updated";
				$loading.finish("viewjob");
			}).catch(function(){
				$scope.loadingUpdateAvailabilityMessage="Failed to update";
				$loading.finish("viewjob");
			});
		};
		
		if($scope.searchVariables.avlId){
			$scope.updateAvailability();
		};
		
		$scope.onSuccess=function(){
			alert("Copied");
		};
		
		$scope.buildJobUrl=function(opening){
			$scope.jobUrl=$scope.url+opening.id;
		};
		
		$scope.getFilteredSections=function(opening){
			if(opening.internalSections){
				var temp=[];
				var sections = opening.sections.split(',');
				var internalSections = opening.internalSections.split(',');
				angular.forEach(sections,function(section,index){
					if(internalSections[index]==='false'){
						temp.push(section);
					}
				});
				return temp.toString();
			}else{
				return opening.sections;
			}
		};
		
	};
	
	viewJobController.$inject=['$scope','$state','myJobsFactory','$loading','$location','$stateParams'];
	
	angular.module('vResume.myJobs').controller("viewJobController",viewJobController);
	
})();