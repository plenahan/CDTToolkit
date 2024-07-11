const express = require('express')
const router = express.Router()
const Statement = require('../../models/thing')
const {ensureAuth, ensureGuest } = require('../../middleware/auth')
const Note = require('../../models/note')
const tool = {
    title: "Need Statement",
    description: "Define your needs with a simple statement.",
    link: "statements",
    stage: "define",
    folder: "statement",
    creationType: "Statement"
}

router.get('/', ensureAuth, async (req, res) => {
    let query = Statement.find({ creationType: tool.creationType, user: req.user })
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
        const showStatements = await query.exec()
        res.render('define/Statement/new', { creations: req.Creations, objects: showStatements, SortBy: req.sortby, searchOptions: req.query, tool: tool })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', ensureAuth, async (req, res) => {
    res.render('partials/formPage', { 
        creations: req.Creations, 
        tool: tool,
        object: new Statement()
    })
})

router.post('/', ensureAuth, async (req, res) => {
    const statement = new Statement({
        // name: req.body.name,
        // description: req.body.description,
        statementDo: req.body.statementDo,
        statementUser: req.body.statementUser,
        statementInsight: req.body.statementInsight,
        name: req.body.statementUser + " needs (a way) to " + req.body.statementDo + " because " + req.body.statementInsight + ".",
        creationType: tool.creationType,
        link: tool.link,
        user: req.user
    })
    if (req.body.cover != null && req.body.cover !== '') {
        saveCover(statement, req.body.cover)
    }
    try {
        const newStatement = await statement.save()
        res.redirect(`/statements/${newStatement.id}`)
    } catch {
        res.redirect('/')
    }
})

router.get('/:id', ensureAuth, async (req, res) => {
    const statement = await Statement.findById(req.params.id).populate('user').exec()
    const comments = await Note.find({connectedObject: statement }).populate('user').exec()
    res.render('partials/showPage', {creations: req.Creations, creation: statement, 
        tool: tool, comments: comments, note: new Note()
    })
})

router.get('/:id/edit', ensureAuth, async (req, res) => {
    try {
        const statement = await Statement.findById(req.params.id)
        res.render('partials/editPage', { 
            creations: req.Creations, 
            tool: tool,
            object: statement })
    } catch {
        res.redirect('/statements')
    }
})

router.post('/:id/comments', ensureAuth, async (req, res) => {
    const statement = await Statement.findById(req.params.id)
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        stage: tool.stage,
        connectedObject: statement
    })
    try {
        const newNote = await note.save()
        res.redirect(`/statements/${statement.id}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/statements/${statement.id}`)
    }
})

router.delete('/:id/comments/:commentId', ensureAuth, async (req, res) => {
    let object
    let note
    try {
        object = await Statement.findById(req.params.id)
        note = await Note.findById(req.params.commentId)
        await note.deleteOne()
        res.redirect(`/statements/${object.id}`)
    } 
    catch {
        if (object == null) {
            res.redirect('/')
        } else{
            res.redirect(`/statements/${object.id}`)
        }
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    let statement
    try {
        statement = await Statement.findById(req.params.id)
        // statement.name = req.body.name
        // statement.description = req.body.description
        statement.statementDo = req.body.statementDo
        statement.statementUser = req.body.statementUser
        statement.statementInsight = req.body.statementInsight
        statement.name = req.body.statementUser + " needs (a way) to " + req.body.statementDo + " because " + req.body.statementInsight + "."
        
        if (req.body.cover != null && req.body.cover !== '') {
            saveCover(statement, req.body.cover)
        }
        await statement.save()
        res.redirect(`/statements/${statement.id}`)
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
    let statement
    try {
        statement = await Statement.findById(req.params.id)
        await statement.deleteOne()
        res.redirect('/statements')
    } 
    catch {
        if (statement == null) {
            res.redirect('/')
        } else{
            res.redirect(`/statements/${statement.id}`)
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