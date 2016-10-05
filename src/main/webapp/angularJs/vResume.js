(function(){
	
	var appModule=angular.module('vResume',['ui.bootstrap','ngRoute','ui.router','vResume.login','vResume.main','vResume.profile','vResume.templates','vResume.myJobs']);

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
