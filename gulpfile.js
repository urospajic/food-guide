var argv         = require('yargs').argv;
var autoprefixer = require('gulp-autoprefixer');
var concat       = require('gulp-concat');
var connect      = require('gulp-connect');
var del          = require('del');
var extend       = require('gulp-multi-extend');
var gulp         = require('gulp');
var less         = require('gulp-less');
var minifyCSS    = require('gulp-minify-css');
var rename       = require('gulp-rename');
var runSequence  = require('run-sequence');
var sourceMap    = require('gulp-sourcemaps');
var sourcemaps   = require('gulp-sourcemaps');
var uglify       = require('gulp-uglify');


var Paths = {
  APP                  : './src/app/',
  ASSETS               : './src/assets',
  BOWER_COMPONENTS     : './bower_components/',
  CONFIG               : './src/config/',
  JSON                 : './src/app/data/',
  HERE                 : './',
  LESS_CUSTOM          : './src/assets/less/packator*',
  LESS_TOOLKIT_SOURCES : './src/assets/less/toolkit-inverse*',
  NODE_MODULES         : './node_modules/',
  PUBLIC               : './public/',
};

var environments = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  STAGING: 'staging',
};

// set environment
var ENV = environments.DEVELOPMENT ;
if (argv.staging) { ENV = environments.STAGING; }
if (argv.production) { ENV = environments.PRODUCTION; }

gulp.task('application', function() {
  gulp.src([
    Paths.APP + '_init.js',
    Paths.APP + '**/*.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(sourceMap.write('./'))
    .pipe(gulp.dest(Paths.PUBLIC + 'js'));
});

gulp.task('data', function() {
  gulp.src(Paths.CONFIG +'base.config.json')
    .pipe(extend(Paths.CONFIG + ENV + '.config.json'))
    .pipe(concat('config.json'))
    .pipe(gulp.dest(Paths.PUBLIC + 'data'));
});

gulp.task('json', function() {
  gulp.src(Paths.JSON + '*.*')
    .pipe(gulp.dest(Paths.PUBLIC + 'data'));
});

gulp.task('server', function() {
  connect.server({
    port: 9001,
    root: 'public',
  });
});

gulp.task('cleanup', function() {
  del.sync([Paths.PUBLIC + '**']);
});

gulp.task('index', function() {
  gulp.src(Paths.APP + 'index.html')
    .pipe(gulp.dest(Paths.PUBLIC));
});

gulp.task('libraries', function() {
  gulp.src([
    Paths.NODE_MODULES + 'jquery/dist/jquery.js',
    Paths.NODE_MODULES + 'angular/angular.js',
    Paths.NODE_MODULES + 'moment/moment.js',
    Paths.NODE_MODULES + 'bootstrap/dist/js/bootstrap.js',
    Paths.NODE_MODULES + 'bootstrap/dist/js/bootstrap/js/*.js',
    Paths.NODE_MODULES + 'daterangepicker/daterangepicker.js',
    Paths.NODE_MODULES + 'angular-ui-router/release/angular-ui-router.js',
    Paths.NODE_MODULES + 'angular-ui-bootstrap/dist/ui-bootstrap.js',
    Paths.NODE_MODULES + 'angular-ui-bootstrap/dist/ui-bootstrap-tpls.js',
    Paths.NODE_MODULES + 'ngmap/build/scripts/ng-map.min.js',
    Paths.BOWER_COMPONENTS + 'ngmap/build/scripts/ng-map.js'
  ])
    .pipe(concat('libraries.js'))
    .pipe(gulp.dest(Paths.PUBLIC + 'js'));
});

gulp.task('templates', function() {
  gulp.src(Paths.APP + '**/*.html')
    .pipe(gulp.dest(Paths.PUBLIC + 'views'));
});

gulp.task('css', function() {
  gulp.src([
    Paths.ASSETS + '/css/*.css',
    Paths.BOWER_COMPONENTS + 'angular-block-ui/dist/angular-block-ui.css',
    Paths.NODE_MODULES + 'daterangepicker/daterangepicker-bs3.css',
  ])
    .pipe(concat('css.css'))
    .pipe(gulp.dest(Paths.PUBLIC + 'css'));
});

gulp.task('less', function() {
  return gulp.src([
      Paths.LESS_TOOLKIT_SOURCES,
      Paths.LESS_CUSTOM
    ])
    .pipe(concat('compiled.less'))
    .pipe(sourcemaps.init())
    .pipe(less())
    // .pipe(minifyCSS())
    .pipe(autoprefixer())
    // .pipe(rename({
    //   suffix: '.min'
    // }))
    .pipe(sourcemaps.write(Paths.HERE))
    .pipe(gulp.dest(Paths.PUBLIC + 'css'));
});

gulp.task('fonts', function() {
  gulp.src(Paths.ASSETS + '/fonts/*.*')
    .pipe(gulp.dest(Paths.PUBLIC + 'fonts'));
});

gulp.task('images', function() {
  gulp.src(Paths.ASSETS + '/img/*.*')
    .pipe(gulp.dest(Paths.PUBLIC + 'images'));
});

gulp.task('watch', function() {
  gulp.watch(Paths.APP + 'index.html', ['index']);
  gulp.watch(Paths.APP + '**/*.html', ['templates']);
  gulp.watch(Paths.ASSETS + '/css/*.css', ['css']);
  gulp.watch([Paths.APP + '_init.js', Paths.APP + '**/*.js'], ['application']);
});

/* Default gulp task */
gulp.task('default', function() {
  runSequence(
    ['cleanup'],
    ['index', 'application', 'templates', 'css', 'images', 'fonts', 'libraries', 'less', 'data', 'json', 'watch'],
    'server'
    );
});