const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const {
    redirect,
    append
} = require('express/lib/response')

const router = express.Router()


// Register routes
router.get('/', (req, res) => {
    res.send('Session controller works')
})

router.get('/register', (req, res) => {
    res.render('sessions/register.ejs')
})

router.post('/register', async (req, res, next) => {
    try {
        if (req.body.password === req.body.verifyPassword) {
            // passwords must match
            const desiredUsername = req.body.username
            const userExists = await User.findOne({
                username: desiredUsername
            })
            if (userExists) {
                req.session.message = 'Username already taken'
                res.redirect('/session/register')
            } else {
                // encrypting password with bcrypt
                const salt = bcrypt.genSaltSync(10)
                const hashedPassword = bcrypt.hashSync(req.body.password, salt)
                req.body.password = hashedPassword
                const createdUser = await User.create(req.body)
                req.session.username = createdUser.username
                req.session.loggedIn = true
                res.redirect('/store')
            }
        } else {
            req.session.message = 'Passwords must match'
            res.redirect('/session/register')
        }
    } catch (err) {
        next(err)
    }
})


// Log In routes
router.get('/login', (req, res) => {
    res.render('sessions/login')
})

router.post('/login', async (req, res, next) => {
    try {
        const userToLogin = await User.findOne({
            username: req.body.username
        })
        if (userToLogin) {
            const validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
            if (validPassword) {
                req.session.username = userToLogin.username
                req.session.loggedIn = true
                res.redirect('/store')
            } else {
                req.session.message = "Invalid username or password"
                res.redirect('/session/login')
            }
        } else {
            req.session.message = "Invalid username or password"
            res.redirect('/session/login')
        }
    } catch (err) {
        next(err)
    }
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/session/login')

})

module.exports = router