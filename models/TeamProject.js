const mongoose = require('mongoose')

const projectTeamSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    },
})

module.exports = mongoose.model('ProjectTeam', projectTeamSchema)