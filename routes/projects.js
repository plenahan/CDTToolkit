const express = require('express')
const router = express.Router()
const Project = require('../models/project')
const Thing = require('../models/thing')
const Note = require('../models/note')
const User = require('../models/user')
const Team = require('../models/team')
const TeamProject = require('../models/TeamProject')
const {ensureAuth, ensureGuest } = require('../middleware/auth')
const tool = {
    title: "Project",
    description: "Group your creations together in projects",
    link: "projects",
    stage: "project",
    folder: "projects",
    creationType: "Project"
}

router.get('/', ensureAuth, async (req, res) => {
    let query = Project.find({ users: req.user.id })
    // const sortby = new SortBy({ name: req.query.SortBy })
    if (req.query.name != null && req.query.name != '') {
        query = query.regex('name', new RegExp(req.query.name, 'i'))
    }
    if (req.query.createdBefore != null && req.query.createdBefore != '') {
        query = query.lte('createdAt', req.query.createdBefore)
    }
    if (req.query.createdAfter != null && req.query.createdAfter != '') {
        query = query.gte('createdAt', req.query.createdAfter)
    }
    if(req.sortby.name == 'A2Z'){
        query = query.sort( {name: 'asc'} )
    }
    else if (req.sortby.name == 'Z2A'){
        query = query.sort( {name: 'desc'} )
    }
    else if (req.sortby.name == 'New2Old'){
        query = query.sort( {createdAt: 'desc'} )
    }
    else {
        query = query.sort( {createdAt: 'asc'} )
    }
    try {
        const showProjects = await query.populate("children").exec()
        res.render('project/projects/new', { creations: req.Creations, showProjects: showProjects, SortBy: req.sortby, searchOptions: req.query, })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/new', async (req, res) => {
    const things = await Thing.find({ })
    const users = await User.find({ })
    const teams = await Team.find({ users: req.user.id })
    res.render('partials/formPage', { 
        creations: req.Creations, 
        tool: tool,
        object: new Project(),
        things: things,
        users: users,
        account: req.user,
        teams: teams
    })
})

router.post('/', async(req, res) => {
    // let projectUsers = []
    // projectUsers.push(req.user)
    // req.body.users.forEach(user => {
    //     projectUsers.push(User.find({ email: user }))
    // })

    let project = new Project({
        name: req.body.name,
        children: req.body.children,
        users: req.body.users,
        teams: req.body.teams
    })
    let teams = project.teams
    console.log(teams)
    project = new Project({
        name: req.body.name,
        children: req.body.children,
        users: req.body.users
    })
    teams.forEach(async team => {
        let newRelation = new TeamProject({ team: team, project: project })
        newRelation.save()
    });
    try {
        const newProject = await project.save()
        res.redirect(`/projects/${newProject._id}`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/:id', async (req, res) => {
    let personas = [];
    let empathyMaps = [];
    let journeyMaps = [];
    let statements = [];
    let abstractionLadders = [];
    let rocks = [];
    let brainstorms = [];
    let lotusBlossoms = [];
    let prototypes = [];
    let tests = [];
    let allUsers = [];


    let query = await Project.findById(req.params.id).populate('users').populate("children").populate({path: 'teams', populate: {path: 'users'}}).exec();
    let teams = query.teams
    let users = await User.find({ });
    const teamproject = await TeamProject.find({ project: query }).populate({path: 'team', populate: {path: 'users'}})
    for(var i = 0; i < query.users.length; i++){
        allUsers.push(query.users[i])
    }
    
    // for(var i = 0; i < teamproject.length; i++){
    //     if(teamproject[i].team.users){
    //         for(var j = 0; j < teamproject[i].team.users.length; j++){
    //             if(allUsers.indexOf(teamproject[i].team.users[j]) == -1){
    //                 allUsers.push(teamproject[i].team.users[j])
    //             }
    //         }
    //     }
    // }
    // let project = await Project.findById(req.params.id)
    query.children.forEach(child => {
        switch(child.creationType){
            case "Persona":
                personas.push(child)
                break;
            case "EmpathyMap":
                empathyMaps.push(child)
                break;
            case "JourneyMap":
                journeyMaps.push(child)
                break;
            case "Statement":
                statements.push(child)
                break;
            case "Rock":
                rocks.push(child)
                break;
            case "AbstractionLadder":
                abstractionLadders.push(child)
                break;
            case "Brainstorm":
                brainstorms.push(child)
                break;
            case "LotusBlossom":
                lotusBlossoms.push(child)
                break;
            case "Prototype":
                prototypes.push(child)
                break;
            case "Test":
                tests.push(child)
                break;
        }
    })
    let reflections = await Note.find({ connectedObject: query })
    try {
        res.render('project/projects/show', { creations: req.Creations, showProject: query, tool: tool, 
            personas: personas, 
            empathyMaps: empathyMaps, 
            journeyMaps: journeyMaps, 
            statements: statements, 
            rocks: rocks, 
            abstractionLadders: abstractionLadders, 
            brainstorms: brainstorms, 
            lotusBlossoms: lotusBlossoms, 
            prototypes: prototypes, 
            tests: tests, 
            note: new Note(),
            creation: query,
            object: query,
            things: await Thing.find({}),
            reflections: reflections,
            users: allUsers,
            teams: teamproject
         })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate('children').populate('users').exec()
        const things = await Thing.find({ })
        const users = await User.find({ })
        const teams = await Team.find({})
        
        res.render('partials/editPage', { 
            creations: req.Creations, 
            tool: tool,
            object: project,
            things: things,
            users: users,
            account: req.user,
            teams: teams
        })
    } catch {
        res.redirect('/projects')
    }
})

router.put('/:id', async (req, res) => {
    let project
    try {
        const teamProject = await TeamProject.find()
        project = await Project.findById(req.params.id)
        project.name = req.body.name
        project.children = req.body.children
        project.reflection = req.body.reflection
        project.users = req.body.users
        project.teams = req.body.teams
        var teamprojects = await TeamProject.find({ project: project })
        // console.log(project.teams);
        if(project.teams){
            project.teams.forEach(async team =>{
                if((await TeamProject.find({ team: team, project: project })).length == 0){
                    let newTeamProject = new TeamProject({ team: team, project: project})
                    await newTeamProject.save()
                }
            })
        }
        if(teamprojects){
            teamprojects.forEach(async teamproject => {
                if(project.teams == null || project.teams.indexOf(teamproject.team) == -1){
                    await teamproject.deleteOne()
                }
            })
        }
        await project.save()
        res.redirect(`/projects/${project.id}`)
    } catch(err) {
        console.log(err);
        res.redirect('/')
    }
})

router.delete('/:id', async (req, res) => {
    let project
    try {
        project = await Project.findById(req.params.id)
        let teamprojects = await TeamProject.find({ project: project })
        teamprojects.forEach(async teamproject => {
            await teamproject.deleteOne()
        })
        await project.deleteOne()
        res.redirect('/projects')
    } 
    catch {
        if (project == null) {
            res.redirect('/')
        } else{
            res.redirect(`/projects/${project.id}`)
        }
    }
})

router.get('/:id/empathize', async (req, res) => {
    let personas = [];
    let empathyMaps = [];
    let journeyMaps = [];



    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "Persona":
                personas.push(child)
                break;
            case "EmpathyMap":
                empathyMaps.push(child)
                break;
            case "JourneyMap":
                journeyMaps.push(child)
                break;
        }
    })
    res.render('project/empathize/empathize', { creations: req.Creations,
        personas: personas, 
        empathyMaps: empathyMaps, 
        journeyMaps: journeyMaps, 
        tool: tool,
        showProject: query
     })
})

