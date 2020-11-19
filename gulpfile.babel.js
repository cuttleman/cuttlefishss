import { src, dest, watch, series } from "gulp";
import webServer from "gulp-webserver";
import cleanCss from "gulp-clean-css";
import rename from "gulp-rename";
import pug from "gulp-pug";
import babel from "gulp-babel";
import concat from "gulp-concat";
import uglify from "gulp-uglify";

const cuttlefish = () =>
  src("./assets/css/cuttlefish.css")
    .pipe(cleanCss({ compatibility: "ie8" }))
    .pipe(rename("cuttlefish.min.css"))
    .pipe(dest("."));

const globalStyle = () =>
  src("./assets/css/globalStyle.css")
    .pipe(cleanCss({ compatibility: "ie8" }))
    .pipe(rename("style.css"))
    .pipe(dest("."));

const js = () =>
  src("./assets/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(uglify())
    .pipe(concat("main.js"))
    .pipe(dest("."));

const html = () => src("./views/index.pug").pipe(pug()).pipe(dest("."));

const server = () => {
  return src(".").pipe(
    webServer({
      livereload: true,
      open: true,
      fallback: "index.html",
    })
  );
};

const watchFile = () => {
  const watches = [
    watch("./assets/css/cuttlefish.css", cuttlefish),
    watch("./assets/css/globalStyle.css", globalStyle),
    watch("./assets/js/**/*.js", js),
    watch("./views/**/*.pug", html),
  ];
  return watches;
};

export const dev = series([
  cuttlefish,
  globalStyle,
  js,
  html,
  server,
  watchFile,
]);
export const build = series([cuttlefish, globalStyle, js, html]);
