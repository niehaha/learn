import typescript from "rollup-plugin-typescript2";
import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
// import jsx from 'rollup-plugin-jsx'
import babel from "@rollup/plugin-babel";
import replace from "rollup-plugin-replace";
import virtual from "@rollup/plugin-virtual";
import commonjs from "rollup-plugin-commonjs";
import html from "@rollup/plugin-html";

const getComponents = require("./utils/get-components");
const createEntry = require("./utils/create-entry");
const bs = require("browser-sync").create();
bs.init({
  server: "./.static",
});
bs.watch("./.static/*.js").on("change", bs.reload);
export default {
  input: "./client/main.ts",
  output: {
    file: ".static/index.js",
    format: "iife",
    sourcemap: true,
  },
  watch: {
    exclude: ["node_modules/**"],
  },
  plugins: [
    virtual({
      "sts-signal-ui": createEntry(getComponents()),
    }),
    commonjs(),
    json(),
    resolve(),
    postcss({
      extensions: [".postcss"],
      config: {
        path: "./build/postcss.config.js",
      },
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
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
    babel({
      extensions: [".ts", ".tsx"],
    }),
    // jsx( {factory: 'this.$createElement'} ),
    html(),
  ],
};
