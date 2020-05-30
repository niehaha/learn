const fs = require('fs')
const path = require('path')

const rootPath = path.resolve(`${process.cwd()}/component`)
module.exports = function(){
    return fs.readdirSync(rootPath)
    .map(name => {
        if(/.*\.tsx$/.test(name)){
            return {
                name: name.split('.')[0],
                path: `./component/${name}`
            }
        }else if(!/\./.test(name)){
            const deepPath = path.resolve(`${process.cwd()}/component/${name}/index.tsx`)
            if(fs.existsSync(deepPath)){
                return {
                    name,
                    path:`./component/${name}/index.tsx`
                }
            }
        }
    })
    .filter(item => item)
}