const express = require('express');
const {uuid, isUuid} = require('uuidv4')

const projects = []
const app = express();

function logRequests(request, response, next){
    console.time('logLabel')
    const {method, url} = request

    console.log({
        method:method.toUpperCase(),
        url:url,
        owner:"Anderson B. Silva"
    })
    
    next()
    console.timeEnd('logLabel')
}

function logIntercepts(request, response, next){
    console.log('QUANTOS MIDDLEWARES QUSIER')
    
    return next()
}

function validadeProjectId2(request, response, next){
    console.log('OPA RODOU AQUI EM ')

    next()
}

function validadeProjectId(request, response, next){
    const {id} = request.params
    
    if(!isUuid(id)){
        return response.status(400).json({error:"Invalid project ID"})
    }

    next()
}

app.use(express.json())

app.use(logRequests)
app.use('/projects/:id', validadeProjectId2)

app.get('/projects', logIntercepts,(req, res) => {
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

app.put('/projects/:id', validadeProjectId ,(req, res) => {
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

app.delete('/projects/:id', validadeProjectId ,(req, res) => {
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