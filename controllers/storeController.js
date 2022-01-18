const express = require('express')
const {
    redirect
} = require('express/lib/response')
const router = express.Router()
const Shop = require('../models/shop')


let addedItemsNumber = 0

function addedItems() {
    addedItemsNumber++
}

// The home route
const authRequired = (req, res, next) => {
    if (req.session.loggedIn) {
        next()
    } else {
        res.redirect('/session/login')
    }
}

// INDEX route
router.get('/', (req, res) => {
    Shop.find({}, (err, laptop) => {
        res.render('index', {
            laptop,
            // username: req.session.username //login
        })
        console.log(laptop);
    })
})






// new route should be on top of show route
// NEW route
router.get('/new', authRequired, (req, res) => {
    res.render('new')
})

router.post('/', authRequired, (req, res) => {
    console.log(req.body);
    Shop.create(req.body, (err, data) => {
        console.log(req.body);
        res.redirect('/store')
    })
})


// ABOUT
router.get('/about', (req, res) => {
    res.render('about')
})

// Show route
router.get('/:id', authRequired, (req, res) => {
    Shop.findById(req.params.id, (err, data) => {
        res.render('show', {
            laptopItem: data
        })
    })
})


// EDIT
router.get('/:id/edit', authRequired, (req, res) => {
    Shop.findById(req.params.id, (err, data) => {
        res.render('edit', {
            laptopItem: data
        })
    })
})

router.put('/:id', authRequired, (req, res) => {
    Shop.findByIdAndUpdate(req.params.id, req.body,
        (err, updatedlaptop) => {
            res.redirect('/store')
        })
})

// reduce quantity when Buy button clicked
router.put('/:id', (req, res) => {
    Shop.findByIdAndUpdate(req.params.id, {
        $inc: {
            quantity: -1
        }
    }, {
        new: true
    }, (err, data) => {

        res.redirect('/store')

    })
})


// DELETE
router.delete('/:id', authRequired, (req, res) => {
    Shop.findByIdAndRemove(req.params.id, (err, deletedLaptop) => {
        res.redirect('/store')
    })
})

module.exports = router