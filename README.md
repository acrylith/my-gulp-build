# Gulp project builder(Tailwind CSS support branch)
gulp is an open-source JavaScript toolkit used as a streaming build system (similar to a more package-focused Make) in front-end web development.

It is a task runner built on Node.js and npm, used for the automation of time-consuming and repetitive tasks involved in web development like minification, concatenation, cache busting, unit testing, linting, optimization, etc. 

gulp uses a code-over-configuration approach to define its tasks and relies on its small, single-purpose plugins to carry them out. The gulp ecosystem includes more than 3500 such plugins.
## Features
- ES6 syntax
- SCSS
- Tailwind
- including HTML files
- automatic connection of fonts to the .scss file
- images minifying

Recommended to use with [Path Autocomplete](http://https://marketplace.visualstudio.com/items?itemName=ionutvmi.path-autocomplete "Path Autocomplete") VSCode extension or another IDE analog to prevent image path issues
(.json file with extension setting already included, no need to configure it manually, just install plugin)
## Launch
run `gulp` in terminal to run builder, run `npm run build` to run production mode.
In production mode server will not start, mediaqueries will be grouped together and images will be minified
## Usage
Just create and work with files in src folder. Gulp will start a local developing server, that watches files from dist folder.
