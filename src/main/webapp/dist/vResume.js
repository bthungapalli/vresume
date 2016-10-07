(function(){
	
	var appModule=angular.module('vResume',['ui.bootstrap','ngRoute','ui.router','vResume.login','vResume.main','vResume.profile','vResume.templates','vResume.myJobs','vResume.users']);

	angular.element(document).ready(function() {
	    angular.bootstrap("body", ['vResume']);
	 });
	
	appModule.config(function($stateProvider, $urlRouterProvider){
	    
	    $stateProvider.state('login', {
            controller:'loginController',
            templateUrl: 'partials/login/login.html'
        }).state('login.loginTemplate', {
        	 url: '/login',
            templateUrl: 'partials/login/loginTemplate.html'
        }).state('login.signupTemplate', {
        	url: '/signup',
            templateUrl: 'partials/login/signupTemplate.html'
        }).state('main', {
            url: '/main',
            templateUrl: 'partials/main/main.html'
        }).state('main.profile', {
	            url: '/profile',
	            controller:'profileController',
	            templateUrl: 'partials/profile/profile.html'
	    }).state('main.openings', {
            url: '/openings',
            templateUrl: 'partials/openings.html'
        }).state('main.templates', {
            url: '/templates',
            controller:'templatesController',
            templateUrl: 'partials/templates.html'
        }).state('main.myJobsConsultancy', {
            url: '/myJobs',
            controller:'myJobsController',
            templateUrl: 'partials/myJobsConsultancy.html'
        }).state('main.myJobs', {
            url: '/myJobs',
            templateUrl: 'partials/myJobs.html'
        }).state('main.allUsers', {
            url: '/allUsers',
            templateUrl: 'partials/allUsers.html'
        }).state('main.mySubmissions', {
            url: '/mySubmissions',
            templateUrl: 'partials/mySubmissions.html'
        }).state('main.viewResume', {
            url: '/viewResume',
            templateUrl: 'partials/viewResume.html'
        }).state('main.newUser', {
            url: '/newUser',
            controller:'newUserController',
            templateUrl: 'partials/newUser.html'
        }).state('main.viewSubmission', {
            url: '/viewSubmission',
            templateUrl: 'partials/viewSubmission.html'
        }).state('main.newTemplate', {
            url: '/newTemplate',
            controller:'newTemplateController',
            templateUrl: 'partials/newTemplate.html'
        }).state('main.showTemplate', {
            url: '/showTemplate',
            controller:'showTemplateController',
            templateUrl: 'partials/showTemplate.html'
        }).state('main.editTemplate', {
            url: '/editTemplate',
            controller:'editTemplateController',
            templateUrl: 'partials/editTemplate.html'
        }).state('main.postJob', {
            url: '/postJob',
            controller:'postJobController',
            templateUrl: 'partials/postJob.html'
        });
	    
	    $urlRouterProvider.otherwise('/');
});

		appModule.run(function($state){
			$state.go("login");
		});

	
	
})();


(function(){
	
	angular.module('vResume.login',[]);
})();

(function(){
	
	angular.module('vResume.main',[]);
})();

(function(){
	
	angular.module('vResume.myJobs',[]);
})();

(function(){
	
	angular.module('vResume.profile',[]);
})();

(function(){
	
	angular.module('vResume.templates',[]);
})();

(function(){
	
	angular.module('vResume.users',[]);
})();

(function(){
	
	angular.module('vResume.login').constant("LOGIN_CONSTANTS",{
		"LOGIN_URL":"/vresume/login",
		"SIGNUP_URL":"/vresume/registration",
		"CHECK_EMAIL_AVAILABLE":"/vresume/emailValidation?emailId="
	});
	
})();

