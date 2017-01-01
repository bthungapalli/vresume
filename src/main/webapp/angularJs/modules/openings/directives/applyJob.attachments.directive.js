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