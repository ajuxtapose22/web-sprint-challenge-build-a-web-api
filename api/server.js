const express = require('express')
const server = express()

// Import routers
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

// Middleware
server.use(express.json())

// Routes
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)

// Root route for testing the server
server.get('/', (req, res) => {
    res.send('Server is up and running!')
})

module.exports = server
