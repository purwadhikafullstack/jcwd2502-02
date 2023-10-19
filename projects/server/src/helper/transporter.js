const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'buyfresh2502@gmail.com',
            pass: 'fafb akii ttbf oqnu'
        },
        tls: {
            rejectUnauthorized: false
        }
    }
)

module.exports = transporter;