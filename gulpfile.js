const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const flatten = require("gulp-flatten");

function buildStyles() {
  return src("src/**/*.scss")
    .pipe(sass())
    .pipe(flatten({ subPath: [0, -1] })) // will strip off last folder else it creates styles/css/styles/abc.css - now styles/css/abc.css
    .pipe(dest("src/styles/css"));
}

function watchTask() {
  watch(["src/**/*.scss"], buildStyles);
}

exports.default = series(buildStyles, watchTask);
