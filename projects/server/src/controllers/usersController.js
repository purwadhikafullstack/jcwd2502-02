
module.exports = {
    login: async (req, res, next) => {
        try {
            console.log('test');
            res.send('test')
        } catch (error) {
            next(error)
        }
    }
}