(function(){
	
	function profileController($scope,profileFactory,$loading,$uibModal,$location){
		
		$scope.viewProfile=true;
		$scope.roleEmailIdErrorMessage="";
		$scope.users=[];
		$scope.techUsers=[];
		$scope.search="";
		$scope.resumeInvalidMessage="";
		$scope.videoInvalidMessage=["","","",""];
		$scope.defaultVideos=[0,1,2,3];
		$scope.defaultVideoTitles=["","","",""];
		
		$scope.url=$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/#/viewVideos/" ;
		$scope.videoUrl='';
		
		if($scope.userDetails!==undefined){
			$scope.profileDetails=angular.copy($scope.userDetails);
			$scope.profileDetails.jobType=($scope.profileDetails.jobType).toString();
			$scope.profileDetails.roleEmailId="";
			if($scope.userDetails.role===1){
				$scope.profileDetails.hms=$scope.profileDetails.hms?$scope.profileDetails.hms:[];
				$scope.users=angular.copy($scope.profileDetails.hms);
				$scope.roleType="HM";
				$scope.roleId="2";
			}else if($scope.userDetails.role===2){
				$scope.profileDetails.cms=$scope.profileDetails.cms?$scope.profileDetails.cms:[];
				$scope.users=angular.copy($scope.profileDetails.cms);
				$scope.techUsers=angular.copy($scope.profileDetails.techUsers);
				$scope.roleType="CM";
				$scope.roleId="1";
				$scope.techRoleId="8";
				$scope.fetchAllCMS=function(){
			    	$loading.start("main");
			    	profileFactory.fetchAllCMS().then(function(response){
						$scope.allCMS=response;
						var temp= angular.copy($scope.allCMS);
						$scope.profileDetails.cms.forEach(function(selectedCm){
							 temp.forEach(function(cm,index){
								 if(cm.email===selectedCm.email){
									 $scope.allCMS.splice(index,1);
								 }
							 });
						});
						
						$loading.finish("main");
					}).catch(function(){
						
						$loading.finish("main");
		            });
				};
				$scope.fetchAllCMS();
			}else if($scope.userDetails.role===0){
				$scope.videoUrl=$scope.url+$scope.profileDetails.userToken;
			}
			
		}
		$scope.fileUrl=$scope.profileDetails.defaultResumePath?$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/filedownload?filePath="+$scope.profileDetails.defaultResumePath:'' ;
		$scope.editProfile=function(){
			$scope.viewProfile=!$scope.viewProfile;
			$loading.finish("main");
		};
		
		$scope.changeToInt=function(value){
			return parseInt(value);
		};
		
		$scope.updateProfile=function(){
			$loading.start("main");
			
			$scope.profileImageInvalidMessage="";
			 if($scope.profileDetails.profileImage!==undefined && $scope.profileDetails.profileImage!==null){
				 if(($scope.profileDetails.profileImage.name.substring($scope.profileDetails.profileImage.name.lastIndexOf(".")+1)!=="jpg") && ($scope.profileDetails.profileImage.name.substring($scope.profileDetails.profileImage.name.lastIndexOf(".")+1)!=="jpeg")&& ($scope.profileDetails.profileImage.name.substring($scope.profileDetails.profileImage.name.lastIndexOf(".")+1)!=="png")){
					 $scope.profileImageInvalidMessage="Invalid image format";
				 }
			 }
			
			 $scope.resumeInvalidMessage="";
			 if($scope.profileDetails.defaultResume!==undefined && $scope.profileDetails.defaultResume!==null){
				 if(($scope.profileDetails.defaultResume.name.substring($scope.profileDetails.defaultResume.name.lastIndexOf(".")+1)!=="doc") && ($scope.profileDetails.defaultResume.name.substring($scope.profileDetails.defaultResume.name.lastIndexOf(".")+1)!=="docx") && ($scope.profileDetails.defaultResume.name.substring($scope.profileDetails.defaultResume.name.lastIndexOf(".")+1)!=="pdf") && ($scope.profileDetails.defaultResume.name.substring($scope.profileDetails.defaultResume.name.lastIndexOf(".")+1)!=="xls") ){
					 $scope.resumeInvalidMessage="Invalid file format";
				 }else if(($scope.profileDetails.defaultResume.size/1024000)>1){
					 $scope.resumeInvalidMessage="File size exceeded";
				 }
			 }
			 
//			 $scope.videoInvalidMessage="";
//			 if($scope.profileDetails.defaultVideo !== undefined && $scope.profileDetails.defaultVideo !== null){
//				 if($scope.profileDetails.defaultVideo.type.indexOf("mp4")===-1 && $scope.profileDetails.defaultVideo.type.indexOf("webm")===-1 && $scope.profileDetails.defaultVideo.type.indexOf("ogg")===-1 && $scope.profileDetails.defaultVideo.type.indexOf("ogv")===-1 ){
//					 $scope.videoInvalidMessage="Invalid file format";
//				 }else if(($scope.profileDetails.defaultVideo.size/1024000)>10){
//					 $scope.videoInvalidMessage="File size exceeded";
//				 }
//			 }
			 var isError=false;
			 
			 angular.forEach($scope.profileDetails.defaultVideo, function(value, key) {
					 $scope.videoInvalidMessage[key]="";
					 if(value.type.indexOf("mp4")===-1 && value.type.indexOf("webm")===-1 && value.type.indexOf("ogg")===-1 && value.type.indexOf("ogv")===-1 ){
						 $scope.videoInvalidMessage[key]="Invalid file format";
						 isError=true;
					 }else if((value.size/1024000)>10){
						 isError=true;
						 $scope.videoInvalidMessage[key]="File size exceeded";
					 }
					 if($scope.defaultVideoTitles[key]===''){
						 isError=true;
						 $scope.videoInvalidMessage[key]="Video Title is required";
					 }
					 if( $scope.defaultVideoTitles[key]!==''){
						 angular.forEach($scope.defaultVideoTitles, function(title, index) {
							 if(parseInt(key)!==index && title===$scope.defaultVideoTitles[key]){
								 isError=true;
								 $scope.videoInvalidMessage[key]="Video Title is duplicate";
							 }
						 });
						 angular.forEach($scope.profileDetails.defaultVideos, function(video, index) {
							 if(video.videoTitle===$scope.defaultVideoTitles[key]){
								 isError=true;
								 $scope.videoInvalidMessage[key]="Video Title is duplicate";
							 }
						 });
					 }
			 });
			 
			
			 if( isError || $scope.resumeInvalidMessage!=="" || $scope.profileImageInvalidMessage!==""){
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
						if($scope.profileDetails.defaultVideo){
							var i=0;
							var j=0;
							var length= Object.keys($scope.profileDetails.defaultVideo).length;
							var videos=[];
							 angular.forEach($scope.profileDetails.defaultVideo, function(value, key) {
								 i++;
								 var temp={
										 "defaultVideo":value,
										 "videoTitle":angular.copy($scope.defaultVideoTitles[key])
								 };
								 
								 profileFactory.uploadDefaultVideo(temp).then(function(response){
									 j++;
									 videos.push(response);
									 if(j===length){
										 $scope.updateSuccess(updatedUserDetails,videos);
									 }
								 });
							 });
						}else{
							$scope.updateSuccess(updatedUserDetails);
						}
						
						
						
					}).catch(function(){
						$loading.finish("main");
					});
			 }
			 

		};
		
		$scope.updateSuccess=function(updatedUserDetails,videos){
			if(updatedUserDetails.imagePath!==null){
				$scope.profileDetails.imagePath=updatedUserDetails.imagePath;
				$scope.profileDetails.profieImageBytes=updatedUserDetails.profieImageBytes;
				$scope.profileDetails.profileImage=null;
			}
			if(updatedUserDetails.defaultResumePath){
				$scope.profileDetails.defaultResumePath=updatedUserDetails.defaultResumePath;
				$scope.fileUrl=$scope.profileDetails.defaultResumePath?$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/filedownload?filePath="+$scope.profileDetails.defaultResumePath:'' ;
				$scope.profileDetails.defaultResume=null;
			}
			
			if(videos){
				if(!$scope.profileDetails.defaultVideos){
					$scope.profileDetails.defaultVideos=[];
				}
				 angular.forEach(videos, function(video) {
					 $scope.profileDetails.defaultVideos.push(video);
				 });
				$scope.profileDetails.defaultVideo=null;
			}
			$scope.defaultVideoTitles=["","","",""];
			angular.extend($scope.userDetails, $scope.profileDetails);
			if($scope.userDetails.role===1){
				$scope.profileDetails.hms=$scope.profileDetails.hms?$scope.profileDetails.hms:[];
				$scope.users=angular.copy($scope.profileDetails.hms);
				$scope.roleType="HM";
				$scope.roleId="2";
			}else if($scope.userDetails.role===2){
				$scope.profileDetails.cms=$scope.profileDetails.cms?$scope.profileDetails.cms:[];
				$scope.users=angular.copy($scope.profileDetails.cms);
				$scope.roleType="CM";
				$scope.roleId="1";
			}
			$scope.editProfile();
		};
		
		$scope.ValidateEmail=function(mail){
		 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
		  {
		    return (true);
		  }
		    
		    return (false);
		};
		
		$scope.remove=function(index){
			$loading.start("main");
			$scope.profileDetails.roleEmailId="";
			$scope.roleEmailIdErrorMessage="";
			profileFactory.removeCmOrHm($scope.users[index]).then(function(response){
				if($scope.users[index].role===1){
//					var temp=angular.copy($scope.users[index]);
//					temp.role=1;
//					$scope.allCMS.push(temp);
					$scope.userDetails.cms.splice(index,1);
					$scope.users=$scope.userDetails.cms;
				}else if($scope.users[index].role===2){
					$scope.userDetails.hms.splice(index,1);
					$scope.users=$scope.userDetails.hms;
				}
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
		$scope.saveAlreadyExistingCms=function(selectedCms){
		 $loading.start("main");
			profileFactory.saveAlreadyExistingCms(selectedCms).then(function(response){
				/*var temp= angular.copy($scope.allCMS);
				selectedCms.forEach(function(selectedCm){
					 temp.forEach(function(cm,index){
						 if(cm.id===selectedCm.id){
							 $scope.allCMS.splice(index,1);
						 }
					 });
				});*/
				$scope.users = response;
				$scope.userDetails.cms=response;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		 
		};
		
		$scope.checkUser=function(){
			var result = false;
			$scope.users.forEach(function(user){
				if(user.email===$scope.profileDetails.roleEmailId){
					return true;
				}
			});
			return result;
		};
		
		$scope.add=function(){
			$loading.start("main");
			$scope.roleEmailIdErrorMessage="";
			if($scope.ValidateEmail($scope.profileDetails.roleEmailId)){
				profileFactory.checkEmailAvailable($scope.profileDetails.roleEmailId).then(function(response){
					if(response[0]==='alreadyExist'){
						$scope.roleEmailIdErrorMessage="Email Id already exist.";
						$loading.finish("main");
					}else{
						if($scope.checkUser()){
							$scope.roleEmailIdErrorMessage="Already "+$scope.roleType+" Exists";
						}else{
							var newUser={
									"email":$scope.profileDetails.roleEmailId,
									"role":$scope.roleId
							};
							profileFactory.addCmOrHm(newUser).then(function(response){
								newUser.id=response.id;
								$scope.users.push(newUser);
								$scope.profileDetails.roleEmailId="";
								$loading.finish("main");
							}).catch(function(){
								$scope.roleEmailIdErrorMessage="Something went wrong.";
								$loading.finish("main");
							});
						}
					}
				}).catch(function(error){
					$scope.roleEmailIdErrorMessage="Something went wrong.";
					$loading.finish("main");
	            });
			}else{
				$scope.roleEmailIdErrorMessage="Invalid Email Id";
				$loading.finish("main");
			}
		};
		
		$scope.addTech=function(){
			$loading.start("main");
			$scope.roleTechEmailIdErrorMessage="";
			if($scope.ValidateEmail($scope.profileDetails.roleTechEmailId)){
				profileFactory.checkEmailAvailable($scope.profileDetails.roleTechEmailId).then(function(response){
					if(response[0]==='alreadyExist'){
						$scope.roleTechEmailIdErrorMessage="Email Id already exist.";
						$loading.finish("main");
					}else{
						if($scope.checkUser()){
							$scope.roleTechEmailIdErrorMessage="Already "+$scope.roleType+" Exists";
						}else{
							var newUser={
									"email":$scope.profileDetails.roleTechEmailId,
									"role":$scope.techRoleId
							};
							profileFactory.addCmOrHm(newUser).then(function(response){
								newUser.id=response.id;
								$scope.techUsers.push(newUser);
								$scope.profileDetails.roleTechEmailId="";
								$loading.finish("main");
							}).catch(function(){
								$scope.roleTechEmailIdErrorMessage="Something went wrong.";
								$loading.finish("main");
							});
						}
					}
				}).catch(function(error){
					$scope.roleTechEmailIdErrorMessage="Something went wrong.";
					$loading.finish("main");
	            });
			}else{
				$scope.roleTechEmailIdErrorMessage="Invalid Email Id";
				$loading.finish("main");
			}
		};
		
		$scope.removeTechnical=function(index){
			$loading.start("main");
			$scope.profileDetails.roleTechEmailId="";
			$scope.roleTechEmailIdErrorMessage="";
			profileFactory.removeCmOrHm($scope.techUsers[index]).then(function(response){
				if($scope.techUsers[index].role===8){
					$scope.userDetails.techUsers.splice(index,1);
					$scope.techUsers=$scope.userDetails.techUsers;
				}
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
		$scope.downloadDefaultResumeFile=function(){
			$scope.profileDetails.defaultResumePath;
			profileFactory.downloadFile($scope.profileDetails.defaultResumePath).then(function(response){
				
			});
		};
		
		$scope.openVideo=function(url){
			var modalInstance = $uibModal.open({
				  animate:true,
				  backdrop: 'static',
				  keyboard:false,
			      templateUrl: 'partials/profile/defaultVideo.html',
			      size: 'lg',
			      controller:'defaultVideoController',
			      resolve:{
			    	  url:function(){
			    		  return url;
			          }
			      }
			    });

			 modalInstance.result.then(function(data){
				 //ok
				 if(data.length>0){
					 $scope.saveAlreadyExistingCms(data);
				 }
				 
				 
			   }, function () {
			     // cancel
			    });
		};
		
		$scope.deleteVideo=function(id,index){
			 if(confirm("Do you want to delete Video!")){
				 $loading.start("main");
					profileFactory.deleteVideo(id).then(function(response){
						$scope.profileDetails.defaultVideos[index]={"videoTitle":null};
						$scope.userDetails.defaultVideos=$scope.profileDetails.defaultVideos;
						$loading.finish("main");
					}).catch(function(){
						
						$loading.finish("main");
		            });
			 }
		};
		
		$scope.availableCMS=function(){
			$scope.roleEmailIdErrorMessage="";
			$scope.profileDetails.roleEmailId="";
			$loading.start("main");
	    	profileFactory.fetchAllCMS().then(function(response){
				$scope.allCMS=response;
				var temp= angular.copy($scope.allCMS);
				$scope.userDetails.cms.forEach(function(selectedCm){
					$scope.allCMS.forEach(function(cm,index){
						 if(cm.email===selectedCm.email){
							 $scope.allCMS.splice(index,1);
						 }
					 });
				});
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
					 if(data.length>0){
						 $scope.saveAlreadyExistingCms(data);
					 }
					 
					 
				   }, function () {
				     // cancel
				    });
				$loading.finish("main");
			}).catch(function(){
				
				$loading.finish("main");
            });
			
		};
		$scope.onSuccess=function(){
			alert("Copied");
		};
		
		$loading.finish("main");
	};
	
	profileController.$inject=['$scope','profileFactory','$loading','$uibModal','$location'];
	
	angular.module('vResume.profile').controller("profileController",profileController);
	
})();