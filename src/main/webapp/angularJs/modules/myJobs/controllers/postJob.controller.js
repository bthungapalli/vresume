(function(){
	
	function postJobController($scope,postJobFactory,$state,myJobsService,$timeout,$loading){
		$loading.start("main");
		$scope.error="";
		$scope.initializePostJob=function(){
			$scope.postJob={
					"templateId":$scope.templates.length===0?0:$scope.templates[0].templateId,
					"hiringUserId":$scope.userDetails.role===2?($scope.userDetails.id).toString():"Select Hiring Manager",
					"title":"",
					"location":"",
					"jobType":1,
					"startDate":new Date(),
					"endDate":new Date(),
					"description":"",
					"skills":"",
					"compensation":"",
					"experience":"",
					"duration":"",
					"status":"active"
			};
		};
		
		postJobFactory.fetchTemplatesAndHMDetails().then(function(response){
			
			$scope.dateOptions={
					minDate: new Date()
				};
			
				$scope.templates=response.templates;
				$scope.HMDetails=response.hiringMgr;
				if(myJobsService.editJob===null){
					$scope.postOrUpdateLabel="POST";
					$scope.initializePostJob();
					if($scope.templates.length===0){
						$scope.error="Please create template before posting a job.";
					}
				}else{
					$scope.postOrUpdateLabel="UPDATE";
					$scope.postJob=myJobsService.editJob;
					$scope.postJob.startDate=new Date(myJobsService.editJob.startDate);
					$scope.postJob.endDate=new Date(myJobsService.editJob.endDate);
					$scope.postJob.duration=new Date(myJobsService.editJob.duration);
					$scope.postJob.compensation=parseInt($scope.postJob.compensation);
					$scope.postJob.experience=parseInt($scope.postJob.experience);
					$scope.postJob.hiringUserId=($scope.postJob.hiringUserId).toString();
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
			    }, 200);
				$loading.finish("main");
			
		}).catch(function(){
			$loading.finish("main");
		});
		
		$scope.createJob=function(){
			$scope.error="";
			$loading.start("main");
			$scope.postJob.description=tinymce.get('CL').getContent();
			
			if($scope.postJob.description!==''){
				postJobFactory.createPost($scope.postJob).then(function(){
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
			postJobFactory.updateJob($scope.postJob).then(function(){
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
	
	};
	
	postJobController.$inject=['$scope','postJobFactory','$state','myJobsService','$timeout','$loading'];
	
	angular.module('vResume.myJobs').controller("postJobController",postJobController);
})();