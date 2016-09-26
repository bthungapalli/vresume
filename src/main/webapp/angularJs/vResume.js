(function(){
	
	var appModule=angular.module('vResume',['ngRoute','ui.router']);

	angular.element(document).ready(function() {
	    angular.bootstrap("body", ['vResume']);
	 });
	
	appModule.config(function($stateProvider, $urlRouterProvider){
	    
	    $stateProvider.state('login', {
            url: '/login',
            templateUrl: 'partials/login/login.html'
        }).state('main', {
            url: '/main',
            templateUrl: 'partials/main/main.html'
        }).state('main.profile', {
	            url: '/profile',
	            templateUrl: 'partials/profile/profile.html'
	    }).state('main.openings', {
            url: '/allUsers',
            templateUrl: 'partials/openings.html'
        }).state('main.templates', {
            url: '/allUsers',
            templateUrl: 'partials/templates.html'
        }).state('main.myJobsConsultancy', {
            url: '/allUsers',
            templateUrl: 'partials/myJobsConsultancy.html'
        }).state('main.myJobs', {
            url: '/allUsers',
            templateUrl: 'partials/myJobs.html'
        }).state('main.allUsers', {
            url: '/allUsers',
            templateUrl: 'partials/allUsers.html'
        });
	    
	    
	    $urlRouterProvider.otherwise('/');
});

		appModule.run(function($state,$rootScope){
			$state.go("login");
		});

	
	
})();
