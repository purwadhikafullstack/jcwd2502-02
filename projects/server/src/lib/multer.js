const multer = require("multer");
const fs = require("fs");

const defaultPath = "public";
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const isDirectoryExist = fs.existsSync(defaultPath)

        if (!isDirectoryExist) {
            await fs.promises.mkdir(defaultPath, { recursive: true })
        }

        cb(null, `${defaultPath}`)
    },

    filename: function (req, file, Cb) {
        const extension = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + `.${extension}`
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

// NANTI DI CEK LAGI INI CUMA FILTER UNTUK IMAGE, PROYEK KALI INI MAYBE BISA GIF DAN PNG JUGA, thanks
var fileFilter = (req, file, cb) => {
    console.log(file);
    if (file.mimetype.split('/')[0] === 'image') {
        cb(null, true)
    } else if (file.mimetype.split('/')[0] !== "image") {
        cb(new Error("file must be an Image"))
    }
}