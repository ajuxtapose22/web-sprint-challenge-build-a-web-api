// add middlewares here related to projects
const Projects = require('../projects/projects-model.js')

function validateProject(req, res, next) {
    const { id } = req.params

    Projects.get(id)
    .then(project => {
        if (project) {
            req.project = project
            next()

        } else {
            res.status(404).json({
                message: `Project with id ${id} not found`
            })
        }
    })
    .catch(err => { // eslint-disable-line
        res.status(500).json({
            message: "Error retrieving project"
        })
    })
}



function validateProjectData (req, res, next) {
    const { name, description, completed } = req.body

    if(!name || !description || completed === undefined) {
        res.status(400).json({
            message: `Missing required fields:
                      name, description, and completed`
        })
    } else {
        next()
    }
}


module.exports = {
    validateProject,
    validateProjectData
}