const route = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

route.post('/signup', async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        
        res.send('user created')
    } catch (error) {
        res.status(400).send('something went wrong')
    }
})

route.post('/signin', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error()
        }

        const passwordCheck = await bcrypt.compare(req.body.password, user.password)
        if (!passwordCheck) {
            throw new Error()
        }

        const token = jwt.sign({ _id: user._id }, 'dfhdvixdjfvgyg')

        await User.updateOne({ _id: user._id }, {
            $push: {
                jwt: token
            }
        })

        res.send({ token })
    } catch (error) {
        res.status(400).send('wrong credentials')
    }
})

route.get('/authtest', auth, async (req, res) => {
    res.send('ok')
})

route.get('/profile', auth, async (req, res) => {
    const user = req.user

    res.send(user)
})

route.get('/logout', auth, async (req, res) => {
    try {
        
        const token = req.token
        const user = req.user

        await User.updateOne({ _id: user._id }, {
            $pull: {
                jwt: token
            }
        })

        res.send('logged out')

    } catch (error) {
        res.status(400).send({ error: 'something went wrong' })
    }
})


route.get('/logout/all', auth, async (req, res) => {
    try {
        
        const user = req.user

        await User.updateOne({ _id: user._id }, {
            $set: {
                jwt: []
            }
        })

        res.send('logged out')

    } catch (error) {
        res.status(400).send({ error: 'something went wrong' })
    }
})

module.exports = route