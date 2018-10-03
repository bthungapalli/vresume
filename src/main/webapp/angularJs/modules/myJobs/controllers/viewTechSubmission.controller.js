(function(){
	
	function viewTechSubmissionController($scope,viewSubmissionFactory,$state,myJobsService,$loading,$uibModal){
		$loading.start("main");
		$scope.status='NEW';
		$scope.job= myJobsService.viewTechSubmissionJob;
		$scope.activeUser=0;
		$scope.activeSection=0;
		$scope.sectionRating=[];
		$scope.statusToMove="";
		$scope.availabilityId=[];
		$scope.rejectionText="";
		
		$scope.initializeStatusCount=function(){
			$scope.statuses={
					"NEW":0,
					"PARK":0,
					"APPROVED":0,
					"REJECTED":0
				};
			
			$scope.activeUser=0;
		};
		
		$scope.initializeStatusCount();
			
		$scope.statusCount=function(statusCounts){
			angular.forEach(statusCounts,function(statusObj){
				$scope.statuses[statusObj.status]=$scope.statuses[statusObj.status]+statusObj.count;
			});
		};
		
			$scope.fetchUsersSubmissionsForStatus=function(){
				$loading.start("main");
				viewSubmissionFactory.fetchTechUsersSubmissions($scope.job.id,$scope.status).then(function(response){
					$scope.activeSection=0;
					$scope.viewSubmission=response;
					if($scope.viewSubmission.submmision !== null){
					 var myVideo = document.getElementsByTagName('video')[0];
					 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
                    $scope.statusToMove="";
					
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
				$loading.start("main");
				viewSubmissionFactory.getTechSubmissionsForUser($scope.job.id,user.userId,$scope.status).then(function(response){
					$scope.viewSubmission.submmision=response;
				 var myVideo = document.getElementsByTagName('video')[0];
				 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
				$scope.sectionRating=[];
				$scope.activeUser=index;
				$scope.statusToMove="";
				$scope.rejectionText="";
				$scope.activeSection=0;
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
						updatedSubmission.sections[index].techRating=rating;
				});
				updatedSubmission.status=$scope.statusToMove;
				if(!updatedSubmission.techComments){
					updatedSubmission.techComments=[];
				}
			    if($scope.rejectionText!==''){
					var comment={
							"id":0,
							"submissionId":updatedSubmission.id,
							"comment":$scope.rejectionText,
							"userId":$scope.userDetails.id,
							"userName":$scope.userDetails.firstName + " " +$scope.userDetails.lastName
						};
						updatedSubmission.techComments.push(comment);
				}
			    else{
			    	var comment={
			    			"id":0,
							"submissionId":updatedSubmission.id,
							"comment":"",
							"userId":$scope.userDetails.id,
							"userName":$scope.userDetails.firstName + " " +$scope.userDetails.lastName
						};
						updatedSubmission.techComments.push(comment);
			    }
				viewSubmissionFactory.updateTechSubmission(updatedSubmission).then(function(response){
					$scope.statusToMove="";
					$scope.rejectFlag=false;
					$scope.rejectionText="";
					$scope.fetchUsersSubmissionsForStatus();
				}).catch(function(error){
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
			
	};
	
	viewTechSubmissionController.$inject=['$scope','viewSubmissionFactory','$state','myJobsService','$loading','$uibModal'];
	
	angular.module('vResume.myJobs').controller("viewTechSubmissionController",viewTechSubmissionController);
	
})();