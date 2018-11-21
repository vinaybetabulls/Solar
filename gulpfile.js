var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');

/**
 * Tasks are added by the react-component-gulp-tasks package
 *
 * See https://github.com/JedWatson/react-component-gulp-tasks
 * for documentation.
 *
 * You can also add your own additional gulp tasks if you like.
 */

var taskConfig = {

	component: {
		name: 'GoogleMapDrawFilter',
		dependencies: [
			'classnames',
			'react',
			'react-dom'
		],
		lib: 'lib'
	},

	example: {
		src: 'example/src',
		dist: 'example/dist',
		files: [
			'index.html',
			'.gitignore'
		],
		scripts: [
			'example.js',
			'logedin/login.js',
			'logedin/registration.js',
			'areaestimate.js',			
			'contactus.js',
			'cstepper.js',
			'estimation.js',
			'footer.js',
			'getuserdata.js',
			'header.js',
			'mapcomponent.js',
			'materialComponent.js',
			'profile.js',
			'progresslayer.js',
			'styleComponent.js',	
			'userregistration.js',
			'roof_questions.js'
		],
		less: [
			'example.less',
			'admin'
		]
	}

};

initGulpTasks(gulp, taskConfig);
