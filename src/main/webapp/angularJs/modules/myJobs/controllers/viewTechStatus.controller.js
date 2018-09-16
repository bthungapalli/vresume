(function(){
	
	function viewTechStatusController($scope,$loading,$uibModalInstance,viewSubmissionFactory,$uibModal,submmision,userDetails){
		 
		$scope.techUserIds=[];
		$scope.techUsers	= [];
		$scope.ok = function () {
			    $uibModalInstance.close();
			  };
			  
	     $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
	     };
	     
	     $scope.fetchSaveTech = function () {
	    	 $loading.start("main");
	    	 viewSubmissionFactory.fetchSaveTech(submmision.submmision).then(function(response){
	    		var temp=  angular.copy(userDetails.techUsers);
	    	   angular.forEach(temp, function(techUsers){
	    		   angular.forEach(response, function(t1){
	    			   if(t1.userId===techUsers.id){
	    				   t1["email"]=techUsers.email;
		 				} 
	    		   });
	 		   });
	    	   $scope.techUsers=response;
			 $loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
	     };
	     
	     $scope.fetchSaveTech();
	     
	     $scope.viewDetails = function (submissionUser) {
					
					var modalInstance = $uibModal.open({
						  animate:true,
						  backdrop: 'static',
						  keyboard:false,
					      templateUrl: 'partials/viewTechDetails.html',
					      size: 'lg',
					      controller:'viewTechDetailsController',
					      resolve:{
					    	  submmision:function(){
					    		  return submmision;
					          },
					          userDetails:function(){
					    		  return userDetails;
					          },
					          submissionUser:function(){
					    		  return submissionUser;
					          }
					      }
					    });

					 modalInstance.result.then(function(){
						 //ok
					   }, function () {
					     // cancel
					    });
	     };
	     
	     
	};
	
	viewTechStatusController.$inject=['$scope','$loading','$uibModalInstance','viewSubmissionFactory','$uibModal','submmision','userDetails'];
	
	angular.module('vResume.myJobs').controller("viewTechStatusController",viewTechStatusController);
	
})();