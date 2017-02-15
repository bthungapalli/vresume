(function(){
	
	function applyJobController($scope,$state,openingsFactory,openingsService,$loading){
		var today=new Date();
		$scope.error="";
		$scope.dateOptions={
				"first":{
					minDate: today
				},
				"second":{
					minDate:today
				},
				"third":{
					minDate: today
				}
			  };
		
		 $scope.disabled = function(date, mode) {
			    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
			  };
		
			  $scope.timeZones=["PST","CST","EST"];
				$scope.startDate=["8:30 AM","9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM","07:00 PM"];
				$scope.endDate=["9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM","12:00 PM","12:30 PM","01:00 PM","01:30 PM","02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM","05:00 PM","05:30 PM","06:00 PM","06:30 PM","07:00 PM","07:30 PM","08:00 PM"];
				
			  
		$scope.resume={
				"sections":[],
				"interviewAvailability":[
				                         {"from":$scope.startDate[0],
				                          "to":$scope.endDate[0],
				                          "timeZone":$scope.timeZones[0],
				                          "invalid":false
				                         },
				                         {"from":$scope.startDate[0],
					                          "to":$scope.endDate[0],
					                          "timeZone":$scope.timeZones[0],
					                          "invalid":false
					                      },
				                         {"from":$scope.startDate[0],
					                          "to":$scope.endDate[0],
					                          "timeZone":$scope.timeZones[0],
					                          "invalid":false
					                      }],
				"attachment":"",
				"attachmentName":"",
				"notes":""
		};
		
		$scope.endDate1=[$scope.endDate,
		                 $scope.endDate,
		                 $scope.endDate];
		
		$scope.toInt=function(stringDuration){
			var intDurations=[];
			angular.forEach(stringDuration,function(duration){
				intDurations.push(parseInt(duration));
			});
			return intDurations;
		};
		
		$scope.defaultDurations=function(){
			var durations=[];
			angular.forEach($scope.sections.split(','),function(section){
				durations.push(120);
			});
			return durations;
		};
		
		$scope.opening=openingsService.opening;
		openingsFactory.getSections($scope.opening.templateId).then(function(response){
			$scope.sections=response.sections;
			$scope.durations=response.durations!==null?$scope.toInt(response.durations.split(',')):$scope.defaultDurations();
		}).catch(function(){
			
		});
		
		$scope.assignSectionName=function(section,index){
			if($scope.resume.sections[index]===undefined){
				$scope.resume.sections[index]={};
			}
			$scope.resume.sections[index].sectionName=section;
		};
		
		$scope.validateFileFormats=function(){
			var i=0;
			angular.forEach($scope.resume.sections,function(section,index){
				$scope.resume.sections[index].videoFileInvalidDuration="";
				if(section.videoFile.type.indexOf("mp4")>0 || section.videoFile.type.indexOf("webm")>0 || section.videoFile.type.indexOf("ogg")>0 || section.videoFile.type.indexOf("ogv")>0){
					$scope.resume.sections[index].videoFileInvalidFormat="";
					i++;
				}else{
					$scope.resume.sections[index].videoFileInvalidFormat="Invalid file format";
				}
			});
			return i!==$scope.resume.sections.length;
		};
		
		$scope.validateFileDuration=function(){
			var i=0;
			angular.forEach($scope.resume.sections,function(section,index){
				var fileDuration=$scope.durations[index];
				if(section.videoFile.duration<fileDuration){
					section.videoFileInvalidDuration="";
					i++;
				}else{
					section.videoFileInvalidDuration="Duration of the video cannot be more than "+fileDuration+" secs";
				}
			});
			return i!==$scope.resume.sections.length;
		};
		
		$scope.validateAttachmentFormat=function(){
			var i=0;
		if(($scope.resume.attachment.name.substring($scope.resume.attachment.name.lastIndexOf(".")+1)==="doc") || ($scope.resume.attachment.name.substring($scope.resume.attachment.name.lastIndexOf(".")+1)==="docx") ){
			$scope.resume.attachmentInvalidFormat="";
			i++;
		}else{
			$scope.resume.attachmentInvalidFormat="Invalid file format";
		}
			return i!==1;
		};
		
		$scope.validateJobData=function(){
			var invalidFlieSize=false;
			angular.forEach($scope.resume.sections,function(section,index){
				$scope.resume.sections[index].videoFileInvalidDuration="";
				if((section.videoFile.size/1024000)>10 ){
					$scope.resume.sections[index].videoFileInvalidSize="File size exceeded";
					invalidFlieSize= true;
				}else{
					$scope.resume.sections[index].videoFileInvalidSize=" ";
				}
			});
			
			if(($scope.resume.attachment.size/1024000)>1){
				$scope.resume.attachmentInvalidSize="File size exceeded";
				invalidFlieSize= true;
			}
			return invalidFlieSize;
		};
		
		$scope.validateSelfRatingData=function(){
			var invalidSelfRatingData=false;
			angular.forEach($scope.resume.sections,function(section){
				if(section.userRating===undefined || section.userRating===0){
					invalidSelfRatingData= true;
				}
			});
			
			return invalidSelfRatingData;
		};
		
		
		$scope.applyJob=function(){
			$loading.start("main");
			if($scope.validateFileFormats() ||  $scope.validateAttachmentFormat() || $scope.validateJobData() || $scope.validateFileDuration()){
				$loading.finish("main");
			}else if($scope.validateSelfRatingData()){
				$scope.error="Please provide self rating for all sections";
				$loading.finish("main");
			}else{
				openingsFactory.applyJob($scope.resume,$scope.opening).then(function(response){
					$loading.finish("main");
					$state.go('main.openings');
							}).catch(function(){
								$loading.finish("main");
							});
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
	
	applyJobController.$inject=['$scope','$state','openingsFactory','openingsService','$loading'];
	
	angular.module('vResume.openings').controller("applyJobController",applyJobController);
	
})();