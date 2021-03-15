const route = require('express').Router()

const Post = require('../models/post')

const auth = require('../middleware/auth')

route.post('/post/create', auth, async (req, res) => {
    try {
        
        const post = new Post(req.body)
        const user = req.user

        post.owner = user._id
        await post.save()

        res.send('post created')

    } catch (error) {
        res.status(400).send(error)
    }
})


route.get('/post/view', auth, async (req, res) => {
    try {
        
        const user = req.user


    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = route