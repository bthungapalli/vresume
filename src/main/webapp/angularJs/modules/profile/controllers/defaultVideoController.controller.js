(function(){
	
	function defaultVideoController($scope,$loading,$uibModalInstance,url){
		
		$scope.errorMessage="";
		$scope.url=url;
		 $scope.ok = function () {
			 
		 $uibModalInstance.close(temp);
		};

	     $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
	     };
	     
	    
	};
	
	defaultVideoController.$inject=['$scope','$loading','$uibModalInstance','url'];
	
	angular.module('vResume.profile').controller("defaultVideoController",defaultVideoController);
	
})();