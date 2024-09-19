// Write your "actions" router here!
const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Actions router working!!')
})

module.exports = router;