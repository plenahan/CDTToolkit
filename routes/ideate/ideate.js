const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
    res.render('ideate/ideate.ejs', { creations: req.Creations})
})

module.exports = router