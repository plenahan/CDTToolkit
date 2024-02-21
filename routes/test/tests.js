const express = require('express')
const router = express.Router()
const Test = require('../../models/thing')
const Note = require('../../models/note')
const {ensureAuth, ensureGuest } = require('../../middleware/auth')
const tool = {
    title: "Test",
    description: "Create a more structured test of your prototype.",
    link: "tests",
    stage: "test",
    folder: "test",
    creationType: "Test"
}

router.get('/', ensureAuth, async (req, res) => {
    let query = Test.find({ creationType: tool.creationType, user: req.user })
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
        const showTests = await query.exec()
        res.render('test/Test/new', { creations: req.Creations, objects: showTests, SortBy: req.sortby, searchOptions: req.query, tool: tool })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', ensureAuth, async (req, res) => {
    res.render('partials/formPage', { 
        creations: req.Creations, 
        tool: tool,
        object: new Test()
    })
})

router.post('/', async (req, res) => {
    const test = new Test({
        name: req.body.name,
        description: req.body.description,
        data: req.body.data,
        metric: req.body.metric,
        goal: req.body.goal,
        creationType: tool.creationType,
        link: tool.link,
        user: req.user
    })
    if (req.body.cover != null && req.body.cover !== '') {
        saveCover(test, req.body.cover)
    }
    try {
        const newTest = await test.save()
        res.redirect(`/tests/${newTest.id}`)
    } catch {
        res.redirect('/')
    }
})

router.get('/:id', ensureAuth, async (req, res) => {
    const test = await Test.findById(req.params.id).populate('user').exec()
    const comments = await Note.find({connectedObject: test }).populate('user').exec()
    res.render('partials/showPage', {creations: req.Creations, creation: test, 
        tool: tool, comments: comments, note: new Note()
    })
})

router.get('/:id/edit', ensureAuth, async (req, res) => {
    try {
        const test = await Test.findById(req.params.id)
        res.render('partials/editPage', { 
            creations: req.Creations, 
            tool: tool,
            object: test })
    } catch {
        res.redirect('/tests')
    }
})

router.post('/:id/comments', ensureAuth, async (req, res) => {
    const test = await Test.findById(req.params.id)
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        stage: tool.stage,
        connectedObject: test
    })
    try {
        const newNote = await note.save()
        res.redirect(`/tests/${test.id}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/tests/${test.id}`)
    }
})

router.delete('/:id/comments/:commentId', ensureAuth, async (req, res) => {
    let object
    let note
    try {
        object = await Test.findById(req.params.id)
        note = await Note.findById(req.params.commentId)
        await note.deleteOne()
        res.redirect(`/tests/${object.id}`)
    } 
    catch {
        if (object == null) {
            res.redirect('/')
        } else{
            res.redirect(`/tests/${object.id}`)
        }
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    let test
    try {
        test = await Test.findById(req.params.id)
        test.name = req.body.name
        test.description = req.body.description
        test.data = req.body.data
        test.metric = req.body.metric
        test.goal = req.body.goal
        if (req.body.cover != null && req.body.cover !== '') {
            saveCover(test, req.body.cover)
        }
        await test.save()
        res.redirect(`/tests/${test.id}`)
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
    let test
    try {
        test = await Test.findById(req.params.id)
        await test.deleteOne()
        res.redirect('/tests')
    } 
    catch {
        if (note == null) {
            res.redirect('/')
        } else{
            res.redirect(`/tests/${test.id}`)
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