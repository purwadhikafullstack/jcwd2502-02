const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'aryosetyotama27@gmail.com',
            pass: 'vqqe bpez glsa vbzx'
        },
        tls: {
            rejectUnauthorized: false
        }
    }
)

module.exports = transporter;