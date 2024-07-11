const express = require('express')
const router = express.Router()
const LotusBlossom = require('../../models/thing')
const {ensureAuth, ensureGuest } = require('../../middleware/auth')
const Note = require('../../models/note')
const tool = {
    title: "Lotus Blossom",
    description: "Create Lotus Blossoms to help your ideation.",
    link: "lotusblossoms",
    stage: "ideate",
    folder: "lotusblossom",
    creationType: "LotusBlossom"
}

router.get('/', ensureAuth, async (req, res) => {
    let query = LotusBlossom.find({ creationType: tool.creationType, user: req.user })
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
        const showLotusBlossoms = await query.exec()
        res.render('ideate/LotusBlossom/new', { creations: req.Creations, objects: showLotusBlossoms, SortBy: req.sortby, searchOptions: req.query, tool: tool })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', ensureAuth, async (req, res) => {
    res.render('partials/formPage', { 
        creations: req.Creations, 
        tool: tool,
        object: new LotusBlossom()
    })
})

router.post('/', ensureAuth, async (req, res) => {
    const lotusblossom = new LotusBlossom({
        name: req.body.name,
        description: req.body.description,
        creationType: tool.creationType,
        link: tool.link,
        user: req.user,
        chart: req.body.chart,
        annotations: req.body.annotations,
        tree: req.body.tree
    })
    if (req.body.cover != null && req.body.cover !== '') {
        saveCover(lotusblossom, req.body.cover)
    }
    try {
        const newLotusBlossom = await lotusblossom.save()
        res.redirect(`/lotusblossoms/${newLotusBlossom.id}`)
    } catch {
        res.redirect('/')
    }
})

router.get('/:id', ensureAuth, async (req, res) => {
    const lotusblossom = await LotusBlossom.findById(req.params.id).populate('user').exec()
    const comments = await Note.find({connectedObject: lotusblossom }).populate('user').exec()
    res.render('partials/showPage', {creations: req.Creations, creation: lotusblossom, 
        tool: tool, comments: comments, note: new Note()
    })
})

router.get('/:id/edit', ensureAuth, async (req, res) => {
    try {
        const lotusblossom = await LotusBlossom.findById(req.params.id)
        res.render('partials/editPage', { 
            creations: req.Creations, 
            tool: tool,
            object: lotusblossom })
    } catch {
        res.redirect('/lotusblossoms')
    }
})

router.post('/:id/comments', ensureAuth, async (req, res) => {
    const lotusblossom = await LotusBlossom.findById(req.params.id)
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        stage: tool.stage,
        connectedObject: lotusblossom
    })
    try {
        const newNote = await note.save()
        res.redirect(`/lotusblossoms/${lotusblossom.id}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/lotusblossoms/${lotusblossom.id}`)
    }
})

router.delete('/:id/comments/:commentId', ensureAuth, async (req, res) => {
    let object
    let note
    try {
        object = await LotusBlossom.findById(req.params.id)
        note = await Note.findById(req.params.commentId)
        await note.deleteOne()
        res.redirect(`/lotusblossoms/${object.id}`)
    } 
    catch {
        if (object == null) {
            res.redirect('/')
        } else{
            res.redirect(`/lotusblossoms/${object.id}`)
        }
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    let lotusblossom
    try {
        lotusblossom = await LotusBlossom.findById(req.params.id)
        lotusblossom.name = req.body.name
        lotusblossom.description = req.body.description
        lotusblossom.chart = req.body.chart;
        lotusblossom.annotations = req.body.annotations;
        lotusblossom.tree = req.body.tree;
        if (req.body.cover != null && req.body.cover !== '') {
            saveCover(lotusblossom, req.body.cover)
        }
        await lotusblossom.save()
        res.redirect(`/lotusblossoms/${lotusblossom.id}`)
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
    let lotusblossom
    try {
        lotusblossom = await LotusBlossom.findById(req.params.id)
        await lotusblossom.deleteOne()
        res.redirect('/lotusblossoms')
    } 
    catch {
        if (note == null) {
            res.redirect('/')
        } else{
            res.redirect(`/lotusblossoms/${lotusblossom.id}`)
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