const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = {
    hash: async (password) => {
        try {
            const result = await bcrypt .hash(password, saltRounds)
            return result
        } catch (error) {
            return error
        }
    },
    match: async(passwordFromLogin, passwordFromDatabase) => {
        try {
            return bcrypt.compare(passwordFromLogin, passwordFromDatabase)
        } catch (error) {
            return error
        }
    }
}