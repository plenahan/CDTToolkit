const express = require('express')
const router = express.Router()
const Rock = require('../../models/thing')
const Note = require('../../models/note')
const tool = {
    title: "Rock",
    description: "Create different sized rocks to determine the importance of your needs.",
    link: "rocks",
    stage: "define",
    folder: "rock",
    creationType: "Rock"
}

router.get('/', async (req, res) => {
    let query = Rock.find({ creationType: tool.creationType, user: req.user })
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
        const showRocks = await query.exec()
        res.render('define/Rock/new', { creations: req.Creations, objects: showRocks, SortBy: req.sortby, searchOptions: req.query, tool: tool})
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', async (req, res) => {
    res.render('partials/formPage', { 
        creations: req.Creations, 
        tool: tool,
        object: new Rock()
    })
})

router.post('/', async (req, res) => {
    const rock = new Rock({
        name: req.body.name,
        description: req.body.description,
        size: req.body.size,
        creationType: tool.creationType,
        link: tool.link,
        user: req.user
    })
    if (req.body.cover != null && req.body.cover !== '') {
        saveCover(rock, req.body.cover)
    }
    try {
        const newRock = await rock.save()
        res.redirect(`/rocks/${newRock.id}`)
    } catch {
        res.redirect('/')
    }
})

router.get('/:id', async (req, res) => {
    const rock = await Rock.findById(req.params.id).populate('user').exec()
    const comments = await Note.find({connectedObject: rock }).populate('user').exec()
    res.render('partials/showPage', {creations: req.Creations, creation: rock, 
        tool: tool, comments: comments, note: new Note()
    })
})

router.get('/:id/edit', async (req, res) => {
    try {
        const rock = await Rock.findById(req.params.id)
        res.render('partials/editPage', { 
            creations: req.Creations, 
            tool: tool,
            object: rock })
    } catch {
        res.redirect('/rocks')
    }
})

router.post('/:id/comments', async (req, res) => {
    const rock = await Rock.findById(req.params.id)
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        stage: tool.stage,
        connectedObject: rock
    })
    try {
        const newNote = await note.save()
        res.redirect(`/rocks/${rock.id}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/rocks/${rock.id}`)
    }
})

router.delete('/:id/comments/:commentId', async (req, res) => {
    let object
    let note
    try {
        object = await Rock.findById(req.params.id)
        note = await Note.findById(req.params.commentId)
        await note.deleteOne()
        res.redirect(`/rocks/${object.id}`)
    } 
    catch {
        if (object == null) {
            res.redirect('/')
        } else{
            res.redirect(`/rocks/${object.id}`)
        }
    }
})

router.put('/:id', async (req, res) => {
    let rock
    try {
        rock = await Rock.findById(req.params.id)
        rock.name = req.body.name
        rock.description = req.body.description
        rock.size = req.body.size
        if (req.body.cover != null && req.body.cover !== '') {
            saveCover(rock, req.body.cover)
        }
        await rock.save()
        res.redirect(`/rocks/${rock.id}`)
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', async (req, res) => {
    let rock
    try {
        rock = await Rock.findById(req.params.id)
        await rock.deleteOne()
        res.redirect('/rocks')
    } 
    catch {
        if (note == null) {
            res.redirect('/')
        } else{
            res.redirect(`/rocks/${rock.id}`)
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