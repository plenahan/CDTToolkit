const express = require('express')
const router = express.Router()
const Brainstorm = require('../../models/thing')
const Note = require('../../models/note')
const tool = {
    title: "Brainstorm",
    description: "Create many ideas in one session.",
    link: "brainstorms",
    stage: "ideate",
    folder: "brainstorm",
    creationType: "Brainstorm"
}

router.get('/', async (req, res) => {
    let query = Brainstorm.find({ creationType: tool.creationType, user: req.user })
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
        const showBrainstorms = await query.exec()
        res.render('ideate/Brainstorm/new', { creations: req.Creations, objects: showBrainstorms, SortBy: req.sortby, searchOptions: req.query, tool: tool })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', async (req, res) => {
    res.render('partials/formPage', { 
        creations: req.Creations, 
        tool: tool,
        object: new Brainstorm()
    })
})

router.post('/', async (req, res) => {
    const brainstorm = new Brainstorm({
        name: req.body.name,
        description: req.body.description,
        ideas: req.body.ideas,
        link: tool.link,
        creationType: tool.creationType,
        user: req.user
    })
    if (req.body.cover != null && req.body.cover !== '') {
        saveCover(brainstorm, req.body.cover)
    }
    try {
        const newBrainstorm = await brainstorm.save()
        res.redirect(`/brainstorms/${newBrainstorm.id}`)
    } catch {
        res.redirect('/')
    }
})

router.get('/:id', async (req, res) => {
    const brainstorm = await Brainstorm.findById(req.params.id).populate('user').exec()
    const comments = await Note.find({connectedObject: brainstorm }).populate('user').exec()
    res.render('partials/showPage', {creations: req.Creations, creation: brainstorm, 
        tool: tool, comments: comments, note: new Note()
    })
})

router.get('/:id/edit', async (req, res) => {
    try {
        const brainstorm = await Brainstorm.findById(req.params.id)
        res.render('partials/editPage', { 
            creations: req.Creations, 
            tool: tool,
            object: brainstorm })
    } catch {
        res.redirect('/brainstorms')
    }
})

router.put('/:id', async (req, res) => {
    let brainstorm
    try {
        brainstorm = await Brainstorm.findById(req.params.id)
        brainstorm.name = req.body.name
        brainstorm.description = req.body.description
        brainstorm.ideas = req.body.ideas
        if (req.body.cover != null && req.body.cover !== '') {
            saveCover(brainstorm, req.body.cover)
        }
        await brainstorm.save()
        res.redirect(`/brainstorms/${brainstorm.id}`)
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', async (req, res) => {
    let brainstorm
    try {
        brainstorm = await Brainstorm.findById(req.params.id)
        await brainstorm.deleteOne()
        res.redirect('/brainstorms')
    } 
    catch {
        if (brainstorm == null) {
            res.redirect('/')
        } else{
            res.redirect(`/brainstorms/${brainstorm.id}`)
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