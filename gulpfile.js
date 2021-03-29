"use strict";

const gulp = require("gulp");
const webpack = require("webpack-stream");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");

// const dist = "C:/my/programs/openserver/domains/test"; // Ссылка на вашу папку на локальном сервере
const dist = "./dist";

gulp.task("copy-html", () => {
    return gulp.src("./src/index.html")
                .pipe(gulp.dest(dist));
});


gulp.task("copy-assets", () => {
  return gulp.src("./src/assets/**/*.*")
              .pipe(gulp.dest(dist + "/assets"));
});

gulp.task("build-js", () => {
    return gulp.src("./src/main.js")
                .pipe(webpack({
                    mode: 'development',
                    output: {
                        filename: 'script.js'
                    },
                    watch: false,
                    devtool: "source-map",
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
  
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("watch", () => {

    
    gulp.watch("./src/index.html", gulp.parallel("copy-html"));
    gulp.watch("./src/**/*.js", gulp.parallel("build-js"));
    gulp.watch("./src/assets/**/*.*", gulp.parallel("copy-assets"));

});

gulp.task("build", gulp.parallel("copy-html", "build-js", "copy-assets"));

gulp.task("prod", () => {
    gulp.src("./src/sass/style.scss")
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer()]))
        .pipe(cleanCSS())
        .pipe(gulp.dest(dist));

    return gulp.src("./src/main.js")
                .pipe(webpack({
                    mode: 'production',
                    output: {
                        filename: 'script.js'
                    },
                    module: {
                        rules: [
                          {
                            test: /\.m?js$/,
                            exclude: /(node_modules|bower_components)/,
                            // use: {
                            //   // loader: 'babel-loader',
                            //   // options: {
                            //   //   presets: [['@babel/preset-env', {
                            //   //       corejs: 3,
                            //   //       useBuiltIns: "usage"
                            //   //   }]]
                            //   // }
                            // }
                          }
                        ]
                      }
                }))
                .pipe(gulp.dest(dist));
});

gulp.task("default", gulp.parallel("watch", "build"));