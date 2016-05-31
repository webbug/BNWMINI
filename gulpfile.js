//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'); //本地安装gulp所用到的地方
// var gulpLoadPlugins = require('gulp-load-plugins');


    watch = require('gulp-watch');

    less = require('gulp-less');

    UglifyJS = require('gulp-uglify');

    cssmin = require('gulp-minify-css');

    cache = require('gulp-cache');//只对改变的文件执行任务

    imagemin = require('gulp-imagemin'); //确保本地已安装imagemin-pngquant [cnpm install imagemin-pngquant --save-dev]

    pngquant = require('imagemin-pngquant'); //确保本地已安装gulp-cache [cnpm install gulp-cache --save-dev]

    htmlmin = require('gulp-htmlmin');
    
    rev = require('gulp-rev-append'); //给页面内的引用添加版本号
    
    autoprefixer = require('gulp-autoprefixer');//自动添加浏览器前缀

    livereload = require('gulp-livereload');

   
    
    
    
//定义一个testLess任务（自定义任务名称）
// gulp.task('testLess', function () {
//     gulp.src('css/main.less') //该任务针对的文件
//         .pipe(less()) //该任务调用的模块
//         .pipe(gulp.dest('css/')) //将会在src/css下生成index.css
//         .pipe(livereload());
// });

gulp.task('jsmin', function () {
    gulp.src('js/*.js') //该任务针对的文件
        .pipe(UglifyJS({
        	mangle: false//是否混淆
            //mangle: {except: ['require' ,'exports' ,'module' ,'$']}//排除混淆关键字
        })) //该任务调用的模块
        .pipe(gulp.dest('dist/js')); //将会在src/css下生成index.css
});

gulp.task('cssmin', function () {
    gulp.src('css/*.css') //该任务针对的文件
        .pipe(autoprefixer({//添加指定的浏览器前缀
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(cssmin({
        	advanced: false,//类型：Boolean 默认：true [是否开启高级优化（合并选择器等）]
            compatibility: 'ie7',//保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
            keepBreaks: false//类型：Boolean 默认：false [是否保留换行]
        })) //该任务调用的模块
        .pipe(gulp.dest('dist/css')); //将会在src/css下生成index.css
});


gulp.task('imagemin', function () {
    gulp.src('images/*.{png,jpg,gif,ico}')
        .pipe(cache(imagemin({
            optimizationLevel: 7, //类型：Number  默认：3  取值范围：0-7（优化等级）
            progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        })))
        .pipe(gulp.dest('dist/images'));
});


gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: false,//清除HTML注释
        collapseWhitespace: false,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
        minifyJS: false,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('*.html')
        .pipe(rev()) //给页面内指定的引用添加版本号
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/'));
});




gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('css/*.less', ['testLess']);
    gulp.watch('css/*.css', ['cssmin']);
    gulp.watch('js/*.js', ['jsmin']);
    gulp.watch('*.html', ['testHtmlmin']);
    gulp.watch('images/*.{png,jpg,gif,ico}', ['imagemin']);
});




gulp.task('default',['imagemin','jsmin','cssmin','testHtmlmin','watch']); //定义默认任务

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组) 
//gulp.dest(path[, options]) 处理完后文件生成路径