import webpackStream from "webpack-stream"

export const scripts = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
        // Uncomment to enable toast notifications on error
        // .pipe(app.plugins.plumber(
        //     app.plugins.notify.onError({
        //         title: 'JS',
        //         message: 'Error: <%= error.message %>'
        //     })
        // ))
        .pipe(webpackStream({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js'
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream())
}