const multer = require('multer');
const fs = require('fs');
const { log } = require('console');

const defaultPath = __dirname + '/../public'
// console.log(">>>>>>>>>>1");
console.log(defaultPath);

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const isDirectoryExist = fs.existsSync(defaultPath)
        log(isDirectoryExist)
        // if (!isDirectoryExist) {
        //     await fs.promises.mkdir(defaultPath, { recursive: true })
        // }

        cb(null, `${defaultPath}`)
    },
    filename: function (req, file, cb) {
        const extension = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + `.${extension}`
        console.log(file.fieldname + '-' + uniqueSuffix);
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

// Setup File Filter
var fileFilter = (req, file, cb) => {
    // console.log(file)
    // console.log('>>>>');
    if (file.mimetype.split('/')[0] === 'image') {
        // Accept
        cb(null, true)
    } else if (file.mimetype.split('/')[0] !== 'image') {
        // Reject
        cb(new Error('File Must Be Image!'))
    }
}

exports.multerUpload = multer({ storage: storage, fileFilter: fileFilter })