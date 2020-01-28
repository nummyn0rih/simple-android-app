// Load plugins
const babel = require('gulp-babel');
const browsersync = require('browser-sync').create();
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './www/',
    },
    port: 3000,
  });
  done();
}

// Transpile, concatenate and minify scripts
function js() {
  return gulp
    .src('./app/js/*.js')
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/js/'))
    .pipe(browsersync.stream());
}

// Watch files
function watchFiles() {
  gulp.watch('./app/js/*.js', js);
}

// define complex tasks
const watch = gulp.parallel(watchFiles, browserSync);

// export tasks
exports.js = js;
exports.watch = watch;
exports.default = js;
