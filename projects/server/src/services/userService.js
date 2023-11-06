const db = require('./../models');
const fs = require('fs').promises;
const { createJWT } = require('../lib/jwt');
// const {deleteFiles} = require('');
const { hash, match } = require('./../helper/hashing');
const transporter = require('./../helper/transporter');
const handlebars = require('handlebars');
const { log } = require('console');

module.exports = {
    findAllUsers: async () => {
        try {
            return await db.user.findAll()
        } catch (error) {
            return error
        }
    },

    findId: async (id) => {
        try {
            return await db.user.findOne({
                where: { id }
            })
        } catch (error) {
            return error
        }
    },

    findReferral: async (referral) => {
        try {
            return await db.user.findOne({
                where: { referral }
            })
        } catch (error) {
            return error
        }
    },

    findEmail: async (email) => {
        try {
            return await db.user.findOne({
                where: { email }
            })
        } catch (error) {
            return error
        }
    },

    findUsername: async (username) => {
        try {
            return await db.user.findOne({
                where: { username }
            })
        } catch (error) {
            return error
        }
    },

    verifyUser: async (id) => {
        try {
            return db.user.update({
                isVerified: "verified"
            }, {
                where: { id }
            })
        } catch (error) {
            return error
        }
    },

    createUser: async (userData) => {
        try {
            const { username, email, password, phone_number, referral } = userData
            return db.user.create({ username: username, email: email, password: password, phone_number: phone_number, referral_code: referral })
        } catch (error) {
            return error
        }
    },

    userLogin: async (email, password) => {
        const account = await db.user.findOne({
            where: { email }
        })
        console.log(account);
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
        return {
            isError: false,
            message: "login successful",
            data: {
                id: account.dataValues.id,
                username: account.dataValues.username,
                email: account.dataValues.email,
                role: account.dataValues.role,
                jwt: token,
                profile_picture: account.dataValues.profile_picture
            }
        }
    },

    registerUser: async (user) => {
        try {
            const { username, email, password, phone_number, referral} = user
            const existingAccount = await db.user.findOne({
                where: { username }
            })
            console.log(existingAccount);
            const existingEmail = await db.user.findOne({ where: { email } })
            if (existingAccount) {
                return {
                    isError: true,
                    message: "Username has already been taken",
                }
            }
            if (existingEmail) {
                return {
                    isError: true,
                    message: "email has already been taken",
                }
            }
            const hashedPassword = await hash(password);
            const newReferral = Math.round(Math.random() * 1e9);
            const validReferral = await db.user.findOne({ where: { referral_code: referral } })
            if (validReferral) {
                // beri kupon
            }
            const userData = {
                username: username,
                email: email,
                password: hashedPassword,
                phone_number,
                referral_code: newReferral
            }
            const newUser = await db.user.create(userData)
            const token = createJWT(
                {
                    id: newUser.dataValues.id,
                    role: newUser.dataValues.role,
                }, '12h')
            const readTemplate = await fs.readFile('./src/public/user-verification.html', 'utf-8');
            const compiledTemplate = await handlebars.compile(readTemplate);
            const newTemplate = compiledTemplate({ username, token })
            await transporter.sendMail({
                to: `aryosetyotama27@gmail.com`,
                subject: "Verification",
                html: newTemplate
            });
            return {
                isError: false,
                message: "User account succesfully verified",
            }
        } catch (error) {
            return error
        }
    },

    createBranchManager: async (req) => {
        const {email, username, phone_number, password, store_branch_id, birthdate, gender } = req.body;
        const usedEmail = await db.user.findOne({
            where: {email}
        });
        const usedUsername = await db.user.findOne({
            where: {username}
        });
        if(usedEmail || usedUsername) throw {status: 401, message: "Username or Email has already been taken"}
        const hashedPassword = await hash(password);
        const userData = {
            username,
            email,
            password: hashedPassword,
            phone_number,
            isVerified: "verified",
            role: "admin",
            birthdate,
            gender,
            store_branch_id
        }
        await db.user.create(userData)
        return {
            isError: false,
            message: "Branch admin created"
        }
    }
}