const { query, body, validationResult } = require('express-validator');

const validateUserPassword = [
    body('password').isLength({min:6}).withMessage("Password does not meed the minimun requirement of 6 characters")
]
const validateUserEmail = [
    body('email').isEmail().withMessage("Please enter a valid email address")
]

const validateUserLogin = [
    body('email', 'password').not().isEmpty().withMessage("Email and Password must not be empty"),
    body('email').isString().isEmail().withMessage("Please enter a valid email address"),
    body('password').isString().isLength({min:6}).withMessage("Password does not meet the minimum requirement of 6 characters")
]

const validateUserRegistration = [
    body('username', 'phone_number', 'email', 'password').not().isEmpty().withMessage("Please fill in all required information"),
    body('email').isString().isEmail().withMessage("Please enter an valid email address"),
    body('password').isString().isLength({min:6}).withMessage("Password must meet a minimum requirement of 6 characters") 
]

const validateUserDataChange = [
    
]

const validateUserPasswordChange = [
    
]

const validateUserPasswordReset = [

]

const handleValidationErrors = (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()) {
        return res.status(401).send(
            {message: error.errors[0].msg} // nanti dicek dulu
        )
    }
    next()
}

module.exports = {
    validateUserEmail,
    validateUserPassword,
    validateUserLogin,
    validateUserRegistration,
    handleValidationErrors
}