import babel from 'rollup-plugin-babel'
import cssnano from 'cssnano'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'
const autoprefixer = require('autoprefixer')

export default {
    input: 'source/averto.js',
    output: {
        file: 'dist/averto.js',
        format: 'iife',
    },
    plugins: [
        postcss({
            plugins: [
                cssnano({
                    preset: 'default',
                }),
                autoprefixer({}),
            ],
        }),
        babel({
            presets: [['env', { modules: false }]],
            plugins: ['external-helpers'],
            externalHelpers: true,
        }),
        terser(),
    ],
}
