const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('prototype/prototype.ejs', { creations: req.Creations})
})

module.exports = router