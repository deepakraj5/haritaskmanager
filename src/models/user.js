const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    jwt: Array
})

userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User