(function(){
	
	function loginController($rootScope,$scope,$state,loginService,loginFactory){
		
		$state.go("login.loginTemplate");
		
		$scope.assignState=function(state){
			$rootScope.activeState=state;
		};
		
		$scope.assignState('login.loginTemplate');
		
		$scope.resetUserDetails=function() {
			$scope.userDetails = {
				"emailId" : "",
				"password" : "",
				"confirmPassword" : "",
				"role" : 0
			};
		};
		
		$scope.resetMessages=function() {
			
			$scope.loginMessageDetails = {
				"errorMessage" : {
					"login" : "",
					"signup_emailId" : "",
					"signup_confirmPassword":""
				},
				"successMessage" : {
					"login" : "",
					"signup_emailId" : "",
					"signup_confirmPassword":""
				}
			};
		};
		 
		$scope.resetUserDetails();
		$scope.resetMessages();
		
		$scope.roles=loginService.getRoles();
		
		
		$scope.checkEmailAvailable=function(){
			$scope.loginMessageDetails.errorMessage.signup_emailId="";
			loginFactory.checkEmailAvailable($scope.userDetails.emailId).then(function(response){
				if(response[0]==='alreadyExist'){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Email already exist.";
				}else{
					$scope.resetMessages();
				}
			}).catch(function(error){
				
            });
		};
		
		$scope.checkConfirmPassword=function(){
			$scope.loginMessageDetails.errorMessage.signup_confirmPassword="";
			if($scope.userDetails.password!==$scope.userDetails.confirmPassword){
				$scope.loginMessageDetails.errorMessage.signup_confirmPassword="Password and Confirm Password din't match";
				return false;
			}
			return true;
		};
		
		$scope.login=function(){
			$scope.resetMessages();
			loginFactory.submitLogin($scope.userDetails).then(function(response){
				$rootScope.user=response.user;
				$state.go("main");
			}).catch(function(error){
				$scope.loginMessageDetails.errorMessage.login="Either Email or Password is incorrect ";
            });
		};
		
		$scope.signup=function(){
			if($scope.checkConfirmPassword()){
				$scope.resetMessages();
				loginFactory.signup($scope.userDetails).then(function(response){
					$scope.loginMessageDetails.successMessage.signup_emailId=response.success;
					$scope.resetUserDetails();
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Something went wrong  please contact administrator";
	            });
			}
		};
		
	};
	
	loginController.$inject=['$rootScope','$scope','$state','loginService','loginFactory'];
	
	angular.module('vResume.login').controller("loginController",loginController);
	
})();

