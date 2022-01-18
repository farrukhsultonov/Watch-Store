require('dotenv').config()
// CONFIG
const mongoose = require('mongoose')
const MONGODB_URI = process.env.MONGODB_URI

// CONNECT
mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((instance) => console.log(`Connected to ${instance.connections[0].name}`))
    .catch((err) => console.log('Connection failed', err))

// EXPORT
module.exports = mongoose