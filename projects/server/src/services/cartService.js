const db = require("./../models");
module.exports = {

    cartUserId: async (id) => {
        try {
            return await db.cart.findOne({
                where: {
                    user_id: id
                }
            })
        } catch (error) {
            return error
        }
    },


    add: async () => {
        try {

        } catch (error) {

        }
    }
}