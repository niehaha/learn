const typescript = require('rollup-plugin-typescript2')
const json = require('rollup-plugin-json')
const resolve = require('rollup-plugin-node-resolve')
const istanbul = require('rollup-plugin-istanbul')
const postcss = require('rollup-plugin-postcss')
const jsx = require('rollup-plugin-jsx')
const replace = require('rollup-plugin-replace')
const commonjs = require('rollup-plugin-commonjs')

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
    config.set({
        files: [
            {
                pattern: 'test/**/*.spec.ts',
                watched: false
            }
        ],
        browsers: ['ChromeHeadless'],
        frameworks: ['jasmine'],
        preprocessors: {
            'test/**/*.ts': ['rollup']
        },
        rollupPreprocessor: {
            plugins: [
                commonjs(),
                resolve(),
                json(),
                postcss({
                    extensions: ['.postcss']
                }),
                replace({
                    'process.env.NODE_ENV': JSON.stringify('production'),
                    'process.env.VUE_ENV': JSON.stringify('browser')
                }),
                typescript(),
                jsx( {factory: 'this.$createElement'} ),
                istanbul({
                    exclude: ['test/**/*.ts', 'node_modules/**/*.*', 'component/**/*.postcss']
                }),
            ],
            output: {
                format: 'cjs',                        
                name: 'index.js', 
                sourcemap: 'inline' 
            }
        },
        reporters: ['coverage'],
        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    subdir: './html'
                },
                {
                    type: 'lcovonly',
                    subdir: '.'
                },
                {
                    type: 'json',
                    subdir: '.'
                }
            ]
        },
        singleRun: true	
    })
}