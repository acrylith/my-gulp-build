import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import gulpRename from 'gulp-rename'

import GulpCleanCss from 'gulp-clean-css'
import autoPrefixer from 'gulp-autoprefixer'
import gulpGroupCssMediaQueries from 'gulp-group-css-media-queries'

const sass = gulpSass(dartSass)

export const scss = () => {
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        // Uncomment to enable toast notifications on error
        // .pipe(app.plugins.plumber(
        //     app.plugins.notify.onError({
        //         title: "SCSS",
        //         message: "Error: <%= error.message %>"
        //     })
        // ))
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(app.plugins.if(
            app.isBuild,
            gulpGroupCssMediaQueries()
        ))
        .pipe(autoPrefixer({
            grid: true,
            overrideBrowserslist: ["last 3 versions"],
            cascade: true
        }))
        //Uncomment next section if you need both minified end regular stylesheets
        .pipe(app.plugins.if(
            app.isDev,
            app.gulp.dest(app.path.build.css)
        ))
        
        .pipe(GulpCleanCss())
        .pipe(gulpRename({
            extname: '.min.css'
        }))
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}