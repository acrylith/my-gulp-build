/** @type {import('tailwindcss').Config} */
import { path } from './path.js'

export default {
  content: [path.watch.html, path.watch.js, `${path.build}/index.html`],
  theme: {
    extend: {},
  },
  plugins: [],
}

