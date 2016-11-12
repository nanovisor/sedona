var gulp         = require('gulp'),
    sass         = require('gulp-sass'),
    browserSync  = require('browser-sync').create(),
    useref       = require('gulp-useref'),
    uglify       = require('gulp-uglify'),
    gulpIf       = require('gulp-if'),
    cssnano      = require('gulp-cssnano'),
    imagemin     = require('gulp-imagemin'),
    pngquant     = require('imagemin-pngquant'),
    cache        = require('gulp-cache'),
    del          = require('del'),
    runSequence  = require('run-sequence'),
    autoprefixer = require('gulp-autoprefixer');

// Static server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    // Tunnel the Browsersync server through a random Public URL
    // tunnel: true
  });
});

// Scss to Css, autoprefix, inject new CSS styles (update the CSS) into the browser
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 15 versions', '> 1%', 'ie7', 'ie8', 'ie9', 'ie10', 'ie11'))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Берет указанные в Html блоки Css и Script, объединяет, сжимает
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    // Minifies only if it's a JavaScript file
    .pipe(gulpIf('*.js', uglify()))
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'))
});

// Картинки
gulp.task('images', function() {
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}]
      // BUG pngquant
      // use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'))
});

// Шрифты
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
});

// Удаление dist
// BUG надо закрывать Atom
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// Очистка кэша
gulp.task('cache:clear', function(callback) {
  return cache.clearAll(callback);
});

// Наблюдение за изменениями
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Создает готовый дистрибутив, в массиве таски запускаются беспорядочно
gulp.task('build', function(callback) {
  runSequence('clean:dist',
    ['sass', 'useref', 'images', 'fonts'],
    callback)
});

gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback)
});
