const express = require('express');
const {uuid} = require('uuidv4')

const projects = []
const app = express();

app.use(express.json())

app.get('/projects', (req, res) => {
    console.log(req.query)
    const {title} = req.query

    const results = title ? projects.filter(project => project.title.includes(title)) : projects
    return res.status(200).json(results)
})

app.post('/projects', (req, res) => {
    const {title, owner} = req.body
    
    const project = {
        title,
        owner,
        id:uuid()
    }

    projects.push(project)
    return res.status(200).json(project)
})

app.put('/projects/:id', (req, res) => {
    console.log(req.params)
    const { id } =  req.params
    const {title, owner} = req.body

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0 ){
        return res.status(400).json({error: "Project not found"})
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project

    return res.status(200).json(project)
})

app.delete('/projects/:id', (req, res) => {
    console.log(req.params)
    const { id } =  req.params

    const projectIndex = projects.findIndex(project => project.id === id)

    if(projectIndex < 0 ){
        return res.status(400).json({error: "Project not found"})
    }

    projects.slice(projectIndex, 1)

    return res.status(204).send()
})

app.listen(3333, () => {
    console.log('🚀 Servidor exec...')
})