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
            console.log(`<<< Middleware: Verify >>>`);
            // console.log(`jwt.js: "ini token jwt =>"`, req.token);
            // const { authorization } = req.headers;
            const authorization = req.token;
            console.log(`ini authorization ` + authorization);
            if (!authorization) throw { message: `token was not found` };
            const decodeData = jwt.verify(authorization, 'abc123');
            console.log(decodeData);
            req.dataToken = decodeData;
            console.log(`<<< Leaving Verify Middleware >>>`);
            next()
        } catch (error) {
            console.log(`error`);
            console.log(error);
            next(error)
        }   
    }
}