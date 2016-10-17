(function(){
	
	function applyJobController($scope,$state,openingsFactory,openingsService){
		var today=new Date();
		$scope.error="";
		$scope.dateOptions={
				"first":{
					minDate: today,
		            maxDate: new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000)
				},
				"second":{
					minDate: new Date(today.getTime() + 11 * 24 * 60 * 60 * 1000),
	                maxDate: new Date(today.getTime() + 21 * 24 * 60 * 60 * 1000)
				},
				"third":{
					minDate: new Date(today.getTime() + 22 * 24 * 60 * 60 * 1000),
	                maxDate: new Date(today.getTime() + 32 * 24 * 60 * 60 * 1000)
				}
			  };
		
		$scope.endDate1=[["End Time"],
		                ["End Time"],
		                ["End Time"]];
		
		 $scope.disabled = function(date, mode) {
			    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
			  };
		
		$scope.resume={
				"sections":[],
				"interviewAvailability":[
				                         {"from":"Start Time",
				                          "to":"End Time",
				                          "invalid":true
				                         },
				                         {"from":"Start Time",
					                          "to":"End Time",
					                          "invalid":true
					                      },
				                         {"from":"Start Time",
					                          "to":"End Time",
					                          "invalid":true
					                      }],
				"attachment":"",
				"attachmentName":""
		};
		
		$scope.startDate=["8:00 AM","8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM","07:00 PM"];
		$scope.endDate=["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM","07:00 PM","07:30 PM","08:00 PM"];
		
		$scope.opening=openingsService.opening;
		openingsFactory.getSections($scope.opening.templateId).then(function(response){
			$scope.sections=response.sections;
		}).catch(function(){
			
		});
		
		$scope.assignSectionName=function(section,index){
			if($scope.resume.sections[index]===undefined){
				$scope.resume.sections[index]={};
			}
			$scope.resume.sections[index].sectionName=section;
		};
		
		$scope.validateJobData=function(){
			var invalid=false;
			angular.forEach($scope.resume.sections,function(section){
				if((section.videoFile.size/1024000)>10 || section.userRating===undefined || section.userRating===0){
					invalid= true;
				}
			});
			
			if(($scope.resume.attachment.size/1024000)>1){
				invalid= true;
			}
			return invalid;
		};
		
		
		$scope.applyJob=function(){
			if(!$scope.validateJobData()){
				openingsFactory.applyJob($scope.resume,$scope.opening).then(function(response){
					
				}).catch(function(){
					
				});
			}else{
				$scope.error="Some files exceeded the file limit size";
			}
		};
		
		$scope.setEndTime=function(index){
			$scope.resume.interviewAvailability[index].invalid=true;
			if($scope.resume.interviewAvailability[index].from!=="Start Time"){
				$scope.resume.interviewAvailability[index].invalid=false;
				$scope.endDate1[index]=angular.copy($scope.endDate).splice($scope.startDate.indexOf($scope.resume.interviewAvailability[index].from));
				$scope.resume.interviewAvailability[index].to=$scope.endDate1[index][0];
			}
			
		};
		
		$scope.checkInvalidEndTime=function(index){
			if($scope.resume.interviewAvailability[index].to==="End Time"){
				$scope.resume.interviewAvailability[index].invalid=true;
			}
		};
		
	};
	
	applyJobController.$inject=['$scope','$state','openingsFactory','openingsService'];
	
	angular.module('vResume.openings').controller("applyJobController",applyJobController);
	
})();