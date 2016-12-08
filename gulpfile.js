var gulp = require('gulp');
var ts = require('gulp-typescript');
var clean = require('gulp-clean');
var rimraf = require('gulp-rimraf');
var typedoc = require("gulp-typedoc");
var runSequence = require('run-sequence');

var tsProject = ts.createProject({
    declaration: true,
    noExternalResolve: true,
    module:'commonjs'
});

gulp.task('clean', function() {
    return gulp.src(['./dist/**/*.js','./dist/**/*.d.ts'], { read: false })
        .pipe(rimraf());
});


gulp.task('typedoc', function() {
    return gulp
        .src(['src/**/*.ts','devtypes/**/*.ts'])
        .pipe(typedoc({
            // TypeScript options (see typescript docs)
            module: "commonjs",
            target: "es5",
            includeDeclarations: false,
            out: "./doc",
            name: "jwt-claimsprincipal"
        }));
});

gulp.task('build', function() {
    var tsResult = gulp
        .src(['./src/**/*.ts', './devtypes/**/*.ts'])
        .pipe(ts(tsProject));
        
    tsResult.dts.pipe(gulp.dest('./dist'));
    return tsResult.js.pipe(gulp.dest('./dist'));
});

gulp.task('package',function(callback) {
    runSequence('clean',
        'build',
        'typedoc',
        callback);
});

gulp.task('watch', ['build'], function() {
    gulp.watch('src/**/*.ts', ['build']);
});