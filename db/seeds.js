const mongoose = require('./connection')
const shopSeeds = require('./shopData.json')
const Shop = require('../models/shop')

Shop.deleteMany({})
    .then(() => {
        return Shop.insertMany(shopSeeds)
    })
    .then((data) => {
        console.log(data)
    })
    .catch(err => {
        console.log(err)
    })
    .finally(() => {
        process.exit()
    })