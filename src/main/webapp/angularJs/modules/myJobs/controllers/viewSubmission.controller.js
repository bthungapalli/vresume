(function(){
	
	function viewSubmissionController($scope,viewSubmissionFactory,$state,myJobsService,$loading){
		$loading.start("main");
		$scope.status='NEW';
		$scope.job= myJobsService.viewSubmissionJob;
		$scope.activeUser=0;
		$scope.activeSection=0;
		$scope.sectionRating=[];
			
			
			$scope.fetchUsersSubmissionsForStatus=function(){
				//viewSubmissionFactory.fetchUsersSubmissions($scope.job.id,$scope.status).then(function(response){
				
					$scope.viewSubmission={  
							   "users":[  
							            {  
							               "createdAt":"2016-10-17",
							               "updatedAt":null,
							               "id":0,
							               "email":"bthungapalli@osius.com",
							               "password":null,
							               "role":0,
							               "firstName":"Bharani",
							               "middleName":null,
							               "lastName":"Thungapalli",
							               "phone":null,
							               "location":null,
							               "currentJobTitle":null,
							               "currentEmployer":null,
							               "experience":null,
							               "currentSalary":0,
							               "expectedSalary":0,
							               "primarySkills":null,
							               "secondarySkills":null,
							               "prefredLocations":null,
							               "jobType":0,
							               "workAuthorization":null,
							               "imagePath":null,
							               "profieImageBytes":null,
							               "verification":false,
							               "confirmed":false,
							               "profileImage":null
							            },
							            {  
							               "createdAt":"2016-12-05",
							               "updatedAt":null,
							               "id":0,
							               "email":"jayabharani@gmail.com",
							               "password":null,
							               "role":0,
							               "firstName":"Bharani1",
							               "middleName":null,
							               "lastName":"Thungapalli",
							               "phone":null,
							               "location":null,
							               "currentJobTitle":null,
							               "currentEmployer":null,
							               "experience":null,
							               "currentSalary":0,
							               "expectedSalary":0,
							               "primarySkills":null,
							               "secondarySkills":null,
							               "prefredLocations":null,
							               "jobType":0,
							               "workAuthorization":null,
							               "imagePath":null,
							               "profieImageBytes":null,
							               "verification":false,
							               "confirmed":false,
							               "profileImage":null
							            }
							         ],
							         "submmision":{  
							            "createdAt":null,
							            "updatedAt":null,
							            "id":7387,
							            "userId":0,
							            "jobId":0,
							            "sections":[  
							               {  
							                  "sectionId":0,
							                  "sectionName":"Introduction",
							                  "submissionId":"7387",
							                  "userRating":4,
							                  "hmRating":0,
							                  "cmRating":0,
							                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
							                  "videoFile":null,
							                  "videoBytes":null
							               },
							               {  
								                  "sectionId":0,
								                  "sectionName":"Technical Skills",
								                  "submissionId":"7387",
								                  "userRating":3,
								                  "hmRating":0,
								                  "cmRating":0,
								                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
								                  "videoFile":null,
								                  "videoBytes":null
								               }
							               ,
							               {  
								                  "sectionId":0,
								                  "sectionName":"Project Expirience",
								                  "submissionId":"7387",
								                  "userRating":2,
								                  "hmRating":0,
								                  "cmRating":0,
								                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
								                  "videoFile":null,
								                  "videoBytes":null
								               },
								               {  
									                  "sectionId":0,
									                  "sectionName":"Education",
									                  "submissionId":"7387",
									                  "userRating":1,
									                  "hmRating":0,
									                  "cmRating":0,
									                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
									                  "videoFile":null,
									                  "videoBytes":null
									               }
							            ],
							            "status":"NEW",
							            "activityUserId":0,
							            "hiringDate":null,
							            "availablities":[  
							               {  
							                  "id":11,
							                  "date":"2016-10-17",
							                  "fromTime":"12:30 PM",
							                  "toTime":"01:30 PM",
							                  "submissionId":7387
							               },
							               {  
							                  "id":12,
							                  "date":"2016-11-02",
							                  "fromTime":"03:30 PM",
							                  "toTime":"04:30 PM",
							                  "submissionId":7387
							               },
							               {  
							                  "id":13,
							                  "date":"2016-11-14",
							                  "fromTime":"01:00 PM",
							                  "toTime":"02:00 PM",
							                  "submissionId":7387
							               }
							            ],
							            "resumeName":"Dev Manager Resume",
							            "resume":null,
							            "resumePath":"E:\\submissions\\106\\7387-ExperienceResume.doc",
							            "resumeBytes":null
							         }
							      };
					
					$loading.finish("main");
				//}).catch(function(){
					//$loading.finish("main");
				//});
			};
			
			$scope.fetchUsersSubmissionsForStatus();
			
			
		
			$scope.changeSection=function(index){
				$loading.start("main");
				$scope.activeSection=index;
				$loading.finish("main");
			};
			
			$scope.fetchSubmissions=function(status){
				$scope.status=status;
				$scope.fetchUsersSubmissionsForStatus();
			};
			
			$scope.getSubmissionsForUser=function(user,index){
				$loading.start("main");
				//viewSubmissionFactory.getSubmissionsForUser($scope.job.id,user.id,$scope.status).then(function(response){
				//	$scope.viewSubmission.submmision=response;
				if(index===1){
					$scope.viewSubmission.submmision={  
				            "createdAt":null,
				            "updatedAt":null,
				            "id":7387,
				            "userId":0,
				            "jobId":0,
				            "sections":[  
				               {  
				                  "sectionId":0,
				                  "sectionName":"Introduction",
				                  "submissionId":"7387",
				                  "userRating":5,
				                  "hmRating":0,
				                  "cmRating":0,
				                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
				                  "videoFile":null,
				                  "videoBytes":null
				               },
				               {  
					                  "sectionId":0,
					                  "sectionName":"Technical Skills",
					                  "submissionId":"7387",
					                  "userRating":4,
					                  "hmRating":0,
					                  "cmRating":0,
					                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
					                  "videoFile":null,
					                  "videoBytes":null
					               }
				               ,
				               {  
					                  "sectionId":0,
					                  "sectionName":"Project Expirience",
					                  "submissionId":"7387",
					                  "userRating":3,
					                  "hmRating":0,
					                  "cmRating":0,
					                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
					                  "videoFile":null,
					                  "videoBytes":null
					               },
					               {  
						                  "sectionId":0,
						                  "sectionName":"Education",
						                  "submissionId":"7387",
						                  "userRating":2,
						                  "hmRating":0,
						                  "cmRating":0,
						                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
						                  "videoFile":null,
						                  "videoBytes":null
						               }
				            ],
				            "status":"NEW",
				            "activityUserId":0,
				            "hiringDate":null,
				            "availablities":[  
				               {  
				                  "id":11,
				                  "date":"2016-12-11",
				                  "fromTime":"01:30 PM",
				                  "toTime":"02:30 PM",
				                  "submissionId":7387
				               },
				               {  
				                  "id":12,
				                  "date":"2017-01-12",
				                  "fromTime":"03:30 PM",
				                  "toTime":"04:30 PM",
				                  "submissionId":7387
				               },
				               {  
				                  "id":13,
				                  "date":"2017-02-14",
				                  "fromTime":"01:00 PM",
				                  "toTime":"02:00 PM",
				                  "submissionId":7387
				               }
				            ],
				            "resumeName":"Dev Manager Resume",
				            "resume":null,
				            "resumePath":"E:\\submissions\\106\\7387-ExperienceResume.doc",
				            "resumeBytes":null
				      };
				}else{
					$scope.viewSubmission.submmision={  
				            "createdAt":null,
				            "updatedAt":null,
				            "id":7387,
				            "userId":0,
				            "jobId":0,
				            "sections":[  
				               {  
				                  "sectionId":0,
				                  "sectionName":"Introduction",
				                  "submissionId":"7387",
				                  "userRating":1,
				                  "hmRating":0,
				                  "cmRating":0,
				                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
				                  "videoFile":null,
				                  "videoBytes":null
				               },
				               {  
					                  "sectionId":0,
					                  "sectionName":"Technical Skills",
					                  "submissionId":"7387",
					                  "userRating":2,
					                  "hmRating":0,
					                  "cmRating":0,
					                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
					                  "videoFile":null,
					                  "videoBytes":null
					               }
				               ,
				               {  
					                  "sectionId":0,
					                  "sectionName":"Project Expirience",
					                  "submissionId":"7387",
					                  "userRating":3,
					                  "hmRating":0,
					                  "cmRating":0,
					                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
					                  "videoFile":null,
					                  "videoBytes":null
					               },
					               {  
						                  "sectionId":0,
						                  "sectionName":"Education",
						                  "submissionId":"7387",
						                  "userRating":4,
						                  "hmRating":0,
						                  "cmRating":0,
						                  "videoPath":"http://183.82.96.9:8080/videos/12345.mp4",
						                  "videoFile":null,
						                  "videoBytes":null
						               }
				            ],
				            "status":"NEW",
				            "activityUserId":0,
				            "hiringDate":null,
				            "availablities":[  
				               {  
				                  "id":11,
				                  "date":"2016-10-17",
				                  "fromTime":"12:30 PM",
				                  "toTime":"01:30 PM",
				                  "submissionId":7387
				               },
				               {  
				                  "id":12,
				                  "date":"2016-11-02",
				                  "fromTime":"03:30 PM",
				                  "toTime":"04:30 PM",
				                  "submissionId":7387
				               },
				               {  
				                  "id":13,
				                  "date":"2016-11-14",
				                  "fromTime":"01:00 PM",
				                  "toTime":"02:00 PM",
				                  "submissionId":7387
				               }
				            ],
				            "resumeName":"Dev Manager Resume",
				            "resume":null,
				            "resumePath":"E:\\submissions\\106\\7387-ExperienceResume.doc",
				            "resumeBytes":null
				      };
				}
				$scope.sectionRating=[];
				$scope.activeUser=index;
					$loading.finish("main");
				//}).catch(function(){
				//	$loading.finish("main");
				//});
				
			
				
			};
	};
	
	viewSubmissionController.$inject=['$scope','viewSubmissionFactory','$state','myJobsService','$loading'];
	
	angular.module('vResume.myJobs').controller("viewSubmissionController",viewSubmissionController);
	
})();