
function toHump(name) {
    return name.replace(/\-(\w)/g, function(all, letter){
        return letter.toUpperCase()
    }).replace(/\b(\w)|\s(\w)/g, function(m){
            return m.toUpperCase()
    })
}

module.exports = function(components){
    let indexStr = ``
    components.forEach((item, index) => {
        indexStr += `
        import a${index} from '${item.path}'
        `
    })
    components.forEach((item, index) => {
        indexStr += `
        export const ${toHump(item.name)} = a${index}
        `
    })

    indexStr += `
        export default {
            install(Vue){
            ${components.reduce((str, item) => {
                return str + `
                Vue.component('ssui-${item.name}', ${toHump(item.name)})
                `
            }, ``)}
            },
        }
    `
    return indexStr
}
