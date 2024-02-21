const express = require('express')
const router = express.Router()
const Note = require('../models/note')
const {ensureAuth, ensureGuest } = require('../middleware/auth')
const tool = {
    title: "Note",
    description: "Jot down any thoughts you have",
    link: "notes",
    stage: "",
    folder: "notes",
    creationType: "Note"
}

router.get('/', ensureAuth, async (req, res) => {
    let query = Note.find({ user: req.user })
    // const sortby = new SortBy({ name: req.query.SortBy })
    if (req.query.name != null && req.query.name != '') {
        query = query.regex('description', new RegExp(req.query.name, 'i'))
    }
    if (req.query.createdBefore != null && req.query.createdBefore != '') {
        query = query.lte('createdAt', req.query.createdBefore)
    }
    if (req.query.createdAfter != null && req.query.createdAfter != '') {
        query = query.gte('createdAt', req.query.createdAfter)
    }
    if(req.sortby.title == 'A2Z'){
        query = query.sort( {description: 'asc'} )
    }
    else if (req.sortby.title == 'Z2A'){
        query = query.sort( {description: 'desc'} )
    }
    else if (req.sortby.title == 'New2Old'){
        query = query.sort( {createdAt: 'desc'} )
    }
    else {
        query = query.sort( {createdAt: 'asc'} )
    }
    try {
        const showNotes = await query.exec()
        res.render('notes/new', { creations: req.Creations, objects: showNotes, SortBy: req.sortby, searchOptions: req.query, tool: tool })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', ensureAuth, async (req, res) => {
    res.render('partials/formPage', { 
        creations: req.Creations, 
        tool: tool,
        object: new Note()
    })
})

router.post('/new', ensureAuth, async (req, res) => {
    const note = new Note({
        description: req.body.description,
        stage: req.body.stage,
        connectedObject: req.body.connectedObject,
        user: req.user
    })
    try {
        const newNote = await note.save()
        res.redirect('back')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.post('/general/new', ensureAuth, async (req, res) => {
    const note = new Note({
        description: req.body.description,
        stage: 'general',
        user: req.user
    })
    try {
        const newNote = await note.save()
        res.redirect('back')
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/:id', ensureAuth, async (req, res) => {
    const note = await Note.findById(req.params.id).populate('user')
    const comments = await Note.find({connectedObject: note }).populate('user')
    res.render('partials/showPage', {creations: req.Creations, creation: note, 
        tool: tool, comments: comments, note: new Note()
    })
})

router.get('/:id/edit', ensureAuth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id)
        res.render('partials/editPage', { 
            creations: req.Creations, 
            tool: tool,
            object: note })
    } catch {
        res.redirect('/notes')
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    let note
    try {
        note = await Note.findById(req.params.id)
        note.name = req.body.name
        note.description = req.body.description
        await note.save()
        res.redirect(`/notes/${note.id}`)
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
    let note
    try {
        note = await Note.findById(req.params.id)
        await note.deleteOne()
        res.redirect('/notes')
    } 
    catch {
        if (note == null) {
            res.redirect('/')
        } else{
            res.redirect('/')
        }
    }
})

module.exports = router