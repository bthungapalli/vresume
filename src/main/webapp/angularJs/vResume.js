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
	    });
	    
	    $urlRouterProvider.otherwise('/');
});

		appModule.run(function($state,$rootScope){
			$state.go("login");
		});

	
	
})();
