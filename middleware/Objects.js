const express = require('express')
const Persona = require('../models/persona')
const router = express.Router()

module.exports = {
    getPersonas: async function(req, res, next){
        req.Personas = await Persona.find({})
        // return req.Personas
    }
}