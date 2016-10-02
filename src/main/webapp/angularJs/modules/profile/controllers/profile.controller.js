(function(){
	
	function profileController($scope,profileFactory){
		
		$scope.viewProfile=true;
		
		$scope.profileDetails=angular.copy($scope.userDetails);
		
		$scope.editProfile=function(){
			$scope.viewProfile=!$scope.viewProfile;
		};
		
		$scope.updateProfile=function(){
			profileFactory.updateProfile($scope.profileDetails).then(function(response){
				if(response.imagePath!==null){
					$scope.profileDetails.imagePath=response.imagePath;
				}
				angular.extend($scope.userDetails, $scope.profileDetails);
				$scope.editProfile();
			}).catch(function(){
				
			});
		};
		
	};
	
	profileController.$inject=['$scope','profileFactory'];
	
	angular.module('vResume.profile').controller("profileController",profileController);
	
})();