import autoprefixer from 'autoprefixer'
import babel from 'rollup-plugin-babel'
import cssnano from 'cssnano'
import postcss from 'rollup-plugin-postcss'
import { terser } from 'rollup-plugin-terser'

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
            exclude: 'node_modules/**',
            presets: [['env', { modules: false }]],
            plugins: ['external-helpers'],
        }),
        terser(),
    ],
}