router.get('/:id/define', async (req, res) => {
    let statements = [];
    let abstractionLadders = [];
    let rocks = [];



    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "Statement":
                statements.push(child)
                break;
            case "Rock":
                rocks.push(child)
                break;
            case "AbstractionLadder":
                abstractionLadders.push(child)
                break;
        }
    })
    res.render('project/define/define', { creations: req.Creations,
        statements: statements, 
        rocks: rocks, 
        abstractionLadders: abstractionLadders, 
        tool: tool,
        showProject: query
     })
})

router.get('/:id/ideate', async (req, res) => {
    let lotusBlossoms = [];
    let brainstorms = [];


    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "LotusBlossom":
                lotusBlossoms.push(child)
                break;
            case "Brainstorm":
                brainstorms.push(child)
                break;
        }
    })
    res.render('project/ideate/ideate', { creations: req.Creations,
        lotusBlossoms: lotusBlossoms, 
        brainstorms: brainstorms, 
        tool: tool,
        showProject: query
     })
})

router.get('/:id/prototype', async (req, res) => {
    let prototypes = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "Prototype":
                prototypes.push(child)
                break;
        }
    })
    res.render('project/prototype/prototype', { creations: req.Creations,
        prototypes: prototypes, 
        tool: tool,
        showProject: query
     })
})

router.get('/:id/test', async (req, res) => {
    let tests = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "Test":
                tests.push(child)
                break;
        }
    })
    res.render('project/test/test', { creations: req.Creations,
        tests: tests, 
        tool: tool,
        showProject: query
     })
})

router.get('/:id/empathymaps', async (req, res) => {
    let objects = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "EmpathyMap":
                objects.push(child)
                break;
        }
    })
    res.render('project/toolpage', { creations: req.Creations,
        tool: {stage: "empathize", folder: "empathymap", link: "empathymaps"},
        showProject: query,
        objects: objects
     })
})

router.get('/:id/journeymaps', async (req, res) => {
    let objects = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "JourneyMap":
                objects.push(child)
                break;
        }
    })
    res.render('project/toolpage', { creations: req.Creations,
        tool: {stage: "empathize", folder: "journeymap", link: "journeymaps"},
        showProject: query,
        objects: objects
     })
})

