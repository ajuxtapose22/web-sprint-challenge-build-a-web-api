// add middlewares here related to actions
const Actions = require("../actions/actions-model")
const Projects = require("../projects/projects-model")

function validateActionId (req, res, next) {
    const { id } = req.params

    Actions.get(id)
    .then(action => {
        if (action) {
           req.action = action
           next() 
        } else {
            res.status(404).json({
                message: `Action with id ${id} not found`
            }) }
    })
    .catch(err => {
        res.stats(500).json({
            message: "Error retrieving action"
        })
    })} 

function validateActionData (req, res, next) {
    const { project_id, description, notes, completed } = req.body

    if(!project_id || !description || !notes || completed === undefined) {
        return res.status(400).json({
            message: "Required fields {id, desc, notes, completed} missing"
        })
    } else {
        next()
    }}

function validateProjectExist(req, res, next) {
    const { project_id } = req.body

    Projects.get(project_id)
        .then(project => {
            if(project) {
                next()
            } else {
                res.status(400).json({
                    message: `Project with id ${project_id} does not exist`
                }) }
        })
        .catch(err => {
            res.status(500).json({
                message: "Error retrieving project"
            })
        })
}

module.exports = {
    validateActionId, 
    validateActionData,
    validateProjectExist
}