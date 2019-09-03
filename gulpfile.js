var gulp = require('gulp');
var initGulpTasks = require('react-component-gulp-tasks');
var jslint = require('gulp-jslint');
var concat = require('gulp-concat');

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
			'areaestimate.js'
		],
		less: [
			'example.less',
			'admin',
			'example/src/styles/example'
		]
	}
};

gulp.task('watch', function () {
	gulp.watch('example/src/**/*.{js}', ['concat']);
	gulp.watch('example/src/*.{js}', ['concat']);
});
gulp.task('jslint', function () {
	return gulp.src(['./example/src/roof_questions.js'])
		.pipe(jslint())
		.pipe(jslint.reporter('stylish'));
});
gulp.task('default', ['jslint'], function () {
	console.log('buld complete');
});

gulp.task('pack-css', function () {
	return gulp.src(['example/src/styles/example.css', 'example/src/styles/responsive.css'])
		.pipe(concat('example.css'))
		.pipe(gulp.dest('example/dist/styles'));
});

initGulpTasks(gulp, taskConfig);