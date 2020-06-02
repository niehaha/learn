// 写入类型
const fs = require("fs");
const path = require("path");
const getComponents = require("./get-components");

const toHump = require("./to-hump");
const indexStr = (function() {
  let indexStr = "";
  getComponents().forEach((item) => {
    indexStr += `
export { default as ${toHump(item.name)} } from './${item.name}'
        `;
  });
  indexStr += `
declare const Ssui: {
    readonly version: string,
    readonly install: (Vue: any) => void,
}
export default Ssui
    `;
  return indexStr;
})();

fs.writeFileSync(path.resolve("./dist/index.min.d.ts"), indexStr);
