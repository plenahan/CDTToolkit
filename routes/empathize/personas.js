const express = require('express')
const router = express.Router()
// const Persona = require('../../models/empathize/persona')
const Persona = require('../../models/thing')
const Note = require('../../models/note')
const tool = {
    title: "Persona",
    description: "Create Personas to help empathize with students.",
    link: "personas",
    stage: "empathize",
    folder: "persona",
    creationType: "Persona"
}

router.get('/', async (req, res) => {
    let query = Persona.find({ creationType: tool.creationType, user: req.user })
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
        const showPersonas = await query.exec()
        res.render('empathize/Persona/new', { creations: req.Creations, objects: showPersonas, SortBy: req.sortby, searchOptions: req.query, tool: tool})
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', async (req, res) => {
    res.render('partials/formPage', { 
        creations: req.Creations, 
        tool: tool,
        object: new Persona()
    })
})

router.post('/', async (req, res) => {
    const persona = new Persona({
        name: req.body.name,
        priority: req.body.priority,
        description: req.body.description,
        who: req.body.who,
        what: req.body.what,
        how: req.body.how,
        creationType: tool.creationType,
        link: tool.link,
        user: req.user
    })
    if (req.body.cover != null && req.body.cover !== '') {
        saveCover(persona, req.body.cover)
    }
    try {
        const newPersona = await persona.save()
        res.redirect(`/personas/${newPersona.id}`)
    } catch {
        res.redirect('/')
    }
})

router.get('/:id', async (req, res) => {
    const persona = await Persona.findById(req.params.id).populate('user').exec()
    const comments = await Note.find({connectedObject: persona }).populate('user').exec()
    res.render('partials/showPage', {creations: req.Creations, creation: persona, 
        tool: tool, comments: comments, note: new Note()
    })
})

router.get('/:id/edit', async (req, res) => {
    try {
        const persona = await Persona.findById(req.params.id)
        res.render('partials/editPage', { 
            creations: req.Creations, 
            tool: tool,
            object: persona })
    } catch {
        res.redirect('/personas')
    }
})

router.post('/:id/comments', async (req, res) => {
    const persona = await Persona.findById(req.params.id)
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        stage: tool.stage,
        connectedObject: persona
    })
    try {
        const newNote = await note.save()
        res.redirect(`/personas/${persona.id}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/personas/${persona.id}`)
    }
})

router.delete('/:id/comments/:commentId', async (req, res) => {
    let object
    let note
    try {
        object = await Persona.findById(req.params.id)
        note = await Note.findById(req.params.commentId)
        await note.deleteOne()
        res.redirect(`/personas/${object.id}`)
    } 
    catch {
        if (object == null) {
            res.redirect('/')
        } else{
            res.redirect(`/personas/${object.id}`)
        }
    }
})

router.put('/:id', async (req, res) => {
    let persona
    try {
        persona = await Persona.findById(req.params.id)
        persona.name = req.body.name
        persona.description = req.body.description
        persona.who = req.body.who
        persona.what = req.body.what
        persona.how = req.body.how
        if (req.body.cover != null && req.body.cover !== '') {
            saveCover(persona, req.body.cover)
        }
        await persona.save()
        res.redirect(`/personas/${persona.id}`)
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', async (req, res) => {
    let persona
    try {
        persona = await Persona.findById(req.params.id)
        await persona.deleteOne()
        res.redirect('/personas')
    } 
    catch {
        if (note == null) {
            res.redirect('/')
        } else{
            res.redirect(`/personas/${persona.id}`)
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