router.get('/:id/personas', async (req, res) => {
    let objects = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "Persona":
                objects.push(child)
                break;
        }
    })
    res.render('project/toolpage', { creations: req.Creations,
        tool: {stage: "empathize", folder: "persona", link: "personas"},
        showProject: query,
        objects: objects
     })
})

router.get('/:id/abstractionladders', async (req, res) => {
    let objects = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "AbstractionLadder":
                objects.push(child)
                break;
        }
    })
    res.render('project/toolpage', { creations: req.Creations,
        tool: {stage: "define", folder: "abstractionladder", link: "abstractionladders"},
        showProject: query,
        objects: objects
     })
})

router.get('/:id/rocks', async (req, res) => {
    let objects = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "Rock":
                objects.push(child)
                break;
        }
    })
    res.render('project/toolpage', { creations: req.Creations,
        tool: {stage: "define", folder: "rock", link: "rocks"},
        showProject: query,
        objects: objects
     })
})

router.get('/:id/statements', async (req, res) => {
    let objects = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "Statement":
                objects.push(child)
                break;
        }
    })
    res.render('project/toolpage', { creations: req.Creations,
        tool: {stage: "define", folder: "statement", link: "statements"},
        showProject: query,
        objects: objects
     })
})

router.get('/:id/lotusblossoms', async (req, res) => {
    let objects = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "LotusBlossom":
                objects.push(child)
                break;
        }
    })
    res.render('project/toolpage', { creations: req.Creations,
        tool: {stage: "ideate", folder: "lotusblossom", link: "lotusblossoms"},
        showProject: query,
        objects: objects
     })
})

router.get('/:id/brainstorms', async (req, res) => {
    let objects = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "Brainstorm":
                objects.push(child)
                break;
        }
    })
    res.render('project/toolpage', { creations: req.Creations,
        tool: {stage: "ideate", folder: "brainstorm", link: "brainstorms"},
        showProject: query,
        objects: objects
     })
})

router.get('/:id/prototypes', async (req, res) => {
    let objects = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "Prototype":
                objects.push(child)
                break;
        }
    })
    res.render('project/toolpage', { creations: req.Creations,
        tool: {stage: "prototype", folder: "prototype", link: "prototypes"},
        showProject: query,
        objects: objects
     })
})

router.get('/:id/tests', async (req, res) => {
    let objects = [];

    let query = await Project.findById(req.params.id).populate("children").exec()
    query.children.forEach(child => {
        switch(child.creationType){
            case "Test":
                objects.push(child)
                break;
        }
    })
    res.render('project/toolpage', { creations: req.Creations,
        tool: {stage: "test", folder: "test", link: "tests"},
        showProject: query,
        objects: objects
     })
})

router.get('/:id/creation/:creationId', async (req, res) => {
    let query = await Project.findById(req.params.id).populate("children").exec()
    let creation = await Thing.findById(req.params.creationId).populate('user')
    let link
    let folder
    let stage
    switch(creation.creationType){
        case "Persona":
            link = "personas"
            folder = "persona"
            stage = "empathize"
            break;
        case "EmpathyMap":
            link = "empathymaps"
            folder = "empathymap"
            stage = "empathize"
            break;
        case "JourneyMap":
            link = "journeymaps"
            folder = "journeymap"
            stage = "empathize"
            break;
        case "Statement":
            link = "statements"
            folder = "statement"
            stage = "define"
            break;
        case "Rock":
            link = "rocks"
            folder = "rock"
            stage = "define"
            break;
        case "AbstractionLadder":
            link = "abstractionladders"
            folder = "abstractionladder"
            stage = "define"
            break;
        case "Brainstorm":
            link = "brainstorms"
            folder = "brainstorm"
            stage = "ideate"
            break;
        case "LotusBlossom":
            link = "lotusblossoms"
            folder = "lotusblossom"
            stage = "ideate"
            break;
        case "Prototype":
            link = "prototypes"
            folder = "prototype"
            stage = "prototype"
            break;
        case "Test":
            link = "tests"
            folder = "test"
            stage = "test"
            break;
    }
    let comments = await Note.find({ connectedObject: creation}).populate('user')
    res.render('project/showtoolpage', { creations: req.Creations,
        tool: {stage: stage, folder: folder, link: link},
        showProject: query,
        creation: creation, 
        comments: comments,
        note: new Note()
     })
})

router.get('/:id/empathymaps/new', (req, res) => {
    res.render('partials/formPage', { creations: req.Creations,
        tool: {
            title: "Empathy Map",
            description: "Create empathy maps to help you empathize.",
            link: "empathymaps",
            stage: "empathize",
            folder: "empathymap",
            creationType: "EmpathyMap"
        },
        object: new Thing()
     })
})

module.exports = router