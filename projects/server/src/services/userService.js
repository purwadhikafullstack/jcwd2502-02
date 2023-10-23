const db = require('./../models');

module.exports = {
    findAllUsers: async() => {
        try {
            return await db.user.findAll()
        } catch (error) {
            return error
        }
    },

    findId: async(id) => {
        try {
            return await db.user.findOne({
                where: {id}
            })
        } catch (error) {
            return error
        }
    },

    findReferral: async(referral) => {
        try {
            return await db.user.findOne({
                where: {referral}
            })            
        } catch (error) {
            return error
        }
    },

    findEmail: async(email) => {
        try {
            return await db.user.findOne({
                where: {email}
            })
        } catch (error) {
            return error
        }
    },

    findUsername: async(username) => {
        try {
            return await db.user.findOne({
                where: {username}
            })
        } catch (error) {
            return error
        }
    },

    verifyUser: async(id) => {
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

    createUser: async(userData) => {
        try {
            const {username, email, password, phone_number, referral} = userData
            return db.user.create({ username: username, email: email, password: password, phone_number: phone_number, referral_code: referral })
        } catch (error) {
            return error
        }
    }
}