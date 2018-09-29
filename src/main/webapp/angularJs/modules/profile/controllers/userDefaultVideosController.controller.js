(function(){
	
	function userDefaultVideosController($scope,$state,profileFactory,$loading,$location,$stateParams){
		
		$scope.url=$location.protocol()+"://"+$location.host()+":"+$location.port()+"/vresume/#/viewJob/" ;
		$scope.jobUrl=$stateParams.token;
		$scope.loading=true;
		$scope.user;
		
		$scope.getUser=function(){
			$scope.loading=true;
			$loading.start("viewjob");
			profileFactory.fecthUser($stateParams.token).then(function(response){
				$scope.user=response;
				$scope.loading=false;
				$loading.finish("viewjob");
			}).catch(function(){
				$scope.loading=false;
				$loading.finish("viewjob");
			});
		};
		
		$scope.getUser();
		
	};
	
	userDefaultVideosController.$inject=['$scope','$state','profileFactory','$loading','$location','$stateParams'];
	
	angular.module('vResume.profile').controller("userDefaultVideosController",userDefaultVideosController);
	
})();