(function(){
	
	function loginFactory($q,$http,LOGIN_CONSTANTS){
		
		function checkEmailAvailable(emailId){
			var defered=$q.defer();
			$http.get(LOGIN_CONSTANTS.CHECK_EMAIL_AVAILABLE+emailId).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function submitLogin(loginDetails){
			var defered=$q.defer();
			var headers =  {authorization : "Basic "+ btoa(loginDetails.emailId + ":" + loginDetails.password)};
			$http.get(LOGIN_CONSTANTS.LOGIN_URL, {headers : headers}).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function signup(loginDetails){
			var defered=$q.defer();
			var body =  {"email" : loginDetails.emailId,"password": loginDetails.password,"role":loginDetails.role};
			$http.post(LOGIN_CONSTANTS.SIGNUP_URL,body).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		
		return {
			checkEmailAvailable:checkEmailAvailable,
			submitLogin:submitLogin,
			signup:signup
		};
	};
	
	loginFactory.$inject=['$q','$http','LOGIN_CONSTANTS'];
	
	angular.module('vResume.login').factory('loginFactory',loginFactory);
	
})();





(function(){
	
	function loginService(){
		
		this.getRoles=function(){
			var roles={
					"Candidate":0,
					"Consulting Manager":1,
					"Hiring Manager":2
			};
			return roles;
		};
		
	};
	
	loginService.$inject=[];
	
	angular.module('vResume.login').service('loginService',loginService);
	
})();





(function(){
	
	angular.module('vResume.main').constant("MAIN_CONSTANTS",{
		"LOGOUT_URL":"/vresume/logout",
		"CHECK_USER_URL":"/vresume/checkUser"
	});
	
})();

(function(){
	
	function mainController($rootScope,$scope,$state,roleService,mainFactory){
		$scope.currentView=".profile";
		$scope.value=function(userDetails){
			$scope.userDetails=userDetails;
			$state.go("main.profile");
			$scope.authorities=roleService.roleAuthorities($scope.userDetails.role);
		};
		
		if($rootScope.user===undefined){
			mainFactory.checkUser().then(function(response){
				$rootScope.user=response.user;
				$scope.value(response.user);
			}).catch(function(){
				
			});
		}else{
			$scope.value($rootScope.user);
		}
		
		$scope.logout=function(){
			mainFactory.logout();
		};
		
		$scope.setSideBarActive=function(view){
			$scope.currentView=view;
		};
		
	};
	
	mainController.$inject=['$rootScope','$scope','$state','roleService','mainFactory'];
	
	angular.module('vResume.login').controller("mainController",mainController);
	
})();

(function(){
	
	function mainFactory($rootScope,$http,MAIN_CONSTANTS,$state,$q){
		
		function logout(){
			$http.get(MAIN_CONSTANTS.LOGOUT_URL).then(function(){
				$rootScope.user=null;
				$state.go("login");
			});
		}
		
		function checkUser(){
			var defered=$q.defer();
			$http.get(MAIN_CONSTANTS.CHECK_USER_URL).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				$state.go("login");
				defered.reject(error);
			});
			return defered.promise;
		}
		
		return {
		logout:logout,
		checkUser:checkUser
		};
	};
	
	mainFactory.$inject=['$rootScope','$http','MAIN_CONSTANTS','$state','$q'];
	
	angular.module('vResume.main').factory('mainFactory',mainFactory);
	
})();





(function() {

	function roleService() {
		this.roleAuthorities = function(role) {
			var roleAuthorities = {
				"0" : {
					"":["glyphicon glyphicon-user","Candidate"],
					".openings":["glyphicon glyphicon-modal-window","Openings"],
					".mySubmissions":["glyphicon glyphicon-share","Submissions"]
				} ,
				"1" : {
					"":["glyphicon glyphicon-user","Consulting Company"],
					".templates":["glyphicon glyphicon-pencil","Templates"],
					".myJobsConsultancy":["glyphicon glyphicon-screenshot","My Jobs"]
				},
				"2" : {
					"":["glyphicon glyphicon-user","Hiring Manager"],
					".myJobs":["glyphicon glyphicon-screenshot","My Jobs"]
				}
			};

			return roleAuthorities[role];
		};

	};

	roleService.$inject = [];

	angular.module('vResume.main').service('roleService', roleService);

})();

(function(){
	
	angular.module('vResume.profile').constant("PROFILE_CONSTANTS",{
		"PROFILE_UPDATE_URL":"/vresume/updateProfile"
	});
	
})();

(function(){
	
	function profileController($scope,profileFactory){
		
		$scope.viewProfile=true;
		
		$scope.profileDetails=angular.copy($scope.userDetails);
		
		$scope.editProfile=function(){
			$scope.viewProfile=!$scope.viewProfile;
		};
		
		$scope.changeToInt=function(value){
			return parseInt(value);
		};
		
		$scope.updateProfile=function(){
			profileFactory.updateProfile($scope.profileDetails).then(function(response){
				var updatedUserDetails=response.user;
				if(updatedUserDetails.imagePath!==null){
					$scope.profileDetails.imagePath=updatedUserDetails.imagePath;
					$scope.profileDetails.profieImageBytes=updatedUserDetails.profieImageBytes;
				}
				angular.extend($scope.userDetails, $scope.profileDetails);
				$scope.editProfile();
			}).catch(function(){
				
			});
		};
		
	};
	
	profileController.$inject=['$scope','profileFactory'];
	
	angular.module('vResume.profile').controller("profileController",profileController);
	
})();

(function(){
	angular.module('vResume.profile').directive('fileModel', ['$parse', function ($parse) {
        return {
           restrict: 'A',
           link: function(scope, element, attrs) {
              var model = $parse(attrs.fileModel);
              var modelSetter = model.assign;
              
              element.bind('change', function(){
                 scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                 });
              });
           }
        };
     }]);
})();

