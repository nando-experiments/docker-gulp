'use strict';

import gulp     from 'gulp';
import plugins  from 'gulp-load-plugins';
import sequence from 'run-sequence';
import bourbon  from 'bourbon';
import neat     from 'node-neat';

const $ = plugins();

const sassConfig = {
  compass: true,
  sourcemap: false,
  noCache: true,
  style: 'expanded',
  sourceComments: 'normal',
  includePaths: [
    bourbon.includePaths,
    neat.includePaths,
    'node_modules',
    'bower_components'
  ]
};

const plumberErrorHandler = {
  errorHandler: $.notify.onError({
    title   : 'Gulp',
    message : 'Error: <%= error.message %>'
  })
};

const autoprefixer = {
  browsers: [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 5',
    'opera >= 23',
    'ios >= 6',
    'android >= 4.4',
    'bb >= 10'
  ],
  cascade: false
};

gulp.task('stylesheets', () => gulp.src([`./sass/*`])
  .pipe($.plumber(plumberErrorHandler))
  .pipe($.sass(sassConfig))
  .pipe($.autoprefixer(autoprefixer))
  .pipe($.combineMq())
  .pipe($.cssnano())
  .pipe($.rename({ suffix: '.min' }))
  .pipe($.size({ title: 'Stylesheets', gzip: false, showFiles: true }))
  .pipe(gulp.dest('./css'))
  .pipe($.plumber.stop()));

gulp.task('watch', () => {
  gulp.watch(`sass/**/*.{sass,scss}`, ['stylesheets']);
});

gulp.task('default', [ 'watch' ]);