const db = require('./../models');
const fs = require('fs').promises;
const { findAllUsers, findId, findEmail, findUsername, findReferral, verifyUser, createUser } = require('./../services/userService');
const { createJWT } = require('../lib/jwt');
// const {deleteFiles} = require('');
const { hash, match } = require('./../helper/hashing');
const transporter = require('./../helper/transporter');
const handlebars = require('handlebars');
const respondHandler = require('../utils/resnpondHandler');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const account = await findEmail(email)
            if (!account) throw { status: 401, message: "Account was not found!" };
            const hashMatch = await match(password, account.dataValues.password)
            if (!hashMatch) throw { status: 401, message: "Incorrect Password" }
            const token = await createJWT(
                {
                    id: account.dataValues.id,
                    role: account.dataValues.role,
                },
                "1d"
            )
            respondHandler(res, {
                message: "login is succesful",
                data: {
                    id: account.dataValues.id,
                    username: account.dataValues.username,
                    email: account.dataValues.email,
                    role: account.dataValues.role,
                    jwt: token
                }
            })
        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    register: async (req, res, next) => {
        try {
            const { username, email, password, phone_number, referral } = req.body;
            const existingAccount = await findUsername(username)
            const existingEmail = await findEmail(email)
            if (existingAccount) throw { message: "Username has already been taken" };
            if (existingEmail) throw { message: "Email has already been taken" };
            const hashedPassword = await hash(password);
            const newReferral = Math.round(Math.random() * 1e9);
            const validReferral = await findReferral(referral)
            if (validReferral) {
                // beri kupon
            }
            const userData = {
                username: username,
                email: email,
                password: hashedPassword,
                phone_number: phone_number,
                referral: newReferral
            }
            const newUser = await createUser(userData)
            console.log(newUser);
            const token = createJWT(
                {
                    id: newUser.dataValues.id,
                    role: newUser.dataValues.role,
                }, '12h')
            const readTemplate = await fs.readFile('./src/public/template.html', 'utf-8');
            const compiledTemplate = await handlebars.compile(readTemplate);
            const newTemplate = compiledTemplate({ username, token })
            await transporter.sendMail({
                to: `bkprasetya@gmail.com`,
                subject: "Verification",
                html: newTemplate
            });
            respondHandler(res, {
                message: "Registration success, please check your email to verify your account!",
            })
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

    changePassword: async (req, res, next) => {
        try {

        } catch (error) {
            next(error)
        }
    },

    resetPassword: async (req, res, next) => {
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
            console.log(`ini dari getUser di controller`, req.dataToken);
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

    getUserData: async (req, res, next) => {
        try {
            // const { id } = req.body
            const findUser = await db.user.findOne({
                where: {
                    id: 4
                }
            })
            res.status(201).send({
                isError: false,
                message: "Get User Success",
                data: findUser
            })
        } catch (error) {
            next(error)
        }
    },


    updateProfile: async (req, res, next) => {
        try {
            // const { id } = req.params

            const data = JSON.parse(req.body.data)

            console.log(data);

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