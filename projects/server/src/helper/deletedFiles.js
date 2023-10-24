const fs = require('fs')

module.exports = {
    deleteFiles: (files) => {
        files.images.forEach(value => {
            fs.unlinkSync(value.path)
        })
    }
}