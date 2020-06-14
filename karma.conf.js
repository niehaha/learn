const typescript = require("rollup-plugin-typescript2");
const json = require("rollup-plugin-json");
const resolve = require("rollup-plugin-node-resolve");
const istanbul = require("rollup-plugin-istanbul");
const postcss = require("rollup-plugin-postcss");
// const jsx = require('rollup-plugin-jsx')
const replace = require("rollup-plugin-replace");
const commonjs = require("rollup-plugin-commonjs");
import babel from "@rollup/plugin-babel";

process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function(config) {
  config.set({
    files: [
      {
        pattern: "test/**/*.spec.ts",
        watched: false,
      },
    ],
    browsers: ["ChromeHeadless"],
    frameworks: ["jasmine"],
    preprocessors: {
      "test/**/*.ts": ["rollup"],
    },
    rollupPreprocessor: {
      plugins: [
        commonjs(),
        resolve(),
        json(),
        postcss({
          extensions: [".postcss"],
          config:{
            path:'./build/postcss.config.js'
          }
        }),
        replace({
          "process.env.NODE_ENV": JSON.stringify("production"),
          "process.env.VUE_ENV": JSON.stringify("browser"),
        }),
        typescript({
          tsconfigOverride: {
            //  覆盖。就是覆盖tsconfig里的一些配置
            compilerOptions: {
              declaration: true, // 开启导出类型
              target: "esnext",
            },
            exclude: ["client", "dist", "test"], // 忽略的文件
          },
        }),
        // jsx( {factory: 'this.$createElement'} ),
        babel({
          extensions: [".ts", ".tsx"],
        }),
        istanbul({
          exclude: [
            "test/**/*.ts",
            "node_modules/**/*.*",
            "component/**/*.postcss",
          ],
        }),
      ],
      output: {
        format: "cjs",
        name: "index.js",
        sourcemap: "inline",
      },
    },
    reporters: ["coverage"],
    coverageReporter: {
      reporters: [
        {
          type: "html",
          subdir: "./html",
        },
        {
          type: "lcovonly",
          subdir: ".",
        },
        {
          type: "json",
          subdir: ".",
        },
      ],
    },
    singleRun: true,
  });
};
