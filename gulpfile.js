var gulp = require('gulp');
var clean = require('gulp-clean');
//var connect = require('gulp-connect');
//var livereload = require('gulp-livereload');
var inject = require('gulp-inject');
var uglifyjs = require('gulp-uglifyjs');
var concat = require('gulp-concat');
var series = require('stream-series');
var runSequence = require('run-sequence');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var browserSync = require('browser-sync').create();
var wiredep = require('wiredep');
var bowerFiles = require('main-bower-files');
var less = require('gulp-less');
var lessPluginCleanCSS = require('less-plugin-clean-css');
var lessPluginAutoPrefix = require('less-plugin-autoprefix');
var cleancss = new lessPluginCleanCSS({ advanced: true });
var autoprefix = new lessPluginAutoPrefix({ browsers: ["last 3 versions"] });
var karmaServer = require('karma').Server;

function startBrowserSync(baseDir) {
  browserSync.init({
      server: baseDir
  });
}

gulp.task('clean-dev', function() {
  return gulp.src('./app/.tmp/*')
    .pipe(clean({force: true}));
});

gulp.task('clean', function() {
  return gulp.src('./dist/*')
    .pipe(clean({force: true}));
});

gulp.task('connect-browser', function() {
  startBrowserSync('./dist/');
});

gulp.task('connect-browser-dev', function() {
  startBrowserSync('./app/');
});

/*gulp.task('connect', function() {
  return connect.server({
    root: 'dist',
    port: 8888
  });
});*/

gulp.task('copy-html', function() {
  return gulp.src('./app/**/*.html')
    .pipe(gulp.dest('./dist/'));
});

gulp.task('lint', function() {
  return gulp.src(['./app/**/*.js', '!./app/bower_components/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});

gulp.task('watch', function() {
  var allFiles = ['./app/**/*.js',
    //'./app/**/*.css',
    './app/**/*.html',
    '!./app/bower_components/**/*'];
  var lessFiles = ['./app/**/*.less', '!./app/bower_components/**/*.less'];
  gulp.watch(allFiles).on('change', browserSync.reload);
  gulp.watch(lessFiles, ['inject-app-css-dev']).on('change', browserSync.reload);
});

gulp.task('inject-vendor-js', function() {
  var target = gulp.src('./dist/index.html');
  var files = gulp.src(bowerFiles())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('./dist/'));
  return target
    .pipe(inject(files, {name: 'bower', ignorePath: 'dist'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('inject-app-js', function() {
  var target = gulp.src('./dist/index.html');
  var appJs = gulp.src([
    './app/**/*.js',
    '!./app/**/*.spec.js',
    '!./app/bower_components/**/*.js']/*,
    {read: false}*/)
    .pipe(concat('main.js'))
    .pipe(uglifyjs())
    .pipe(gulp.dest('./dist/'));

  return target
    .pipe(inject(appJs, {ignorePath: 'dist'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('inject-vendor-css', function() {
  var target = gulp.src('./dist/index.html');
  var files = gulp.src(bowerFiles())
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('./dist'));

    return target
      .pipe(inject(files, {name: 'bower', ignorePath: 'dist'}))
      .pipe(gulp.dest('./dist/'));
});

gulp.task('inject-app-css-dev', function() {
  return gulp.src(['./app/**/*.less', '!./app/bower_components/**/*.less'])
    .pipe(less({
      plugins: [autoprefix, cleancss]
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./app/.tmp/'));
});

gulp.task('inject-app-css', function() {
  var target = gulp.src('./dist/index.html');
  var files = gulp.src(['./app/**/*.less', '!./app/bower_components/**/*.less'])
    .pipe(less({
      plugins: [autoprefix, cleancss]
    }))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./dist/'));

  return target
    .pipe(inject(files, {ignorePath: 'dist'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('inject-js', function() {
  var target = gulp.src('./dist/index.html');

  var vendorJs = gulp.src([
    './app/bower_components/**/*.min.js']/*,
    {read: false}*/)
  .pipe(concat('vendor.js'))
  .pipe(uglifyjs())
  .pipe(gulp.dest('./dist/'));

  var appJs = gulp.src([
    './app/**/*.js',
    '!./app/**/*.spec.js',
    '!./app/bower_components/**/*.js']/*,
    {read: false}*/)
    .pipe(concat('main.js'))
    .pipe(uglifyjs())
    .pipe(gulp.dest('./dist/'));

  return target
    .pipe(inject(series(vendorJs, appJs), {ignorePath: 'dist'}))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('test', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('tdd', function (done) {
  new karmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('run', function() {
  runSequence(['clean-dev'],
    ['lint'],
    ['inject-app-css-dev', 'watch', 'connect-browser-dev']);
});

gulp.task('build', function() {
  runSequence(['clean'],
    ['lint', 'test'],
    ['copy-html'],
    ['inject-vendor-js'],
    ['inject-app-js'],
    ['inject-vendor-css'],
    ['inject-app-css'],
    ['connect-browser'] //comment for production
    );
});
