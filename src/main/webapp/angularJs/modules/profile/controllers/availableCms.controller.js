(function(){
	
	function availableCmsController($scope,$loading,$uibModalInstance,allCms){
		
		$scope.errorMessage="";
		$scope.finalCms=[];
		$scope.allCms=allCms;
		 $scope.ok = function () {
			    $uibModalInstance.close($scope.finalCms);
			  };

	     $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
	     };
	     
	     $scope.addToCMList=function(cm){
	    	 if($scope.finalCms.indexOf(cm)>-1){
	    		 $scope.finalCms.splice($scope.finalCms.indexOf(cm),1);
	    	 }else{
	    		 $scope.finalCms.push(cm);
	    	 }
	     };
	    
	};
	
	availableCmsController.$inject=['$scope','$loading','$uibModalInstance','allCms'];
	
	angular.module('vResume.profile').controller("availableCmsController",availableCmsController);
	
})();