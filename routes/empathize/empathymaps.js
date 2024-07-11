const express = require('express')
const router = express.Router()
// const EmpathyMap = require('../../models/empathize/empathymap')
const EmpathyMap = require('../../models/thing')
const {ensureAuth, ensureGuest } = require('../../middleware/auth')
const Note = require('../../models/note')
const File = require('../../models/pdf')
const multer = require("multer")


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/uploads/")
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname)
    },
  });

  const upload = multer({ storage });

const tool = {
    title: "Empathy Map",
    description: "Create empathy maps to help you empathize.",
    link: "empathymaps",
    stage: "empathize",
    folder: "empathymap",
    creationType: "EmpathyMap"
}

router.get('/', ensureAuth, async (req, res) => {
    let query = EmpathyMap.find({ creationType: tool.creationType, user: req.user })
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
        const showEmpathyMaps = await query.exec()
        res.render('empathize/EmpathyMap/new', { creations: req.Creations, objects: showEmpathyMaps, SortBy: req.sortby, searchOptions: req.query, tool: tool })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', ensureAuth, async (req, res) => {
    res.render('partials/formPage', { 
        creations: req.Creations, 
        tool: tool,
        object: new EmpathyMap()
    })
})

router.post('/', upload.single("file"), async (req, res) => {
    // console.log(req.file)
    let empathymap
    var path
    if(req.file != null){
        try {
            const fileData = {
                path: req.file.path,
                originalName: req.file.originalname
            }
            const file = new File(fileData)
            console.log(file)
            empathymap = new EmpathyMap({
                name: file.originalName,
                description: "PDF Upload",
                creationType: tool.creationType,
                link: tool.link,
                user: req.user, 
                pdf: file
            })
            path = file.path;
            path = path.replace(/\\/g, '/');
            const newFile = await file.save()
        }
        catch(err) {
            console.log(err)
            res.redirect('/')
        }
    }
    else {
        empathymap = new EmpathyMap({
            name: req.body.name,
            description: req.body.description,
            feel: req.body.feel,
            see: req.body.see,
            do: req.body.do,
            hear: req.body.hear,
            pain: req.body.pain,
            gain: req.body.gain,
            creationType: tool.creationType,
            link: tool.link,
            user: req.user
        })
    
        if (req.body.cover != null && req.body.cover !== '') {
            saveCover(empathymap, req.body.cover)
        }
    }
    const newEmpathyMap = await empathymap.save()
    res.redirect(`/empathymaps/${newEmpathyMap.id}`)
})

router.get('/:id', ensureAuth, async (req, res) => {
    const empathymap = await EmpathyMap.findById(req.params.id).populate('user').populate('pdf').exec()
    var path
    if(empathymap.pdf){
        path = empathymap.pdf.path;
        path = path.replace(/\\/g, '/');
    }
    const comments = await Note.find({connectedObject: empathymap }).populate('user').exec()
    res.render('partials/showPage', {creations: req.Creations, creation: empathymap, 
        tool: tool, comments: comments, note: new Note(), path: path
    })
})

router.get('/:id/edit', ensureAuth, async (req, res) => {
    try {
        const empathymap = await EmpathyMap.findById(req.params.id)
        res.render('partials/editPage', { 
            creations: req.Creations, 
            tool: tool,
            object: empathymap })
    } catch {
        res.redirect('/empathymaps')
    }
})

router.post('/:id/comments', ensureAuth, async (req, res) => {
    const empathyMap = await EmpathyMap.findById(req.params.id)
    const note = new Note({
        title: req.body.title,
        description: req.body.description,
        stage: tool.stage,
        connectedObject: empathyMap
    })
    try {
        const newNote = await note.save()
        res.redirect(`/empathymaps/${empathyMap.id}`)
    } catch (err) {
        console.log(err)
        res.redirect(`/empathymaps/${empathyMap.id}`)
    }
})

router.delete('/:id/comments/:commentId', ensureAuth, async (req, res) => {
    let empathymap
    let note
    try {
        empathymap = await EmpathyMap.findById(req.params.id)
        note = await Note.findById(req.params.commentId)
        await note.deleteOne()
        res.redirect(`/empathymaps/${empathymap.id}`)
    } 
    catch {
        if (empathymap == null) {
            res.redirect('/')
        } else{
            res.redirect(`/empathymaps/${empathymap.id}`)
        }
    }
})

router.put('/:id', ensureAuth, async (req, res) => {
    let empathymap
    try {
        empathymap = await EmpathyMap.findById(req.params.id)
        empathymap.name = req.body.name
        empathymap.description = req.body.description
        empathymap.feel = req.body.feel
        empathymap.see = req.body.see
        empathymap.do = req.body.do
        empathymap.hear = req.body.hear
        empathymap.pain = req.body.pain
        empathymap.gain = req.body.gain
        if (req.body.cover != null && req.body.cover !== '') {
            saveCover(empathymap, req.body.cover)
        }
        await empathymap.save()
        res.redirect(`/empathymaps/${empathymap.id}`)
    } catch {
        res.redirect('/')
    }
})

router.delete('/:id', ensureAuth, async (req, res) => {
    let empathymap
    try {
        empathymap = await EmpathyMap.findById(req.params.id)
        await empathymap.deleteOne()
        res.redirect('/empathymaps')
    } 
    catch {
        if (empathymap == null) {
            res.redirect('/')
        } else{
            res.redirect(`/empathymaps/${empathymap.id}`)
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