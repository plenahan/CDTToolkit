const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('index', { creations: req.Creations })
})

module.exports = router