const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const sass = require("gulp-sass");

// Compile .scss files to .css
gulp.task("build:css", () =>
  gulp
    .src("./sass/**/*.scss")
    .pipe(
      sass({
        includePaths: ["./node_modules", "./sass"]
      })
    )
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(gulp.dest("./css"))
);

// Compile .scss files to .css
gulp.task("build:js", () =>
  gulp
    .src("./js/**/*.es6.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(
      rename(path => {
        // Replace the ".es6.js" extension with just ".js".
        path.basename = path.basename.replace(".es6", "");
      })
    )
    .pipe(gulp.dest("./js"))
);

// Copy JS libraries from node modules to JS folder.
gulp.task("copy:js", () =>
  gulp
    .src([
      "./node_modules/bootstrap/dist/js/bootstrap.min.js",
      "./node_modules/popper.js/dist/umd/popper.min.js"
    ])
    .pipe(gulp.dest("./vendor"))
);

// Compile .scss files to .css when .scss files are updated.
// Compile .es6.js files to .js when .es6.js files are updated.
gulp.task("watch", () => {
  gulp.watch("./sass/**/*.scss", gulp.series("build:css"));
  gulp.watch("./js/**/*.es6.js", gulp.series("build:js"));
});

// Compile .scss files to .css when .scss files are updated.
gulp.task("watch:css", () => {
  gulp.watch("./sass/**/*.scss", gulp.series("build:css"));
});

// Compile .es6.js files to .js when .es6.js files are updated.
gulp.task("watch:js", () => {
  gulp.watch("./js/**/*.es6.js", gulp.series("build:js"));
});

// Perform all build tasks
gulp.task("build", gulp.parallel("build:css", "build:js", "copy:js"));
