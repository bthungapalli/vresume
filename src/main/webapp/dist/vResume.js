(function(){
	
	var appModule=angular.module('vResume',['mwl.calendar','ui.bootstrap','ngRoute','ui.router','angular-input-stars','angularUtils.directives.dirPagination','ngCookies','darthwade.dwLoading','vResume.login','vResume.main','vResume.profile','vResume.templates','vResume.myJobs','vResume.users','vResume.openings','ng-clipboard']);

	angular.element(document).ready(function() {
	    angular.bootstrap("body", ['vResume']);
	 });
	
	appModule.config(function($stateProvider, $urlRouterProvider,$httpProvider){
		
		$httpProvider.interceptors.push([function(){
		    return {
		        request: function(config){
		            if(config.url.indexOf('partials/') > -1 || config.url.indexOf('dist/vResume.js') > -1){
		                var separator = config.url.indexOf('?') === -1 ? '?' : '&';
		                config.url = config.url + separator + 'c=' + '123a';
		            }

		            return config;
		        }
		    };
		}]);
		
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
        }).state('contactUs', {
       	 url: '/contactUs',
       	 controller:'contactUsController',
         templateUrl: 'partials/contactUs.html'
        }).state('viewJob', {
         url: '/viewJob/:jobId',
         controller:'viewJobController',
         templateUrl: 'partials/viewJob.html'
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
        }).state('main.viewTechSubmission', {
            url: '/viewTechSubmission',
            controller:'viewTechSubmissionController',
            templateUrl: 'partials/viewTechSubmission.html'
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
        }).state('main.calendar', {
            url: '/calendar',
            controller:'calenderController',
            templateUrl: 'partials/calender.html'
        }).state('main.changePassword', {
            url: '/changePassword',
            controller:'changePasswordController',
            templateUrl: 'partials/changePassword.html'
        }).state('login.confirmationInstructions', {
            url: '/confirmationInstructions',
            templateUrl: 'partials/login/confirmationInstructions.html'
        }).state('main.techJobs', {
            url: '/techJobs',
            controller:'techJobsController',
            templateUrl: 'partials/techJobs.html'
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
		"CONFIRMATION_INSTRUCTIONS_URL":"/vresume/updateToken?email=",
		"CONTACT_US_URL":"/vresume/contactUs",
		"AUTO_LOGIN_FLAG":false
	});
	
})();

(function(){
	
	function contactUsController($rootScope,$scope,$state,loginService,loginFactory,$cookies,$loading,$location,LOGIN_CONSTANTS){
		
		$scope.successMessage="";
		$scope.failureMessage="";
		
		$scope.resetUserDetails=function() {
			$scope.userDetails = {
				"name":"",
				"businessName":"",
				"website":"",
				"emailId" : "",
				"contactNumber" : "",
				"country" : ""
			};
		};

		$scope.resetUserDetails();
		
		$scope.contactUs=function(){
			$loading.start('contactUs');
			$scope.successMessage="";
			$scope.failureMessage="";
			loginFactory.submitContactUs($scope.userDetails).then(function(response){
				$scope.successMessage="Mail Sent Successfully";
				 $loading.finish('contactUs');
			}).catch(function(error){
				$scope.failureMessage="Something Went Wrong";
				$loading.finish('contactUs');
            });
		};
		
	};
	
	contactUsController.$inject=['$rootScope','$scope','$state','loginService','loginFactory','$cookies','$loading','$location','LOGIN_CONSTANTS'];
	
	angular.module('vResume.login').controller("contactUsController",contactUsController);
	
})();

