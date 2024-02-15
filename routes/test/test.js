const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('test/test.ejs', { creations: req.Creations})
})

module.exports = router