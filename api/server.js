const express = require('express');
const server = express();


// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require('./projects/projects-router')

// Configure your server here
server.use(express.json())

// Routes
server.use('/api/actions', actionsRouter)
server.use('/api/projects', projectsRouter)



// Do NOT `server.listen()` inside this file!


server.get('/', (req, res) => {
    res.send('Server is up and running!')
})


module.exports = server;
