const toHump = require("./to-hump");
const version = require("../package.json").version;
module.exports = function(components) {
  let indexStr = ``;
  components.forEach((item, index) => {
    indexStr += `
        import a${index} from '${item.path}'
        `;
  });
  components.forEach((item, index) => {
    indexStr += `
        export const ${toHump(item.name)} = a${index}
        `;  // 转换成驼峰
  });

  indexStr += `
        export default {
            version:'${version}',
            install(Vue){
            ${components.reduce((str, item) => {
              return (
                str +
                `
                Vue.component('ssui-${item.name}', ${toHump(item.name)})
                `
              );
            }, ``)}
            },
        }
    `;
  return indexStr;
};
