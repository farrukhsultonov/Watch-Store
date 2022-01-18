require('dotenv').config()
const express = require('express')
const app = express()
const {
    PORT,
    SESSION_SECRET
} = process.env
const methodOverride = require('method-override')
const expressEjsLayouts = require('express-ejs-layouts')
const session = require('express-session')
const mongoose = require('mongoose')
const storeController = require('./controllers/storeController')
const sessionsController = require('./controllers/sessions')



app.use(express.urlencoded({
    extended: false
}));
app.use(expressEjsLayouts)
app.set('view engine', 'ejs')
app.use(methodOverride('_method'))

// session middleware  (login)
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))


// custom middleware to make the session's user available to all views (login)
app.use((req, res, next) => {
    res.locals.username = req.session.username
    res.locals.loggedIn = req.session.loggedIn
    next()
})


// flash messaging
app.use((req, res, next) => {
    res.locals.message = req.session.message
    req.session.message = ""
    next()
})


// middleware to require authentication (login)
const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/session/login')
    }
}


// Setting up controller
app.use('/store', storeController)
//if below line on code is uncommented, user must login to veiw the web.
// app.use('/store', authRequired, storeController)   
app.use('/session', sessionsController)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000')
})





