(function(){
	
	function submitTechController($scope,$loading,$uibModalInstance,viewSubmissionFactory,submmision,userDetails){
		 
		$scope.postedOnce=false;
		$scope.techUserIds=[];
		$scope.techUsers	=[];
		$scope.ok = function () {
			    $uibModalInstance.close();
			  };
			  
	     $scope.cancel = function () {
			    $uibModalInstance.dismiss($scope.postedOnce);
	     };
	     
	     $scope.fetchSaveTech = function () {
	    	 $loading.start("main");
	    	 viewSubmissionFactory.fetchSaveTech(submmision.submmision).then(function(response){
	    		var temp=  angular.copy(userDetails.techUsers);
	    		var temp1=[];
	    		angular.forEach(response, function(t1){
	    			temp1.push(t1.userId);
 	 		   });
	    		
	    	   angular.forEach(temp, function(techUsers){
	 	 				if(temp1.indexOf(techUsers.id)===-1){
	 	 					$scope.techUsers.push(techUsers);
	 	 				}
	 		   });
			 $loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
	     };
	     
	     $scope.fetchSaveTech();
	     
	     $scope.saveTech = function () {
	    	 if($scope.techUserIds.length===0){
	    		 $uibModalInstance.close($scope.postedOnce);
	    	 }else{
	    		 $loading.start("main");
		    	 viewSubmissionFactory.saveTech(submmision.submmision,$scope.techUserIds).then(function(response){
		    		 $scope.postedOnce=true;
				 $loading.finish("main");
		    	 $uibModalInstance.close($scope.postedOnce);
				}).catch(function(){
					$loading.finish("main");
				});
	    	 }
	    	
	     };
	     
	     $scope.assignTechId= function (id) {
	    	 var index=$scope.techUserIds.indexOf(id);
				if(index===-1){
					$scope.techUserIds.push(id);
				}else{
					$scope.techUserIds.splice(index,1);
				}
	     };
			
	};
	
	submitTechController.$inject=['$scope','$loading','$uibModalInstance','viewSubmissionFactory','submmision','userDetails'];
	
	angular.module('vResume.myJobs').controller("submitTechController",submitTechController);
	
})();