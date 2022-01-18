// CONFIG
const mongoose = require('../db/connection.js')

// SCHEMA
const shopSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
    img1: String,
    price: Number,
    quantity: Number
})

// model
const Shop = mongoose.model('Shop', shopSchema)

// export
module.exports = Shop