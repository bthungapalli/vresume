(function() {

	function templatesService() {
		
		this.template=null;
	};

	templatesService.$inject = [];

	angular.module('vResume.templates').service('templatesService', templatesService);

})();