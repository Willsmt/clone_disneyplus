const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");

function compilaSass() {
  return gulp
    .src("./src/styles/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./dist/styles"));
}

function comprimeImagens() {
  return gulp
    .src("./src/images/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("./dist/images"));
}

function comprimejs() {
  return gulp
    .src("./src/scripts/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("./dist/js"));
}

exports.default = gulp.parallel(compilaSass, comprimeImagens, comprimejs);

exports.watch = function () {
  gulp.watch("./src/styles/*.scss", gulp.parallel(compilaSass));
  gulp.watch("./src/scripts/*.js", gulp.parallel(comprimejs));
};
