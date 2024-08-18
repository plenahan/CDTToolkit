if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const passport = require('passport')
require('./config/passport')(passport)
const session = require('express-session')
const MongoStore = require('connect-mongo')
const fs = require('fs')
const mongodb = require('mongodb')

const indexRouter = require('./routes/index')
const learnRouter = require('./routes/learn')
const createRouter = require('./routes/create')
const empathizeRouter = require('./routes/empathize/empathize')
const defineRouter = require('./routes/define/define')
const ideateRouter = require('./routes/ideate/ideate')
const prototypeRouter = require('./routes/prototype/prototype')
const testRouter = require('./routes/test/test')

const projectRouter = require('./routes/projects')
const personaRouter = require('./routes/empathize/personas')
const empathyMapRouter = require('./routes/empathize/empathymaps')
const journeyMapRouter = require('./routes/empathize/journeymaps')
const abstractionLadderRouter = require('./routes/define/abstractionladders')
const rockRouter = require('./routes/define/rocks')
const statementRouter = require('./routes/define/statements')
const lotusBlossomRouter = require('./routes/ideate/lotusblossoms')
const brainstormRouter = require('./routes/ideate/brainstorms')
const prototypesRouter = require('./routes/prototype/prototypes')
const testsRouter = require('./routes/test/tests')
const notesRouter = require('./routes/notes')
const authRouter = require('./routes/account/auth')
const accountRouter = require('./routes/account/index')


const bodyParser = require('body-parser')
// const { Objects } = require('./middleware/Objects')
const Persona = require('./models/empathize/persona')
const EmpathyMap = require('./models/empathize/empathymap')
const JourneyMap = require('./models/empathize/journeymap')
const Statement = require('./models/define/statement')
const Rock = require('./models/define/rock')
const AbstractionLadder = require('./models/define/abstractionladder')
const LotusBlossom = require('./models/ideate/lotusblossom')
const Brainstorm = require('./models/ideate/brainstorm')
const Prototype = require('./models/prototype/prototype')
const Test = require('./models/test/test')
const Creation = require('./models/creation')
const SortBy = require('./models/sortby')
const Thing = require('./models/thing')
const Note = require('./models/note')
const User = require('./models/user')
const File = require('./models/pdf')

// const {ensureAuth, ensureGuest } = require('./middleware/auth')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }))
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use('/public', express.static('public'))
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL })
}))
app.use(passport.initialize()) 
app.use(passport.session())

const mongoose = require('mongoose')
const Grid = require('gridfs-stream')
const multer = require("multer")
const req = require('express/lib/request')
const { Readable } = require("stream");
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => {
    console.log('Connected to Mongoose')
})

app.use('*', async (req, res, next) => {
    req.Creations = new Creation({
        personas: await Thing.find({ creationType: 'Persona', user: req.user }),
        empathymaps: await Thing.find({ creationType: 'EmpathyMap', user: req.user }),
        journeymaps: await Thing.find({ creationType: 'JourneyMap', user: req.user }),
        statements: await Thing.find({ creationType: 'Statement', user: req.user }),
        rocks: await Thing.find({ creationType: 'Rock', user: req.user }),
        abstractionladders: await Thing.find({ creationType: 'AbstractionLadder', user: req.user }),
        lotusblossoms: await Thing.find({ creationType: 'LotusBlossom', user: req.user }),
        brainstorms: await Thing.find({ creationType: 'Brainstorm', user: req.user }),
        prototypes: await Thing.find({ creationType: 'Prototype', user: req.user }),
        tests: await Thing.find({ creationType: 'Test', user: req.user }),
        notes: await Note.find({ stage: 'general', user: req.user })
    })
    imageTypes = imageMimeTypes
    req.sortby = new SortBy({ title: req.query.SortBy })
    req.note = new Note()
    // req.User = User.findById(req.user.id)
    next()
})

const upload = multer({ dest: 'uploads' })

app.post('/upload', upload.single("file"), async (req, res) => {
    try {
        const fileData = {
            path: req.file.path,
            originalName: req.file.originalname
        }
        const file = await File.create(fileData)
        console.log(file)
        res.redirect('/')
    }
    catch(err) {
        console.log(err)
        res.redirect('/')
    }
})



app.use('/', indexRouter)
app.use('/learn', learnRouter)
app.use('/create', createRouter)
app.use('/empathize', empathizeRouter)
app.use('/define', defineRouter)
app.use('/ideate', ideateRouter)
app.use('/prototype', prototypeRouter)
app.use('/test', testRouter)

app.use('/projects', projectRouter)
app.use('/personas', personaRouter)
app.use('/empathymaps', empathyMapRouter)
app.use('/journeymaps', journeyMapRouter)
app.use('/abstractionladders', abstractionLadderRouter)
app.use('/rocks', rockRouter)
app.use('/statements', statementRouter)
app.use('/brainstorms', brainstormRouter)
app.use('/lotusblossoms', lotusBlossomRouter)
app.use('/prototypes', prototypesRouter)
app.use('/tests', testsRouter)
app.use('/notes', notesRouter)
app.use('/auth', authRouter)
app.use('/account', accountRouter)

app.listen(process.env.PORT)