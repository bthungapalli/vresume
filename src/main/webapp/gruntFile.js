module.exports=function(grunt){
	
	grunt.initConfig({
		concat:{
			options:{
				separator: '\n\n',
				stripBanners:true
			},
			dist: {
			      src: ['angularJs/vResume.js','angularJs/modules/*/*.js','angularJs/modules/login/**/*.js','angularJs/modules/main/**/*.js','angularJs/modules/profile/**/*.js','angularJs/modules/templates/**/*.js','angularJs/modules/myJobs/**/*.js','angularJs/modules/users/**/*.js','angularJs/modules/openings/**/*.js'],
			      dest: 'dist/vResume.js',
			 }
		},
		eslint: {
			configFile: ".eslintrc",
		    format: require('eslint-html-reporter'),
		    outputFile: "reports/eslint-report.html",
	        target: ['angularJs/vResume.js','angularJs/modules/*/*.js','angularJs/modules/login/**/*.js','angularJs/modules/main/**/*.js','angularJs/modules/profile/**/*.js','angularJs/modules/templates/**/*.js','angularJs/modules/myJobs/**/*.js','angularJs/modules/users/**/*.js','angularJs/modules/openings/**/*.js']
	    }
	})
	
	require('load-grunt-tasks')(grunt);
	
	grunt.registerTask('ui-deploy',['concat','eslint']);
	
};