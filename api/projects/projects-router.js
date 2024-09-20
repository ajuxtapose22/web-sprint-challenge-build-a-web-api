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


module.exports = router;