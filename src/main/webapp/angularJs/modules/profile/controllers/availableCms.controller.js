(function(){
	
	function availableCmsController($scope,$loading,$uibModalInstance,allCms){
		
		$scope.errorMessage="";
		$scope.finalCms=[];
		$scope.allCms=allCms;
		 $scope.ok = function () {
			 var temp=[];
			 $scope.allCms.forEach(function(cm){
				if($scope.finalCms.indexOf(cm.id)>-1){
					temp.push(cm);
				}	
			});
		 $uibModalInstance.close(temp);
		};

	     $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
	     };
	     
	     $scope.addToCMList=function(cm){
	    	 if($scope.finalCms.indexOf(cm.id)>-1){
	    		 $scope.finalCms.splice($scope.finalCms.indexOf(cm.id),1);
	    	 }else{
	    		 $scope.finalCms.push(cm.id);
	    	 }
	     };
	    
	};
	
	availableCmsController.$inject=['$scope','$loading','$uibModalInstance','allCms'];
	
	angular.module('vResume.profile').controller("availableCmsController",availableCmsController);
	
})();