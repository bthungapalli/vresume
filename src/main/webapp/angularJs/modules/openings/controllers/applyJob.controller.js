(function(){
	
	function applyJobController($scope,$state,openingsFactory,openingsService,$loading){
		var today=new Date();
		$scope.error="";
		$scope.dateOptions={
				"first":{
					minDate: today,
		            maxDate: new Date(today.getTime() + 6 * 24 * 60 * 60 * 1000)
				},
				"second":{
					minDate: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
	                maxDate: new Date(today.getTime() + 13 * 24 * 60 * 60 * 1000)
				},
				"third":{
					minDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000),
	                maxDate: new Date(today.getTime() + 20 * 24 * 60 * 60 * 1000)
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
				"attachmentName":""
		};
		
		$scope.endDate1=[$scope.endDate,
		                 $scope.endDate,
		                 $scope.endDate];
		
		
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
		
		$scope.validateFileFormats=function(){
			var i=0;
			angular.forEach($scope.resume.sections,function(section,index){
				if(section.videoFile.type.indexOf("mp4")>0 || section.videoFile.type.indexOf("webm")>0 || section.videoFile.type.indexOf("ogg")>0 || section.videoFile.type.indexOf("ogv")>0){
					$scope.resume.sections[index].videoFileInvalidFormat="";
					i++;
				}else{
					$scope.resume.sections[index].videoFileInvalidFormat="Invalid file format";
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
			if($scope.validateFileFormats() ||  $scope.validateAttachmentFormat() || $scope.validateJobData() ){
				$loading.finish("main");
			}else if($scope.validateSelfRatingData()){
				$scope.error="Please provide self rating for all sections";
				$loading.finish("main");
			}else{
				openingsFactory.applyJob($scope.resume,$scope.opening).then(function(response){
					$loading.finish("main");
					$state.go('main.openings');
							}).catch(function(){
								$loading.start("main");
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