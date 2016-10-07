(function(){
	
	function profileController($scope,profileFactory){
		
		$scope.viewProfile=true;
		
		$scope.profileDetails=angular.copy($scope.userDetails);
		
		$scope.editProfile=function(){
			$scope.viewProfile=!$scope.viewProfile;
		};
		
		$scope.changeToInt=function(value){
			return parseInt(value);
		};
		
		$scope.updateProfile=function(){
			profileFactory.updateProfile($scope.profileDetails).then(function(response){
				var updatedUserDetails=response.user;
				if(updatedUserDetails.imagePath!==null){
					$scope.profileDetails.imagePath=updatedUserDetails.imagePath;
					$scope.profileDetails.profieImageBytes=updatedUserDetails.profieImageBytes;
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