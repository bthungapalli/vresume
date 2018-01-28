(function(){
	
	function profileController($scope,profileFactory,$loading,$uibModal){
		
		$scope.viewProfile=true;
		$scope.roleEmailIdErrorMessage="";
		$scope.users=[];
		$scope.search="";
		$scope.resumeInvalidMessage="";
		$scope.videoInvalidMessage="";
		if($scope.userDetails!==undefined){
			$scope.profileDetails=angular.copy($scope.userDetails);
			$scope.profileDetails.jobType=($scope.profileDetails.jobType).toString();
			$scope.profileDetails.roleEmailId="";
			if($scope.userDetails.role===1){
				$scope.profileDetails.hms=$scope.profileDetails.hms?$scope.profileDetails.hms:[];
				$scope.users=$scope.profileDetails.hms;
				$scope.roleType="HM";
			}else if($scope.userDetails.role===2){
				$scope.profileDetails.cms=$scope.profileDetails.cms?$scope.profileDetails.cms:[];
				$scope.users=$scope.profileDetails.cms;
				$scope.roleType="CM";
				$scope.fetchAllCMS=function(){
			    	$loading.start("main");
			    	profileFactory.fetchAllCMS().then(function(response){
						$scope.allCMS=response;
						$loading.finish("main");
					}).catch(function(){
						
						$loading.finish("main");
		            });
				};
				$scope.fetchAllCMS();
			}
			
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
			$scope.resumeInvalidMessage="";
			 if($scope.profileDetails.defaultResume!==undefined && $scope.profileDetails.defaultResume!==null){
				 if(($scope.profileDetails.defaultResume.name.substring($scope.profileDetails.defaultResume.name.lastIndexOf(".")+1)!=="doc") && ($scope.profileDetails.defaultResume.name.substring($scope.profileDetails.defaultResume.name.lastIndexOf(".")+1)!=="docx") ){
					 $scope.resumeInvalidMessage="Invalid file format";
				 }else if(($scope.profileDetails.defaultResume.size/1024000)>1){
					 $scope.resumeInvalidMessage="File size exceeded";
				 }
			 }
			 
			 $scope.videoInvalidMessage="";
			 if($scope.profileDetails.defaultVideo !== undefined && $scope.profileDetails.defaultVideo !== null){
				 if($scope.profileDetails.defaultVideo.type.indexOf("mp4")===-1 && $scope.profileDetails.defaultVideo.type.indexOf("webm")===-1 && $scope.profileDetails.defaultVideo.type.indexOf("ogg")===-1 && $scope.profileDetails.defaultVideo.type.indexOf("ogv")===-1 ){
					 $scope.videoInvalidMessage="Invalid file format";
				 }else if(($scope.profileDetails.defaultVideo.size/1024000)>10){
					 $scope.videoInvalidMessage="File size exceeded";
				 }
			 }
			
			 if($scope.videoInvalidMessage!=="" || $scope.resumeInvalidMessage!==""){
				 $loading.finish("main");
			 }else{
					if($scope.userDetails.role===1){
						$scope.profileDetails.hms=$scope.users;
					}else if($scope.userDetails.role===2){
						$scope.profileDetails.cms=$scope.users;
					}
					profileFactory.updateProfile($scope.profileDetails).then(function(response){
						$scope.roleEmailIdErrorMessage="";
						$scope.users=[];
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
			 }
			 

		};
		
		$scope.ValidateEmail=function(mail){
		 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
		  {
		    return (true);
		  }
		    
		    return (false);
		};
		
		$scope.remove=function(index){
			$scope.users.splice(index,1);
		};
		
		$scope.add=function(){
			$scope.roleEmailIdErrorMessage="";
			if($scope.ValidateEmail($scope.profileDetails.roleEmailId)){
				if($scope.users.indexOf($scope.profileDetails.roleEmailId)>-1){
					$scope.roleEmailIdErrorMessage="Already "+$scope.roleType+" Exists";
				}else{
					$scope.users.push($scope.profileDetails.roleEmailId);
					$scope.profileDetails.roleEmailId="";
				}
			}else{
				$scope.roleEmailIdErrorMessage="Invalid Email Id";
			}
		};
		
		$scope.availableCMS=function(){
			var modalInstance = $uibModal.open({
				  animate:true,
				  backdrop: 'static',
				  keyboard:false,
			      templateUrl: 'partials/profile/availableCms.html',
			      size: 'lg',
			      controller:'availableCmsController',
			      resolve:{
			    	  allCms:function(){
			    		  return $scope.allCMS;
			          }
			      }
			    });

			 modalInstance.result.then(function(data){
				 //ok
				 data.forEach(function(cm){
						 $scope.allCMS.splice($scope.allCMS.indexOf(cm),1);
				 });
				 $scope.users = $scope.users.concat(data);
				 
			   }, function () {
			     // cancel
			    });
		};
		
		
		$loading.finish("main");
	};
	
	profileController.$inject=['$scope','profileFactory','$loading','$uibModal'];
	
	angular.module('vResume.profile').controller("profileController",profileController);
	
})();