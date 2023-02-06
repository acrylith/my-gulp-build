import gulpPlumber from "gulp-plumber" //search and replace
import replace from "gulp-replace" //catching errors
import notify from "gulp-notify" //toast notifications
import browserSync from "browser-sync" //local server
import newer from "gulp-newer"
import gulpIf from "gulp-if"


export const plugins = {
    replace: replace,
    plumber: gulpPlumber,
    notify: notify,
    browsersync: browserSync,
    newer: newer,
    if: gulpIf
}