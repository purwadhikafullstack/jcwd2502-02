const db = require('./../models');
const fs = require('fs').promises;
const {findAllUsers, findUser} = require('./../services/userService');
const {createJWT} = require('../lib/jwt');
// const {deleteFiles} = require('');
const {hash, match} = require('./../helper/hashing');
const transporter = require('./../helper/transporter');
const handlebars = require('handlebars');
const respondHandler = require('../utils/resnpondHandler');

module.exports = {
    login: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const account = await db.user.findOne({
                where: {email}
            })
            if(!account) throw {status: 401, message: "Account was not found!"};
            const hashMatch = await match(password, account.dataValues.password)
            if(!hashMatch) throw {status: 401, message: "Incorrect Password"}
            const addresses = await db.user_address.findAll({
                where: {user_id: account.dataValues.id}
            })
            const token = await createJWT(
                {
                    id: account.dataValues.id,
                    role: account.dataValues.role,
                    addressList: addresses,
                },
                "1d"
            )
            // res.status(201).send({
            //     isError:false,
            // })
            respondHandler(res,{
                // status : 201,
                message: "login is succesful",
            data: {
                id: account.dataValues.id,
                username: account.dataValues.username,
                email: account.dataValues.email,
                role: account.dataValues.role,
                address: addresses,
                jwt: token
            }})
        } catch (error) {
            console.log(error);
            next(error)
        }
    },

    register: async (req, res, next) => {
        try {
            const {username, email, password, phone_number, referral} = req.body;
            const existingAccount = await db.user.findOne({
                where: {name: username}
            })
            const existingEmail = await db.user.findOne({
                where: {email}
            })
            if(existingAccount) throw {message: "Username has already been taken"};
            if(existingEmail) throw {message: "Email has already been taken"};
            const hashedPassword = await hash(password);

            const validReferral = await db.user.findOne({
                where: {referral_code: referral}
            })
            
            if(validReferral) {
            }     
            
            const newAccount = await db.user.create({name: username, email: email, password: hashedPassword, phone_number: phone_number})
            console.log(newAccount.dataValues.id);
            const token = createJWT(
                {
                    id: newAccount.dataValues.id
                }, '12h')
            console.log(token);

            const readTemplate = await fs.readFile('./public/template.html', 'utf-8');
            const compiledTemplate = await handlebars.compile(readTemplate);
            const newTemplate = compiledTemplate({ username, token })
            await transporter.sendMail({
                to: email,
                subject: "Verification",
                html: newTemplate
            });
            res.status(201).send({
                isError: false,
                message: "Successful registration",
                data: null
            })
        } catch (error) {
            console.log('error message:', error.message);
            next(error)
        }
    },

    verify: async (req, res, next) => {
        try {
            const {id} = req.dataToken;
            const account = db.users.findOne({
                where: {id}
            })
            await db.users.update({
                isVerified: "TRUE"
            }, {
                where: {id}
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
            res.status(201).send({
                isError: false,
                message: 'Userlist fetched',
                data: data
            })
        } catch (error) {
            next(error)
        }
    },

    getUser: async (req, res, next) => {
        try {
            const {id} = req.dataToken;
            const data = await findUser(id)
            res.status(201).send({
                isError: false,
                message: "user found",
                data: data
            })
        } catch (error) {
            next(error)
        }
    }
}