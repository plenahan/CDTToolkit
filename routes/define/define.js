const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../../middleware/auth')

router.get('/', ensureAuth, async (req, res) => {
    res.render('define/define.ejs', { creations: req.Creations})
})

module.exports = router