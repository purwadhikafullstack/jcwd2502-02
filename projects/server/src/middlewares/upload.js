const { multerUpload } = require("./../lib/multer");
const { deleteFiles } = require("../helper/deletedFiles");

const upload = async (req, res, next) => {
    const result = multerUpload.fields([{ name: 'image', maxCount: 3 }])
    result(req, res, function (err) {
        try {
            if (err) throw err

            console.log(req.files)
            req.files.images.forEach(value => {
                if (value.size > 1000000) throw { message: `${value.originalname} is Too Large!`, files: req.files }
            })

            next()
        } catch (error) {
            deleteFiles(error.files)
            next(error)
        }
    })
}

module.exports = upload