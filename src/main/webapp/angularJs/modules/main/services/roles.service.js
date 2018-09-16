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