(function(){
	
	function profileController($scope,profileFactory,$loading){
		
		$scope.viewProfile=true;
		if($scope.userDetails!==undefined){
			$scope.profileDetails=angular.copy($scope.userDetails);
			$scope.profileDetails.jobType=($scope.profileDetails.jobType).toString();
		}
		
		$scope.editProfile=function(){
			$scope.viewProfile=!$scope.viewProfile;
			$loading.finish("main");
		};
		
		$scope.changeToInt=function(value){
			return parseInt(value);
		};
		$scope.updateProfile=function(){
			$loading.start("main");
			profileFactory.updateProfile($scope.profileDetails).then(function(response){
				var updatedUserDetails=response.user;
				if(updatedUserDetails.imagePath!==null){
					$scope.profileDetails.imagePath=updatedUserDetails.imagePath;
					$scope.profileDetails.profieImageBytes=updatedUserDetails.profieImageBytes;
				}
				angular.extend($scope.userDetails, $scope.profileDetails);
				$scope.editProfile();
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
		
			$scope.viewExperience = true;
			$scope.editExperience = function(){
				$scope.viewExperience = !$scope.viewExperience;
				//$loading.finish("main");
				$scope.updateexpDetails();
			};
			
			$scope.insertexpdetails=function(){
				
				$loading.start("main");
				profileFactory.insertexpdetails($scope.addExpFields).then(function(response){
					 //var expDetails = response.user;
	                 angular.extend($scope.userDetails, $scope.addExpFields);
					$scope.editExperience();
				}).catch(function(){
					$loading.finish("main");
				});
			};
			$scope.updateexpDetails = function(){
				$loading.start("main");
				
				profileFactory.updateexpdetails($scope.addExpFields).then(function(response){
					 var expDetails = response.user;
	                 angular.extend($scope.userDetails, $scope.addExpFields);
					$scope.editExperience();
				}).catch(function(){
					$loading.finish("main");
				});
			};
	        $scope.removeDetails = function(id,index){
	        	
	        	$scope.addExpFields.splice(index, 1);
	        	$loading.start("main");
	        	$scope.id = id;
				profileFactory.removeDetails($scope.id).then(function(response){
					 var remove = response.user;
					 $loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
			};
			
			$scope.initializeExpFields=function(){
				 $scope.addExpFields = [{
			            "employer":"",
			            "jobTitle": "",
			            "joiningDate": "",
			            "releavingDate":""
			        }];
				};
				$scope.initializeExpFields();
				 $scope.addFormFields = function ($event) {
						 $scope.addExpFields.push({
							    "employer":"",
					            "jobTitle": "",
					            "joiningDate": "",
					            "releavingDate":""
				               
				            });
				            $event.preventDefault();
				        };
			
				        
			$scope.options = {
				 maxDate: new Date(),
				  showWeeks: true
			 };
				        
				        $scope.fetchuserexperiences=function(){
					    	$loading.start("main");
					    	profileFactory.fetchuserexperiences().then(function(response){
								$scope.addExpFields=response;
								$loading.finish("main");
							}).catch(function(){
								$loading.finish("main");
				            });
						};
						$scope.fetchuserexperiences();
						  
		
		   
		
		$loading.finish("main");
	};
	
	profileController.$inject=['$scope','profileFactory','$loading'];
	
	angular.module('vResume.profile').controller("profileController",profileController);
	
})();