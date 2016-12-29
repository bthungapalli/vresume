(function(){
	
	var appModule=angular.module('vResume',['ui.bootstrap','ngRoute','ui.router','angular-input-stars','angularUtils.directives.dirPagination','ngCookies','darthwade.dwLoading','vResume.login','vResume.main','vResume.profile','vResume.templates','vResume.myJobs','vResume.users','vResume.openings']);

	angular.element(document).ready(function() {
	    angular.bootstrap("body", ['vResume']);
	 });
	
	appModule.config(function($stateProvider, $urlRouterProvider,$httpProvider){
		  $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'; 
	    $stateProvider.state('login', {
            controller:'loginController',
            templateUrl: 'partials/login/login.html'
        }).state('login.loginTemplate', {
        	 url: '/login',
            templateUrl: 'partials/login/loginTemplate.html'
        }).state('login.signupTemplate', {
        	url: '/signup',
            templateUrl: 'partials/login/signupTemplate.html'
        }).state('login.forgotPassword', {
        	url: '/forgotPassword',
            templateUrl: 'partials/login/forgotPassword.html'
        }).state('main', {
            url: '/main',
            templateUrl: 'partials/main/main.html'
        }).state('main.profile', {
	            url: '/profile',
	            controller:'profileController',
	            templateUrl: 'partials/profile/profile.html'
	    }).state('main.openings', {
            url: '/openings',
            controller:'openingsController',
            templateUrl: 'partials/openings.html'
        }).state('main.templates', {
            url: '/templates',
            controller:'templatesController',
            templateUrl: 'partials/templates.html'
        }).state('main.myJobs', {
            url: '/myJobs',
            controller:'myJobsController',
            templateUrl: 'partials/myJobs.html'
        }).state('main.allUsers', {
            url: '/allUsers',
            controller:'usersController',
            templateUrl: 'partials/allUsers.html'
        }).state('main.mySubmissions', {
            url: '/mySubmissions',
            controller:'mySubmissionsController',
            templateUrl: 'partials/mySubmissions.html'
        }).state('main.viewResume', {
            url: '/viewResume',
            controller:"viewResumeController",
            templateUrl: 'partials/viewResume.html'
        }).state('main.newUser', {
            url: '/newUser',
            controller:'newUserController',
            templateUrl: 'partials/newUser.html'
        }).state('main.viewSubmission', {
            url: '/viewSubmission',
            controller:'viewSubmissionController',
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
        }).state('registrationConfirmation', {
            url: '/registrationConfirmation',
            controller:'registrationConfirmationController',
            templateUrl: 'partials/registrationConfirmation.html'
        }).state('main.applyJob', {
            url: '/applyJob',
            controller:'applyJobController',
            templateUrl: 'partials/applyJob.html'
        }).state('main.changePassword', {
            url: '/changePassword',
            controller:'changePasswordController',
            templateUrl: 'partials/changePassword.html'
        }).state('login.confirmationInstructions', {
            url: '/confirmationInstructions',
            templateUrl: 'partials/login/confirmationInstructions.html'
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
	
	angular.module('vResume.openings',[]);
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
		"CHECK_EMAIL_AVAILABLE":"/vresume/emailValidation?emailId=",
		"REGISTRATION_CONFIRMATION_URL":"/vresume/registration/registrationConfirmation?token=",
		"FORGOT_PASSWORD_URL":"/vresume/forgotPassword",
		"CONFIRMATION_INSTRUCTIONS_URL":"/vresume/updateToken?email="
	});
	
})();

(function(){
	
	function loginController($rootScope,$scope,$state,loginService,loginFactory,$cookies,$loading){
		
		$state.go("login.loginTemplate");
		$scope.rememberMe=false;
		
		$scope.assignState=function(state){
			$rootScope.activeState=state;
		};
		
		$scope.rememberMe1=function(){
			$scope.rememberMe=!$scope.rememberMe;
		};
		
		$scope.assignState('login.loginTemplate');
		
		$scope.resetUserDetails=function() {
			$scope.userDetails = {
				"firstName":"",
				"lastName":"",
				"phone":"",
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
		
     $scope.checkForRememberMe=function() {
    	 var emailId=$cookies.get("emailId");
 		if(emailId!==undefined){
 			$scope.userDetails.emailId=emailId;
 			$scope.rememberMe=true;
 		}
		
		};
		 
		$scope.resetUserDetails();
		$scope.resetMessages();
		$scope.checkForRememberMe();
		
		$scope.roles=loginService.getRoles();
		
		
		$scope.checkEmailAvailable=function(){
			$scope.loginMessageDetails.errorMessage.signup_emailId="";
			if($scope.userDetails.emailId!==""){
				loginFactory.checkEmailAvailable($scope.userDetails.emailId).then(function(response){
					if(response[0]==='alreadyExist'){
						$scope.loginMessageDetails.errorMessage.signup_emailId="Email Id already exist.";
					}else{
						$scope.resetMessages();
					}
				}).catch(function(error){
					
	            });
			}
			
		};
		
		$scope.checkConfirmPassword=function(){
			$scope.loginMessageDetails.errorMessage.signup_confirmPassword="";
			if($scope.userDetails.password!==$scope.userDetails.confirmPassword){
				$scope.loginMessageDetails.errorMessage.signup_confirmPassword="Password and Confirm Password din't match";
				$loading.finish('login');
				return false;
			}
			return true;
		};
		
		$scope.login=function(){
			$loading.start('login');
			$scope.resetMessages();
			loginFactory.submitLogin($scope.userDetails).then(function(response){
				if(response.user===undefined){
					$scope.loginMessageDetails.errorMessage.login=response[0];
				}else{
					if($scope.rememberMe){
						$cookies.put("emailId", $scope.userDetails.emailId);
					}else{
						$cookies.remove("emailId");
					}
					$rootScope.user=response.user;
					$state.go("main");
				}
				 $loading.finish('login');
			}).catch(function(error){
				$scope.loginMessageDetails.errorMessage.login="Either Email or Password is incorrect ";
				$loading.finish('login');
            });
		};
		
		$scope.signup=function(){
			$loading.start('login');
			if($scope.checkConfirmPassword()){
				$scope.resetMessages();
				loginFactory.signup($scope.userDetails).then(function(response){
					$scope.loginMessageDetails.successMessage.signup_emailId=response.success;
					$scope.resetUserDetails();
					$loading.finish('login');
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Something went wrong  please contact administrator";
					$loading.finish('login');
	            });
			}
		};
		
		$scope.defaultLogins=function(emailId,password) {
			$scope.userDetails.emailId=emailId;
			$scope.userDetails.password=password;
			$scope.login();			
		};
		
		
		$scope.forgotPassword=function(){
			$loading.start('login');
				loginFactory.forgotPassword($scope.userDetails).then(function(response){
					$scope.loginMessageDetails.successMessage.signup_emailId=response.success;
					$scope.resetUserDetails();
					$loading.finish('login');
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Something went wrong  please contact administrator";
					$loading.finish('login');
	            });
		};
		
		$scope.confirmationInstructions=function(){
			$loading.start('login');
				loginFactory.confirmationInstructions($scope.userDetails).then(function(response){
					$scope.loginMessageDetails.successMessage.signup_emailId=response.success;
					$scope.resetUserDetails();
					$loading.finish('login');
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Something went wrong  please contact administrator";
					$loading.finish('login');
	            });
		};
	};
	
	loginController.$inject=['$rootScope','$scope','$state','loginService','loginFactory','$cookies','$loading'];
	
	angular.module('vResume.login').controller("loginController",loginController);
	
})();

(function(){
	
	function registrationConfirmationController($scope,$state,loginFactory,$location,$loading){
		        $loading.start('register');
				loginFactory.registrationConfirmation($location.search().token).then(function(response){
					if(response.success!==undefined){
						$scope.success=response.success;
					}
					$loading.finish('register');
				}).catch(function(error){
					$scope.error=error.failed;
					$loading.finish('register');
	            });
	};
	
	
	
	registrationConfirmationController.$inject=['$scope','$state','loginFactory','$location','$loading'];
	
	angular.module('vResume.login').controller("registrationConfirmationController",registrationConfirmationController);
	
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
			var body =  {"email" : loginDetails.emailId,"password": loginDetails.password,"role":loginDetails.role,"firstName":loginDetails.firstName,"lastName":loginDetails.lastName,"phone":loginDetails.phone};
			$http.post(LOGIN_CONSTANTS.SIGNUP_URL,body).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function registrationConfirmation(token){
			var defered=$q.defer();
			$http.get(LOGIN_CONSTANTS.REGISTRATION_CONFIRMATION_URL+token).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function forgotPassword(loginDetails){
			var defered=$q.defer();
			var body =  {"email" : loginDetails.emailId};
			$http.post(LOGIN_CONSTANTS.FORGOT_PASSWORD_URL,body).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function confirmationInstructions(loginDetails){
			var defered=$q.defer();
			$http.post(LOGIN_CONSTANTS.CONFIRMATION_INSTRUCTIONS_URL+loginDetails.emailId).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
			checkEmailAvailable:checkEmailAvailable,
			submitLogin:submitLogin,
			signup:signup,
			registrationConfirmation:registrationConfirmation,
			forgotPassword:forgotPassword,
			confirmationInstructions:confirmationInstructions
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
		"CHECK_USER_URL":"/vresume/checkUser",
		"CHANGE_PASSWORD_URL":"/vresume/changePassword"
	});
	
})();

(function(){
	
	function changePasswordController($rootScope,$scope,$state,roleService,mainFactory,$loading){
		$loading.start("main");
		$scope.changePassword={
				"password":"",
				"confirmPassword":""
		};
		$scope.error="";
		$scope.success="";
		
		$scope.changePassword=function(){
			$scope.error="";
			$scope.success="";
			if($scope.changePassword.password===$scope.changePassword.confirmPassword){
				
				mainFactory.changePassword($scope.changePassword.password).then(function(response){
					$scope.success="Password changed successfully";
				}).catch(function(error){
					$scope.error="Something went wrong";
				});
			}else{
				$scope.error="Passwords did not match";
			}
		};
		$loading.finish("main");
	};
	
	changePasswordController.$inject=['$rootScope','$scope','$state','roleService','mainFactory','$loading'];
	
	angular.module('vResume.login').controller("changePasswordController",changePasswordController);
	
})();

(function(){
	
	function mainController($rootScope,$scope,$state,roleService,mainFactory,$loading){
		$loading.start("main");
		$scope.currentView=".profile";
		$scope.value=function(userDetails){
			$scope.userDetails=userDetails;
			$state.go("main.profile");
			$scope.authorities=roleService.roleAuthorities($scope.userDetails.role);
			$loading.finish("main");
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
			$loading.start("main");
			mainFactory.logout();
		};
		
		$scope.setSideBarActive=function(view){
			$scope.currentView=view;
		};
		
	};
	
	mainController.$inject=['$rootScope','$scope','$state','roleService','mainFactory','$loading'];
	
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
		
		function changePassword(password){
			var defered=$q.defer();
			var data={"password":password};
			$http.post(MAIN_CONSTANTS.CHANGE_PASSWORD_URL,data).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		return {
		logout:logout,
		checkUser:checkUser,
		changePassword:changePassword
		};
	};
	
	mainFactory.$inject=['$rootScope','$http','MAIN_CONSTANTS','$state','$q'];
	
	angular.module('vResume.main').factory('mainFactory',mainFactory);
	
})();





angular.module('vResume.main')
    .filter('toTrustHtml', ['$sce', function($sce){
        return function(text) {
            return $sce.trustAsHtml(text);
        };
    }]);

angular.module('vResume.main')
.filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
        return $sce.trustAsResourceUrl(recordingUrl);
    };
}]);

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
					".myJobs":["glyphicon glyphicon-screenshot","My Jobs"]
				},
				"2" : {
					"":["glyphicon glyphicon-user","Hiring Manager"],
					".templates":["glyphicon glyphicon-pencil","Templates"],
					".myJobs":["glyphicon glyphicon-screenshot","My Jobs"]
				},
				"3" : {
					"":["glyphicon glyphicon-lock","Admin"],
					".allUsers":["glyphicon glyphicon-modal-window","All Users"]
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
	
	function profileController($scope,profileFactory,$loading){
		
		$scope.viewProfile=true;
		if($scope.userDetails!==undefined){
			$scope.profileDetails=angular.copy($scope.userDetails);
			$scope.profileDetails.jobType=($scope.profileDetails.jobType).toString();
		}
		
		$scope.editProfile=function(){
			$scope.viewProfile=!$scope.viewProfile;
			$loading.finish("main");
		};
		
		$scope.changeToInt=function(value){
			return parseInt(value);
		};
		
		$scope.updateProfile=function(){
			$loading.start("main");
			profileFactory.updateProfile($scope.profileDetails).then(function(response){
				var updatedUserDetails=response.user;
				if(updatedUserDetails.imagePath!==null){
					$scope.profileDetails.imagePath=updatedUserDetails.imagePath;
					$scope.profileDetails.profieImageBytes=updatedUserDetails.profieImageBytes;
				}
				angular.extend($scope.userDetails, $scope.profileDetails);
				$scope.editProfile();
			}).catch(function(){
				$loading.finish("main");
			});
		};
		$loading.finish("main");
	};
	
	profileController.$inject=['$scope','profileFactory','$loading'];
	
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
	
	function editTemplateController(templatesService,editTemplateFactory,$scope,$compile,$state,$loading){
		var ediTemplate=angular.copy(templatesService.template);
		ediTemplate.sections=ediTemplate.sections.split(',');
		$scope.template=ediTemplate;
		var index=ediTemplate.sections.length-1;
		
		$scope.addNewSection=function(){
			$scope.template.sections[$scope.template.sections.length]="";
		};
		
		$scope.removeSection=function(id){
			$scope.template.sections.splice(id,1);
		};
		
		$scope.updateTemplate=function(){
			$loading.start("main");
			var temp={"templateName":$scope.template.templateName,
					"userId":ediTemplate.userId,
                     "templateId":ediTemplate.templateId,
					  "sections":[]};
			angular.forEach($scope.template.sections,function(section,index){
				if(section.trim()!==""){
					temp.sections.push(section);
				}
			});
			editTemplateFactory.updateTemplate(temp).then(function(){
				$loading.finish("main");
				$state.go('main.templates');
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
		
	};
	
	editTemplateController.$inject=['templatesService','editTemplateFactory','$scope','$compile','$state','$loading'];
	
	angular.module('vResume.templates').controller("editTemplateController",editTemplateController);
	
})();

(function(){
	
	function newTemplateController($scope,$compile,newTemplateFactory,$state,$loading){
	    var index=1;
		
		$scope.initializeTemplate=function(){
			$scope.template={
					"templateName":"",
					"sections":[]
			};
		};
		
		$scope.initializeTemplate();
		
		$scope.addNewSection=function(){
			    index++;
				var element=angular.element("#newTemplateForm");
				var section='<div id='+index+' class="form-group">'+
				'<label for="section" class="col-sm-1 col-xs-12 control-label">Section</label>'+
				'<div class="col-sm-10 col-xs-10">'+
				'<input type="text" class="form-control" name="section'+index+'" ng-model="template.sections['+index+']"  id="section" placeholder="Section">'+
				'</div>'+
				'<div class="col-sm-1 col-xs-1">'+
				'	<a class="btn btn-danger" ng-click="removeSection('+index+')" role="button"><span class="glyphicon glyphicon-remove"></span></a>'+
				'</div>'+
			    '</div>';
				var elem =$compile(section)($scope);
				element.append(elem);
		};
		
		$scope.removeSection=function(id){
			angular.element("#"+id).remove();
		};
		
		$scope.createTemplate=function(){
			$loading.start("main");
			var temp={"templateName":$scope.template.templateName,
					  "sections":[]};
			angular.forEach($scope.template.sections,function(section){
					temp.sections.push(section);
			});
			newTemplateFactory.createTemplate(temp).then(function(){
				$scope.initializeTemplate();
				$state.go('main.templates');
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
	};
	
	newTemplateController.$inject=['$scope','$compile','newTemplateFactory','$state','$loading'];
	
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
	
	function templatesController($scope,templatesFactory,$state,templatesService,$loading){
		$loading.start("main");
		templatesFactory.fetchTemplates().then(function(response){
			$scope.templates=response;
			$loading.finish("main");
		}).catch(function(){
			
		});
		
		$scope.editOrShow=function(templateObj,view){
			templatesService.template=templateObj;
			$state.go(view);
		};
		
		$scope.deleteTemplate=function(template,index){
			$loading.start("main");
			templatesFactory.deleteTemplate(template.templateId).then(function(){
				$scope.templates.splice(index,1);
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
	};
	
	templatesController.$inject=['$scope','templatesFactory',"$state",'templatesService','$loading'];
	
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
			template.sections=template.sections.toString();
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
		"DELETE_JOB_URL":"/vresume/job/",
        "USERS_SUBMISSIONS_URL":"/vresume/submissions/job/",
        "SUBMISSION_FOR_USER_URL":"/vresume/submissions/job/",
        "UPDATE_SUBMISSION_URL":"/vresume/submissions/updateStatus",
        "RESUME_DOWNLOAD_URL":"/vresume/submissions/filedownload?fileIs="
       
	});
	
})();

(function(){
	
	function myJobsController($scope,myJobsFactory,$state,myJobsService,$loading){
		
		$scope.postJob=function(){
			myJobsService.editJob=null;
			$state.go('main.postJob');
		};
		
		$scope.fetchMyJobs=function(status){
			$loading.start("main");
			myJobsFactory.fetchMyJobs(status).then(function(response){
				$scope.myJobs=response;
				$scope.status=status;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
			$scope.status=status;
		};
		
		$scope.fetchMyJobs("active");

		$scope.changeStatus=function(status,job,index){
			$loading.start("main");
			job.status=status;
			myJobsFactory.changeStatusOfJob(job).then(function(){
				$scope.myJobs.splice(index, 1);
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
		$scope.deleteJob=function(job,index){
			$loading.start("main");
			myJobsFactory.deleteJob(job.id).then(function(){
				$scope.myJobs.splice(index, 1);
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
		$scope.editJob=function(job){
			myJobsService.editJob=job;
			$state.go('main.postJob');
		};
		
		$scope.viewSubmissions=function(job){
			myJobsService.viewSubmissionJob=job;
			$state.go('main.viewSubmission');
		};
	};
	
	myJobsController.$inject=['$scope','myJobsFactory','$state','myJobsService','$loading'];
	
	angular.module('vResume.myJobs').controller("myJobsController",myJobsController);
	
})();

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
					"status":"active",
					"showCompensation":true
			};
		};
		
		postJobFactory.fetchTemplatesAndHMDetails().then(function(response){
			
			$scope.dateOptions={
					minDate: new Date()
				};
			
				$scope.templates=response.templates;
				$scope.HMDetails=response.hiringMgr;
				if(myJobsService.editJob===null){
					$scope.postOrUpdateLabel="PostJob To VideoResume";
					$scope.initializePostJob();
					if($scope.templates.length===0){
						$scope.error="Please create template before posting a job.";
					}
				}else{
					$scope.postOrUpdateLabel="UPDATE JOB";
					$scope.postJob=myJobsService.editJob;
					$scope.postJob.templateId=myJobsService.editJob.templateId;
					$scope.postJob.startDate=new Date(myJobsService.editJob.startDate);
					$scope.postJob.endDate=new Date(myJobsService.editJob.endDate);
					$scope.postJob.duration=parseInt(myJobsService.editJob.duration);
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
		
	};
	
	postJobController.$inject=['$scope','postJobFactory','$state','myJobsService','$timeout','$loading'];
	
	angular.module('vResume.myJobs').controller("postJobController",postJobController);
})();

(function(){
	
	function viewSubmissionController($scope,viewSubmissionFactory,$state,myJobsService,$loading){
		$loading.start("main");
		$scope.status='NEW';
		$scope.job= myJobsService.viewSubmissionJob;
		$scope.activeUser=0;
		$scope.activeSection=0;
		$scope.sectionRating=[];
		$scope.statusToMove="";
		$scope.availabilityId=[];
		$scope.interviewMode="INPERSON";
		
		$scope.initializeStatusCount=function(){
			$scope.statuses={
					"NEW":0,
					"SUBMITTED_HM":0,
					"PARK":0,
					"INTERVIEW_SCHEDULED":0,
					"HIRED":0,
					"REJECTED":0
				};
		};
		
		$scope.initializeStatusCount();
			
		$scope.statusCount=function(statusCounts){
			angular.forEach(statusCounts,function(statusObj){
				$scope.statuses[statusObj.status]=$scope.statuses[statusObj.status]+statusObj.count;
			});
		};
		
			$scope.fetchUsersSubmissionsForStatus=function(){
				$loading.start("main");
				viewSubmissionFactory.fetchUsersSubmissions($scope.job.id,$scope.status).then(function(response){
					$scope.viewSubmission=response;
					if($scope.viewSubmission.submmision !== null){
					 var myVideo = document.getElementsByTagName('video')[0];
					 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
                    $scope.statusToMove="";
					if($scope.status==="INTERVIEW_SCHEDULED"){
						$scope.availabilityId.push($scope.viewSubmission.submmision.availabilityId);
						$scope.interviewMode=$scope.viewSubmission.submmision.interviewMode;
					}
				}
					$scope.initializeStatusCount();
					$scope.statusCount($scope.viewSubmission.statusCounts);
					$loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
			};
			
			$scope.fetchUsersSubmissionsForStatus();
		
			$scope.changeSection=function(index){
				$loading.start("main");
				$scope.error="";
				$scope.activeSection=index;
				 var myVideo = document.getElementsByTagName('video')[0];
				 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
				$loading.finish("main");
			};
			
			$scope.fetchSubmissions=function(status){
				$scope.error="";
				$scope.status=status;
				$scope.fetchUsersSubmissionsForStatus();
			};
			
			$scope.getSubmissionsForUser=function(user,index){
				$loading.start("main");
				viewSubmissionFactory.getSubmissionsForUser($scope.job.id,user.userId,$scope.status).then(function(response){
					$scope.viewSubmission.submmision=response;
				 var myVideo = document.getElementsByTagName('video')[0];
				 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
				$scope.sectionRating=[];
				$scope.activeUser=index;
					$loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
			};
			
			$scope.toStatus=function(status){
				$scope.statusToMove= status;
				
				if($scope.statusToMove!=="INTERVIEW_SCHEDULED" && $scope.status!=="INTERVIEW_SCHEDULED"){
					$scope.interviewMode="INPERSON";
					$scope.availabilityId=[];
					$scope.processError="";
				}
				
				if(status!=='REJECTED'){
					$scope.rejectFlag=false;
				}else{
					$scope.rejectFlag=!$scope.rejectFlag;
				}
				};
			
			$scope.checkRatingValues=function(){
				if( $scope.sectionRating.length!==$scope.viewSubmission.submmision.sections.length){
					return true;
				}else{
					return false;
				}
			};
			
			$scope.checkStatusToMove=function(){
				if($scope.statusToMove===""){
					return true;
				}
				return false;
			};
			
			$scope.buildSubmissionObj=function(){
				var updatedSubmission=angular.copy($scope.viewSubmission.submmision);
				angular.forEach($scope.sectionRating,function(rating,index){
					if($scope.userDetails.role===2){
						updatedSubmission.sections[index].hmRating=rating;
					}else {
						updatedSubmission.sections[index].cmRating=rating;
					}
				});
				updatedSubmission.status=$scope.statusToMove;
				
				if(updatedSubmission.comments!==null){
					angular.forEach(updatedSubmission.comments,function(comment){
						if(comment.userId===$scope.userDetails.id){
							comment.comment=$scope.rejectionText;
						}
					});
				}else if($scope.statusToMove==="REJECTED"){
					updatedSubmission.comments=[{
						"submissionId":updatedSubmission.id,
						"comment":$scope.rejectionText,
						"userId":$scope.userDetails.id
					}];
				}else if($scope.statusToMove==="INTERVIEW_SCHEDULED"){
					updatedSubmission.availabilityId=$scope.availabilityId;
					updatedSubmission.interviewMode=$scope.interviewMode;
				}
				viewSubmissionFactory.updateSubmission(updatedSubmission).then(function(response){
					$scope.statusToMove="";
					$scope.rejectFlag=false;
					$scope.fetchUsersSubmissionsForStatus();
				}).catch(function(error){
					$loading.finish("main");
				});
				
			};
			
			$scope.submitRating=function(){
				$loading.start("main");
				$scope.error="";
				$scope.processError="";
				if($scope.checkRatingValues() && $scope.status==='NEW'){
					$scope.error="Please provide rating for all the sections";
					$loading.finish("main");
				}else if($scope.checkStatusToMove()){
					$scope.error="Please select the status to move ";
					$loading.finish("main");
				}else if($scope.statusToMove==="REJECTED" && $scope.rejectionText===undefined){
					$scope.error="Please provide reason for rejection";
					$loading.finish("main");
				}else if($scope.statusToMove==="INTERVIEW_SCHEDULED" && ($scope.interviewMode==="" || $scope.availabilityId===[])){
					$scope.processError="Please select Availability and mode of interview";
					$loading.finish("main");
				}else{
					$scope.buildSubmissionObj();
				}
			};
			
			$scope.fileDownload=function(){
				//$loading.start("main");
				viewSubmissionFactory.fileDownload($scope.viewSubmission.submmision).then(function(response){
					//$loading.finish("main");
				}).catch(function(){
					//$loading.finish("main");
				});
			};
			
			$scope.assignAvailabilityId=function(id){
				var index=$scope.availabilityId.indexOf(id);
				if(index===-1){
					$scope.availabilityId.push(id);
				}else{
					$scope.availabilityId.splice(index,1);
				}
			};
			
			$scope.assignInterviewMode=function(mode){
				$scope.interviewMode=mode;
			};
			
	};
	
	viewSubmissionController.$inject=['$scope','viewSubmissionFactory','$state','myJobsService','$loading'];
	
	angular.module('vResume.myJobs').controller("viewSubmissionController",viewSubmissionController);
	
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
	
	function viewSubmissionFactory($http,MYJOBS_CONSTANTS,$q){
		
		function fetchUsersSubmissions(jobId,status){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.USERS_SUBMISSIONS_URL+jobId+"?status="+status).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getSubmissionsForUser(jobId,userId,status){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.SUBMISSION_FOR_USER_URL+jobId+"/user/"+userId+"?status="+status).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function updateSubmission(submission){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.UPDATE_SUBMISSION_URL,submission).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function fileDownload(submission){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.RESUME_DOWNLOAD_URL+submission.userId+'\\'+submission.resumePath).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		
		return {
			fetchUsersSubmissions:fetchUsersSubmissions,
			getSubmissionsForUser:getSubmissionsForUser,
			updateSubmission:updateSubmission,
			fileDownload:fileDownload
		};
	};
	
	viewSubmissionFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('viewSubmissionFactory',viewSubmissionFactory);
	
})();






(function(){
	
	function myJobsService(){
	
		this.editJob=null;
		this.viewSubmissionJob=null;
	};
	
	myJobsService.$inject=[];
	
	angular.module('vResume.myJobs').service('myJobsService',myJobsService);
	
})();





(function(){
	
	angular.module('vResume.users').constant("USERS_CONSTANTS",{
		"FETCH_ALL_USERS_URL":"/vresume/fetchAllUsers",
		"ACTIVATE_USER_URL":"/vresume/activateUser?username=",
		"DEACTIVATE_USER_URL":"/vresume/deactivateUser?username="
	});
	
})();

(function(){
	
	function newUserController($scope,loginFactory,loginService,$loading){
		
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
			$loading.start("main");
				$scope.resetMessages();
				loginFactory.signup($scope.userDetails).then(function(response){
					$scope.loginMessageDetails.successMessage.signup_emailId="New User Created";
					$scope.resetUserDetails();
					$loading.finish("main");
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.signup_emailId="Something went wrong  please contact administrator";
					$loading.finish("main");
				});
		};
	};
	
	newUserController.$inject=['$scope','loginFactory','loginService','$loading'];
	
	angular.module('vResume.login').controller("newUserController",newUserController);
	
})();

(function(){
	
	function usersController($scope,usersFactory,$loading){
		$scope.fetchAllUsers=function(){
	    	$loading.start("main");
	    	usersFactory.fetchAllUsers().then(function(response){
				$scope.allUsers=response;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
            });
		};
		$scope.fetchAllUsers();
			
	    $scope.activateUser=function(user,index){
	    	$loading.start("main");
			usersFactory.activateUser(user.email).then(function(response){
				$scope.allUsers[index].verification=true;
				$scope.fetchAllUsers();
				}).catch(function(){
					$loading.finish("main");
	            });
		};
		
		$scope.deActivateUser=function(user,index){
			$loading.start("main");
			usersFactory.deActivateUser(user.email).then(function(response){
				$scope.allUsers[index].verification=false;
				$scope.fetchAllUsers();
				}).catch(function(){
					$loading.finish("main");
	            });
		};
		
	};
	
	usersController.$inject=['$scope','usersFactory','$loading'];
	
	angular.module('vResume.users').controller("usersController",usersController);
	
})();

(function(){
	
	function usersFactory($q,USERS_CONSTANTS,$http){
		
		function fetchAllUsers(){
			var defered=$q.defer();
			 $http.get(USERS_CONSTANTS.FETCH_ALL_USERS_URL).success(function(response){
				 defered.resolve(response);
			 }).error(function(){
				 defered.reject("error");
			 });
			return defered.promise;
		};
		
		function activateUser(email){
			var defered=$q.defer();
			 $http.post(USERS_CONSTANTS.ACTIVATE_USER_URL+email).success(function(response){
				 defered.resolve(response);
			 }).error(function(){
				 defered.reject("error");
			 });
			return defered.promise;
		};
		
		function deActivateUser(email){
			var defered=$q.defer();
			 $http.post(USERS_CONSTANTS.DEACTIVATE_USER_URL+email).success(function(response){
				 defered.resolve(response);
			 }).error(function(){
				 defered.reject("error");
			 });
			return defered.promise;
		};
		
		return {
			fetchAllUsers:fetchAllUsers,
			activateUser:activateUser,
			deActivateUser:deActivateUser
		};
	};
	
	usersFactory.$inject=['$q','USERS_CONSTANTS','$http'];
	
	angular.module('vResume.users').factory('usersFactory',usersFactory);
	
})();





(function(){
	
	angular.module('vResume.openings').constant("MYSUBMISSIONS_CONSTANTS",{
		"FETCH_MYSUBMISSIONS_URL":"/vresume/submissions/user/",
		 "FETCH_JOB_DETAILS_URL":"/vresume/job/",
		 "FETCH_MY_SUBMISSION_URL":"/vresume/submissions/job/"
	});
	
})();

(function(){
	
	angular.module('vResume.openings').constant("OPENINGS_CONSTANTS",{
		"OPENINGS_URL":"/vresume/job",
		"FETCH_SECTIONS_URL":"/vresume/templates/",
		"APPLY_JOB_URL":"/vresume/submissions",
		"INSERT_SECTIONS_URL":"/vresume/submissions/sections"
	});
	
})();

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
				"attachmentName":"",
				"notes":""
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

(function(){
	
	function mySubmissionsController($rootScope,$scope,$state,mySubmissionsFactory,$loading,mySubmissionsService){
		$loading.start("main");
		mySubmissionsFactory.fetchMySubmissions($scope.userDetails.id).then(function(response){
			$scope.mySubmissions=response;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		
		$scope.getJobDetails=function(jobId,index){
			
			if(	$scope.mySubmissions[index].jobDetails===undefined){
				mySubmissionsFactory.getJobDetails(jobId).then(function(response){
					$scope.mySubmissions[index].jobDetails={};
					$scope.mySubmissions[index].jobDetails=response;
					$scope.mySubmissions[index].showDescription=true;
					$loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
			}else{
				$scope.mySubmissions[index].showDescription=!$scope.mySubmissions[index].showDescription;
			}
		};
		
        $scope.showResume=function(jobId,jobTitle){
        	mySubmissionsService.jobId=jobId;
        	mySubmissionsService.jobTitle=jobTitle;
        	$state.go("main.viewResume");
		};
		
	};
	
	mySubmissionsController.$inject=['$rootScope','$scope','$state','mySubmissionsFactory','$loading','mySubmissionsService'];
	
	angular.module('vResume.openings').controller("mySubmissionsController",mySubmissionsController);
	
})();

(function(){
	
	function openingsController($rootScope,$scope,$state,openingsFactory,openingsService,$loading){
		$loading.start("main");
		openingsFactory.fetchOpenings().then(function(response){
				$scope.openings=response;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		
		$scope.applyJob=function(opening){
			openingsService.opening=opening;
			$state.go("main.applyJob");
		};
	};
	
	openingsController.$inject=['$rootScope','$scope','$state','openingsFactory','openingsService','$loading'];
	
	angular.module('vResume.openings').controller("openingsController",openingsController);
	
})();

(function(){
	
	function viewResumeController($rootScope,$scope,$state,mySubmissionsFactory,$loading,mySubmissionsService){
		$loading.start("main");
		
		$scope.activeSection=0;
		$scope.title=mySubmissionsService.jobTitle;
		mySubmissionsFactory.getMySubmission(mySubmissionsService.jobId,$scope.userDetails.id).then(function(response){
			$scope.mySubmission=response;
			 var myVideo = document.getElementsByTagName('video')[0];
			 myVideo.src = $scope.mySubmission.sections[$scope.activeSection].videoPath;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		
		$scope.changeSection=function(index){
			$loading.start("main");
			$scope.error="";
			$scope.activeSection=index;
			 var myVideo = document.getElementsByTagName('video')[0];
			 myVideo.src = $scope.mySubmission.sections[$scope.activeSection].videoPath;
			$loading.finish("main");
		};
	
		
	};
	
	viewResumeController.$inject=['$rootScope','$scope','$state','mySubmissionsFactory','$loading','mySubmissionsService'];
	
	angular.module('vResume.openings').controller("viewResumeController",viewResumeController);
	
})();

(function(){
	angular.module('vResume.openings').directive('fileModel', ['$parse', function ($parse) {
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
	
	function mySubmissionsFactory($http,MYSUBMISSIONS_CONSTANTS,$state,$q){
		
		function fetchMySubmissions(id){
			var defered=$q.defer();
			$http.get(MYSUBMISSIONS_CONSTANTS.FETCH_MYSUBMISSIONS_URL+id).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function getJobDetails(jobId){
			var defered=$q.defer();
			$http.get(MYSUBMISSIONS_CONSTANTS.FETCH_JOB_DETAILS_URL+jobId).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function getMySubmission(jobId,userId){
			var defered=$q.defer();
			$http.get(MYSUBMISSIONS_CONSTANTS.FETCH_MY_SUBMISSION_URL+jobId+"/user/"+userId).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		
		return {
			fetchMySubmissions:fetchMySubmissions,
			getJobDetails:getJobDetails,
			getMySubmission:getMySubmission
		};
	};
	
	mySubmissionsFactory.$inject=['$http','MYSUBMISSIONS_CONSTANTS','$state','$q'];
	
	angular.module('vResume.openings').factory('mySubmissionsFactory',mySubmissionsFactory);
	
})();





(function(){
	
	function openingsFactory($http,OPENINGS_CONSTANTS,$state,$q){
		
		function fetchOpenings(){
			var defered=$q.defer();
			$http.get(OPENINGS_CONSTANTS.OPENINGS_URL).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function getSections(templateId){
			var defered=$q.defer();
			$http.get(OPENINGS_CONSTANTS.FETCH_SECTIONS_URL+templateId).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		function submitSections(resume,submissionId,defered){
			
			angular.forEach(resume.sections,function(section,index){
				
				var payload = new FormData();
				
				 payload.append('sectionName', section.sectionName);
				 payload.append('submissionId', submissionId);
				 payload.append('userRating', section.userRating);
				payload.append('videoFile', section.videoFile);
				
				 $.ajax({
						type : 'POST',
						url : OPENINGS_CONSTANTS.INSERT_SECTIONS_URL,
						data : payload,
						contentType: false,
						processData : false,
						success : function(response) {
							if(index===resume.sections.length-1){
								defered.resolve("");
							};
						},
						error : function(xhr, status) {
							defered.reject("error");
						}
					});
			});
			
			
		}
		
		
		
		function applyJob(resume,jobDetails){
			var defered=$q.defer();
			var payload = new FormData();
			
			 payload.append('jobId', jobDetails.id);
			 payload.append('resumeName', resume.attachmentName);
			 payload.append('resume', resume.attachment);
			payload.append('availablities', JSON.stringify(resume.interviewAvailability));
			 
           
			 $.ajax({
					type : 'POST',
					url : OPENINGS_CONSTANTS.APPLY_JOB_URL,
					data : payload,
					contentType: false,
					processData : false,
					success : function(response) {
						submitSections(resume,response,defered);
					},
					error : function(xhr, status) {
						 defered.reject("error");
					}
				});
			return defered.promise;
		}
		
		return {
			fetchOpenings:fetchOpenings,
			getSections:getSections,
			applyJob:applyJob,
			submitSections:submitSections
		};
	};
	
	openingsFactory.$inject=['$http','OPENINGS_CONSTANTS','$state','$q'];
	
	angular.module('vResume.openings').factory('openingsFactory',openingsFactory);
	
})();





(function(){
	
	function mySubmissionsService(){
	
		this.jobId=null;
		this.jobTitle=null;
	};
	
	mySubmissionsService.$inject=[];
	
	angular.module('vResume.openings').service('mySubmissionsService',mySubmissionsService);
	
})();





(function(){
	
	function openingsService(){
	
		this.opening=null;
	};
	
	openingsService.$inject=[];
	
	angular.module('vResume.openings').service('openingsService',openingsService);
	
})();



