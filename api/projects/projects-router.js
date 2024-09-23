// Write your "projects" router here!

const express = require('express')
const router = express.Router()
const Projects = require('../projects/projects-model')
const { validateProject, validateProjectData } = require('../projects/projects-middleware')


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



router.get('/:id', validateProject, async (req, res) => {
    try {
        res.status(200).json(req.project)
    } catch (error) {
        res.status(500).json({
            message: "Failed retrieving project" })
    }
})


router.post('/', validateProjectData, async (req, res) => {
    try {
        const newProject = await Projects.insert(req.body)
        res.status(201).json(newProject)
    } catch (error) {
        res.status(500).json({
            message: "Failed to POST project"
        })
    }

} )


router.put('/:id', validateProject, validateProjectData, async (req, res) => {
    try {
        const updatedProject = await Projects.update(req.params.id, req.body)
        if (updatedProject) {
            res.status(200).json(updatedProject)
        } else {
            res.status(404).json({ message: `Project with id ${req.params.id} not found`})
        }
    } catch (err) {
        res.status(500).json({
            message: "Failed to update Project"
        })
    }
})


router.delete('/:id', validateProject, async (req, res) => {
    try {
        
        const deleted = await Projects.remove(req.params.id)
        if (deleted) {
            res.status(200).end()
        } else  {
            res.status(404).json({
                message: `Project with id ${req.params.id} not found` })
        }
    } catch(err) {
        res.status(500).json({
            message: "Failed to delete the project"
        })
    }
})


router.get('/:id/actions', validateProject, async (req, res) => {
    try {
        const actions = await Projects.getProjectActions(req.params.id)
        res.status(200).json(actions)
    } catch (err) {
        res.status(500).json({
            message: "Failed to retrieve actions"
        })
    }
})


module.exports = router;