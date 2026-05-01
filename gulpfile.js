const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");
const sourcemaps = require("gulp-sourcemaps");

function compilaSass() {
  return gulp
    .src("./src/styles/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("./maps"))
    .pipe(gulp.dest("./dist/styles"));
}

exports.default = function () {
  gulp.watch(
    "./src/styles/*.scss",
    { ignoreInitial: false },
    gulp.series(compilaSass),
  );
};