(function(){
	
	function loginController($rootScope,$scope,$state,loginService,loginFactory,$cookies,$loading,$location,LOGIN_CONSTANTS){
		var token=$location.search().token;
		$state.go("login.loginTemplate");
		$scope.rememberMe=false;
		$scope.autologinFlag = LOGIN_CONSTANTS.AUTO_LOGIN_FLAG;
		
		$scope.contactUs=function(){
			$state.go("contactUs");
		};
		
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
					"signup_confirmPassword":"",
					"forgotPassword":"",
					"registerConfirmation":""
				},
				"successMessage" : {
					"login" : "",
					"signup_emailId" : "",
					"signup_confirmPassword":"",
					"forgotPassword":"",
					"registerConfirmation":""
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
		 
		
		$scope.checkForRememberMe();
		$scope.resetUserDetails();
		$scope.resetMessages();
		
		if(token!==undefined){
			$loading.start('login');
			loginFactory.registrationConfirmation(token).then(function(response){
				if(response.success!==undefined){
					$scope.loginMessageDetails.successMessage.registerConfirmation=response.success;
				}
				$loading.finish('login');
			}).catch(function(error){
				$scope.loginMessageDetails.errorMessage.registerConfirmation=error.failed;
				$loading.finish('login');
            });
		}
		
		
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
					$scope.loginMessageDetails.successMessage.forgotPassword="Mail sent successfully";
					$scope.resetUserDetails();
					$loading.finish('login');
				}).catch(function(error){
					$scope.loginMessageDetails.errorMessage.forgotPassword="Something went wrong  please contact administrator";
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
	
	loginController.$inject=['$rootScope','$scope','$state','loginService','loginFactory','$cookies','$loading','$location','LOGIN_CONSTANTS'];
	
	angular.module('vResume.login').controller("loginController",loginController);
	
})();

(function(){
	
	function registrationConfirmationController($scope,$state,loginFactory,$location,$loading,$window){
		        $loading.start('register');
				loginFactory.registrationConfirmation($location.search().token).then(function(response){
					if(response.success!==undefined){
						//$scope.success=response.success;
						window.location.href = response.success;
					}
					$loading.finish('register');
				}).catch(function(error){
					$scope.error=error.failed;
					$loading.finish('register');
	            });
	};
	
	
	
	registrationConfirmationController.$inject=['$scope','$state','loginFactory','$location','$loading','$window'];
	
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
		
		function submitContactUs(userDetails){
			var defered=$q.defer();
			var body =  {"emailId" : userDetails.emailId,"name": userDetails.name,"businessName":userDetails.businessName,"website":userDetails.website,"contactNumber":userDetails.contactNumber,"country":userDetails.country};
			$http.post(LOGIN_CONSTANTS.CONTACT_US_URL,body).success(function(response) {
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
			confirmationInstructions:confirmationInstructions,
			submitContactUs:submitContactUs
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
					"Hiring Manager":2,
					"Corporate User":7
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
					$scope.changePassword.password='';
					$scope.changePassword.confirmPassword='';


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
	
	function mainController($rootScope,$scope,$state,roleService,mainFactory,$loading,myJobsService){
		$loading.start("main");
		$scope.currentView=".openings";
		$scope.currentView=".myJobs";
		
		  var pageredirect = true;
		   if(pageredirect===true){
			$scope.value=function(userDetails){
				$scope.userDetails=userDetails;
				$scope.authorities=roleService.roleAuthorities($scope.userDetails.role);
				if($scope.userDetails.role===0){
					$state.go("main.openings");
				}
				else if($scope.userDetails.role===1 || $scope.userDetails.role===2 || $scope.userDetails.role===7 ){
					$state.go("main.myJobs");
				}else if ($scope.userDetails.role===8){
					$state.go("main.techJobs");
				}
				$loading.finish("main");	
			};
	     }
		else{
			$scope.currentView=".profile";
			$scope.value=function(userDetails){
				$scope.userDetails=userDetails;
				$state.go("main.profile");
				$scope.authorities=roleService.roleAuthorities($scope.userDetails.role);
				$loading.finish("main");
			};
		}
		
		
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
			if(view===".postJob"){
				myJobsService.editJob=null;
			}
			$scope.currentView=view;
		};
		
		$scope.$on('sideBarViewEvent', function(event, data) {
			$scope.currentView=data;
		});
		
	};
	
	mainController.$inject=['$rootScope','$scope','$state','roleService','mainFactory','$loading','myJobsService'];
	
	angular.module('vResume.login').controller("mainController",mainController);
	
})();

(function(){
	
	function mainFactory($rootScope,$http,$window,MAIN_CONSTANTS,$state,$q){
		
		function logout(){
			$http.get(MAIN_CONSTANTS.LOGOUT_URL).then(function(){
				$rootScope.user=null;
				//$state.go("login");
				$window.location.href = 'http://www.facemyresume.com?logout=true';
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
	
	mainFactory.$inject=['$rootScope','$http','$window','MAIN_CONSTANTS','$state','$q'];
	
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
					".mySubmissions":["glyphicon glyphicon-share","Submissions"],
					".calendar":["glyphicon glyphicon-calendar","Calendar"]
				} ,
				"1" : {
					"":["glyphicon glyphicon-user","Consulting Company"],
					".templates":["glyphicon glyphicon-pencil","Templates"],
					".myJobs":["glyphicon glyphicon-screenshot","My Jobs"],
					".postJob":["glyphicon glyphicon-lock","Post Job"],
					".calendar":["glyphicon glyphicon-calendar","Calendar"]
				},
				"2" : {
					"":["glyphicon glyphicon-user","Hiring Manager"],
					".templates":["glyphicon glyphicon-pencil","Templates"],
					".myJobs":["glyphicon glyphicon-screenshot","My Jobs"],
					".postJob":["glyphicon glyphicon-lock","Post Job"],
					".calendar":["glyphicon glyphicon-calendar","Calendar"]
				},
				"3" : {
					"":["glyphicon glyphicon-lock","Admin"],
					".allUsers":["glyphicon glyphicon-modal-window","All Users"]
				},
				"7" : {
					"":["glyphicon glyphicon-user","Corporate User"],
					".templates":["glyphicon glyphicon-pencil","Templates"],
					".myJobs":["glyphicon glyphicon-screenshot","My Jobs"],
					".postJob":["glyphicon glyphicon-lock","Post Job"]
				},
				"8" : {
					"":["glyphicon glyphicon-user","Technical User"],
					".techJobs":["glyphicon glyphicon-screenshot","Posted Jobs"]
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
		"PROFILE_UPDATE_URL":"/vresume/updateProfile",
		"FETCH_ALL_CMS_URL":"/vresume/allCms",
		"CHECK_EMAIL_AVAILABLE":"/vresume/emailValidation?emailId=",
		"REMOVE_CM_OR_HM":"/vresume/removeCmOrHm",
		"ADD_CM_OR_HM":"/vresume/addCmOrHm",
		"SAVE_ALREADY_EXISTING_CMS":"/vresume/existingCms",
		"UPLOAD_DEFAULT_VIDEO_URL":"/vresume/uplaodDefaultVideo",
		"DELETE_VIDEO_URL":"/vresume/deleteDefaultVideo/",
		"GET_CALENDER_URL":"/vresume/calender"
	});
	
})();

(function(){
	
	function availableCmsController($scope,$loading,$uibModalInstance,allCms){
		
		$scope.errorMessage="";
		$scope.finalCms=[];
		$scope.allCms=allCms;
		 $scope.ok = function () {
			 var temp=[];
			 $scope.allCms.forEach(function(cm){
				if($scope.finalCms.indexOf(cm.id)>-1){
					temp.push(cm);
				}	
			});
		 $uibModalInstance.close(temp);
		};

	     $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
	     };
	     
	     $scope.addToCMList=function(cm){
	    	 if($scope.finalCms.indexOf(cm.id)>-1){
	    		 $scope.finalCms.splice($scope.finalCms.indexOf(cm.id),1);
	    	 }else{
	    		 $scope.finalCms.push(cm.id);
	    	 }
	     };
	    
	};
	
	availableCmsController.$inject=['$scope','$loading','$uibModalInstance','allCms'];
	
	angular.module('vResume.profile').controller("availableCmsController",availableCmsController);
	
})();

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
						startTime[0]=12 + startTime[0];
					}
					
					if(element.toTime.split(' ')[1]==='AM'){
						endTime=element.toTime.split(' ')[0].split(':');
					}else{
						endTime=element.toTime.split(' ')[0].split(':');
						endTime[0]=12 + endTime[0];
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

(function(){
	
	function defaultVideoController($scope,$loading,$uibModalInstance,url){
		
		$scope.errorMessage="";
		$scope.url=url;
		 $scope.ok = function () {
			 
		 $uibModalInstance.close(temp);
		};

	     $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
	     };
	     
	    
	};
	
	defaultVideoController.$inject=['$scope','$loading','$uibModalInstance','url'];
	
	angular.module('vResume.profile').controller("defaultVideoController",defaultVideoController);
	
})();

(function(){
	
	function profileController($scope,profileFactory,$loading,$uibModal,$location){
		
		$scope.viewProfile=true;
		$scope.roleEmailIdErrorMessage="";
		$scope.users=[];
		$scope.techUsers=[];
		$scope.search="";
		$scope.resumeInvalidMessage="";
		$scope.videoInvalidMessage=["","","",""];
		$scope.defaultVideos=[0,1,2,3];
		$scope.defaultVideoTitles=["","","",""];
		if($scope.userDetails!==undefined){
			$scope.profileDetails=angular.copy($scope.userDetails);
			$scope.profileDetails.jobType=($scope.profileDetails.jobType).toString();
			$scope.profileDetails.roleEmailId="";
			if($scope.userDetails.role===1){
				$scope.profileDetails.hms=$scope.profileDetails.hms?$scope.profileDetails.hms:[];
				$scope.users=angular.copy($scope.profileDetails.hms);
				$scope.roleType="HM";
				$scope.roleId="2";
			}else if($scope.userDetails.role===2){
				$scope.profileDetails.cms=$scope.profileDetails.cms?$scope.profileDetails.cms:[];
				$scope.users=angular.copy($scope.profileDetails.cms);
				$scope.techUsers=angular.copy($scope.profileDetails.techUsers);
				$scope.roleType="CM";
				$scope.roleId="1";
				$scope.techRoleId="8";
				$scope.fetchAllCMS=function(){
			    	$loading.start("main");
			    	profileFactory.fetchAllCMS().then(function(response){
						$scope.allCMS=response;
						var temp= angular.copy($scope.allCMS);
						$scope.profileDetails.cms.forEach(function(selectedCm){
							 temp.forEach(function(cm,index){
								 if(cm.email===selectedCm.email){
									 $scope.allCMS.splice(index,1);
								 }
							 });
						});
						
						$loading.finish("main");
					}).catch(function(){
						
						$loading.finish("main");
		            });
				};
				$scope.fetchAllCMS();
			}
			
		}
		$scope.fileUrl=$scope.profileDetails.defaultResumePath?$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/filedownload?filePath="+$scope.profileDetails.defaultResumePath:'' ;
		$scope.editProfile=function(){
			$scope.viewProfile=!$scope.viewProfile;
			$loading.finish("main");
		};
		
		$scope.changeToInt=function(value){
			return parseInt(value);
		};
		
		$scope.updateProfile=function(){
			$loading.start("main");
			
			$scope.profileImageInvalidMessage="";
			 if($scope.profileDetails.profileImage!==undefined && $scope.profileDetails.profileImage!==null){
				 if(($scope.profileDetails.profileImage.name.substring($scope.profileDetails.profileImage.name.lastIndexOf(".")+1)!=="jpg") && ($scope.profileDetails.profileImage.name.substring($scope.profileDetails.profileImage.name.lastIndexOf(".")+1)!=="jpeg")&& ($scope.profileDetails.profileImage.name.substring($scope.profileDetails.profileImage.name.lastIndexOf(".")+1)!=="png")){
					 $scope.profileImageInvalidMessage="Invalid image format";
				 }
			 }
			
			 $scope.resumeInvalidMessage="";
			 if($scope.profileDetails.defaultResume!==undefined && $scope.profileDetails.defaultResume!==null){
				 if(($scope.profileDetails.defaultResume.name.substring($scope.profileDetails.defaultResume.name.lastIndexOf(".")+1)!=="doc") && ($scope.profileDetails.defaultResume.name.substring($scope.profileDetails.defaultResume.name.lastIndexOf(".")+1)!=="docx") && ($scope.profileDetails.defaultResume.name.substring($scope.profileDetails.defaultResume.name.lastIndexOf(".")+1)!=="pdf") && ($scope.profileDetails.defaultResume.name.substring($scope.profileDetails.defaultResume.name.lastIndexOf(".")+1)!=="xls") ){
					 $scope.resumeInvalidMessage="Invalid file format";
				 }else if(($scope.profileDetails.defaultResume.size/1024000)>1){
					 $scope.resumeInvalidMessage="File size exceeded";
				 }
			 }
			 
//			 $scope.videoInvalidMessage="";
//			 if($scope.profileDetails.defaultVideo !== undefined && $scope.profileDetails.defaultVideo !== null){
//				 if($scope.profileDetails.defaultVideo.type.indexOf("mp4")===-1 && $scope.profileDetails.defaultVideo.type.indexOf("webm")===-1 && $scope.profileDetails.defaultVideo.type.indexOf("ogg")===-1 && $scope.profileDetails.defaultVideo.type.indexOf("ogv")===-1 ){
//					 $scope.videoInvalidMessage="Invalid file format";
//				 }else if(($scope.profileDetails.defaultVideo.size/1024000)>10){
//					 $scope.videoInvalidMessage="File size exceeded";
//				 }
//			 }
			 var isError=false;
			 
			 angular.forEach($scope.profileDetails.defaultVideo, function(value, key) {
					 $scope.videoInvalidMessage[key]="";
					 if(value.type.indexOf("mp4")===-1 && value.type.indexOf("webm")===-1 && value.type.indexOf("ogg")===-1 && value.type.indexOf("ogv")===-1 ){
						 $scope.videoInvalidMessage[key]="Invalid file format";
						 isError=true;
					 }else if((value.size/1024000)>10){
						 isError=true;
						 $scope.videoInvalidMessage[key]="File size exceeded";
					 }
					 if($scope.defaultVideoTitles[key]===''){
						 isError=true;
						 $scope.videoInvalidMessage[key]="Video Title is required";
					 }
					 if( $scope.defaultVideoTitles[key]!==''){
						 angular.forEach($scope.defaultVideoTitles, function(title, index) {
							 if(parseInt(key)!==index && title===$scope.defaultVideoTitles[key]){
								 isError=true;
								 $scope.videoInvalidMessage[key]="Video Title is duplicate";
							 }
						 });
						 angular.forEach($scope.profileDetails.defaultVideos, function(video, index) {
							 if(video.videoTitle===$scope.defaultVideoTitles[key]){
								 isError=true;
								 $scope.videoInvalidMessage[key]="Video Title is duplicate";
							 }
						 });
					 }
			 });
			 
			
			 if( isError || $scope.resumeInvalidMessage!=="" || $scope.profileImageInvalidMessage!==""){
				 $loading.finish("main");
			 }else{
					if($scope.userDetails.role===1){
						$scope.profileDetails.hms=$scope.users;
					}else if($scope.userDetails.role===2){
						$scope.profileDetails.cms=$scope.users;
					}
					profileFactory.updateProfile($scope.profileDetails).then(function(response){
						$scope.roleEmailIdErrorMessage="";
						$scope.users=[];
						var updatedUserDetails=response.user;
						if($scope.profileDetails.defaultVideo){
							var i=0;
							var j=0;
							var length= Object.keys($scope.profileDetails.defaultVideo).length;
							var videos=[];
							 angular.forEach($scope.profileDetails.defaultVideo, function(value, key) {
								 i++;
								 var temp={
										 "defaultVideo":value,
										 "videoTitle":angular.copy($scope.defaultVideoTitles[key])
								 };
								 
								 profileFactory.uploadDefaultVideo(temp).then(function(response){
									 j++;
									 videos.push(response);
									 if(j===length){
										 $scope.updateSuccess(updatedUserDetails,videos);
									 }
								 });
							 });
						}else{
							$scope.updateSuccess(updatedUserDetails);
						}
						
						
						
					}).catch(function(){
						$loading.finish("main");
					});
			 }
			 

		};
		
		$scope.updateSuccess=function(updatedUserDetails,videos){
			if(updatedUserDetails.imagePath!==null){
				$scope.profileDetails.imagePath=updatedUserDetails.imagePath;
				$scope.profileDetails.profieImageBytes=updatedUserDetails.profieImageBytes;
				$scope.profileDetails.profileImage=null;
			}
			if(updatedUserDetails.defaultResumePath){
				$scope.profileDetails.defaultResumePath=updatedUserDetails.defaultResumePath;
				$scope.fileUrl=$scope.profileDetails.defaultResumePath?$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/filedownload?filePath="+$scope.profileDetails.defaultResumePath:'' ;
				$scope.profileDetails.defaultResume=null;
			}
			
			if(videos){
				if(!$scope.profileDetails.defaultVideos){
					$scope.profileDetails.defaultVideos=[];
				}
				 angular.forEach(videos, function(video) {
					 $scope.profileDetails.defaultVideos.push(video);
				 });
				$scope.profileDetails.defaultVideo=null;
			}
			$scope.defaultVideoTitles=["","","",""];
			angular.extend($scope.userDetails, $scope.profileDetails);
			if($scope.userDetails.role===1){
				$scope.profileDetails.hms=$scope.profileDetails.hms?$scope.profileDetails.hms:[];
				$scope.users=angular.copy($scope.profileDetails.hms);
				$scope.roleType="HM";
				$scope.roleId="2";
			}else if($scope.userDetails.role===2){
				$scope.profileDetails.cms=$scope.profileDetails.cms?$scope.profileDetails.cms:[];
				$scope.users=angular.copy($scope.profileDetails.cms);
				$scope.roleType="CM";
				$scope.roleId="1";
			}
			$scope.editProfile();
		};
		
		$scope.ValidateEmail=function(mail){
		 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
		  {
		    return (true);
		  }
		    
		    return (false);
		};
		
		$scope.remove=function(index){
			$loading.start("main");
			$scope.profileDetails.roleEmailId="";
			$scope.roleEmailIdErrorMessage="";
			profileFactory.removeCmOrHm($scope.users[index]).then(function(response){
				if($scope.users[index].role===1){
//					var temp=angular.copy($scope.users[index]);
//					temp.role=1;
//					$scope.allCMS.push(temp);
					$scope.userDetails.cms.splice(index,1);
					$scope.users=$scope.userDetails.cms;
				}else if($scope.users[index].role===2){
					$scope.userDetails.hms.splice(index,1);
					$scope.users=$scope.userDetails.hms;
				}
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
		$scope.saveAlreadyExistingCms=function(selectedCms){
		 $loading.start("main");
			profileFactory.saveAlreadyExistingCms(selectedCms).then(function(response){
				/*var temp= angular.copy($scope.allCMS);
				selectedCms.forEach(function(selectedCm){
					 temp.forEach(function(cm,index){
						 if(cm.id===selectedCm.id){
							 $scope.allCMS.splice(index,1);
						 }
					 });
				});*/
				$scope.users = response;
				$scope.userDetails.cms=response;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		 
		};
		
		$scope.checkUser=function(){
			var result = false;
			$scope.users.forEach(function(user){
				if(user.email===$scope.profileDetails.roleEmailId){
					return true;
				}
			});
			return result;
		};
		
		$scope.add=function(){
			$loading.start("main");
			$scope.roleEmailIdErrorMessage="";
			if($scope.ValidateEmail($scope.profileDetails.roleEmailId)){
				profileFactory.checkEmailAvailable($scope.profileDetails.roleEmailId).then(function(response){
					if(response[0]==='alreadyExist'){
						$scope.roleEmailIdErrorMessage="Email Id already exist.";
						$loading.finish("main");
					}else{
						if($scope.checkUser()){
							$scope.roleEmailIdErrorMessage="Already "+$scope.roleType+" Exists";
						}else{
							var newUser={
									"email":$scope.profileDetails.roleEmailId,
									"role":$scope.roleId
							};
							profileFactory.addCmOrHm(newUser).then(function(response){
								newUser.id=response.id;
								$scope.users.push(newUser);
								$scope.profileDetails.roleEmailId="";
								$loading.finish("main");
							}).catch(function(){
								$scope.roleEmailIdErrorMessage="Something went wrong.";
								$loading.finish("main");
							});
						}
					}
				}).catch(function(error){
					$scope.roleEmailIdErrorMessage="Something went wrong.";
					$loading.finish("main");
	            });
			}else{
				$scope.roleEmailIdErrorMessage="Invalid Email Id";
				$loading.finish("main");
			}
		};
		
		$scope.addTech=function(){
			$loading.start("main");
			$scope.roleTechEmailIdErrorMessage="";
			if($scope.ValidateEmail($scope.profileDetails.roleTechEmailId)){
				profileFactory.checkEmailAvailable($scope.profileDetails.roleTechEmailId).then(function(response){
					if(response[0]==='alreadyExist'){
						$scope.roleTechEmailIdErrorMessage="Email Id already exist.";
						$loading.finish("main");
					}else{
						if($scope.checkUser()){
							$scope.roleTechEmailIdErrorMessage="Already "+$scope.roleType+" Exists";
						}else{
							var newUser={
									"email":$scope.profileDetails.roleTechEmailId,
									"role":$scope.techRoleId
							};
							profileFactory.addCmOrHm(newUser).then(function(response){
								newUser.id=response.id;
								$scope.techUsers.push(newUser);
								$scope.profileDetails.roleTechEmailId="";
								$loading.finish("main");
							}).catch(function(){
								$scope.roleTechEmailIdErrorMessage="Something went wrong.";
								$loading.finish("main");
							});
						}
					}
				}).catch(function(error){
					$scope.roleTechEmailIdErrorMessage="Something went wrong.";
					$loading.finish("main");
	            });
			}else{
				$scope.roleTechEmailIdErrorMessage="Invalid Email Id";
				$loading.finish("main");
			}
		};
		
		$scope.removeTechnical=function(index){
			$loading.start("main");
			$scope.profileDetails.roleTechEmailId="";
			$scope.roleTechEmailIdErrorMessage="";
			profileFactory.removeCmOrHm($scope.techUsers[index]).then(function(response){
				if($scope.techUsers[index].role===8){
					$scope.userDetails.techUsers.splice(index,1);
					$scope.techUsers=$scope.userDetails.techUsers;
				}
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
		};
		
		$scope.downloadDefaultResumeFile=function(){
			$scope.profileDetails.defaultResumePath;
			profileFactory.downloadFile($scope.profileDetails.defaultResumePath).then(function(response){
				
			});
		};
		
		$scope.openVideo=function(url){
			var modalInstance = $uibModal.open({
				  animate:true,
				  backdrop: 'static',
				  keyboard:false,
			      templateUrl: 'partials/profile/defaultVideo.html',
			      size: 'lg',
			      controller:'defaultVideoController',
			      resolve:{
			    	  url:function(){
			    		  return url;
			          }
			      }
			    });

			 modalInstance.result.then(function(data){
				 //ok
				 if(data.length>0){
					 $scope.saveAlreadyExistingCms(data);
				 }
				 
				 
			   }, function () {
			     // cancel
			    });
		};
		
		$scope.deleteVideo=function(id,index){
			 if(confirm("Do you want to delete Video!")){
				 $loading.start("main");
					profileFactory.deleteVideo(id).then(function(response){
						$scope.profileDetails.defaultVideos[index]={"videoTitle":null};
						$scope.userDetails.defaultVideos=$scope.profileDetails.defaultVideos;
						$loading.finish("main");
					}).catch(function(){
						
						$loading.finish("main");
		            });
			 }
		};
		
		$scope.availableCMS=function(){
			$scope.roleEmailIdErrorMessage="";
			$scope.profileDetails.roleEmailId="";
			$loading.start("main");
	    	profileFactory.fetchAllCMS().then(function(response){
				$scope.allCMS=response;
				var temp= angular.copy($scope.allCMS);
				$scope.userDetails.cms.forEach(function(selectedCm){
					$scope.allCMS.forEach(function(cm,index){
						 if(cm.email===selectedCm.email){
							 $scope.allCMS.splice(index,1);
						 }
					 });
				});
				var modalInstance = $uibModal.open({
					  animate:true,
					  backdrop: 'static',
					  keyboard:false,
				      templateUrl: 'partials/profile/availableCms.html',
				      size: 'lg',
				      controller:'availableCmsController',
				      resolve:{
				    	  allCms:function(){
				    		  return $scope.allCMS;
				          }
				      }
				    });

				 modalInstance.result.then(function(data){
					 //ok
					 if(data.length>0){
						 $scope.saveAlreadyExistingCms(data);
					 }
					 
					 
				   }, function () {
				     // cancel
				    });
				$loading.finish("main");
			}).catch(function(){
				
				$loading.finish("main");
            });
			
		};
		
		
		$loading.finish("main");
	};
	
	profileController.$inject=['$scope','profileFactory','$loading','$uibModal','$location'];
	
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
	
	function profileFactory($q,PROFILE_CONSTANTS,$http){
		
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
				 payload.append('expectedSalary',profileDetails.expectedSalary);
				 payload.append('primarySkills', profileDetails.primarySkills);
				 payload.append('secondarySkills', profileDetails.secondarySkills);
				 payload.append('prefredLocations', profileDetails.prefredLocations);
				 payload.append('workAuthorization', profileDetails.workAuthorization);
				 payload.append('jobType', profileDetails.jobType);
				 payload.append('defaultResumePath', profileDetails.defaultResumePath);
			 }/*else if(profileDetails.role===1){
				 payload.append('hms', profileDetails.hms);
			 }else if(profileDetails.role===2){
				 payload.append('cms', profileDetails.cms);
			 }*/
			 
			 if(profileDetails.profileImage!==null){
				 payload.append('profileImage', profileDetails.profileImage);
			 }
			 if(profileDetails.defaultResume!==null){
				 payload.append('defaultResume', profileDetails.defaultResume);
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
		
		function fetchAllCMS(){
			var defered=$q.defer();
			 $http.get(PROFILE_CONSTANTS.FETCH_ALL_CMS_URL).success(function(response){
				 defered.resolve(response);
			 }).error(function(){
				 defered.reject("error");
			 });
			return defered.promise;
		};
		
		function checkEmailAvailable(emailId){
			var defered=$q.defer();
			$http.get(PROFILE_CONSTANTS.CHECK_EMAIL_AVAILABLE+emailId).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function removeCmOrHm(user){
			var defered=$q.defer();
			var body = user;
			$http.post(PROFILE_CONSTANTS.REMOVE_CM_OR_HM,body).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function addCmOrHm(newUser){
			var defered=$q.defer();
			$http.post(PROFILE_CONSTANTS.ADD_CM_OR_HM,newUser).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function saveAlreadyExistingCms(data){
			var defered=$q.defer();
			$http.post(PROFILE_CONSTANTS.SAVE_ALREADY_EXISTING_CMS,data).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function downloadFile(path){
			var defered=$q.defer();
			$http.get(PROFILE_CONSTANTS.DOWNLOAD_URL+path).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function deleteVideo(id){
			var defered=$q.defer();
			$http.delete(PROFILE_CONSTANTS.DELETE_VIDEO_URL+id).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		
		
		function uploadDefaultVideo(defaultVideo){
			var defered=$q.defer();
			 var payload = new FormData();
			
				 payload.append('defaultVideo', defaultVideo.defaultVideo);
				 payload.append('videoTitle', defaultVideo.videoTitle);
			 
			 $.ajax({
					type : 'POST',
					url : PROFILE_CONSTANTS.UPLOAD_DEFAULT_VIDEO_URL,
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
		
		function getCalenders(){
			var defered=$q.defer();
			$http.get(PROFILE_CONSTANTS.GET_CALENDER_URL).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
			updateProfile:updateProfile,
			fetchAllCMS:fetchAllCMS,
			checkEmailAvailable:checkEmailAvailable,
			removeCmOrHm:removeCmOrHm,
			addCmOrHm :addCmOrHm,
			saveAlreadyExistingCms:saveAlreadyExistingCms,
			downloadFile:downloadFile,
			uploadDefaultVideo:uploadDefaultVideo,
			deleteVideo:deleteVideo,
			getCalenders:getCalenders
		};
	};
	
	profileFactory.$inject=['$q','PROFILE_CONSTANTS','$http'];
	
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
		$scope.errorMessage="";
		var ediTemplate=angular.copy(templatesService.template);
		ediTemplate.sections=ediTemplate.sections.split(',');
		ediTemplate.internalSections=ediTemplate.internalSections.split(',');
		
		angular.forEach(ediTemplate.internalSections,function(internalSections,index){
			if(internalSections==='true'){
				ediTemplate.internalSections[index]=true;
			}else{
				ediTemplate.internalSections[index]=false;
			}
		});
		
		$scope.defaultDurations=function(){
			var durations=[];
			angular.forEach(ediTemplate.sections,function(section){
				durations.push(60);
			});
			return durations;
		};
		
		$scope.defaultOrders=function(){
			var orders=[];
			/*angular.forEach(ediTemplate.sections,function(section){
				orders.push(60);
			});*/
			return orders;
		};
		
		$scope.toInt=function(stringDuration){
			var intDurations=[];
			angular.forEach(stringDuration,function(duration){
				intDurations.push(parseInt(duration));
			});
			return intDurations;
		};
		
		ediTemplate.durations=ediTemplate.durations!==undefined || ediTemplate.durations!==null?$scope.toInt(ediTemplate.durations.split(',')):$scope.defaultDurations();
		ediTemplate.orders=ediTemplate.orders?$scope.toInt(ediTemplate.orders.split(',')):$scope.defaultOrders();

		$scope.template=ediTemplate;
		var index=ediTemplate.sections.length-1;
		
		$scope.addNewSection=function(){
			$scope.template.sections[$scope.template.sections.length]="";
			$scope.template.durations[$scope.template.durations.length]="";
			$scope.template.internalSections[$scope.template.internalSections.length]=false;
			$scope.template.orders[$scope.template.durations.length]="";
		};
		
		$scope.removeSection=function(id){
			$scope.template.sections.splice(id,1);
			$scope.template.durations.splice(id,1);
			$scope.template.internalSections.splice(id,1);
			$scope.template.orders.splice(id,1);
		};
		
		$scope.updateTemplate=function(){
			$scope.errorMessage="";
			if($scope.findDuplicateInArray($scope.template.orders).length===0){
				var temp={"templateName":$scope.template.templateName,
						"userId":ediTemplate.userId,
	                     "templateId":ediTemplate.templateId,
						  "sections":[],
						  "durations":[],
						  "internalSections":[],
						  "orders":[]
				};
				angular.forEach($scope.template.sections,function(section,index){
					if(section.trim()!==""){
						temp.sections.push(section);
						temp.durations.push($scope.template.durations[index]);
						temp.internalSections.push($scope.template.internalSections[index]);
						temp.orders.push($scope.template.orders[index]);
					}
				});
				if(temp.sections.length>0){
					$loading.start("main");
					editTemplateFactory.updateTemplate(temp).then(function(){
						$loading.finish("main");
						$state.go('main.templates');
					}).catch(function(){
						$loading.finish("main");
					});
				}
			}else{
				$scope.errorMessage="Duplicate Section Order";
			}
			
		};
		
		$scope.findDuplicateInArray=function(arra1) {
	        var object = {};
	        var result = [];
	        arra1.forEach(function (item,index) {
	        	
	        		if(!object[item]){
	  	              object[item] = 0;
	  	            object[item] += 1;
	  	        }else{
	  	        	object[item] += 1;
	  	        }
	        	
	          
	        });

	        for (var prop in object) {
	           if(object[prop] >= 2) {
	               result.push(prop);
	           }
	        }

	        return result;

	    };
		
	};
	
	editTemplateController.$inject=['templatesService','editTemplateFactory','$scope','$compile','$state','$loading'];
	
	angular.module('vResume.templates').controller("editTemplateController",editTemplateController);
	
})();

(function(){
	
	function newTemplateController($scope,$compile,newTemplateFactory,$state,$loading){
		$scope.index=1;
		$scope.deletedSections=[]; 
		$scope.errorMessage="";
		$scope.initializeTemplate=function(){
			$scope.template={
					"templateName":"",
					"sections":[],
					"durations":[],
					"internalSections":[false],
					"orders":[]
			};
		};
		
		$scope.initializeTemplate();
		
		$scope.addNewSection=function(){
			    
				var element=angular.element("#newTemplateForm");
//				var section='<div id='+index+' class="form-group">'+
//				'<label for="section" class="col-sm-1 col-xs-12 control-label">Section<span class="text-red">*</span></label>'+
//				'<div class="col-sm-5 col-xs-12">'+
//				'<input type="text" class="form-control" name="section'+index+'" ng-model="template.sections['+index+']"  id="section" placeholder="Section" required="required">'+
//				'</div>'+
//				'<label for="section" class="col-sm-2 col-xs-12 control-label">Video Duration<span class="text-red">*</span></label>'+
//				'<div class="col-sm-3 col-xs-12">'+
//				'<input type="number"  min="3" max="120" class="form-control" name="duration'+index+'" ng-model="template.durations['+index+']"  id="duration" placeholder="Duration In Secs" required="required">'+
//				'</div>'+
//				'<div class="col-sm-1 col-xs-1">'+
//				'	<a class="btn btn-danger" ng-click="removeSection('+index+')" role="button"><span class="glyphicon glyphicon-remove"></span></a>'+
//				'</div>'+
//			    '</div>';
				
				var section='<div id='+$scope.index+' class="form-group">'+
				
				'<label for="section" class="col-sm-1 col-xs-12 control-label">Section<span class="text-red">*</span></label>'+
				'<div class="col-sm-3 col-xs-12">'+
					'<input type="text" class="form-control" name="section'+$scope.index+'" ng-model="template.sections['+$scope.index+']"  id="section" placeholder="Section" required="required">'+
				'</div>'+
				'<label for="section" class="col-sm-1 col-xs-12 control-label">Video Duration<span class="text-red">*</span></label>'+
				'<div class="col-sm-2 col-xs-12">'+
					'<input type="number"  min="30" max="120" class="form-control" name="duration'+$scope.index+'" ng-model="template.durations['+$scope.index+']"  id="duration" placeholder="Video Duration In Secs" required="required">'+
				'</div>'+
				'<label for="order" class="col-sm-1 col-xs-12 control-label">Order<span class="text-red">*</span></label>'+
				'<div class="col-sm-2 col-xs-12">'+
					'<input type="number" class="form-control" min="1" max="{{index}}" name="order" ng-model="template.orders['+$scope.index+']"  id="order" placeholder="Order" required="required">'+
				'</div>'+
				'<div class="col-sm-2 col-xs-12">'+
				'<input type="checkbox" ng-model="template.internalSections['+$scope.index+']" > Internal Section  '+
				'	<a  class="btn btn-xs btn-danger" ng-click="removeSection('+$scope.index+')" role="button"><span class="glyphicon glyphicon-remove"></span></a>'+
				'</div>'+
				'</div>';
				
				var elem =$compile(section)($scope);
				element.append(elem);
				$scope.template.internalSections[$scope.index]=false;
				$scope.index++;
		};
		
		$scope.removeSection=function(id){
			$scope.deletedSections.push(id);
			angular.element("#"+id).remove();
		};
		
		$scope.createTemplate=function(){
			$scope.errorMessage="";
			if($scope.findDuplicateInArray($scope.template.orders).length===0){
				var temp={"templateName":$scope.template.templateName,
						  "sections":[],
						  "durations":[],
						  "internalSections":[],
						  "orders":[]
				};
				angular.forEach($scope.template.sections,function(section,index){
					if(section.trim()!=="" && $scope.deletedSections.indexOf(index)===-1){
						temp.sections.push(section);
						temp.durations.push($scope.template.durations[index]);
						temp.internalSections.push($scope.template.internalSections[index]);
						temp.orders.push($scope.template.orders[index]);
					}
				});
				if(temp.sections.length>0){
					$loading.start("main");
					newTemplateFactory.createTemplate(temp).then(function(){
						$scope.deletedSections=[];
						$scope.initializeTemplate();
						$state.go('main.templates');
						$loading.finish("main");
					}).catch(function(){
						$loading.finish("main");
					});
				}
			}else{
				$scope.errorMessage="Duplicate Section Order";
			}
		};
		
		$scope.findDuplicateInArray=function(arra1) {
	        var object = {};
	        var result = [];
	        arra1.forEach(function (item,index) {
	        	if($scope.deletedSections.indexOf(index)===-1){
	        		if(!object[item]){
	  	              object[item] = 0;
	  	            object[item] += 1;
	  	        }else{
	  	        	object[item] += 1;
	  	        }
	        	}
	          
	        });

	        for (var prop in object) {
	           if(object[prop] >= 2) {
	               result.push(prop);
	           }
	        }

	        return result;

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
			/*tempTemplate.sections=tempTemplate.sections.toString();
			tempTemplate.durations=tempTemplate.durations.toString();
			tempTemplate.internalSections=template.internalSections.toString();
			tempTemplate.orders=template.orders.toString();
			*/
			
			var finalObj={
					"templateName":tempTemplate.templateName,
					"sections":[],
					"durations":[],
					"internalSections":[],
					"orders":[]
			};
			
			angular.forEach(tempTemplate.orders,function(order,index){
				finalObj.sections[order-1]=tempTemplate.sections[index];
				finalObj.durations[order-1]=tempTemplate.durations[index];
				finalObj.internalSections[order-1]=tempTemplate.internalSections[index];
				finalObj.orders[order-1]=tempTemplate.orders[index];
			});
			finalObj.sections=finalObj.sections.toString();
			finalObj.durations=finalObj.durations.toString();
			finalObj.internalSections=finalObj.internalSections.toString();
			finalObj.orders=finalObj.orders.toString();
			
			
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
			/*template.sections=template.sections.toString();
			template.durations=template.durations.toString();
			template.internalSections=template.internalSections.toString();
			template.orders=template.orders.toString();*/
			
//			var sections = template.sections.split(',');
//			var durations = template.durations.split(',');
//			var internalSections = template.internalSections.split(',');
//			var orders = template.orders.split(',');
			
			var finalObj={
					"templateName":template.templateName,
					"sections":[],
					"durations":[],
					"internalSections":[],
					"orders":[]
			};
			
			angular.forEach(template.orders,function(order,index){
				finalObj.sections[order-1]=template.sections[index];
				finalObj.durations[order-1]=template.durations[index];
				finalObj.internalSections[order-1]=template.internalSections[index];
				finalObj.orders[order-1]=template.orders[index];
			});
			finalObj.sections=finalObj.sections.toString();
			finalObj.durations=finalObj.durations.toString();
			finalObj.internalSections=finalObj.internalSections.toString();
			finalObj.orders=finalObj.orders.toString();
			
			var defered=$q.defer();
			$http.post(TEMPLATES_CONSTANTS.CREATE_TEMPLATE_URL,finalObj).success(function(response){
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
        "RESUME_DOWNLOAD_URL":"/vresume/submissions/filedownload?fileIs=",
        "EDIT_AVAILABILITIES":"/vresume/",
        "BULK_UPLOAD_URL":"/vresume/job/uploadBulkJobs",
        "BULK_SUBMISSION_URL":"/vresume/submissions/bulkSubmission",
        "FETCH_JOB_URL":"/vresume/job/viewJob/",
        "UPDATE_AVAILABILITY_URL":"/vresume/job/updateAvailability",
        "SAVE_TECH_URL":"/vresume/submissions/saveTech",
        "FETCH_SAVE_TECH_URL":"/vresume/submissions/fetchSaveTech/",
        "FETCH_TECH_JOBS":"/vresume/job/techJobs/",
        "TECH_USERS_SUBMISSIONS_URL":"/vresume/submissions/techJob/",
        "TECH_SUBMISSION_FOR_USER_URL":"/vresume/submissions/techJob/",
        "UPDATE_TECH_SUBMISSION_URL":"/vresume/submissions/updateTechStatus",
        "FETCH_TECH_COMMENTS_URL":"/vresume/submissions/techDetails/",
        "POST_HM_TECH_COMMENT_URL":"/vresume/submissions/hmComment/"
	});
	
})();

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

(function(){
	
	function myJobsController($scope,myJobsFactory,$state,myJobsService,$loading){
		
		$scope.postJob=function(){
			myJobsService.editJob=null;
			$scope.$emit('sideBarViewEvent', ".postJob");
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
					"payrateType":"Monthly",
					"currency":"Dollar",
					"duration":"",
					"status":"active",
					"showCompensation":true,
					"preferredCheck":false,
					"diverseCheck":false,
					"department":"",
					"quota":0,
					"diverse":0,
					"others":100,
					"diverseType":"Select",
					"diversityList":""
			};
			$scope.diversities = [{id: 1,name: 'Any',selected: true},
						          {id: 2,name: 'LGBT',selected:false},
						          {id: 3,name: 'Disability',selected:false},
						          {id: 4,name: 'Women',selected:false},
						          {id: 5,name: 'Veterans',selected:false}];
			$scope.diversityArray.push($scope.diversities[0].name);
			$scope.postJob.diversityList = $scope.diversityArray.toString();
		};
		
		$scope.changeDiversity = function(){
			$scope.diversityArray=[];
			angular.forEach($scope.diversities, function(postJob){
				if(postJob.name!=='Any' && postJob.selected === true){
					$scope.diversityArray.push(postJob.name);
					$scope.diversities[0].selected = false;
				}
		   });
			
			if($scope.diversityArray.length===0){
				$scope.diversities[0].selected = true;
				$scope.diversityArray.push($scope.diversities[0].name);
			}
			$scope.postJob.diversityList = $scope.diversityArray.toString();
		};
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
			$scope.postJob.description=tinymce.get('CL').getContent();
		  if($scope.postJob.description!==''){
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

(function(){
	
	function submitTechController($scope,$loading,$uibModalInstance,viewSubmissionFactory,submmision,userDetails){
		 
		$scope.postedOnce=false;
		$scope.techUserIds=[];
		$scope.techUsers	=[];
		$scope.ok = function () {
			    $uibModalInstance.close();
			  };
			  
	     $scope.cancel = function () {
			    $uibModalInstance.dismiss($scope.postedOnce);
	     };
	     
	     $scope.fetchSaveTech = function () {
	    	 $loading.start("main");
	    	 viewSubmissionFactory.fetchSaveTech(submmision.submmision).then(function(response){
	    		var temp=  angular.copy(userDetails.techUsers);
	    		var temp1=[];
	    		angular.forEach(response, function(t1){
	    			temp1.push(t1.userId);
 	 		   });
	    		
	    	   angular.forEach(temp, function(techUsers){
	 	 				if(temp1.indexOf(techUsers.id)===-1){
	 	 					$scope.techUsers.push(techUsers);
	 	 				}
	 		   });
			 $loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
	     };
	     
	     $scope.fetchSaveTech();
	     
	     $scope.saveTech = function () {
	    	 if($scope.techUserIds.length===0){
	    		 $uibModalInstance.close($scope.postedOnce);
	    	 }else{
	    		 $loading.start("main");
		    	 viewSubmissionFactory.saveTech(submmision.submmision,$scope.techUserIds).then(function(response){
		    		 $scope.postedOnce=true;
				 $loading.finish("main");
		    	 $uibModalInstance.close($scope.postedOnce);
				}).catch(function(){
					$loading.finish("main");
				});
	    	 }
	    	
	     };
	     
	     $scope.assignTechId= function (id) {
	    	 var index=$scope.techUserIds.indexOf(id);
				if(index===-1){
					$scope.techUserIds.push(id);
				}else{
					$scope.techUserIds.splice(index,1);
				}
	     };
			
	};
	
	submitTechController.$inject=['$scope','$loading','$uibModalInstance','viewSubmissionFactory','submmision','userDetails'];
	
	angular.module('vResume.myJobs').controller("submitTechController",submitTechController);
	
})();

(function(){
	
	function techJobsController($scope,myJobsFactory,$state,myJobsService,$loading){
		
		$scope.fetchTechJobs=function(){
			$loading.start("main");
			myJobsFactory.fetchTechJobs().then(function(response){
				$scope.myJobs=response;
				$scope.status=status;
				$loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
			$scope.status=status;
		};
		
		$scope.fetchTechJobs();

		$scope.viewSubmissions=function(job){
			myJobsService.viewTechSubmissionJob=job;
			$state.go('main.viewTechSubmission');
		};
	};
	
	techJobsController.$inject=['$scope','myJobsFactory','$state','myJobsService','$loading'];
	
	angular.module('vResume.myJobs').controller("techJobsController",techJobsController);
	
})();

(function(){
	
	function viewJobController($scope,$state,myJobsFactory,$loading,$location,$stateParams){
		
		$scope.url=$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/#/viewJob/" ;
		$scope.jobUrl=$stateParams.jobId;
		$scope.loading=true;
		$scope.loadingUpdateAvailabilityMessage="";
		$scope.searchVariables = $location.search();
		
		$scope.getJob=function(){
			$scope.loading=true;
			$loading.start("viewjob");
			myJobsFactory.fecthjob($stateParams.jobId).then(function(response){
				$scope.opening=response;
				$scope.loading=false;
				$loading.finish("viewjob");
			}).catch(function(){
				$scope.loading=false;
				$loading.finish("viewjob");
			});
		};
		
		$scope.getJob();
		
		$scope.updateAvailability=function(){
			$scope.loadingUpdateAvailabilityMessage="";
			$loading.start("viewjob");
			$scope.searchVariables["status"];
			$scope.searchVariables["avlId"];
			$scope.searchVariables["jobId"]=$stateParams.jobId;
			myJobsFactory.updateAvailability($scope.searchVariables).then(function(response){
				$scope.loadingUpdateAvailabilityMessage="Successfully updated";
				$loading.finish("viewjob");
			}).catch(function(){
				$scope.loadingUpdateAvailabilityMessage="Failed to update";
				$loading.finish("viewjob");
			});
		};
		
		if($scope.searchVariables.avlId){
			$scope.updateAvailability();
		};
		
		$scope.onSuccess=function(){
			alert("Copied");
		};
		
		$scope.buildJobUrl=function(opening){
			$scope.jobUrl=$scope.url+opening.id;
		};
		
		$scope.getFilteredSections=function(opening){
			if(opening.internalSections){
				var temp=[];
				var sections = opening.sections.split(',');
				var internalSections = opening.internalSections.split(',');
				angular.forEach(sections,function(section,index){
					if(internalSections[index]==='false'){
						temp.push(section);
					}
				});
				return temp.toString();
			}else{
				return opening.sections;
			}
		};
		
	};
	
	viewJobController.$inject=['$scope','$state','myJobsFactory','$loading','$location','$stateParams'];
	
	angular.module('vResume.myJobs').controller("viewJobController",viewJobController);
	
})();

(function(){
	
	function viewSubmissionController($scope,viewSubmissionFactory,$state,myJobsService,$loading,$uibModal){
		$loading.start("main");
		$scope.status='NEW';
		$scope.job= myJobsService.viewSubmissionJob;
		$scope.activeUser=0;
		$scope.activeSection=0;
		$scope.sectionRating=[];
		$scope.statusToMove="";
		$scope.availabilityId=[];
		$scope.interviewMode="INPERSON";
		$scope.rejectionText="";
		
		$scope.initializeStatusCount=function(){
			$scope.statuses={
					"NEW":0,
					"SUBMITTED_HM":0,
					"PARK":0,
					"INTERVIEW_SCHEDULED":0,
					"HIRED":0,
					"REJECTED":0
				};
			$scope.bulkSubmissions=[];
			$scope.bulkSubmissionIds=[];
			$scope.addedToBulk=false;
			$scope.activeUser=0;
		};
		$scope.bulkSubmissions=[];
		$scope.bulkSubmissionIds=[];
		$scope.addedToBulk=false;
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
                    $scope.availabilityId=[];
					if($scope.status==="INTERVIEW_SCHEDULED"){
						$scope.availabilityId=$scope.viewSubmission.submmision.availabilityId;
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
				$scope.addedToBulk=false;
				$loading.start("main");
				viewSubmissionFactory.getSubmissionsForUser($scope.job.id,user.userId,$scope.status).then(function(response){
					$scope.viewSubmission.submmision=response;
				 var myVideo = document.getElementsByTagName('video')[0];
				 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
				$scope.sectionRating=[];
				$scope.activeUser=index;
				$scope.statusToMove="";
				$scope.rejectionText="";
				$scope.activeSection=0;
				if($scope.bulkSubmissionIds.indexOf($scope.viewSubmission.submmision.id)>-1){
					$scope.addedToBulk=true;
				}
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
				var i=0;
				angular.forEach($scope.sectionRating,function(rating,index){
					if(rating){
						i++;
					}
				});
				if( i!==$scope.viewSubmission.submmision.sections.length){
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
				
					
			    if($scope.statusToMove==="INTERVIEW_SCHEDULED"){
					updatedSubmission.availabilityId=$scope.availabilityId;
					updatedSubmission.interviewMode=$scope.interviewMode;
					updatedSubmission.dateChanged=false;
				}
			    if($scope.rejectionText!==''){
					var comment={
							"submissionId":updatedSubmission.id,
							"comment":$scope.rejectionText,
							"userId":$scope.userDetails.id
						};
						updatedSubmission.comments.push(comment);
				}
			    else{
			    	var comment={
							"submissionId":updatedSubmission.id,
							"comment":"",
							"userId":$scope.userDetails.id
						};
						updatedSubmission.comments.push(comment);
			    }
				viewSubmissionFactory.updateSubmission(updatedSubmission).then(function(response){
					$scope.statusToMove="";
					$scope.rejectFlag=false;
					$scope.rejectionText="";
					$scope.fetchUsersSubmissionsForStatus();
				}).catch(function(error){
					$loading.finish("main");
				});
				
			};
			
			$scope.submitRating=function(){
				$loading.start("main");
				$scope.error="";
				$scope.processError="";
				if($scope.checkRatingValues() && ($scope.status==='NEW')){
					$scope.error="Please provide rating for all the sections";
					$loading.finish("main");
				}else if($scope.checkStatusToMove()){
					$scope.error="Please select the status to move ";
					$loading.finish("main");
				}else if($scope.statusToMove==="REJECTED" && $scope.rejectionText===''){
					$scope.error="Please provide reason for rejection";
					$loading.finish("main");
				}else if($scope.statusToMove==="INTERVIEW_SCHEDULED" && ($scope.interviewMode==="" || $scope.interviewMode===null || $scope.availabilityId.length===0)){
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
			
			$scope.editAvailabilities=function(){
				var modalInstance = $uibModal.open({
					  animate:true,
					  backdrop: 'static',
					  keyboard:false,
				      templateUrl: 'partials/editAvailabilities.html',
				      size: 'lg',
				      controller:'editAvailabilitiesController',
				      resolve:{
				    	  submmision:function(){
				    		  return $scope.viewSubmission.submmision;
				          },
				          availabilityId:function(){
				    		  return $scope.availabilityId;
				          }
				      }
				    });

				 modalInstance.result.then(function(){
					 //ok
					 $scope.availabilityId=$scope.viewSubmission.submmision.availabilityId;
					 $scope.toStatus('INTERVIEW_SCHEDULED');
				   }, function () {
				     // cancel
				    });
			};
			
			$scope.assignInterviewMode=function(mode){
				$scope.interviewMode=mode;
			};
			
			$scope.removeFromBulk=function(index,submission){
				$scope.bulkSubmissionIds.splice(index,1);
				$scope.bulkSubmissions.splice(index,1);
				if(submission.id===$scope.viewSubmission.submmision.id){
					$scope.addedToBulk=false;
				}
			};
			
			$scope.addToBulk=function(submission){
				$scope.error="";
				if(submission!==undefined){
					if($scope.checkRatingValues() && $scope.status==='NEW'){
						$scope.error="Please provide rating for all the sections before adding to bulk";
					}else{
						var index=$scope.bulkSubmissionIds.indexOf(submission.id);
						if(index===-1){
							var updatedSubmission=angular.copy(submission);
							angular.forEach($scope.sectionRating,function(rating,index){
								if($scope.userDetails.role===2){
									updatedSubmission.sections[index].hmRating=rating;
								}else {
									updatedSubmission.sections[index].cmRating=rating;
								}
							});
							if($scope.rejectionText!==''){
								var comment={
										"submissionId":updatedSubmission.id,
										"comment":$scope.rejectionText,
										"userId":$scope.userDetails.id
									};
								updatedSubmission.comments.push(comment);
							}
							updatedSubmission.status="SUBMITTED_HM";
							updatedSubmission["user"]=$scope.viewSubmission.users[$scope.activeUser];
							$scope.bulkSubmissionIds.push(updatedSubmission.id);
							$scope.bulkSubmissions.push(updatedSubmission);
							$scope.addedToBulk=true;
						}else{
							$scope.bulkSubmissionIds.splice(index,1);
							$scope.bulkSubmissions.splice(index,1);
							$scope.addedToBulk=false;
						}
					}
				}
			};
		
			
			$scope.bulkSubmissionToHM=function(){
				$loading.start("main");
				viewSubmissionFactory.bulkSubmission($scope.bulkSubmissions).then(function(response){
					$scope.statusToMove="";
					$scope.rejectFlag=false;
					$scope.rejectionText="";
					$scope.fetchUsersSubmissionsForStatus();
				}).catch(function(error){
					$loading.finish("main");
				});
			};
			
			$scope.submitTech=function(){
				
				if($scope.checkRatingValues() && ($scope.status==='NEW')){
					$scope.error="Please provide rating for all the sections";
				}else{
					var modalInstance = $uibModal.open({
						  animate:true,
						  backdrop: 'static',
						  keyboard:false,
					      templateUrl: 'partials/submitTech.html',
					      size: 'lg',
					      controller:'submitTechController',
					      resolve:{
					    	  submmision:function(){
					    		  return $scope.viewSubmission;
					          },
					          userDetails:function(){
					    		  return $scope.userDetails;
					          }
					      }
					    });

					 modalInstance.result.then(function(result){
						
						 if($scope.viewSubmission.submmision.status === "SUBMITTED_HM" && result){
							 $loading.start("main");
							 $scope.statusToMove="SUBMIT_TECH";
							 $scope.buildSubmissionObj();
						 }
						 
					   }, function () {
					    });
				}
			};
		
			$scope.viewTechStatus=function(){
				
				var modalInstance = $uibModal.open({
					  animate:true,
					  backdrop: 'static',
					  keyboard:false,
				      templateUrl: 'partials/viewTechStatus.html',
				      size: 'lg',
				      controller:'viewTechStatusController',
				      resolve:{
				    	  submmision:function(){
				    		  return $scope.viewSubmission;
				          },
				          userDetails:function(){
				    		  return $scope.userDetails;
				          }
				      }
				    });

				 modalInstance.result.then(function(){
					 //ok
				   }, function () {
				     // cancel
				    });
			};
			
	};
	
	viewSubmissionController.$inject=['$scope','viewSubmissionFactory','$state','myJobsService','$loading','$uibModal'];
	
	angular.module('vResume.myJobs').controller("viewSubmissionController",viewSubmissionController);
	
})();

(function(){
	
	function viewTechDetailsController($scope,$loading,$uibModalInstance,viewSubmissionFactory,submmision,userDetails,submissionUser){
		$scope.ok = function () {
			    $uibModalInstance.close();
			  };
	     $scope.addComment="";
	     $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
	     };
	     $scope.comments=[];
	     $scope.sections={};
	     $scope.fetchTechDetails = function () {
	    	 
	    	 $loading.start("main");
	    	 viewSubmissionFactory.fetchTechComments(submissionUser.id,submmision.submmision.id).then(function(response){
	    		 if(response){
	    			 $scope.sections=response.sections;
	    			 $scope.comments=response.techComments;
	    		 }
		    	  
		    	   $loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
	     };
	     
	     $scope.fetchTechDetails();
	     
	     $scope.submitComment = function (addComment) {
	    	 $loading.start("main");
	    	 viewSubmissionFactory.submitComment(submissionUser.id,addComment,submmision.submmision.id).then(function(response){
		    	  $scope.addComment="";
		    	  angular.element('#comment').val("");
		    	  $scope.fetchTechDetails();
		    	   $loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
	     };
	     
	};
	
	viewTechDetailsController.$inject=['$scope','$loading','$uibModalInstance','viewSubmissionFactory','submmision','userDetails','submissionUser'];
	
	angular.module('vResume.myJobs').controller("viewTechDetailsController",viewTechDetailsController);
	
})();

(function(){
	
	function viewTechStatusController($scope,$loading,$uibModalInstance,viewSubmissionFactory,$uibModal,submmision,userDetails){
		 
		$scope.techUserIds=[];
		$scope.techUsers	= [];
		$scope.ok = function () {
			    $uibModalInstance.close();
			  };
			  
	     $scope.cancel = function () {
			    $uibModalInstance.dismiss('cancel');
	     };
	     
	     $scope.fetchSaveTech = function () {
	    	 $loading.start("main");
	    	 viewSubmissionFactory.fetchSaveTech(submmision.submmision).then(function(response){
	    		var temp=  angular.copy(userDetails.techUsers);
	    	   angular.forEach(temp, function(techUsers){
	    		   angular.forEach(response, function(t1){
	    			   if(t1.userId===techUsers.id){
	    				   t1["email"]=techUsers.email;
		 				} 
	    		   });
	 		   });
	    	   $scope.techUsers=response;
			 $loading.finish("main");
			}).catch(function(){
				$loading.finish("main");
			});
	     };
	     
	     $scope.fetchSaveTech();
	     
	     $scope.viewDetails = function (submissionUser) {
					
					var modalInstance = $uibModal.open({
						  animate:true,
						  backdrop: 'static',
						  keyboard:false,
					      templateUrl: 'partials/viewTechDetails.html',
					      size: 'lg',
					      controller:'viewTechDetailsController',
					      resolve:{
					    	  submmision:function(){
					    		  return submmision;
					          },
					          userDetails:function(){
					    		  return userDetails;
					          },
					          submissionUser:function(){
					    		  return submissionUser;
					          }
					      }
					    });

					 modalInstance.result.then(function(){
						 //ok
					   }, function () {
					     // cancel
					    });
	     };
	     
	     
	};
	
	viewTechStatusController.$inject=['$scope','$loading','$uibModalInstance','viewSubmissionFactory','$uibModal','submmision','userDetails'];
	
	angular.module('vResume.myJobs').controller("viewTechStatusController",viewTechStatusController);
	
})();

(function(){
	
	function viewTechSubmissionController($scope,viewSubmissionFactory,$state,myJobsService,$loading,$uibModal){
		$loading.start("main");
		$scope.status='NEW';
		$scope.job= myJobsService.viewTechSubmissionJob;
		$scope.activeUser=0;
		$scope.activeSection=0;
		$scope.sectionRating=[];
		$scope.statusToMove="";
		$scope.availabilityId=[];
		$scope.rejectionText="";
		
		$scope.initializeStatusCount=function(){
			$scope.statuses={
					"NEW":0,
					"PARK":0,
					"APPROVED":0,
					"REJECTED":0
				};
			
			$scope.activeUser=0;
		};
		
		$scope.initializeStatusCount();
			
		$scope.statusCount=function(statusCounts){
			angular.forEach(statusCounts,function(statusObj){
				$scope.statuses[statusObj.status]=$scope.statuses[statusObj.status]+statusObj.count;
			});
		};
		
			$scope.fetchUsersSubmissionsForStatus=function(){
				$loading.start("main");
				viewSubmissionFactory.fetchTechUsersSubmissions($scope.job.id,$scope.status).then(function(response){
					$scope.viewSubmission=response;
					if($scope.viewSubmission.submmision !== null){
					 var myVideo = document.getElementsByTagName('video')[0];
					 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
                    $scope.statusToMove="";
					
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
				viewSubmissionFactory.getTechSubmissionsForUser($scope.job.id,user.userId,$scope.status).then(function(response){
					$scope.viewSubmission.submmision=response;
				 var myVideo = document.getElementsByTagName('video')[0];
				 myVideo.src = $scope.viewSubmission.submmision.sections[$scope.activeSection].videoPath;
				$scope.sectionRating=[];
				$scope.activeUser=index;
				$scope.statusToMove="";
				$scope.rejectionText="";
				$scope.activeSection=0;
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
				var i=0;
				angular.forEach($scope.sectionRating,function(rating,index){
					if(rating){
						i++;
					}
				});
				if( i!==$scope.viewSubmission.submmision.sections.length){
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
						updatedSubmission.sections[index].techRating=rating;
				});
				updatedSubmission.status=$scope.statusToMove;
				if(!updatedSubmission.techComments){
					updatedSubmission.techComments=[];
				}
			    if($scope.rejectionText!==''){
					var comment={
							"id":0,
							"submissionId":updatedSubmission.id,
							"comment":$scope.rejectionText,
							"userId":$scope.userDetails.id,
							"userName":$scope.userDetails.firstName + " " +$scope.userDetails.lastName
						};
						updatedSubmission.techComments.push(comment);
				}
			    else{
			    	var comment={
			    			"id":0,
							"submissionId":updatedSubmission.id,
							"comment":"",
							"userId":$scope.userDetails.id,
							"userName":$scope.userDetails.firstName + " " +$scope.userDetails.lastName
						};
						updatedSubmission.techComments.push(comment);
			    }
				viewSubmissionFactory.updateTechSubmission(updatedSubmission).then(function(response){
					$scope.statusToMove="";
					$scope.rejectFlag=false;
					$scope.rejectionText="";
					$scope.fetchUsersSubmissionsForStatus();
				}).catch(function(error){
					$loading.finish("main");
				});
				
			};
			
			$scope.submitRating=function(){
				$loading.start("main");
				$scope.error="";
				$scope.processError="";
				if($scope.checkRatingValues() && ($scope.status==='NEW')){
					$scope.error="Please provide rating for all the sections";
					$loading.finish("main");
				}else if($scope.checkStatusToMove()){
					$scope.error="Please select the status to move ";
					$loading.finish("main");
				}else if($scope.statusToMove==="REJECTED" && $scope.rejectionText===''){
					$scope.error="Please provide reason for rejection";
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
			
	};
	
	viewTechSubmissionController.$inject=['$scope','viewSubmissionFactory','$state','myJobsService','$loading','$uibModal'];
	
	angular.module('vResume.myJobs').controller("viewTechSubmissionController",viewTechSubmissionController);
	
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
		
		function fetchJob(jobId){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.FETCH_JOB_URL+jobId).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function updateAvailability(searchVariables){
			var defered=$q.defer();
			$http.post(MYJOBS_CONSTANTS.UPDATE_AVAILABILITY_URL,searchVariables).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function fetchTechJobs(status){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.FETCH_TECH_JOBS).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		return {
		fetchMyJobs:fetchMyJobs,
		changeStatusOfJob:changeStatusOfJob,
		deleteJob:deleteJob,
		fecthjob:fetchJob,
		updateAvailability:updateAvailability,
		fetchTechJobs:fetchTechJobs
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
		
		function updateBulkJob(profileDetails){
			var defered=$q.defer();
			 var payload = new FormData();
			 
				 payload.append('jobs', profileDetails.bulkUpload);
				 
			 $.ajax({
					type : 'POST',
					url : MYJOBS_CONSTANTS.BULK_UPLOAD_URL,
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
		 fetchTemplatesAndHMDetails:fetchTemplatesAndHMDetails,
		 createPost:createPost,
		 updateJob:updateJob,
		 updateBulkJob:updateBulkJob
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
		
		function updateAvailabilities(availabilities){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.EDIT_AVAILABILITIES,availabilities).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function bulkSubmission(submission){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.BULK_SUBMISSION_URL,{"submission":submission}).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function saveTech(submmision,techUserIds){
			var defered=$q.defer();
			var body={
				"submissionId":submmision.id,
				"jobId":submmision.jobId,
				"techUserIds":techUserIds
			};
			$http.post(MYJOBS_CONSTANTS.SAVE_TECH_URL,body).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function fetchSaveTech(submmision){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.FETCH_SAVE_TECH_URL+submmision.jobId+"/"+submmision.id).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function fetchTechUsersSubmissions(jobId,status){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.TECH_USERS_SUBMISSIONS_URL+jobId+"?status="+status).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function getTechSubmissionsForUser(jobId,userId,status){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.TECH_SUBMISSION_FOR_USER_URL+jobId+"/user/"+userId+"?status="+status).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function updateTechSubmission(submission){
			var defered=$q.defer();
			$http.put(MYJOBS_CONSTANTS.UPDATE_TECH_SUBMISSION_URL,submission).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function fetchTechComments(id,submmisionId){
			var defered=$q.defer();
			$http.get(MYJOBS_CONSTANTS.FETCH_TECH_COMMENTS_URL+id+"/"+submmisionId).success(function(response) {
				defered.resolve(response);
			}).error(function(error) {
				defered.reject(error);
			});
			return defered.promise;
		};
		
		function submitComment(id,comment,submmisionId){
			var defered=$q.defer();
			var body={
				"techSubmissionId":id,
				"comment":comment,
				"submmisionId":submmisionId
			};
			$http.post(MYJOBS_CONSTANTS.POST_HM_TECH_COMMENT_URL,body).success(function(response) {
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
			fileDownload:fileDownload,
			updateAvailabilities:updateAvailabilities,
			bulkSubmission:bulkSubmission,
			saveTech:saveTech,
			fetchSaveTech:fetchSaveTech,
			fetchTechUsersSubmissions:fetchTechUsersSubmissions,
			getTechSubmissionsForUser:getTechSubmissionsForUser,
			updateTechSubmission:updateTechSubmission,
			fetchTechComments:fetchTechComments,
			submitComment:submitComment
		};
	};
	
	viewSubmissionFactory.$inject=['$http','MYJOBS_CONSTANTS','$q'];
	
	angular.module('vResume.myJobs').factory('viewSubmissionFactory',viewSubmissionFactory);
	
})();






(function(){
	
	function myJobsService(){
	
		this.editJob=null;
		this.viewSubmissionJob=null;
		this.viewTechSubmissionJob=null;
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
		"INSERT_SECTIONS_URL":"/vresume/submissions/sections",
		"GET_APPLY_FLAG":"/vresume/job/"
	});
	
})();

(function(){
	
	function applyJobController($scope,$state,openingsFactory,openingsService,$loading,$location,$uibModal){
		var today=new Date();
		$scope.error="";
		$scope.defaultVideos=[];
		$scope.dateOptions={
				"first":{
					minDate: today
				},
				"second":{
					minDate:today
				},
				"third":{
					minDate: today
				}
			  };
		
		$scope.fileUrl=$scope.userDetails.defaultResumePath?$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/filedownload?filePath="+$scope.userDetails.defaultResumePath:'' ;
		
		
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
				"defaultResume":false,
				"attachmentName":"",
				"notes":""
		};
		
		$scope.endDate1=[$scope.endDate,
		                 $scope.endDate,
		                 $scope.endDate];
		
		$scope.toInt=function(stringDuration){
			var intDurations=[];
			angular.forEach(stringDuration,function(duration){
				intDurations.push(parseInt(duration));
			});
			return intDurations;
		};
		
		$scope.defaultDurations=function(){
			var durations=[];
			angular.forEach($scope.sections.split(','),function(section){
				durations.push(120);
			});
			return durations;
		};
		
		$scope.opening=openingsService.opening;
		openingsFactory.getSections($scope.opening.templateId).then(function(response){
			
			if(response.orders){
				var sections = response.sections.split(',');
				var durations = response.durations.split(',');
				var internalSections = response.internalSections.split(',');
				var orders = response.orders.split(',');
				$scope.sections=[];
				$scope.durations=[];
				angular.forEach(sections,function(section,index){
					if($scope.resume.sections[index]===undefined){
						$scope.resume.sections[index]={};
					}
					$scope.resume.sections[index].sectionName=section;
					if(internalSections[index]==='false'){
						$scope.resume.sections[index]['internalSection']=false;
					}else{
						$scope.resume.sections[index]['internalSection']=true;
					}
					
					$scope.sections.push(section);
					$scope.durations.push(durations[index]);
				});
				$scope.sections = $scope.sections.toString();
			}else{
				$scope.sections=response.sections;
				$scope.durations=response.durations!==null?$scope.toInt(response.durations.split(',')):$scope.defaultDurations();
			}
			
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
				
				if(section.defaultVideo || section.internalSection){
					i++;
				}else{
					$scope.resume.sections[index].videoFileInvalidDuration="";
					if(section.videoFile.type.indexOf("mp4")>0 || section.videoFile.type.indexOf("webm")>0 || section.videoFile.type.indexOf("ogg")>0 || section.videoFile.type.indexOf("ogv")>0){
						$scope.resume.sections[index].videoFileInvalidFormat="";
						i++;
					}else{
						$scope.resume.sections[index].videoFileInvalidFormat="Invalid file format";
					}
				}
			});
			return i!==$scope.resume.sections.length;
		};
		
		$scope.validateFileDuration=function(){
			var i=0;
			angular.forEach($scope.resume.sections,function(section,index){
				
				if(section.defaultVideo || section.internalSection){
					i++;
				}else{
					var fileDuration=$scope.durations[index];
					if(section.videoFile.duration<fileDuration){
						section.videoFileInvalidDuration="";
						i++;
					}else{
						section.videoFileInvalidDuration="Duration of the video cannot be more than "+fileDuration+" secs";
					}
				}
			});
			return i!==$scope.resume.sections.length;
		};
		
		$scope.validateAttachmentFormat=function(){

			
			if($scope.resume.defaultResume){
				return false;
			}else{
				var i=0;
				if(($scope.resume.attachment.name.substring($scope.resume.attachment.name.lastIndexOf(".")+1)==="doc") || ($scope.resume.attachment.name.substring($scope.resume.attachment.name.lastIndexOf(".")+1)==="docx") ||($scope.resume.attachment.name.substring($scope.resume.attachment.name.lastIndexOf(".")+1)==="pdf") || ($scope.resume.attachment.name.substring($scope.resume.attachment.name.lastIndexOf(".")+1)==="xls") ||($scope.resume.attachment.name.substring($scope.resume.attachment.name.lastIndexOf(".")+1)==="ppt") ){
					$scope.resume.attachmentInvalidFormat="";
					i++;
				}else{
					$scope.resume.attachmentInvalidFormat="Invalid file format";
				}
					return i!==1;
			}

		};
		
		$scope.validateJobData=function(){
			var invalidFlieSize=false;
			angular.forEach($scope.resume.sections,function(section,index){
				$scope.resume.sections[index].videoFileInvalidDuration="";

				if((!section.defaultVideo && !section.internalSection) && (section.videoFile.size/1024000)>15 ){

					$scope.resume.sections[index].videoFileInvalidSize="File size exceeded";
					invalidFlieSize= true;
				}else{
					$scope.resume.sections[index].videoFileInvalidSize=" ";
				}
			});
			
			if(!$scope.resume.defaultResume && ($scope.resume.attachment.size/1024000)>1){
				$scope.resume.attachmentInvalidSize="File size exceeded";
				invalidFlieSize= true;
			}
			return invalidFlieSize;
		};
		
		$scope.validateSelfRatingData=function(){
			var invalidSelfRatingData=false;
			angular.forEach($scope.resume.sections,function(section){
				if((!section.internalSection) && (section.userRating===undefined || section.userRating===0)){
					invalidSelfRatingData= true;
				}
			});
			
			return invalidSelfRatingData;
		};
		
		
		$scope.applyJob=function(){
			$loading.start("main");
			if($scope.validateFileFormats() ||  $scope.validateAttachmentFormat() || $scope.validateJobData() || $scope.validateFileDuration()){
				$loading.finish("main");
			}else if($scope.validateSelfRatingData()){
				$scope.error="Please provide self rating for all sections";
				$loading.finish("main");
			}else{
				openingsFactory.applyJob($scope.resume,$scope.opening).then(function(response){
					$loading.finish("main");
					$state.go('main.openings');
							}).catch(function(){
								$loading.finish("main");
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
		
		$scope.openVideo=function(url){
			var modalInstance = $uibModal.open({
				  animate:true,
				  backdrop: 'static',
				  keyboard:false,
			      templateUrl: 'partials/profile/defaultVideo.html',
			      size: 'lg',
			      controller:'defaultVideoController',
			      resolve:{
			    	  url:function(){
			    		  return url;
			          }
			      }
			    });

			 modalInstance.result.then(function(data){
				 //ok
				 if(data.length>0){
					 $scope.saveAlreadyExistingCms(data);
				 }
				 
				 
			   }, function () {
			     // cancel
			    });
		};
		
	};
	
	applyJobController.$inject=['$scope','$state','openingsFactory','openingsService','$loading','$location','$uibModal'];
	
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
				$loading.start("main");
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
	
	function openingsController($rootScope,$scope,$state,openingsFactory,openingsService,$loading,$location){
		$loading.start("main");
		
		$scope.url=$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/#/viewJob/" ;
		$scope.jobUrl='';
		
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
		
		$scope.buildJobUrl=function(opening){
			$scope.jobUrl=$scope.url+opening.id;
		};
		
		$scope.getFilteredSections=function(opening){
			if(opening.internalSections){
				var temp=[];
				var sections = opening.sections.split(',');
				var internalSections = opening.internalSections.split(',');
				angular.forEach(sections,function(section,index){
					if(internalSections[index]==='false'){
						temp.push(section);
					}
				});
				return temp.toString();
			}else{
				return opening.sections;
			}
		};
		
		$scope.getApplyFlag=function(opening){
			
			if(!opening.openDescription){
				$loading.start("main");
				openingsFactory.getApplyFlag(opening.id,$scope.userDetails.id).then(function(response){
					opening.applied=response;
					opening.openDescription=true;
					$loading.finish("main");
				}).catch(function(){
					$loading.finish("main");
				});
			}else{
				opening.openDescription=false;
			}
		};
		
		$scope.onSuccess=function(){
			alert("Copied");
		};
		
	};
	
	openingsController.$inject=['$rootScope','$scope','$state','openingsFactory','openingsService','$loading','$location'];
	
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
            	  var file= element[0].files[0];
                 scope.$apply(function(){
                	 if(file.type.indexOf("mp4")>0 || file.type.indexOf("webm")>0 || file.type.indexOf("ogg")>0 || file.type.indexOf("ogv")>0){
                		 window.URL = window.URL || window.webkitURL;
                		  var video = document.createElement('video');
                		  video.preload = 'metadata';
                		  video.onloadedmetadata = function() {
                		    window.URL.revokeObjectURL(this.src);
                		   file.duration=video.duration;
                		  modelSetter(scope, file);
                		  };
                		  video.src = URL.createObjectURL(file);
                	 }else{
                		 modelSetter(scope, file);
                	 }
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
				
				 if(section.videoFile){
					 payload.append('videoFile', section.videoFile);
				 }
				 if( section.defaultVideo){
					 payload.append('defaultVideoPath', section.defaultVideo.defaultVideoPath);
					 payload.append('defaultVideoFileName', section.defaultVideo.fileName);
				 }
				 if(section.userRating){
					 payload.append('userRating', section.userRating);
				 }else{
					 payload.append('userRating', 0);
				 }
				 payload.append('internalSection', section.internalSection?1:0);
				 
				 payload.append('sectionOrder', index);
				
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
			 if( resume.defaultResume){
				 payload.append('defaultResume', resume.defaultResume);
			 }else{
				 payload.append('resume', resume.attachment);
			 }
			 
			
			 var availability= resume.interviewAvailability;
			 
			 var month11= availability[0].date.getMonth()+1;
			 var month22= availability[1].date.getMonth()+1;
			 var month33= availability[2].date.getMonth()+1;
			 
			 
			 var month1= month11>9?month11:"0"+month11;
			 var month2= month22>9?month22:"0"+month22;
			 var month3= month33>9?month33:"0"+month33;
			 availability[0].date=availability[0].date.getFullYear()+"-"+month1+"-"+availability[0].date.getDate()+"T18:30:00.000Z";
			 availability[1].date=availability[1].date.getFullYear()+"-"+month2+"-"+availability[1].date.getDate()+"T18:30:00.000Z";
			 availability[2].date=availability[2].date.getFullYear()+"-"+month3+"-"+availability[2].date.getDate()+"T18:30:00.000Z";
			 
			payload.append('availablities', JSON.stringify(availability));
			payload.append('notes', resume.notes);
			 
           
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
		
		function getApplyFlag(jobId,userId){
			var defered=$q.defer();
			$http.get(OPENINGS_CONSTANTS.GET_APPLY_FLAG+jobId+"/"+userId).success(function(response){
				defered.resolve(response);
			}).error(function(error){
				defered.reject(error);
			});
			return defered.promise;
		}
		
		return {
			fetchOpenings:fetchOpenings,
			getSections:getSections,
			applyJob:applyJob,
			submitSections:submitSections,
			getApplyFlag:getApplyFlag
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



