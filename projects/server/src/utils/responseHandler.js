const responseHandler = (res, message, data, status, isError) => {
    return res.status(status || 200).send({
        isError: isError || false,
        message,
        data: data || null,
    });
};

module.exports = responseHandler;
