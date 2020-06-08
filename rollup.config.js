import typescript from "rollup-plugin-typescript2";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import babel from '@rollup/plugin-babel'
// import jsx from "rollup-plugin-jsx";
import virtual from "@rollup/plugin-virtual";
import commonjs from "rollup-plugin-commonjs";

const getComponents = require("./utils/get-components");
const createEntry = require("./utils/create-entry");

export default {
  input: "entry",
  output: {
    file: "dist/index.min.js", // 使用.min 可以在webpack中使loader 忽略
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    virtual({
      entry: createEntry(getComponents()),
    }),
    commonjs(),
    json(),
    resolve(),
    postcss({
      extensions: [".postcss"],
    }),
    typescript({
      tsconfigOverride: {   //  覆盖。就是覆盖tsconfig里的一些配置
        compilerOptions: {
          declaration: true,    // 开启导出类型
        },
        exclude: ["client", "dist", "test"],    // 忽略的文件
      },
    }),
    // jsx({ factory: "this.$createElement" }),
    terser({
      // 压缩
      output: {
        comments: false,
      },
    }),
    babel({
      extensions: ['.ts', '.tsx']
    }),
  ],
  external: ["vue"],
};
