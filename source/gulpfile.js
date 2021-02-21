'use strict';

var gulp 	        = require('gulp'),
	sass 	        = require('gulp-sass'),
	watch 	      = require('gulp-watch'),
	rename        = require('gulp-rename'),
	pug           = require('gulp-pug'),
	cleanCSS      = require('gulp-clean-css'),
	sourcemaps    = require('gulp-sourcemaps'),
	rigger        = require('gulp-rigger'),
	uglify        = require('gulp-uglify');

gulp.task("test", function() {
	console.log(123);
});

gulp.task('sass', function () {
	console.log("complete sass");
	return gulp.src('sass/*.scss')
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(rename({suffix: '.min'}))
		.pipe(cleanCSS())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('../release/css/'));
});

gulp.task('pug', function () {
	console.log("complete pug");
	return gulp.src('html/*.pug')
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest("../release"));
});

gulp.task('js', function () {
	return gulp.src('js/*.js')
		.pipe(sourcemaps.init())
		.pipe(rigger())
		.pipe(rename({ suffix: '.min' }))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('../release/js/'));
});


gulp.task('fonts', function () {
	return gulp.src('fonts/**/*.*')
		.pipe(gulp.dest('../release/fonts/'));
});


gulp.task('watch', function () {
	gulp.watch('sass/*.scss', gulp.series('sass'));
	gulp.watch('sass/**/*.scss', gulp.series('sass'));
	gulp.watch('html/*.pug', gulp.series('pug'));
	gulp.watch('html/**/*.pug', gulp.series('pug'));
	gulp.watch( "js/main.js", gulp.series("js") );
});



gulp.task('image', function (done) {
	gulp.src('images/**/*.*')
		.pipe(imagemin([
			imagemin.gifsicle({interlaced: true}),
			//imagemin.mozjpeg({progressive: true}),
			imageminJpegRecompress({
				loops: 4,
				min: 55,
				max: 95,
				quality:'high'
			}),
			pngquant({quality: [0.55, 0.95]}),
			imagemin.svgo({plugins: [{removeViewBox: false}]})
		],{
			verbose: true
		}))
		.pipe(gulp.dest('../release/images'))
	done();
});


gulp.task('default', gulp.series(['sass', 'pug', 'js'], 'watch'));
