import typescript from 'rollup-plugin-typescript'
import json from 'rollup-plugin-json'
import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import jsx from 'rollup-plugin-jsx'
import replace from 'rollup-plugin-replace'
import virtual from '@rollup/plugin-virtual'
import commonjs from 'rollup-plugin-commonjs'
import html from '@rollup/plugin-html'

const getComponents  = require('./utils/get-components')
const createEntry  = require('./utils/create-entry')
const bs = require("browser-sync").create()
bs.init({
    server: "./.static"
})
bs.watch('./.static/*.js').on('change', bs.reload)
export default {
    input: './client/main.ts',
    output: {
        file: '.static/index.js',
        format: 'iife',
        sourcemap: true,    
    },
    watch:{
        exclude: ['node_modules/**']
    },
    plugins: [
        virtual({
            'sts-signal-ui': createEntry(getComponents())
        }),
        commonjs(),
        json(),
        resolve(),
        postcss({
            extensions: ['.postcss']
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.VUE_ENV': JSON.stringify('browser')
        }),
        typescript(),
        jsx( {factory: 'this.$createElement'} ),
        html()
    ]
}