(function(){
	
	function profileFactory($q,PROFILE_CONSTANTS){
		
		function updateProfile(profileDetails){
			var defered=$q.defer();
			 var payload = new FormData();
			 payload.append('firstName', profileDetails.firstName);
			 payload.append('lastName', profileDetails.lastName);
			 payload.append('phone', profileDetails.phone);
			 payload.append('location', profileDetails.location);
			 payload.append('currentJobTitle', profileDetails.currentJobTitle);
			 payload.append('currentEmployer', profileDetails.currentEmployer);
			 if(profileDetails.role===0){
				 payload.append('middleName', profileDetails.middleName);
				 payload.append('experience', profileDetails.experience);
				 payload.append('currentSalary', profileDetails.currentSalary);
				 payload.append('primarySkills', profileDetails.primarySkills);
				 payload.append('secondarySkills', profileDetails.secondarySkills);
				 payload.append('prefredLocations', profileDetails.prefredLocations);
				 payload.append('workAuthorization', profileDetails.workAuthorization);
				 payload.append('jobType', profileDetails.jobType);
			 }
			 
			 if(profileDetails.profileImage!==null){
				 payload.append('profileImage', profileDetails.profileImage);
			 }
				 
            
			 $.ajax({
					type : 'POST',
					url : PROFILE_CONSTANTS.PROFILE_UPDATE_URL,
					data : payload,
					contentType : false,
					processData : false,
					success : function(response) {
						 defered.resolve(response);
					},
					error : function(xhr, status) {
						 defered.reject("error");
					}
		
				});
			return defered.promise;
		};
		
		
		return {
			updateProfile:updateProfile
		};
	};
	
	profileFactory.$inject=['$q','PROFILE_CONSTANTS'];
	
	angular.module('vResume.profile').factory('profileFactory',profileFactory);
	
})();





(function() {

	function profileService() {
		
	};

	profileService.$inject = [];

	angular.module('vResume.profile').service('profileService', profileService);

})();

(function(){
	
	angular.module('vResume.templates').constant("TEMPLATES_CONSTANTS",{
		"FETCH_TEMPLATES_URL":"/vresume/templates",
		"CREATE_TEMPLATE_URL":"/vresume/templates",
		"DELETE_TEMPLATES_URL":"/vresume/templates/",
		"UPDATE_TEMPLATE_URL":"/vresume/templates"
	});
	
})();

(function(){
	
	function editTemplateController(templatesService,editTemplateFactory,$scope,$compile,$state){
		var ediTemplate=angular.copy(templatesService.template);
		ediTemplate.sections=ediTemplate.sections.split(',');
		$scope.template=ediTemplate;
		var index=ediTemplate.sections.length;
		
		$scope.addNewSection=function(index1){
			if(index1+1===index){
				var element=angular.element("#editTemplateForm");
				var section='<div id='+index+' class="form-group">'+
				'<label for="section" class="col-sm-1 col-xs-12 control-label">Section</label>'+
				'<div class="col-sm-10 col-xs-10">'+
				'<input type="text" class="form-control" ng-model="template.sections['+index+']" ng-focus="addNewSection('+index+');" id="section" placeholder="Section">'+
				'</div>'+
				'<div class="col-sm-1 col-xs-1">'+
				'	<a class="btn btn-danger" ng-click="removeSection('+index+')" role="button"><span class="glyphicon glyphicon-remove"></span></a>'+
				'</div>'+
			    '</div>';
				var elem =$compile(section)($scope);
				element.append(elem);
				index++;
			}
		};
		
		$scope.removeSection=function(id){
			$scope.template.sections.splice(id,1);
			angular.element("#"+id).remove();
		};
		
		$scope.updateTemplate=function(){
			angular.forEach($scope.template.sections,function(section,i){
				if(section===null){
					$scope.template.sections.splice(i,1);
				}
			});
			editTemplateFactory.updateTemplate($scope.template).then(function(){
				$state.go('main.templates');
			}).catch(function(){
				
			});
		};
		
		
	};
	
	editTemplateController.$inject=['templatesService','editTemplateFactory','$scope','$compile','$state'];
	
	angular.module('vResume.templates').controller("editTemplateController",editTemplateController);
	
})();

