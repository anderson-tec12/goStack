const express = require('express');

const app = express();

app.get('/projects', (req, res) => {
    return res.status(200).json({message: 'Hellow world'})
})

app.listen(3333)