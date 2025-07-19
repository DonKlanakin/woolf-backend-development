const express = require('express');
const fs = require('fs');
const { cwd } = require('process');

const app = express();
const port = 8080;

let data = JSON.parse(fs.readFileSync("./students.text"));

app.get('/api/v1/students', (req, res) => {
    res.status(200).json({"status": "success", "data": data});
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});