(function(){
	
	function newTemplateController($scope,$compile,newTemplateFactory,$state){
	    var index=1;
		
		$scope.initializeTemplate=function(){
			$scope.template={
					"templateName":"",
					"sections":[]
			};
		};
		
		$scope.initializeTemplate();
		
		$scope.addNewSection=function(index1){
			if(index1+1===index){
				var element=angular.element("#newTemplateForm");
				var section='<div id='+index+' class="form-group">'+
				'<label for="section" class="col-sm-1 col-xs-12 control-label">Section</label>'+
				'<div class="col-sm-10 col-xs-10">'+
				'<input type="text" class="form-control" name="section'+index+'" ng-model="template.sections['+index+']" ng-focus="addNewSection('+index+');" id="section" placeholder="Section">'+
				'</div>'+
				'<div class="col-sm-1 col-xs-1">'+
				'	<a class="btn btn-danger" ng-click="removeSection('+index+')" role="button"><span class="glyphicon glyphicon-remove"></span></a>'+
				'</div>'+
			    '</div>';
				var elem =$compile(section)($scope);
				element.append(elem);
				index++;
			}
		};
		
		$scope.removeSection=function(id){
			$scope.template.sections.splice(id,1);
			angular.element("#"+id).remove();
		};
		
		$scope.createTemplate=function(){
			angular.forEach($scope.template.sections,function(section,i){
				if(section===null){
					$scope.template.sections.splice(i,1);
				}
			});
			newTemplateFactory.createTemplate($scope.template).then(function(){
				$scope.initializeTemplate();
				$state.go('main.templates');
			}).catch(function(){
				
			});
		};
		
	};
	
	newTemplateController.$inject=['$scope','$compile','newTemplateFactory','$state'];
	
	angular.module('vResume.templates').controller("newTemplateController",newTemplateController);
	
})();

(function(){
	
	function showTemplateController(templatesService,$scope){
		$scope.template=templatesService.template;
	};
	
	showTemplateController.$inject=['templatesService','$scope'];
	
	angular.module('vResume.templates').controller("showTemplateController",showTemplateController);
	
})();

(function(){
	
	function templatesController($scope,templatesFactory,$state,templatesService){
	
		templatesFactory.fetchTemplates().then(function(response){
			$scope.templates=response;
		}).catch(function(){
			
		});
		
		$scope.editOrShow=function(templateObj,view){
			templatesService.template=templateObj;
			$state.go(view);
		};
		
		$scope.deleteTemplate=function(template,index){
			templatesFactory.deleteTemplate(template.templateId).then(function(){
				$scope.templates.splice(index,1);
			}).catch(function(){
				
			});
		};
	};
	
	templatesController.$inject=['$scope','templatesFactory',"$state",'templatesService'];
	
	angular.module('vResume.templates').controller("templatesController",templatesController);
	
})();

(function(){
	
	function editTemplateFactory(TEMPLATES_CONSTANTS,$q,$http){
		
		function updateTemplate(template){
			var tempTemplate=angular.copy(template);
			tempTemplate.sections=tempTemplate.sections.toString();
			var defered=$q.defer();
			$http.put(TEMPLATES_CONSTANTS.UPDATE_TEMPLATE_URL,tempTemplate).success(function(response){
				 defered.resolve(response);
			}).error(function(error){
				 defered.reject(error);
			});
			return defered.promise;
		};
		
		return{
			updateTemplate:updateTemplate
		};
	};
	
	editTemplateFactory.$inject=['TEMPLATES_CONSTANTS','$q','$http'];
	
	angular.module('vResume.templates').factory('editTemplateFactory',editTemplateFactory);
	
})();





(function(){
	
	function newTemplateFactory(TEMPLATES_CONSTANTS,$q,$http){
		function createTemplate(template){
			var tempTemplate=angular.copy(template);
			tempTemplate.sections=tempTemplate.sections.toString();
			var defered=$q.defer();
			$http.post(TEMPLATES_CONSTANTS.CREATE_TEMPLATE_URL,tempTemplate).success(function(response){
				 defered.resolve(response);
			}).error(function(error){
				 defered.reject(error);
			});
			return defered.promise;
		};
		
		return{
			createTemplate:createTemplate
		};
	};
	
	newTemplateFactory.$inject=['TEMPLATES_CONSTANTS','$q','$http'];
	
	angular.module('vResume.templates').factory('newTemplateFactory',newTemplateFactory);
	
})();





