const express = require('express')
const { UserModel } = require('../model/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userRouter = express.Router()
userRouter.post('/signup', async (req, res) => {
    let { email, name, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hashpassword) => {
            if (hashpassword) {
                let newuser = new UserModel({ name: name, email: email, password: hashpassword })
                await newuser.save()
                res.send({ 'message': 'Signup successful.' })
            } else {
                res.send({ 'message': 'Signup failed. Please try again later.', "error": err })
            }
        })
    } catch (error) {
        res.send('error:'`${error}`)
    }
})
userRouter.post('/login', async (req, res) => {
    let { email, password } = req.body
    let user = await UserModel.find({ email })
    try {
        if (user.length > 0) {
            let hashpassword = user[0].password
            let name = user[0].name
            let email = user[0].email
            bcrypt.compare(password, hashpassword, (err, result) => {
                if (result) {
                    jwt.sign({userId:user[0]._id}, process.env.KEY, (err, token) => {
                        if (token) {
                            res.send({ 'message': `Logged in successfully. Let's get started!`, 'email': email, 'name': name, 'token': token })
                        } else {
                            res.send({ 'message': 'Login failed. Please try again.', 'error': err })
                        }
                    })
                } else {
                    res.send({ 'message': 'Login failed. Please try again.', 'error': err })
                }
            })
        }

    } catch (error) {
        res.send({ 'message': 'Login failed! please signup first', 'error': error })
    }

})
module.exports = { userRouter }