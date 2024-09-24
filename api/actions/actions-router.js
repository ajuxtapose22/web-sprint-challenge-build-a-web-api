const express = require('express')
const router = express.Router()
const Actions = require('../actions/actions-model')

const { 
    validateActionId, 
    validateActionData, 
    validateProjectExist 
} = require('../actions/actions-middlware')

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions.length > 0 ? actions : [])
    } catch (err) {
        res.status(500).json({ message: "Failed to retrieve actions" })
    }
})

router.get('/:id', validateActionId, async (req, res) => {
    res.status(200).json(req.action)
})

router.post('/', validateActionData, validateProjectExist, async (req, res) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (error) {
        res.status(500).json({ message: "Failed to create action" })
    }
})

router.put('/:id', validateActionId, validateActionData, validateProjectExist, async (req, res) => {
    try {
        const updatedAction = await Actions.update(req.params.id, req.body)
        if (updatedAction) {
            res.status(200).json(updatedAction)
        } else {
            res.status(404).json({ message: `Action with id ${req.params.id} not found` })
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to update action" })
    }
})


router.delete('/:id', validateActionId, async (req, res) => {
    try {
        const deleted = await Actions.remove(req.params.id)
        if (deleted) {
            res.status(204).end()
        } else {
            res.status(404).json({ message: `Action with id ${req.params.id} not found` })
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to delete action" })
    }
})

module.exports = router
