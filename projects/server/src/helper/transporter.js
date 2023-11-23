const nodemailer = require('nodemailer');
const { TRANSPORTER_SERVICE, TRANSPORTER_EMAIL, TRANSPORTER_PASS } = process.env

const transporter = nodemailer.createTransport(
    {
        service: TRANSPORTER_SERVICE,
        auth: {
            user: TRANSPORTER_EMAIL,
            pass: TRANSPORTER_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    }
)

module.exports = transporter;