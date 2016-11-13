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


// gulp browserSync - run static server
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    }
  });
});

// gulp browserSync-tunnel - tunnel the Browsersync server through a random Public URL
gulp.task('browserSync-tunnel', function() {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
    open: false, // откл. автооткрытие
    tunnel: true
  });
});

// gulp sass - SCSS => CSS => autoprefix => сохранить в папку APP/CSS/ => перезагрузить браузер
gulp.task('sass', function() {
  return gulp.src('app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 15 versions'],
      cascade: true
    }))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// gulp useref - находит в Html блоки Css и Script, объединяет, сжимает, кидает в dist
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    // if JS => uglify
    .pipe(gulpIf('*.js', uglify()))
    // if CSS => cssnano
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

// gulp images - сжатие картинок
gulp.task('images', function() {
  return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true,
      progressive: true,
      svgoPlugins: [{
        removeViewBox: false
      }],
      // BUG pngquant иногда выдает ошибку
      // use: [pngquant()]
    })))
    .pipe(gulp.dest('dist/img'));
});

// gulp fonts - копирует шрифты
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

// gulp dist:remove - удаляет папку dist
gulp.task('dist:remove', function() {
  return del.sync('dist');
});

// gulp cache:clear - чистит кэш
gulp.task('cache:clear', function(callback) {
  return cache.clearAll(callback);
});

// gulp watch - наблюдение за изменениями HTML, SCSS, JS
gulp.task('watch', ['browserSync', 'sass'], function() {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

// gulp build - создает готовый дистрибутив
gulp.task('build', function(callback) {
  runSequence('dist:remove',
    ['sass', 'images', 'fonts'], // в массиве таски запускаются беспорядочно
    'useref',
    callback);
});

// gulp - для начала работы
gulp.task('default', function(callback) {
  runSequence(['sass', 'browserSync', 'watch'],
    callback);
});
