var elixir = require('laravel-elixir');
require('laravel-elixir-vue-2');
require('laravel-elixir-remove');
var fs = require('fs');
var handlebars = require('gulp-compile-handlebars');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your application
 |
 */

var task = elixir.Task;
var handlebarOpts = {
  helpers: {
    assetPath: function (path, context) {
      return ['', context.data.root.manifest[path]].join('/');
    }
  }
};

elixir.extend('html', function(message) {
  new task('html', function() {
    if (elixir.config.production) {
      var data = {
        manifest: JSON.parse(fs.readFileSync('./dist/rev-manifest.json', 'utf8')),
        production: true,
      }
    }
    else {
      var data = {
        production: false,
      };
    }

    return gulp.src('src/html/index.hbs')
      .pipe(handlebars(data, handlebarOpts))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('./dist'));
  });
});

gulp.on('task_start', function (e) {
  // only start LiveReload server if task is 'watch'
  if (e.task === 'watch') {
    livereload.listen();
  }
});

gulp.task('livereload', function() {
  livereload.changed('styles.css');
});

elixir(function (mix) {
  // Clean folders
  mix.remove(['./dist/scripts', './dist/styles']);

  // Images
  mix.copy('./src/images/**', 'dist/images');

  // Styles
  mix.sass('./src/styles/styles.scss', 'dist/styles/styles.css');
  mix.task('livereload', 'dist/styles/styles.css');

  // Webpack
  mix.webpack('./src/scripts/app.js', 'dist/scripts/app.js');

  // Production mode
  if (elixir.config.production) {
    mix.version(['./dist/styles/styles.css', './dist/scripts/app.js'], './dist');

    // Compile HTML
    mix.html();
  }
  // Development mode
  else {
    // Compile HTML
    mix.html();

    // BrowserSync
    mix.browserSync({
      //files: ['src/**'],
      notify: false,
      open: false,
      proxy: null,
      server: {
        baseDir: 'dist',
      }
    });
  }
  });
