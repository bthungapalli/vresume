(function(){
	
	function editAvailabilitiesController($scope,$loading,$uibModalInstance,viewSubmissionFactory,availabilityId,submmision){
		
		$scope.errorMessage="";
		var today=new Date();
		
		$scope.dateOptions={
				"first":{
					minDate: today
				},
				"second":{
					minDate: today
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
				"interviewAvailability":[
				                         {"fromTime":submmision.availablities[0].fromTime,
				                          "toTime":submmision.availablities[0].toTime,
				                          "timeZone":submmision.availablities[0].timeZone,
				                          "date":new Date(submmision.availablities[0].date),
				                          "invalid":false,
				                          "id":submmision.availablities[0].id
				                         },
				                         {"fromTime":submmision.availablities[1].fromTime,
					                          "toTime":submmision.availablities[1].toTime,
					                          "timeZone":submmision.availablities[1].timeZone,
					                          "date":new Date(submmision.availablities[1].date),
					                          "invalid":false,
					                          "id":submmision.availablities[1].id
					                      },
				                         {"fromTime":submmision.availablities[2].fromTime,
					                          "toTime":submmision.availablities[2].toTime,
					                          "timeZone":submmision.availablities[2].timeZone,
					                          "date":new Date(submmision.availablities[2].date),
					                          "invalid":false,
					                          "id":submmision.availablities[2].id
					                      }]
		};
		
		$scope.availabilityId=angular.copy(availabilityId);
		
		$scope.endDate1=[$scope.endDate,
		                 $scope.endDate,
		                 $scope.endDate];
			
		 $scope.ok = function () {
			    $uibModalInstance.close($scope.availabilityId,$scope.resume.interviewAvailability);
			  };

	     $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
	     };
	     
	     $scope.assignAvailabilityId=function(id){
				var index=$scope.availabilityId.indexOf(id);
				if(index===-1){
					$scope.availabilityId.push(id);
				}else{
					$scope.availabilityId.splice(index,1);
				}
			};
	     
	     $scope.setEndTime=function(index){
				$scope.resume.interviewAvailability[index].invalid=true;
				if($scope.resume.interviewAvailability[index].fromTime!=="Start Time"){
					$scope.resume.interviewAvailability[index].invalid=false;
					$scope.endDate1[index]=angular.copy($scope.endDate).splice($scope.startDate.indexOf($scope.resume.interviewAvailability[index].fromTime));
					$scope.resume.interviewAvailability[index].toTime=$scope.endDate1[index][0];
				}
			};
	     
	     $scope.saveAvailabilities=function(){
	    	 $scope.errorMessage="";
	    	 if($scope.availabilityId.length===0){
	    		 $scope.errorMessage="Please select atleast one availability.";
	    	 }else{
		    	 $loading.start("editAvailabilities");
		    	var tempSubmission= angular.copy(submmision);
		    	tempSubmission.availabilityId=$scope.availabilityId;
		    	
//		    	 var availability= $scope.resume.interviewAvailability;
				 
//				 var month11= availability[0].date.getMonth()+1;
//				 var month22= availability[1].date.getMonth()+1;
//				 var month33= availability[2].date.getMonth()+1;
//				 
//				 var month1= month11>9?month11:"0"+month11;
//				 var month2= month22>9?month22:"0"+month22;
//				 var month3= month33>9?month33:"0"+month33;
//				 availability[0].date=availability[0].date.getFullYear()+"-"+month1+"-"+availability[0].date.getDate()+"T18:30:00.000Z";
//				 availability[1].date=availability[1].date.getFullYear()+"-"+month2+"-"+availability[1].date.getDate()+"T18:30:00.000Z";
//				 availability[2].date=availability[2].date.getFullYear()+"-"+month3+"-"+availability[2].date.getDate()+"T18:30:00.000Z";
//				
		    	tempSubmission.availablities=$scope.resume.interviewAvailability;
		    	tempSubmission.dateChanged=true;
		    	 viewSubmissionFactory.updateSubmission(tempSubmission).then(function(response){
		    		 submmision.availabilityId=$scope.availabilityId;
		    		 submmision.availablities=$scope.resume.interviewAvailability;
				 $loading.finish("editAvailabilities");
		    	 $uibModalInstance.close();
				}).catch(function(){
					$loading.finish("editAvailabilities");
				});
	    	 }
	    	
	     };
			
			
	};
	
	editAvailabilitiesController.$inject=['$scope','$loading','$uibModalInstance','viewSubmissionFactory','availabilityId','submmision'];
	
	angular.module('vResume.myJobs').controller("editAvailabilitiesController",editAvailabilitiesController);
	
})();