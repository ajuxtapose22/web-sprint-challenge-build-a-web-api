// Write your "projects" router here!

const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('Projects router working!!')
})

module.exports = router;