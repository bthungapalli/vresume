(function(){
	
	function postJobController($scope,postJobFactory,$state,myJobsService,$timeout){
		
		$scope.initializePostJob=function(){
			$scope.postJob={
					"templateId":$scope.templates[0].templateId,
					"hiringUserId":"Select Hiring Manager",
					"title":"",
					"location":"",
					"jobType":0,
					"startDate":"",
					"description":"",
					"skills":"",
					"compensation":0,
					"experience":0,
					"status":"active"
			};
		};
		
		postJobFactory.fetchTemplatesAndHMDetails().then(function(response){
			$scope.templates=response.templates;
			$scope.HMDetails=response.hiringMgr;
			if(myJobsService.editJob===null){
				$scope.postOrUpdateLabel="POST";
				$scope.initializePostJob();
			}else{
				$scope.postOrUpdateLabel="UPDATE";
				$scope.postJob=myJobsService.editJob;
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
			
		}).catch(function(){
			
		});
		
		$scope.createJob=function(){
			$scope.postJob.description=tinymce.get('CL').getContent();
			postJobFactory.createPost($scope.postJob).then(function(){
				$scope.initializePostJob();
				$state.go("main.myJobs");
			}).catch(function(){
				
			});
		};
		
		$scope.updateJob=function(){
			$scope.postJob.description=tinymce.get('CL').getContent();
			postJobFactory.updateJob($scope.postJob).then(function(){
				$state.go("main.myJobs");
			}).catch(function(){
				
			});
		};
	
	};
	
	postJobController.$inject=['$scope','postJobFactory','$state','myJobsService','$timeout'];
	
	angular.module('vResume.myJobs').controller("postJobController",postJobController);
})();