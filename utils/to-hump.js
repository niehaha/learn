// 转换驼峰
module.exports = function toHump(name) {
    return name.replace(/\-(\w)/g, function(all, letter){
        return letter.toUpperCase()
    }).replace(/\b(\w)|\s(\w)/g, function(m){
            return m.toUpperCase()
    })
}