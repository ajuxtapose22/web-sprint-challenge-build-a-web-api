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


module.exports = router;