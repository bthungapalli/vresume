(function(){
	
	function viewSubmissionController($scope,viewSubmissionFactory,$state,myJobsService,$loading,$uibModal){
		$loading.start("main");
		$scope.status='NEW';
		$scope.job= myJobsService.viewSubmissionJob;
		$scope.activeUser=0;
		$scope.activeSection=0;
		$scope.sectionRating=[];
		$scope.statusToMove="";
		$scope.availabilityId=[];
		$scope.interviewMode="INPERSON";
		$scope.rejectionText="";
		
		$scope.initializeStatusCount=function(){
			$scope.statuses={
					"NEW":0,
					"SUBMITTED_HM":0,
					"PARK":0,
					"INTERVIEW_SCHEDULED":0,
					"HIRED":0,
					"REJECTED":0
				};
			$scope.bulkSubmissions=[];
			$scope.bulkSubmissionIds=[];
			$scope.addedToBulk=false;
			$scope.activeUser=0;
		};
		$scope.bulkSubmissions=[];
		$scope.bulkSubmissionIds=[];
		$scope.addedToBulk=false;
		$scope.initializeStatusCount();
			
		$scope.statusCount=function(statusCounts){
			angular.forEach(statusCounts,function(statusObj){
				$scope.statuses[statusObj.status]=$scope.statuses[statusObj.status]+statusObj.count;
			});
		};
		
			$scope.fetchUsersSubmissionsForStatus=function(){
				$loading.start("main");
				viewSubmissionFactory.fetchUsersSubmissions($scope.job.id,$scope.status).then(function(response){
					$scope.viewSubmission=response;
					if($scope.viewSubmission.submmision !== null){
					 var myVideo = document.getElementsByTagName('video')[0];
					 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
                    $scope.statusToMove="";
                    $scope.availabilityId=[];
					if($scope.status==="INTERVIEW_SCHEDULED"){
						$scope.availabilityId=$scope.viewSubmission.submmision.availabilityId;
						$scope.interviewMode=$scope.viewSubmission.submmision.interviewMode;
					}
				}
					$scope.initializeStatusCount();
					$scope.statusCount($scope.viewSubmission.statusCounts);
					$loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
			};
			
			$scope.fetchUsersSubmissionsForStatus();
		
			$scope.changeSection=function(index){
				$loading.start("main");
				$scope.error="";
				$scope.activeSection=index;
				 var myVideo = document.getElementsByTagName('video')[0];
				 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
				$loading.finish("main");
			};
			
			$scope.fetchSubmissions=function(status){
				$scope.error="";
				$scope.status=status;
				$scope.fetchUsersSubmissionsForStatus();
			};
			
			$scope.getSubmissionsForUser=function(user,index){
				$scope.addedToBulk=false;
				$loading.start("main");
				viewSubmissionFactory.getSubmissionsForUser($scope.job.id,user.userId,$scope.status).then(function(response){
					$scope.activeSection=0;
					$scope.viewSubmission.submmision=response;
				 var myVideo = document.getElementsByTagName('video')[0];
				 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
				$scope.sectionRating=[];
				$scope.activeUser=index;
				$scope.statusToMove="";
				$scope.rejectionText="";
				if($scope.bulkSubmissionIds.indexOf($scope.viewSubmission.submmision.id)>-1){
					$scope.addedToBulk=true;
				}
					$loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
			};
			
			$scope.toStatus=function(status){
				$scope.statusToMove= status;
				
				if($scope.statusToMove!=="INTERVIEW_SCHEDULED" && $scope.status!=="INTERVIEW_SCHEDULED"){
					$scope.interviewMode="INPERSON";
					$scope.availabilityId=[];
					$scope.processError="";
				}
				
				if(status!=='REJECTED'){
					$scope.rejectFlag=false;
				}else{
					$scope.rejectFlag=!$scope.rejectFlag;
				}
				};
			
			$scope.checkRatingValues=function(){
				var i=0;
				angular.forEach($scope.sectionRating,function(rating,index){
					if(rating){
						i++;
					}
				});
				if( i!==$scope.viewSubmission.submmision.sections.length){
					return true;
				}else{
					return false;
				}
			};
			
			$scope.checkStatusToMove=function(){
				if($scope.statusToMove===""){
					return true;
				}
				return false;
			};
			
			$scope.buildSubmissionObj=function(){
				var updatedSubmission=angular.copy($scope.viewSubmission.submmision);
				angular.forEach($scope.sectionRating,function(rating,index){
					if($scope.userDetails.role===2){
						updatedSubmission.sections[index].hmRating=rating;
					}else {
						updatedSubmission.sections[index].cmRating=rating;
					}
				});
				updatedSubmission.status=$scope.statusToMove;
				
					
			    if($scope.statusToMove==="INTERVIEW_SCHEDULED"){
					updatedSubmission.availabilityId=$scope.availabilityId;
					updatedSubmission.interviewMode=$scope.interviewMode;
					updatedSubmission.dateChanged=false;
				}
			    if($scope.rejectionText!==''){
					var comment={
							"submissionId":updatedSubmission.id,
							"comment":$scope.rejectionText,
							"userId":$scope.userDetails.id
						};
						updatedSubmission.comments.push(comment);
				}
			    else{
			    	var comment={
							"submissionId":updatedSubmission.id,
							"comment":"",
							"userId":$scope.userDetails.id
						};
						updatedSubmission.comments.push(comment);
			    }
				viewSubmissionFactory.updateSubmission(updatedSubmission).then(function(response){
					$scope.statusToMove="";
					$scope.rejectFlag=false;
					$scope.rejectionText="";
					$scope.fetchUsersSubmissionsForStatus();
				}).catch(function(error){
					$scope.error="Something went wrong. Please try again";
					$loading.finish("main");
				});
				
			};
			
			$scope.submitRating=function(){
				$loading.start("main");
				$scope.error="";
				$scope.processError="";
				if($scope.checkRatingValues() && ($scope.status==='NEW')){
					$scope.error="Please provide rating for all the sections";
					$loading.finish("main");
				}else if($scope.checkStatusToMove()){
					$scope.error="Please select the status to move ";
					$loading.finish("main");
				}else if($scope.statusToMove==="REJECTED" && $scope.rejectionText===''){
					$scope.error="Please provide reason for rejection";
					$loading.finish("main");
				}else if($scope.statusToMove==="INTERVIEW_SCHEDULED" && ($scope.interviewMode==="" || $scope.interviewMode===null || $scope.availabilityId.length===0)){
					$scope.processError="Please select Availability and mode of interview";
					$loading.finish("main");
				}else{
					$scope.buildSubmissionObj();
				}
			};
			
			$scope.fileDownload=function(){
				//$loading.start("main");
				viewSubmissionFactory.fileDownload($scope.viewSubmission.submmision).then(function(response){
					//$loading.finish("main");
				}).catch(function(){
					//$loading.finish("main");
				});
			};
			
			$scope.assignAvailabilityId=function(id){
				var index=$scope.availabilityId.indexOf(id);
				if(index===-1){
					$scope.availabilityId.push(id);
				}else{
					$scope.availabilityId.splice(index,1);
				}
			};
			
			$scope.editAvailabilities=function(){
				var modalInstance = $uibModal.open({
					  animate:true,
					  backdrop: 'static',
					  keyboard:false,
				      templateUrl: 'partials/editAvailabilities.html',
				      size: 'lg',
				      controller:'editAvailabilitiesController',
				      resolve:{
				    	  submmision:function(){
				    		  return $scope.viewSubmission.submmision;
				          },
				          availabilityId:function(){
				    		  return $scope.availabilityId;
				          }
				      }
				    });

				 modalInstance.result.then(function(){
					 //ok
					 $scope.availabilityId=$scope.viewSubmission.submmision.availabilityId;
					 $scope.toStatus('INTERVIEW_SCHEDULED');
				   }, function () {
				     // cancel
				    });
			};
			
			$scope.assignInterviewMode=function(mode){
				$scope.interviewMode=mode;
			};
			
			$scope.removeFromBulk=function(index,submission){
				$scope.bulkSubmissionIds.splice(index,1);
				$scope.bulkSubmissions.splice(index,1);
				if(submission.id===$scope.viewSubmission.submmision.id){
					$scope.addedToBulk=false;
				}
			};
			
			$scope.addToBulk=function(submission){
				$scope.error="";
				if(submission!==undefined){
					if($scope.checkRatingValues() && $scope.status==='NEW'){
						$scope.error="Please provide rating for all the sections before adding to bulk";
					}else{
						var index=$scope.bulkSubmissionIds.indexOf(submission.id);
						if(index===-1){
							var updatedSubmission=angular.copy(submission);
							angular.forEach($scope.sectionRating,function(rating,index){
								if($scope.userDetails.role===2){
									updatedSubmission.sections[index].hmRating=rating;
								}else {
									updatedSubmission.sections[index].cmRating=rating;
								}
							});
							if($scope.rejectionText!==''){
								var comment={
										"submissionId":updatedSubmission.id,
										"comment":$scope.rejectionText,
										"userId":$scope.userDetails.id
									};
								updatedSubmission.comments.push(comment);
							}
							updatedSubmission.status="SUBMITTED_HM";
							updatedSubmission["user"]=$scope.viewSubmission.users[$scope.activeUser];
							$scope.bulkSubmissionIds.push(updatedSubmission.id);
							$scope.bulkSubmissions.push(updatedSubmission);
							$scope.addedToBulk=true;
						}else{
							$scope.bulkSubmissionIds.splice(index,1);
							$scope.bulkSubmissions.splice(index,1);
							$scope.addedToBulk=false;
						}
					}
				}
			};
		
			
			$scope.bulkSubmissionToHM=function(){
				$loading.start("main");
				viewSubmissionFactory.bulkSubmission($scope.bulkSubmissions).then(function(response){
					$scope.statusToMove="";
					$scope.rejectFlag=false;
					$scope.rejectionText="";
					$scope.fetchUsersSubmissionsForStatus();
				}).catch(function(error){
					$loading.finish("main");
				});
			};
			
			$scope.submitTech=function(){
				
				if($scope.checkRatingValues() && ($scope.status==='NEW')){
					$scope.error="Please provide rating for all the sections";
				}else{
					var modalInstance = $uibModal.open({
						  animate:true,
						  backdrop: 'static',
						  keyboard:false,
					      templateUrl: 'partials/submitTech.html',
					      size: 'lg',
					      controller:'submitTechController',
					      resolve:{
					    	  submmision:function(){
					    		  return $scope.viewSubmission;
					          },
					          userDetails:function(){
					    		  return $scope.userDetails;
					          }
					      }
					    });

					 modalInstance.result.then(function(result){
						
						 if($scope.viewSubmission.submmision.status === "SUBMITTED_HM" && result){
							 $loading.start("main");
							 $scope.statusToMove="SUBMIT_TECH";
							 $scope.buildSubmissionObj();
						 }
						 
					   }, function () {
					    });
				}
			};
		
			$scope.viewTechStatus=function(){
				
				var modalInstance = $uibModal.open({
					  animate:true,
					  backdrop: 'static',
					  keyboard:false,
				      templateUrl: 'partials/viewTechStatus.html',
				      size: 'lg',
				      controller:'viewTechStatusController',
				      resolve:{
				    	  submmision:function(){
				    		  return $scope.viewSubmission;
				          },
				          userDetails:function(){
				    		  return $scope.userDetails;
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
	
	viewSubmissionController.$inject=['$scope','viewSubmissionFactory','$state','myJobsService','$loading','$uibModal'];
	
	angular.module('vResume.myJobs').controller("viewSubmissionController",viewSubmissionController);
	
})();