(function(){
	
	function templatesFactory(TEMPLATES_CONSTANTS,$q,$http){
		
		function fetchTemplates(){
			var defered=$q.defer();
			$http.get(TEMPLATES_CONSTANTS.FETCH_TEMPLATES_URL).success(function(response){
				 defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function deleteTemplate(templateId){
			var defered=$q.defer();
			$http.delete(TEMPLATES_CONSTANTS.DELETE_TEMPLATES_URL+templateId).success(function(response){
				 defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return{
			fetchTemplates:fetchTemplates,
			deleteTemplate:deleteTemplate
		};
	};
	
	templatesFactory.$inject=['TEMPLATES_CONSTANTS','$q','$http'];
	
	angular.module('vResume.templates').factory('templatesFactory',templatesFactory);
	
})();





(function() {

	function templatesService() {
		
		this.template=null;
	};

	templatesService.$inject = [];

	angular.module('vResume.templates').service('templatesService', templatesService);

})();

(function(){
	
	angular.module('vResume.myJobs').constant("MYJOBS_CONSTANTS",{
		"FETCH_TEMPLATES_AND_HR_DETAILS_URL":"/vresume/job/fetJobTemplate",
		"POSTJOB_URL":"/vresume/job",
		"FETCH_JOBS_BY_STATUS_URL":"/vresume/job/fetchJobs/",
		"UPDATE_JOB_URL":"/vresume/job",
		"DELETE_JOB_URL":"/vresume/job/"
	});
	
})();

(function(){
	
	function myJobsController($scope,myJobsFactory,$state,myJobsService){
		
		$scope.postJob=function(){
			myJobsService.editJob=null;
			$state.go('main.postJob');
		};
		
		$scope.fetchMyJobs=function(status){
			myJobsFactory.fetchMyJobs(status).then(function(response){
				$scope.myJobs=response;
				$scope.status=status;
			}).catch(function(){
				
			});
			$scope.status=status;
		};
		
		$scope.fetchMyJobs("active");

		$scope.changeStatus=function(status,job,index){
			job.status=status;
			myJobsFactory.changeStatusOfJob(job).then(function(){
				$scope.myJobs.splice(index, 1);
			}).catch(function(){
				
			});
		};
		
		$scope.deleteJob=function(job,index){
			myJobsFactory.deleteJob(job.id).then(function(){
				$scope.myJobs.splice(index, 1);
			}).catch(function(){
				
			});
		};
		
		$scope.editJob=function(job){
			myJobsService.editJob=job;
			$state.go('main.postJob');
		};
	};
	
	myJobsController.$inject=['$scope','myJobsFactory','$state','myJobsService'];
	
	angular.module('vResume.myJobs').controller("myJobsController",myJobsController);
	
})();

(function(){
	
	function postJobController($scope,postJobFactory,$state,myJobsService){
		
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
			
		}).catch(function(){
			
		});
		
		$scope.createJob=function(){
			postJobFactory.createPost($scope.postJob).then(function(){
				$scope.initializePostJob();
				$state.go("main.myJobsConsultancy");
			}).catch(function(){
				
			});
		};
		
		$scope.updateJob=function(){
			postJobFactory.updateJob($scope.postJob).then(function(){
				$state.go("main.myJobsConsultancy");
			}).catch(function(){
				
			});
		};
	
	};
	
	postJobController.$inject=['$scope','postJobFactory','$state','myJobsService'];
	
	angular.module('vResume.myJobs').controller("postJobController",postJobController);
})();

(function(){
	
	function myJobsFactory($http,MYJOBS_CONSTANTS,$q){
		
		function fetchMyJobs(status){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.FETCH_JOBS_BY_STATUS_URL+status).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function changeStatusOfJob(job){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.UPDATE_JOB_URL,job).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function deleteJob(jobId){
			var defered=$q.defer();
			$http.delete(MYJOBS_CONSTANTS.DELETE_JOB_URL+jobId).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
		fetchMyJobs:fetchMyJobs,
		changeStatusOfJob:changeStatusOfJob,
		deleteJob:deleteJob
		};
	};
	
	myJobsFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('myJobsFactory',myJobsFactory);
	
})();





(function(){
	
	function postJobFactory($http,MYJOBS_CONSTANTS,$q){
		
		function fetchTemplatesAndHMDetails(){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.FETCH_TEMPLATES_AND_HR_DETAILS_URL).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function createPost(postJob){
			var defered=$q.defer();
			$http.post(MYJOBS_CONSTANTS.POSTJOB_URL,postJob).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function updateJob(job){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.UPDATE_JOB_URL,job).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
		 fetchTemplatesAndHMDetails:fetchTemplatesAndHMDetails,
		 createPost:createPost,
		 updateJob:updateJob
		};
	};
	
	postJobFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('postJobFactory',postJobFactory);
	
})();





(function(){
	
	function myJobsService(){
	
		this.editJob=null;
	};
	
	myJobsService.$inject=[];
	
	angular.module('vResume.myJobs').service('myJobsService',myJobsService);
	
})();





(function(){
	
	angular.module('vResume.main').constant("MAIN_CONSTANTS",{
		"LOGOUT_URL":"/vresume/logout",
		"CHECK_USER_URL":"/vresume/checkUser"
	});
	
})();

(function(){
	
	function newUserController($scope,loginFactory,loginService){
		
		$scope.roles=loginService.getRoles();
		
		$scope.resetUserDetails=function() {
			$scope.userDetails = {
				"emailId" : "",
				"password" : "",
				"role" : 0
			};
		};
		
		$scope.resetMessages=function() {
			$scope.loginMessageDetails = {
				"errorMessage" : {
					"signup_emailId" : ""
				},
				"successMessage" : {
					"signup_emailId" : ""
				}
			};
		};
		 
		$scope.resetUserDetails();
		$scope.resetMessages();
		
		$scope.checkEmailAvailable=function(){
			if($scope.userDetails.emailId!==''){
				$scope.loginMessageDetails.errorMessage.signup_emailId="";
				loginFactory.checkEmailAvailable($scope.userDetails.emailId).then(function(response){
					if(response[0]==='alreadyExist'){
						$scope.loginMessageDetails.errorMessage.signup_emailId="Email already exist.";
					}else{
						$scope.resetMessages();
					}
				}).catch(function(error){
	            });
			}
		};
		
		$scope.signup=function(){
				$scope.resetMessages();
				loginFactory.signup($scope.userDetails).then(function(response){
					$scope.loginMessageDetails.successMessage.signup_emailId="New User Created";
					$scope.resetUserDetails();
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Something went wrong  please contact administrator";
	            });
		};
	};
	
	newUserController.$inject=['$scope','loginFactory','loginService'];
	
	angular.module('vResume.login').controller("newUserController",newUserController);
	
})();

(function(){
	
	function mainFactory($rootScope,$http,MAIN_CONSTANTS,$state,$q){
		
		function logout(){
			$http.get(MAIN_CONSTANTS.LOGOUT_URL).then(function(){
				$rootScope.user=null;
				$state.go("login");
			});
		}
		
		function checkUser(){
			var defered=$q.defer();
			$http.get(MAIN_CONSTANTS.CHECK_USER_URL).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				$state.go("login");
				defered.reject(error);
			});
			return defered.promise;
		}
		
		return {
		logout:logout,
		checkUser:checkUser
		};
	};
	
	mainFactory.$inject=['$rootScope','$http','MAIN_CONSTANTS','$state','$q'];
	
	angular.module('vResume.main').factory('mainFactory',mainFactory);
	
})();





(function() {

	function roleService() {
		this.roleAuthorities = function(role) {
			var roleAuthorities = {
				"0" : {
					"":["glyphicon glyphicon-user","Candidate"],
					".openings":["glyphicon glyphicon-modal-window","Openings"],
					".mySubmissions":["glyphicon glyphicon-share","Submissions"]
				} ,
				"1" : {
					"":["glyphicon glyphicon-user","Consulting Company"],
					".templates":["glyphicon glyphicon-pencil","Templates"],
					".myJobsConsultancy":["glyphicon glyphicon-screenshot","My Jobs"]
				},
				"2" : {
					"":["glyphicon glyphicon-user","Hiring Manager"],
					".myJobs":["glyphicon glyphicon-screenshot","My Jobs"]
				}
			};

			return roleAuthorities[role];
		};

	};

	roleService.$inject = [];

	angular.module('vResume.main').service('roleService', roleService);

})();