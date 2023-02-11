import fs from 'fs'
import fonter from 'gulp-fonter-fix'
import ttf2woff2 from 'gulp-ttf2woff2'

export const otf2ttf = () => {
    // looking for .otf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        // Uncomment to enable toast notifications on error
        // .pipe(app.plugins.plumber(
        //     app.plugins.notify.onError({
        //         title: 'FONTS',
        //         message: 'Error: %<= error.message %>'
        //     })
        // ))
        // Convert to .ttf
        .pipe(fonter({
            formats: ['ttf']
        }))
        // Copy to build folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const woffCopy = () => {
    // Looking for .woff
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.woff`, {})
    // Copy to build folder
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
    // Looking for .woff2
    .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.woff2`, {}))
    // Copy to build folder
    .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const ttf2woff = () => {
    // Looking for .ttf
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        // Uncomment to enable toast notifications on error
        // .pipe(app.plugins.plumber(
        //     app.plugins.notify.onError({
        //         title: 'FONTS',
        //         message: 'Error: %<= error.message %>'
        //     })
        // ))
        // Convert to .woff
        .pipe(fonter({
            formats: ['woff']
        }))
        // Copy to build folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        // Looking for .ttf again
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {}))
        // Convert to .woff2
        .pipe(ttf2woff2())
        // Copy to build folder
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
}

export const fontStyle = () => {
    // Font connection stylesheet
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`
    // Font file existance check
    fs.readdir(app.path.build.fonts, function (err, fontsFiles) {
        if (fontsFiles) {
            // Check existence of font connection stylesheet
            if (!fs.existsSync(fontsFile)) {
                // Create file if it dont exists
                fs.writeFile(fontsFile, '', cb)
                let newFileOnly
                for(var i = 0; i < fontsFiles.length; i++) {
                    // Write font connection to stylesheet
                    let fontFileName = fontsFiles[i].split('.')[0]
                    if (newFileOnly !== fontFileName) {
                        let fontName = fontFileName.split('-')[0] ? fontFileName.split('-')[0] : fontFileName
                        let fontWeight = fontFileName.split('-')[1] ? fontFileName.split('-')[1] : fontFileName
                        if (fontWeight.toLowerCase() === 'thin') {
                            fontWeight = 100
                        } else if (fontWeight.toLowerCase() === 'extralight') {
                            fontWeight = 200
                        } else if (fontWeight.toLowerCase() === 'light') {
                            fontWeight = 300
                        } else if (fontWeight.toLowerCase() === 'medium') {
                            fontWeight = 500
                        } else if (fontWeight.toLowerCase() === 'semibold') {
                            fontWeight = 600
                        } else if (fontWeight.toLowerCase() === 'bold') {
                            fontWeight = 700
                        } else if (fontWeight.toLowerCase() === 'extrabold' || fontWeight.toLowerCase() === 'heavy') {
                            fontWeight = 800
                        } else if (fontWeight.toLowerCase() === 'black') {
                            fontWeight = 900
                        } else {
                            fontWeight = 400
                        }
                        fs.appendFile(fontsFile, `@font-face{\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"), url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: normal;\n}\r\n`, cb);
                        newFileOnly = fontFileName
                    }
                }
            } else {
                // If file already exists, write message in console
                console.log('File scss/fonts.scss already exists, delete it for update')
            }
        }
    })
    return app.gulp.src(`${app.path.srcFolder}`)
    function cb() {}
}