'use strict';

import gulp from 'gulp'
import del from 'del'
import loadPlugins from 'gulp-load-plugins'
import browserSync from 'browser-sync'

const browserSyncServer = browserSync.create()
const $ = loadPlugins({
  camelize: true,
  lazy: true
});

const config = {
  src_path : './src/',
  public_path : './public/',
  current_index: 'landing.html',

  get tpl_src(){
    return this.src_path + 'tpl/';
  },

  get html_dest(){
    return this.public_path;
  },

  get style_src(){
    return this.src_path + 'less/'
  },

  get style_dest(){
    return this.public_path + 'css/'
  },

  get js_src(){
    return this.src_path + 'js/'
  },

  get js_dest(){
    return this.public_path + 'js/'
  },

  get img_src(){
      return this.src_path + 'img/'
  },

    get img_dest(){
        return this.public_path + 'img/'
    }
}

gulp.task('del', () => {
  del([config.public_path + '*.html' ,config.style_dest + '*.css', config.js_dest + '*.js']);
});

gulp.task('pug', () => {
  return gulp.src(config.tpl_src + '*.pug')
      // .pipe($.data(function(file, cb){
      //   return config.tpl_src + 'data/_main_menu.json'
      // }))
      .pipe($.pug({
          pretty: true
      }))
      .on('error',(err)=>{console.log(err)})
      .pipe(gulp.dest(config.public_path))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('less', () => {
  return gulp.src(config.style_src + '*.less')
      .pipe($.sourcemaps.init())
      .pipe($.less({
        compress: ($.util.env.type == 'prod')
      }))
      .on('error',(err)=>{console.log(err)})
      .pipe($.rename({
        suffix: ".min",
        extname: ".css"
      }))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(config.style_dest))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('js', function() {
  return gulp.src(config.js_src + '**/*.js')
      .pipe($.sourcemaps.init())
      .pipe($.babel({
        presets: ['es2015']
      }))
      .pipe($.concat('main.min.js'))
      .on('error',(err)=>{console.log(err)})
      .pipe($.util.env.type == 'prod' ? $.uglify() : $.util.noop())
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(config.js_dest))
      .pipe(browserSync.reload({
        stream: true
      }));
});

gulp.task('img_min', () => {
    gulp.src(config.img_src + '*')
        .pipe($.imagemin({
            progressive: true
        }))
        .pipe(gulp.dest(config.img_dest))
});

gulp.task('browserSync', () => {
  browserSync({
    server: {
      baseDir: config.public_path,
      index: config.current_index
    },
    port: 3000,
    open: false,
    notify: false
  });
});

gulp.task('watch',() => {
  gulp.watch(config.style_src + '**/*.less', ['less']);
  gulp.watch(config.js_src + '**/*.js', ['js']);
  gulp.watch(config.tpl_src + '**/*.pug', ['pug']);
  gulp.watch('**/*',{cwd: config.img_src}, ['img_min']);
});

gulp.task('default', ['del','less','js','img_min','pug','browserSync','watch']);
