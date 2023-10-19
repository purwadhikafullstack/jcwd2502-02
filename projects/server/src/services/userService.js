const db = require('./../models');

module.exports = {
    findAllUsers: async() => {
        try {
            return await db.user.findAll()
        } catch (error) {
            return error
        }
    },

    findUser: async(id) => {
        try {
            return await db.user.findOne({
                where: {id}
            })
        } catch (error) {
            return error
        }
    }
}