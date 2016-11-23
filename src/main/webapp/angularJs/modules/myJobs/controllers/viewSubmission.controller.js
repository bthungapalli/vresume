(function(){
	
	function viewSubmissionController($scope,viewSubmissionFactory,$state,myJobsService,$loading){
		$loading.start("main");
		$scope.status='NEW';
		$scope.job= myJobsService.viewSubmissionJob;
		$scope.activeUser=0;
		$scope.activeSection=0;
		$scope.sectionRating=[];
		$scope.statusToMove="";
		$scope.availabilityId="";
		$scope.interviewMode="INPERSON";
		
		$scope.initializeStatusCount=function(){
			$scope.statuses={
					"NEW":0,
					"SUBMITTED_HM":0,
					"UNDECIDED":0,
					"INTERVIEW_SCHEDULED":0,
					"HIRED":0,
					"REJECTED":0
				};
		};
		
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
					 var myVideo = document.getElementsByTagName('video')[0];
					 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
                    $scope.statusToMove="";
					$scope.initializeStatusCount();
					$scope.statusCount($scope.viewSubmission.statusCounts);
					if($scope.status==="INTERVIEW_SCHEDULED"){
						$scope.availabilityId=$scope.viewSubmission.submmision.availabilityId;
						$scope.interviewMode=$scope.viewSubmission.submmision.interviewMode;
					}
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
				viewSubmissionFactory.getSubmissionsForUser($scope.job.id,user.userId,$scope.status).then(function(response){
					$scope.viewSubmission.submmision=response;
				 var myVideo = document.getElementsByTagName('video')[0];
				 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
				$scope.sectionRating=[];
				$scope.activeUser=index;
					$loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
			};
			
			$scope.toStatus=function(status){
				$scope.statusToMove= status;
				
				if($scope.statusToMove!=="INTERVIEW_SCHEDULED" && $scope.status!=="INTERVIEW_SCHEDULED"){
					$scope.interviewMode="INPERSON";
					$scope.availabilityId="";
					$scope.processError="";
				}
				
				if(status!=='REJECTED'){
					$scope.rejectFlag=false;
				}else{
					$scope.rejectFlag=!$scope.rejectFlag;
				}
				};
			
			$scope.checkRatingValues=function(){
				if( $scope.sectionRating.length!==$scope.viewSubmission.submmision.sections.length){
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
				
				if(updatedSubmission.comments!==null){
					angular.forEach(updatedSubmission.comments,function(comment){
						if(comment.userId===$scope.userDetails.id){
							comment.comment=$scope.rejectionText;
						}
					});
				}else if($scope.statusToMove==="REJECTED"){
					updatedSubmission.comments=[{
						"submissionId":updatedSubmission.id,
						"comment":$scope.rejectionText,
						"userId":$scope.userDetails.id
					}];
				}else if($scope.statusToMove==="INTERVIEW_SCHEDULED"){
					updatedSubmission.availabilityId=$scope.availabilityId;
					updatedSubmission.interviewMode=$scope.interviewMode;
				}
				viewSubmissionFactory.updateSubmission(updatedSubmission).then(function(response){
					$scope.statusToMove="";
					$scope.rejectFlag=false;
					$scope.fetchUsersSubmissionsForStatus();
				}).catch(function(error){
					$loading.finish("main");
				});
				
			};
			
			$scope.submitRating=function(){
				$loading.start("main");
				$scope.error="";
				$scope.processError="";
				if($scope.checkRatingValues() && $scope.status==='NEW'){
					$scope.error="Please provide rating for all the sections";
					$loading.finish("main");
				}else if($scope.checkStatusToMove()){
					$scope.error="Please select the status to move ";
					$loading.finish("main");
				}else if($scope.statusToMove==="REJECTED" && $scope.rejectionText===undefined){
					$scope.error="Please provide reason for rejection";
					$loading.finish("main");
				}else if($scope.statusToMove==="INTERVIEW_SCHEDULED" && ($scope.interviewMode==="" || $scope.availabilityId==="")){
					$scope.processError="Please select Availability and mode of interview";
					$loading.finish("main");
				}else{
					$scope.buildSubmissionObj();
				}
			};
			
			$scope.fileDownload=function(){
				$loading.start("main");
				viewSubmissionFactory.fileDownload($scope.viewSubmission.submmision.resumePath).then(function(response){
					
				}).catch(function(){
					$loading.finish("main");
				});
			};
			
			$scope.assignAvailabilityId=function(id){
				$scope.availabilityId=id;
			};
			
			$scope.assignInterviewMode=function(mode){
				$scope.interviewMode=mode;
			};
			
			
			
			
	};
	
	viewSubmissionController.$inject=['$scope','viewSubmissionFactory','$state','myJobsService','$loading'];
	
	angular.module('vResume.myJobs').controller("viewSubmissionController",viewSubmissionController);
	
})();