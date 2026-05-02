const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");
const imagemin = require("gulp-imagemin");

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

exports.default = gulp.parallel(compilaSass, comprimeImagens);

exports.watch = function () {
  gulp.watch(
    ".src/images/*",
    { ignoreInitial: false },
    gulp.series(comprimeImagens),
  );

  gulp.watch(
    "./src/styles/*.scss",
    { ignoreInitial: false },
    gulp.series(compilaSass),
  );
};
