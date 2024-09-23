// Write your "projects" router here!

const express = require('express')
const router = express.Router()
const Projects = require('../projects/projects-model')


router.get('/', (req, res) => {
    Projects.get()
    .then(projects => {
        if(projects.length > 0) {
            res.status(200).json(projects)
        } else {
            res.status(200).json([])
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Failed to retrieve projects"
        })
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Projects.get(id)
    .then(project => {
        if(project) {
            res.status(200).json(project)
        } else {
            res.status(404).json({
                message: `Project with id ${id} not found`
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Failed to retrieve project"
        })
    })
})




module.exports = router;