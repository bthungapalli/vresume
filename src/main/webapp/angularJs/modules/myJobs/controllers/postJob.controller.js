(function(){
	
	function postJobController($scope,postJobFactory,$state,myJobsService,$timeout,$loading,$location){
		$loading.start("main");
		$scope.error="";
		$scope.diversityArray=[];
		$scope.url=$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/job/downloadBulkJobExcel" ;
		$scope.initializePostJob=function(){
			$scope.postJob={
					"templateId":$scope.templates.length===0?0:$scope.templates[0].templateId,
					"hiringUserId":($scope.userDetails.role===2 || $scope.userDetails.role===7)?($scope.userDetails.id).toString():"Select Hiring Manager",
					"diversityList":"",
					"title":"", 
					"location":"",
					"jobType":1,
					"startDate":new Date(),
					"endDate":new Date(),
					"description":"",
					"skills":"",
					"compensation":"",
					"minimumExperience":"",
					"maximumExperience":"",
					"payrateType":"",
					"currency":"",
					"duration":"",
					"status":"active",
					"showCompensation":true,
					"preferredCheck":false,
					"diverseCheck":false,
					"department":"",
					"quota":0,
					"diverse":0,
					"others":100,
					"diverseType":"Select"
			};
		};
		$scope.diversities = [{id: 1,name: 'Any',selected: true},
					          {id: 2,name: 'LGBT',selected:false},
					          {id: 3,name: 'Disability',selected:false},
					          {id: 4,name: 'Women',selected:false},
					          {id: 5,name: 'Veterans',selected:false}];
		postJobFactory.fetchTemplatesAndHMDetails().then(function(response){
			
			$scope.dateOptions={
					minDate: new Date()
				};
			
				$scope.templates=response.templates;
				$scope.HMDetails=response.hiringMgr;
				if(myJobsService.editJob===null){
					$scope.postOrUpdateLabel="Post Job To FaceMyResume";
					$scope.initializePostJob();
					if($scope.templates.length===0){
						$scope.error="Please create template before posting a job.";
					}
				}else{
					$scope.postOrUpdateLabel="UPDATE JOB";
					$scope.postJob=myJobsService.editJob;
					$scope.postJob.templateId=myJobsService.editJob.templateId;
					$scope.postJob.diversityList= ($scope.postJob.diversityList);
					$scope.postJob.startDate=new Date(myJobsService.editJob.startDate);
					$scope.postJob.endDate=new Date(myJobsService.editJob.endDate);
					$scope.postJob.duration=parseInt(myJobsService.editJob.duration);
					$scope.postJob.compensation=parseInt($scope.postJob.compensation);
					$scope.postJob.minimumExperience=parseInt($scope.postJob.minimumExperience);
					$scope.postJob.maximumExperience=parseInt($scope.postJob.maximumExperience);
					$scope.postJob.payrateType=($scope.postJob.payrateType);
					$scope.postJob.currency=($scope.postJob.currency);
					$scope.postJob.hiringUserId=($scope.postJob.hiringUserId).toString();
					$scope.postJob.diverseType=$scope.postJob.diverseType.split(",");
				}
				
				$timeout(function() {
					if (tinymce.editors.length > 0) {
					    tinymce.execCommand('mceFocus', true, "CL" );       
					    tinymce.execCommand('mceRemoveEditor',true, "CL");        
					    tinymce.execCommand('mceAddEditor',true,"CL");
					}else{
						tinymce.init({
						    selector: "#CL",
							 plugins: [
						        "advlist autolink lists link image charmap print preview anchor",
						        "searchreplace visualblocks code fullscreen",
						        "insertdatetime media table paste textcolor colorpicker"
						    ],
						    toolbar: "sizeselect | bold italic | fontselect | fontsizeselect | insertfile undo redo | styleselect | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image ",
						    fontsize_formats: "8px 10px 12px 14px 18px 24px 36px",
						    browser_spellcheck: true,
						    contextmenu: false
					   });
						
					}
					if(myJobsService.editJob!==null){
						$timeout(function() {
							tinymce.get('CL').setContent(myJobsService.editJob.description);
						},200);
					}
					
			    }, 200);
				$loading.finish("main");
			
		}).catch(function(){
			$loading.finish("main");
		});
		
		
		$scope.createJob=function(){
			$scope.error="";
			$loading.start("main");
			console.log($scope.postJob);
			$scope.postJob.description=tinymce.get('CL').getContent();
			if($scope.postJob.minimumExperience>=$scope.postJob.maximumExperience){
			 $scope.experienceError="Minimum Experience Should not be greater than Maximum Experience";
			 }
			 if($scope.postJob.description!==''){
				$scope.diversityArray=[];
				angular.forEach($scope.diversities, function(postJob){
					if(postJob.selected === true){
						$scope.diversityArray.push(postJob.name);
					}
					$scope.postJob.diversityList = $scope.diversityArray.toString();
						
				});
			
			var temp=angular.copy($scope.postJob);
			
			if($scope.postJob.diverseType.length>0 && $scope.postJob.diverseType !== 'Select'){
				temp.diverseType="";
				$scope.postJob.diverseType.forEach(function(type,index){
					var append=(index!==$scope.postJob.diverseType.length-1)?",":"";
					temp.diverseType=temp.diverseType+type+append;
				});
				
			}
				postJobFactory.createPost(temp).then(function(){
					$scope.initializePostJob();
					$loading.finish("main");
					$state.go("main.myJobs");
				}).catch(function(){
					$loading.finish("main");
				});
			}else{
				$scope.error="Please fill all the fields";
				$loading.finish("main");
			}
			
		};
		
		$scope.updateJob=function(){
			$loading.start("main");
			$scope.postJob.description=tinymce.get('CL').getContent();
			if($scope.postJob.description!==''){
				var temp=angular.copy($scope.postJob);
				
				if($scope.postJob.diverseType.length>0 && !$scope.postJob.diverseType !== 'Select'){
					temp.diverseType="";
					$scope.postJob.diverseType.forEach(function(type,index){
						var append=(index!==$scope.postJob.diverseType.length-1)?",":"";
						temp.diverseType=temp.diverseType+type+append;
					});
					
				}
			postJobFactory.updateJob(temp).then(function(){
				$loading.finish("main");
				$state.go("main.myJobs");
			}).catch(function(){
				$loading.finish("main");
			});
			}else{
				$scope.error="Please fill all the fields";
				$loading.finish("main");
			}
		};

		$scope.autoComplete = function(){
			var id = document.getElementById('location');
		    var countryRestrict = {'country': 'us'};
		    var optionsxx = {
		      types: ['geocode'],
		      componentRestrictions: countryRestrict
		    };

		    var autocomplete = new google.maps.places.Autocomplete(id, optionsxx);
		    google.maps.event.addListener(autocomplete, 'place_changed', function () {
		    	console.log("place::::::::::",autocomplete.getPlace().formatted_address);
		    	$scope.postJob.location = autocomplete.getPlace().formatted_address;
		    	console.log("Location::::::",$scope.postJob.location);
		    });
};

		$scope.calQuotaPercentage= function(text){
			if(text==='others'){
				$scope.postJob.diverse=100-$scope.postJob.others;
			}else{
				$scope.postJob.others=100-$scope.postJob.diverse;
			}
		};
		
		$scope.createBulkJob=function(){
			$loading.start("main");
			postJobFactory.updateBulkJob($scope.postJob).then(function(response){
				if(response.length>0){
					$scope.bulkResult=response;
				}else{
					$state.go("main.myJobs");
				}
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
	};
	
	postJobController.$inject=['$scope','postJobFactory','$state','myJobsService','$timeout','$loading','$location'];
	
	angular.module('vResume.myJobs').controller("postJobController",postJobController);
})();