const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        
        const token = req.header('Authorization').replace('Bearer ', '')

        const verifyToken = jwt.verify(token, 'dfhdvixdjfvgyg')

        const user = await User.findOne({ _id: verifyToken._id, jwt: token }, { jwt: 0, password: 0 })

        if (!user) throw new Error()

        req.user = user

        next()


    } catch (error) {
        res.status(401).send({ error: 'Unauthorized' })
    }
}

module.exports = auth