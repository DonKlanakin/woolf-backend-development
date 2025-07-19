const express = require('express');
const fs = require('fs');
const { cwd } = require('process');

const app = express();
const port = 8080;

app.use(express.json());

let data = JSON.parse(fs.readFileSync("./students.text"));

app.get('/api/v1/students', (req, res) => {
    res.status(200).json({"status": "success", "data": data});
});

app.post('/api/v1/students', (req, res) => {
    let body = req.body;
    let response = data.filter((e) => e.Name.includes(body.Name));
    console.log(response);
    res.status(200).json({response});
});

app.post('/api/v1/students/:id', (req, res) => {
    let id = req.params.id;
    let response = data.find((e) => e.ID == id);
    res.status(200).json({response});
});

app.patch('/api/v1/students/:id', (req, res) => {
    if (!req.params.id) {
        res.status(400).json({"status": "failed", "data": "Bad request"});
    }
    // logic
    res.status(200).json({"status": "success", "data": "Data updated successfully."});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});