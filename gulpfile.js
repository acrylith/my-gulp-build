// Import gulp and paths
import gulp from "gulp"
import { path } from "./gulp/config/path.js"
// Import plugins
import { plugins } from "./gulp/config/plugins.js"
// Import tasks
import { copy } from "./gulp/tasks/copy.js"
import { reset } from "./gulp/tasks/reset.js"
import { html } from "./gulp/tasks/html.js"
import { server } from "./gulp/tasks/server.js"
import { scss } from "./gulp/tasks/scss.js"
import { scripts } from "./gulp/tasks/scripts.js"
import { images } from "./gulp/tasks/images.js"
import { ttf2woff, fontStyle, woffCopy } from "./gulp/tasks/fonts.js"

global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    path: path,
    gulp: gulp,
    plugins: plugins
}

// Watcher for file changes
function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch([path.watch.scss, path.watch.html], scss)
    gulp.watch(path.watch.js, scripts)
    gulp.watch(path.watch.images, images)
}

// Sequential processing of fonts
const fonts = gulp.series(ttf2woff, woffCopy, fontStyle)

const mainTasks = gulp.series(fonts, gulp.parallel(copy, html, scss, scripts, images))
// const mainTasks = gulp.parallel(copy, html, scss, scripts, images)

// Scenarios for task execution
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server))
const build = gulp.series(reset, mainTasks)

export { dev }
export { build }

// Default task
gulp.task('default', dev)