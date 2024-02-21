const express = require('express')
const router = express.Router()
// const AbstractionLadder = require('../../models/define/abstractionladder')
const AbstractionLadder = require('../../models/thing')
const {ensureAuth, ensureGuest } = require('../../middleware/auth')
const Note = require('../../models/note')
const tool = {
    title: "Abstraction Ladder",
    description: "Create an abstraction ladder to help define your needs.",
    link: "abstractionladders",
    stage: "define",
    folder: "abstractionladder",
    creationType: "AbstractionLadder"
}

router.get('/', ensureAuth, async (req, res) => {
    let query = AbstractionLadder.find({ creationType: tool.creationType, user: req.user })
    // const sortby = new SortBy({ title: req.query.SortBy })
    if (req.query.name != null && req.query.name != '') {
        query = query.regex('name', new RegExp(req.query.name, 'i'))
    }
    if (req.query.createdBefore != null && req.query.createdBefore != '') {
        query = query.lte('createdAt', req.query.createdBefore)
    }
    if (req.query.createdAfter != null && req.query.createdAfter != '') {
        query = query.gte('createdAt', req.query.createdAfter)
    }
    if(req.sortby.title == 'A2Z'){
        query = query.sort( {name: 'asc'} )
    }
    else if (req.sortby.title == 'Z2A'){
        query = query.sort( {name: 'desc'} )
    }
    else if (req.sortby.title == 'New2Old'){
        query = query.sort( {createdAt: 'desc'} )
    }
    else {
        query = query.sort( {createdAt: 'asc'} )
    }
    try {
        const showAbstractionLadders = await query.exec()
        res.render('define/AbstractionLadder/new', { creations: req.Creations, objects: showAbstractionLadders, SortBy: req.sortby, searchOptions: req.query, tool: tool })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', ensureAuth, async (req, res) => {
    res.render('partials/formPage', { 
        creations: req.Creations, 
        tool: tool,
        object: new AbstractionLadder()
    })
})

router.post('/', ensureAuth, async (req, res) => {
    const abstractionladder = new AbstractionLadder({
        name: req.body.name,
        description: req.body.description,
        creationType: tool.creationType,
        link: tool.link,
        user: req.user
    })
    if (req.body.cover != null && req.body.cover !== '') {
        saveCover(abstractionladder, req.body.cover)
    }
    try {
        const newAbstractionLadder = await abstractionladder.save()
        res.redirect(`/abstractionladders/${newAbstractionLadder.id}`)
    } catch {
        res.redirect('/')
    }
})

router.get('/:id', ensureAuth, async (req, res) => {
    const abstractionladder = await AbstractionLadder.findById(req.params.id).populate('user').exec()
    const comments = await Note.find({connectedObject: abstractionladder }).populate('user').exec()
    res.render('partials/showPage', {creations: req.Creations, creation: abstractionladder, 
        tool: tool, comments: comments, note: new Note()
    })
})

router.get('/:id/edit', ensureAuth, async (req, res) => {
    try {
        const abstractionladder = await AbstractionLadder.findById(req.params.id)
        res.render('partials/editPage', { 
            creations: req.Creations, 
            tool: tool,
            object: abstractionladder })
    } catch {
        res.redirect('/abstractionladders')
    }
})

router.post('/:id/comments', ensureAuth, async (req, res) => {
    const abstractionladder = await AbstractionLadder.findById(req.params.id)
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        stage: tool.stage,
        connectedObject: abstractionladder
    })
    try {
        const newNote = await note.save()
        res.redirect(`/abstractionladders/${abstractionladder.id}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/abstractionladders/${abstractionladder.id}`)
    }
})

router.delete('/:id/comments/:commentId', ensureAuth, async (req, res) => {
    let object
    let note
    try {
        object = await AbstractionLadder.findById(req.params.id)
        note = await Note.findById(req.params.commentId)
        await note.deleteOne()
        res.redirect(`/abstractionladders/${object.id}`)
    } 
    catch {
        if (object == null) {
            res.redirect('/')
        } else{
            res.redirect(`/abstractionladders/${object.id}`)
        }
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    let abstractionladder
    try {
        abstractionladder = await AbstractionLadder.findById(req.params.id)
        abstractionladder.name = req.body.name
        abstractionladder.description = req.body.description
        if (req.body.cover != null && req.body.cover !== '') {
            saveCover(abstractionladder, req.body.cover)
        }
        await abstractionladder.save()
        res.redirect(`/abstractionladders/${abstractionladder.id}`)
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
    let abstractionladder
    try {
        abstractionladder = await AbstractionLadder.findById(req.params.id)
        await abstractionladder.deleteOne()
        res.redirect('/abstractionladders')
    } 
    catch {
        if (note == null) {
            res.redirect('/')
        } else{
            res.redirect(`/abstractionladders/${abstractionladder.id}`)
        }
    }
})

function saveCover(object, coverEncoded) {
    if (coverEncoded == null) return
    const cover = JSON.parse(coverEncoded)
    if (cover != null && imageTypes.includes(cover.type)) {
        object.coverImage = new Buffer.from(cover.data, 'base64')
        object.coverImageType = cover.type
    }
}

module.exports = router