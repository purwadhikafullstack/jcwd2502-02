const { multerUpload } = require('./../lib/multer')
const { deleteFiles } = require('./../helper/deleteFiles');

const upload = async (req, res, next) => {
    const result = multerUpload.fields([{ name: 'image', maxCount: 3 }])
    result(req, res, function (err) {
        try {
            if (err) throw err
            if (!req.files.image) return next()
            req.files.image.forEach(value => {
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