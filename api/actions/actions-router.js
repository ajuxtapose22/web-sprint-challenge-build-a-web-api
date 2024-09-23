// Write your "actions" router here!


const express = require('express')
const router = express.Router()
const Actions = require('../actions/actions-model')


router.get('/', (req, res) => {
    Actions.get()
    .then(actions => {
        if(actions.length > 0) {
            res.status(200).json(actions)
        } else {
            res.status(200).json([])
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Failed to retrieve actions"
        })
    })
})


router.get('/:id', (req, res) => {
    const { id } = req.params

    Actions.get(id)
    .then(action => {
        if(action) {
            res.status(200).json(action)
        } else {
            res.status(404).json([])
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "Failed to retrieve action"
        })
    })
})





module.exports = router;