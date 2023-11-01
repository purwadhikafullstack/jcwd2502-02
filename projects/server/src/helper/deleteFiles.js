const fs = require('fs')
const { log } = require('handlebars')

module.exports = {
    deleteFiles: (files) => {
        log(files)
        files.image.forEach(filename => {
            // console.log(filename);
            fs.unlinkSync(__dirname + "/../public/" + filename)
        })
    }
}