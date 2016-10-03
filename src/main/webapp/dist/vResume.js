(function(){
	
	var appModule=angular.module('vResume',['ngRoute','ui.router','vResume.login','vResume.main','vResume.profile','vResume.templates']);

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
            url: '/allUsers',
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
            templateUrl: 'partials/editTemplate.html'
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
	
	angular.module('vResume.profile',[]);
})();

(function(){
	
	angular.module('vResume.templates',[]);
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
				$scope.resetMessages();
			}).catch(function(error){
				$scope.loginMessageDetails.errorMessage.signup_emailId="Email already exist.";
            });
		};
		
		$scope.checkConfirmPassword=function(){
			$scope.loginMessageDetails.errorMessage.signup_confirmPassword="";
			if($scope.userDetails.password!==$scope.userDetails.confirmPassword){
				$scope.loginMessageDetails.errorMessage.signup_confirmPassword="Password and Confirm Passwrod din't match";
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
					$scope.resetUserDetails();
					$rootScope.user=response.user;
					$state.go("main");
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
		"LOGOUT_URL":"/vresume/logout"
	});
	
})();

(function(){
	
	function mainController($rootScope,$scope,$state,roleService,mainFactory){
		
		$scope.userDetails=$rootScope.user;
		
		$scope.authorities=roleService.roleAuthorities($scope.userDetails.role);
		
		$scope.logout=function(){
			mainFactory.logout();
		};
		
		$state.go("main.profile");
		
	};
	
	mainController.$inject=['$rootScope','$scope','$state','roleService','mainFactory'];
	
	angular.module('vResume.login').controller("mainController",mainController);
	
})();

(function(){
	
	function mainFactory($rootScope,$http,MAIN_CONSTANTS,$state){
		
		function logout(){
			$http.get(MAIN_CONSTANTS.LOGOUT_URL).then(function(){
				$rootScope.user=null;
				$state.go("login");
			});
		}
		
		return {
		logout:logout
		};
	};
	
	mainFactory.$inject=['$rootScope','$http','MAIN_CONSTANTS','$state'];
	
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
		
		$scope.updateProfile=function(){
			profileFactory.updateProfile($scope.profileDetails).then(function(response){
				if(response.imagePath!==null){
					$scope.profileDetails.imagePath=response.imagePath;
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
		"DELETE_TEMPLATES_URL":"/vresume/templates"
	});
	
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
			templatesService.deleteTemplate(template.templateId).then(function(){
				$scope.templates.spice(index,1);
			}).catch(function(){
				
			});
		};
	};
	
	templatesController.$inject=['$scope','templatesFactory',"$state",'templatesService'];
	
	angular.module('vResume.templates').controller("templatesController",templatesController);
	
})();

(function(){
	
	function newTemplateFactory(TEMPLATES_CONSTANTS,$q,$http){
		function createTemplate(template){
			var defered=$q.defer();
			$http.post(TEMPLATES_CONSTANTS.CREATE_TEMPLATE_URL,template).success(function(response){
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
		
		function deleteTemplate(){
			var defered=$q.defer();
			$http.delete(TEMPLATES_CONSTANTS.DELETE_TEMPLATES_URL).success(function(response){
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