const db = require('./../models');
const fs = require('fs').promises;
const { findAllUsers, findId, findEmail, findUsername, findReferral, verifyUser, createUser, userLogin, registerUser } = require('./../services/userService');
const { createJWT } = require('../lib/jwt');
// const {deleteFiles} = require('');
const { hash, match } = require('./../helper/hashing');
const transporter = require('./../helper/transporter');
const handlebars = require('handlebars');
const respondHandler = require('../utils/resnpondHandler');
const { log } = require('console');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const account = await userLogin(email, password);
            respondHandler(res, {
                message: "login is succesful",
                data: {
                    id: account.data.id,
                    username: account.data.username,
                    email: account.data.email,
                    role: account.data.role,
                    jwt: account.data.jwt,
                    profile_picture: account.data.profile_picture,
                }
            })
        } catch (error) {
            next(error)
        }
    },

    register: async (req, res, next) => {
        try {
            const { username, email, password, phone_number, referral } = req.body;
            const newUser = await registerUser(username, email, password, phone_number, referral)
            console.log(newUser);
            if (!newUser.isError) {
                respondHandler(res, {
                    message: "Registration success, please check your email to verify your account!",
                })
            } else {
                throw { message: newUser.message }
            }
        } catch (error) {
            console.log('error message:', error.message);
            next(error)
        }
    },

    verifyUserAccount: async (req, res, next) => {
        try {
            const { id } = req.dataToken;
            const account = await findId(id)
            if (!account) throw { message: "User account was not found" }
            await verifyUser(id)
            respondHandler(res, {
                message: "User account succesfully verified",
            })
        } catch (error) {
            next(error)
        }
    },

    requestResetPassword: async (req, res, next) => {
        try {
            // terima input email dari front-end
            const { email } = req.body;
            // cek jika ada akun dengan email tersebut
            const response = await findEmail(email);
            if (!response) throw { message: "user was not found, please enter a valid email address" };
            // buatkan jwt durasi 1 jam berisikan id
            const token = createJWT({
                id: response.dataValues.id
            }, '3h');
            // kirimkan email akun tersebut dengan template request password berisikan link ber param jwt baru tersebut
            const readTemplate = await fs.readFile('./src/public/password-recovery.html', 'utf-8');
            const compiledTemplate = await handlebars.compile(readTemplate);
            const newTemplate = compiledTemplate({ email, token })
            await transporter.sendMail({
                to: `aryosetyotama27@gmail.com`,
                subject: 'password recovery mail',
                html: newTemplate
            })
            // notifikasi user
            respondHandler(res, {
                message: "password reset email has been sent to your email"
            });
        } catch (error) {
            next(error)
        }
    },

    resetPassword: async (req, res, next) => {
        try {
            const data = req.headers;
            if (data.newpassword !== data.confirmpassword) throw { message: "confirmation password must match the new password" }

            // if(data.newPassword)
            // terima data dari front end
            // lewatkan data dengan express validator
            //  

            res.status(201).send({
                isError: false,
                message: "Password Changed"
            })
        } catch (error) {
            next(error)
        }
    },

    updatePassword: async (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const data = await findAllUsers();
            respondHandler(res, {
                message: "Userlist fetched",
                data: data
            })
        } catch (error) {
            next(error)
        }
    },

    getUser: async (req, res, next) => {
        try {
            console.log(`>>>>>>>`);
            const { id } = req.dataToken;
            const account = await findId(id)
            respondHandler(res, {
                message: "Registration success, please check your email to verify your account!",
                data: account
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    updateUserData: async (req, res, next) => {
        try {
            const { id, username, email, gender, birthdate } = req.body
            const findUser = await await findId(id)
            const newUserData = await db.user.update({ username, email, gender, birthdate }, {
                where: {
                    id
                }
            })
            res.status(201).send({
                isError: false,
                message: "Data Updated",
                data: newUserData
            })
        } catch (error) {
            next(error)
        }
    },
    updateProfile: async (req, res, next) => {
        try {
            const data = JSON.parse(req.body.data)
            const image = req.files
            console.log("log data parse= " + data);
            res.status(201).send({
                isError: false,
                message: 'Update Image Success!',
                data: data
            })

        } catch (error) {
            next(error)
        }
    },
    updateImage: async (req, res, next) => {
        try {
            // 1. Ambil id image
            const { idImage } = req.params
            // 2. Ambil path image lama
            const findImage = await db.product_category.findOne({
                where: {
                    id: idImage
                }
            })
            // 3. Update new path on table
            console.log(req.files);
            const newImage = await db.product_category.update({
                image: req.files.image[0].filename
            }, {
                where: {
                    id: idImage
                }
            })
            // 4. Delete image lama
            deleteFiles({
                image: [findImage.dataValues.image
                ]
            })
            // 5. Kirim response
            res.status(201).send({
                isError: false,
                message: 'Update Image Success!',
                data: newImage
            })
        } catch (error) {
            console.log(error);
            deleteFiles(req.files)
            next(error)
        }
    }
}