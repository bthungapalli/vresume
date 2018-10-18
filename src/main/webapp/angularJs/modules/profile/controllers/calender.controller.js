(function(){
	
	function calenderController($scope,profileFactory,$loading,$uibModal,$location){
		
		$scope.calendarView = 'month';
		$scope.viewDate = new Date();
		$scope.events=[];
		$scope.getCalenders=function(){
			$scope.loading=true;
			$loading.start("main");
			profileFactory.getCalenders().then(function(response){
				
				var temp=[];
				response.forEach(function(element){
					var date=element.date.split('-');
					var startTime;
					var endTime;
					
					if(element.fromTime.split(' ')[1]==='AM'){
						startTime=element.fromTime.split(' ')[0].split(':');
					}else{
						startTime=element.fromTime.split(' ')[0].split(':');
						startTime[0]=12 + parseInt(startTime[0]);
					}
					
					if(element.toTime.split(' ')[1]==='AM'){
						endTime=element.toTime.split(' ')[0].split(':');
					}else{
						endTime=element.toTime.split(' ')[0].split(':');
						endTime[0]=12 + parseInt(endTime[0]);
					}
					
					temp.push({
						 title: element.title, // The title of the event
		                   startsAt: new Date(date[0],date[1]-1,date[2],startTime[0],startTime[1]), // A javascript date object for when the event starts
		                   endsAt: new Date(date[0],date[1]-1,date[2],endTime[0],endTime[1]),
			                   incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
			                   cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
			                   allDay: false // set to true to display the event as an all day event on the day view
					});
				});
				
				$scope.events=temp;
				$scope.loading=false;
				$loading.finish("main");
			}).catch(function(){
				$scope.loading=false;
				$loading.finish("main");
			});
		};
		
		$scope.getCalenders();
		
//		$scope.events = [
//		                 {
//		                   title: 'My event title', // The title of the event
//		                   startsAt: new Date(2013,5,1,1), // A javascript date object for when the event starts
//		                   endsAt: new Date(2014,8,26,15), // Optional - a javascript date object for when the event ends
//		                   color: { // can also be calendarConfig.colorTypes.warning for shortcuts to the deprecated event types
//		                     primary: '#e3bc08', // the primary event color (should be darker than secondary)
//		                     secondary: '#fdf1ba' // the secondary event color (should be lighter than primary)
//		                   },
//		                   actions: [],
//		                   draggable: true, //Allow an event to be dragged and dropped
//		                   resizable: true, //Allow an event to be resizable
//		                   incrementsBadgeTotal: true, //If set to false then will not count towards the badge total amount on the month and year view
//		                   recursOn: 'year', // If set the event will recur on the given period. Valid values are year or month
//		                   cssClass: 'a-css-class-name', //A CSS class (or more, just separate with spaces) that will be added to the event when it is displayed on each view. Useful for marking an event as selected / active etc
//		                   allDay: false // set to true to display the event as an all day event on the day view
//		                 }
//		               ];
	};
	
	calenderController.$inject=['$scope','profileFactory','$loading','$uibModal','$location'];
	
	angular.module('vResume.profile').controller("calenderController",calenderController);
	
})();