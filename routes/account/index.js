const express = require('express')
const router = express.Router()
const {ensureAuth, ensureGuest } = require('../../middleware/auth')
const Team = require('../../models/team')
const User = require('../../models/user')
const Project = require('../../models/project')
const TeamProject = require('../../models/TeamProject')
const project = require('../../models/project')

const teamTool = {
    title: "Team",
    description: "",
    link: "account/teams",
    stage: "",
    folder: "account/team",
    creationType: "Team"
}

const projectTool = {
    title: "Project",
    description: "Group your creations together in projects",
    link: "projects",
    stage: "project",
    folder: "projects",
    creationType: "Project"
}

router.get('/login', ensureGuest, (req, res) => {
    res.render('account/login',
    { creations: req.Creations })
})

router.get('/dashboard', ensureAuth, (req, res) =>{
    res.render('account/dashboard', {
        name: req.user.firstName,
        creations: req.Creations
    })
})

router.get('/teams', ensureAuth, async (req, res) => {
    const teams = await Team.find({}).populate('users')
    const userTeams = []
    for (const team of teams){
        for (const user of team.users) {
            if(user.id == req.user.id){
                userTeams.push(team)
            }
        }
    }
    res.render('account/teams/teams', {objects: userTeams,
        creations: req.Creations, tool: teamTool })
})

router.get('/teams/new', ensureAuth, async (req, res) => {
    // const teams = await Team.find({}).populate('users')
    // const userTeams = []
    // for (const team of teams){
    //     for (const user of team.users) {
    //         if(user.id == req.user.id){
    //             userTeams.push(team)
    //         }
    //     }
    // }
    const projects = await Project.find({ users: req.user.id })
    res.render('account/teams/new', {object: new Team(),
        creations: req.Creations, projects: projects })
})

router.post('/teams', ensureAuth, async (req, res) => {
        
        var currentUser = await User.findById(req.user.id)
        try{
            let team = new Team({
                name: req.body.name,
                userEmails: req.body.user,
                creator: currentUser,
                projects: req.body.projects
            })
            let projects = team.projects
            team = new Team({
                name: req.body.name,
                userEmails: req.body.user,
                creator: currentUser
            })
            projects.forEach(async project => {
                let newRelation = new TeamProject({ team: team, project: project })
                newRelation.save()
            });
            
            team.userEmails.push(currentUser.email)
            for(const email of team.userEmails) {
                if(User.find({ email: email })){
                    // console.log('in')
                    var user = await User.find({ email: email })
                    // console.log(user[0])
                    // console.log(user)
                    team.users.push(user[0])
                    
                    user[0].teams.push(team)
                    
                    // console.log(team)
                    // console.log(user)
                    await user[0].save()
                       
                }
            }
            // console.log(currentUser)
            // team.users.push(currentUser)
            // currentUser.teams.push(team)
            await currentUser.save() 
        // const user = await User.find({ email: req.body.teamemail })
        // const team = new Team()
        // team.users.push(user[0])
        // console.log(team)\
        // for (const user of team.users) {
        //     var newUser = await user[0].save()
        // }
        const newTeam = await team.save()
        res.redirect(`/account/teams/${newTeam.id}`)
    }
    catch (err){
        console.log(err)
        res.redirect('/')
    }
})

router.get('/teams/:id', async (req, res) => {
    try{
        var newUsers = []
        const team = await Team.findById(req.params.id).populate('creator').populate('projects')
        const teamproject = await TeamProject.find({ team: team }).populate('project')
        // console.log(team)
        // var projects = await Project.findById(teamproject.project)
        // const notes = await EmpathizeNote.find({ status: team.title }).populate('user')
        for(const user of team.users) {
            newUsers.push(await User.findById(user))
        }
        // console.log(newUsers)
        res.render('account/teams/show', {
            // notes: notes,
            users: newUsers,
            team: team,
            user: req.user.id,
            objects: teamproject,
            creations: req.Creations,
            tool: projectTool
        })
    }
    catch (err){
        console.log(err)
        res.redirect('/')
    }
})

router.get('/teams/:id/edit', ensureAuth, async (req, res) => {
    try {
        const team = await Team.findById(req.params.id).populate('users').populate('creator').populate('projects')
        const projects = await Project.find({ users: req.user.id })
        // const user = await User.findById(req.user.id).populate('teams')
        // const teams = user.teams
        res.render('account/teams/edit', { object: team, creations: req.Creations, projects: projects })
    } catch {
        res.redirect('/teams')
    }
})

router.put('/teams/:id', ensureAuth, async (req, res) => {
    let team
    try {
        var currentUser = await User.findById(req.user.id)
        team = await Team.findById(req.params.id).populate('creator')
        team.name = req.body.name
        team.userEmails = req.body.user
        team.users = currentUser
        team.projects = req.body.projects
        var teamprojects = await TeamProject.find({ team: team })
        if(team.projects){
            team.projects.forEach(async project =>{
                if((await TeamProject.find({ team: team, project: project })).length == 0){
                    let newTeamProject = new TeamProject({ team: team, project: project})
                    await newTeamProject.save()
                }
            })
        }
    if(teamprojects){
        teamprojects.forEach(async teamproject => {
            if(team.projects == null || team.projects.indexOf(teamproject.project) == -1){
                await teamproject.deleteOne()
            }
        })
    }
        // console.log(team.users)
        // console.log(team.userEmails)
        if(team.userEmails == undefined || team.userEmails == {}){
            team.userEmails = currentUser.email
            // team.userEmails.push(currentUser.email)
        }
        // console.log(team.userEmails)
        for(const email of team.userEmails) {
            if(User.find({ email: email })){
                if(email != team.creator.email){
                    // console.log('in')
                    var user = await User.find({ email: email })
                    // console.log(user[0])
                    // console.log(user)
                    team.users.push(user[0])
                    
                    user[0].teams.push(team)
                    
                    // console.log(team)
                    // console.log(user)
                    await user[0].save()
                }
                   
            }
        }
        await team.save()
        res.redirect(`/account/teams/${team.id}`)
    } catch {
        if (team == null) {
            res.redirect('/')
        } else{
            res.render('account/teams/edit', {
                team: team,
                errorMessage: 'Error updating team'
            })
        }
        
    }
})

router.delete('/teams/:id', ensureAuth, async (req, res) => {
    let team
    try {
        team = await Team.findById(req.params.id)
        let teamprojects = await TeamProject.find({ team: team })
        teamprojects.forEach(async teamproject => {
            await teamproject.deleteOne()
        })
        await team.deleteOne()
        res.redirect('/account/teams')
    } 
    catch {
        if (team == null) {
            res.redirect('/')
        } else{
            res.redirect(`/account/teams/${team.id}`)
        }
    }
})

module.exports = router