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
}