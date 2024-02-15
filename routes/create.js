const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('create', { creations: req.Creations })
})

module.exports = router