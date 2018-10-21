(function(){
	
	var appModule=angular.module('vResume',['mwl.calendar','ui.bootstrap','ngRoute','ui.router','angular-input-stars','angularUtils.directives.dirPagination','ngCookies','darthwade.dwLoading','vResume.login','vResume.main','vResume.profile','vResume.templates','vResume.myJobs','vResume.users','vResume.openings','ng-clipboard']);

	angular.element(document).ready(function() {
	    angular.bootstrap("body", ['vResume']);
	 });
	
	appModule.service('APIInterceptor', function($rootScope,$window) {
	    var service = this;
	    service.request = function(config) {
	    	if(config.url.indexOf('partials/') > -1 || config.url.indexOf('dist/vResume.js') > -1){
                var separator = config.url.indexOf('?') === -1 ? '?' : '&';
                config.url = config.url + separator + 'c=' + '123a';
            }
	    	//else if(config.url.indexOf('/vresume/') > -1 && $rootScope.JSessionId ){
            	config.headers['JSessionId']=$rootScope.JSessionId;
             //}
	        return config;
	    };
	    service.responseError = function(response) {
	        if (response.status === 401) {
	           // $rootScope.$broadcast('unauthorized');
	        	$window.location.href = 'http://www.facemyresume.com?logout=true';
	        }
	        return response;
	    };
	});
	
	appModule.config(function($stateProvider, $urlRouterProvider,$httpProvider){

		$httpProvider.interceptors.push('APIInterceptor');
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
        }).state('viewVideos', {
            url: '/viewVideos/:token',
            controller:'userDefaultVideosController',
            templateUrl: 'partials/profile/defaultUserVideos.html'
        });
	    
	    $urlRouterProvider.otherwise('/');
});

		appModule.run(function($state){
			$state.go("login");
		});

	
	
})();
