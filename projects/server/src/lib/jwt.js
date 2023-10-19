const { log } = require('handlebars');
const jwt = require('jsonwebtoken');

module.exports = {
    createJWT: (payload, expiry) => {
        try {
            return jwt.sign(payload, "abc123", {
                expiresIn: expiry
            })
        } catch (error) {
            next(error)
        }
    },

    verify: (req, res, next) => {
        try {
            console.log(req.headers);
            const {authorization} = req.headers;
            if(!authorization) throw {message: `token was not found`};
            const decodeData = jwt.verify(authorization, 'abc123');
            req.dataToken = decodeData;
            next()
            // if (decodeData.apiKey == "Approved") {
            //     next()
            // } else {
            //     throw {message: `User is not approved`}
            // }
        } catch (error) {
            next(error)
        }
    }
}