const multer = require('multer');
const fs = require('fs');
const { log } = require('console');

const defaultPath = __dirname + '/../public'

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const isDirectoryExist = fs.existsSync(defaultPath)
        cb(null, `${defaultPath}`)
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + `.${extension}`
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

var fileFilter = (req, file, cb) => {
    if (file.mimetype.split('/')[0] === 'image') {
        cb(null, true)
    } else if (file.mimetype.split('/')[0] !== 'image') {
        cb(new Error('File Must Be Image!'))
    }
}
exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter })