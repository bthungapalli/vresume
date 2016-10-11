(function(){
	
	function applyJobController($scope,$state,openingsFactory,openingsService){
		
		$scope.resume={
				"sections":[],
				"interviewAvailability":[
				                         {"startTime":"Start Time",
				                          "endTime":"End Time"
				                         },
				                         {"startTime":"Start Time",
					                          "endTime":"End Time"
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
		
		$scope.applyJob=function(){
			openingsFactory.applyJob($scope.resume,$scope.opening).then(function(response){
				
			}).catch(function(){
				
			});
		};
		
	};
	
	applyJobController.$inject=['$scope','$state','openingsFactory','openingsService'];
	
	angular.module('vResume.openings').controller("applyJobController",applyJobController);
	
})();