(function(){
	
	var appModule=angular.module('vResume',['ngRoute','ui.router','vResume.login']);

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
	            templateUrl: 'partials/profile/profile.html'
	    }).state('main.openings', {
            url: '/openings',
            templateUrl: 'partials/openings.html'
        }).state('main.templates', {
            url: '/templates',
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
            templateUrl: 'partials/newTemplate.html'
        }).state('main.showTemplate', {
            url: '/showTemplate',
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
	
	angular.module('vResume.login').constant("LOGIN_CONSTANTS",{
		"LOGIN_URL":"/vresume/login"
	});
	
})();

(function(){
	
	function loginController($rootScope,$scope,$state,loginService,loginFactory){
		
		$state.go("login.loginTemplate");
		
		$scope.assignState=function(state){
			$rootScope.activeState=state;
		};
		
		$scope.assignState('login.loginTemplate');
		
		$scope.resetUserDetails=function(){
		$scope.userDetails={
				"emailId":"",
				"password":"",
				"confirmPassword":"",
				"role":0
		};
		};
		
		$scope.resetUserDetails();
		
		$scope.roles=loginService.getRoles();
		
		$scope.login=function(){
			loginFactory.submitLogin($scope.userDetails);
		};
		
	};
	
	loginController.$inject=['$rootScope','$scope','$state','loginService','loginFactory'];
	
	angular.module('vResume.login').controller("loginController",loginController);
	
})();

(function(){
	
	function loginFactory($q,$http,LOGIN_CONSTANTS){
		
		
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
		
		
		return {
			submitLogin:submitLogin
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



