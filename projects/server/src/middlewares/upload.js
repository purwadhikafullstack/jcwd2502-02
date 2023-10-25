const { multerUpload } = require('./../lib/multer')
const { deleteFiles } = require('./../helper/deleteFiles');

const upload = async (req, res, next) => {
    const result = multerUpload.fields([{ name: 'image', maxCount: 3 }])
    // console.log(">>>UP1");
    result(req, res, function (err) {
        try {
            // console.log(">>>UP2");
            if (err) throw err
            // console.log(">>>UP3");
            // console.log(req.files)
            // console.log(">>>UP4");
            req.files.image.forEach(value => {
                // console.log(">>>UP5");
                if (value.size > 1000000) throw { message: `${value.originalname} is Too Large!`, files: req.files }
            })
            // console.log(">>>UP6");
            next()
        } catch (error) {
            console.log(">>>UP7");
            console.log(error)
            deleteFiles(error.files)
            next(error)
        }
    })
}

module.exports = upload