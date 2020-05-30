import typescript from 'rollup-plugin-typescript'
import json from 'rollup-plugin-json'
import {terser} from "rollup-plugin-terser"
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import jsx from 'rollup-plugin-jsx'
import virtual from '@rollup/plugin-virtual'
import commonjs from 'rollup-plugin-commonjs'

const getComponents  = require('./utils/get-components')
const createEntry  = require('./utils/create-entry')

export default {
    input: 'entry',
    output: {
        file: 'dist/index.js',
        format: 'esm',
        sourcemap: true,
    },
    plugins: [
        virtual({
            entry: createEntry(getComponents())
        }),
        commonjs(),
        json(),
        resolve(),
        postcss({
            extensions: ['.postcss']
        }),
        typescript(),
        jsx( {factory: 'this.$createElement'} ),
        terser()
    ],
    external: [
        'vue',
    ]
}