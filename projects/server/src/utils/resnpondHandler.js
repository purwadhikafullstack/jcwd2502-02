const respondHandler = (res,{status = 200, data = null, message = ""}) => {

    return res.status(status).send({
        isError:false,
        message,
        data
    })

}
module.exports = respondHandler
