const express = require('express')
const router = express.Router()
const Prototype = require('../../models/thing')
const {ensureAuth, ensureGuest } = require('../../middleware/auth')
const Note = require('../../models/note')
const tool = {
    title: "Prototype",
    description: "Create prototypes to put your ideas to life.",
    link: "prototypes",
    stage: "prototype",
    folder: "prototype",
    creationType: "Prototype"
}

router.get('/', ensureAuth, async (req, res) => {
    let query = Prototype.find({ creationType: tool.creationType, user: req.user })
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
        const showPrototypes = await query.exec()
        res.render('prototype/Prototype/new', { creations: req.Creations, objects: showPrototypes, SortBy: req.sortby, searchOptions: req.query, tool: tool})
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', ensureAuth, async (req, res) => {
    res.render('partials/formPage', { 
        creations: req.Creations, 
        tool: tool,
        object: new Prototype()
    })
})

router.post('/', ensureAuth, async (req, res) => {
    const prototype = new Prototype({
        name: req.body.name,
        description: req.body.description,
        creationType: tool.creationType,
        link: tool.link,
        user: req.user
    })
    if (req.body.cover != null && req.body.cover !== '') {
        saveCover(prototype, req.body.cover)
    }
    try {
        const newPrototype = await prototype.save()
        res.redirect(`/prototypes/${newPrototype.id}`)
    } catch {
        res.redirect('/')
    }
})

router.get('/:id', ensureAuth, async (req, res) => {
    const prototype = await Prototype.findById(req.params.id).populate('user').exec()
    const comments = await Note.find({connectedObject: prototype }).populate('user').exec()
    res.render('partials/showPage', {creations: req.Creations, creation: prototype, 
        tool: tool, comments: comments, note: new Note()
    })
})

router.get('/:id/edit', ensureAuth, async (req, res) => {
    try {
        const prototype = await Prototype.findById(req.params.id)
        res.render('partials/editPage', { 
            creations: req.Creations, 
            tool: tool,
            object: prototype })
    } catch {
        res.redirect('/prototypes')
    }
})

router.post('/:id/comments', ensureAuth, async (req, res) => {
    const prototype = await Prototype.findById(req.params.id)
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        stage: tool.stage,
        connectedObject: prototype
    })
    try {
        const newNote = await note.save()
        res.redirect(`/prototypes/${prototype.id}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/prototypes/${prototype.id}`)
    }
})

router.delete('/:id/comments/:commentId', ensureAuth, async (req, res) => {
    let object
    let note
    try {
        object = await Prototype.findById(req.params.id)
        note = await Note.findById(req.params.commentId)
        await note.deleteOne()
        res.redirect(`/prototypes/${object.id}`)
    } 
    catch {
        if (object == null) {
            res.redirect('/')
        } else{
            res.redirect(`/prototypes/${object.id}`)
        }
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    let prototype
    try {
        prototype = await Prototype.findById(req.params.id)
        prototype.name = req.body.name
        prototype.description = req.body.description
        if (req.body.cover != null && req.body.cover !== '') {
            saveCover(prototype, req.body.cover)
        }
        await prototype.save()
        res.redirect(`/prototypes/${prototype.id}`)
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
    let prototype
    try {
        prototype = await Prototype.findById(req.params.id)
        await prototype.deleteOne()
        res.redirect('/prototypes')
    } 
    catch {
        if (note == null) {
            res.redirect('/')
        } else{
            res.redirect(`/prototypes/${prototype.id}`)
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