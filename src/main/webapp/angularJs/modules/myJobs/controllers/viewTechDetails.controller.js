(function(){
	
	function viewTechDetailsController($scope,$loading,$uibModalInstance,viewSubmissionFactory,submmision,userDetails,submissionUser){
		$scope.ok = function () {
			    $uibModalInstance.close();
			  };
	     $scope.addComment="";
	     $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
	     };
	     $scope.comments=[];
	     $scope.sections={};
	     $scope.fetchTechDetails = function () {
	    	 
	    	 $loading.start("main");
	    	 viewSubmissionFactory.fetchTechComments(submissionUser.id,submmision.submmision.id).then(function(response){
	    		 if(response){
	    			 $scope.sections=response.sections;
	    			 $scope.comments=response.techComments;
	    		 }
		    	  
		    	   $loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
	     };
	     
	     $scope.fetchTechDetails();
	     
	     $scope.submitComment = function (addComment) {
	    	 $loading.start("main");
	    	 viewSubmissionFactory.submitComment(submissionUser.id,addComment,submmision.submmision.id).then(function(response){
		    	  $scope.addComment="";
		    	  angular.element('#comment').val("");
		    	  $scope.fetchTechDetails();
		    	   $loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
	     };
	     
	};
	
	viewTechDetailsController.$inject=['$scope','$loading','$uibModalInstance','viewSubmissionFactory','submmision','userDetails','submissionUser'];
	
	angular.module('vResume.myJobs').controller("viewTechDetailsController",viewTechDetailsController);
	
})();