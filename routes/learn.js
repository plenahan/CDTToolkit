const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('learn/index', {creations: req.Creations})  
})

module.exports = router