const express = require('express');
const fs = require('fs');
const morgan = require('morgan');

const app = express();
const port = 8080;

app.use(express.json());
app.use(morgan('dev'));
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});

let data = JSON.parse(fs.readFileSync("./students.text"));

const getStudent = (req, res) => {
    res.status(200).json({"status": "success", "data": data});
};

const getStudentsByQueryParams = (req, res) => {
    let body = req.body;
    let response = data.filter((e) => e.Name.includes(body.Name));
    res.status(200).json({response});
};

const getStudentById = (req, res) => {
    let id = req.params.id;
    let response = data.find((e) => e.ID == id);
    res.status(200).json({"status": "success", "requestedAt": req.requestedAt, "data": response});
};

const updateStudent = (req, res) => {
    if (!req.params.id) {
        res.status(400).json({"status": "failed", "data": "Bad request"});
    }
    // logic
    res.status(200).json({"status": "success", "data": "Data updated successfully."});
};

const deleteStudent = (req, res) => {
    let id = req.params.id;
    res.status(200).json({"status": "succes", "data": `Data entry [ID=${id}] has been deleted sucessfully.`});
};

const getAllUsers = (req, res) => {
    res.status(200).json({data});
}

const getUsersByQueryParams = (req, res) => {
    let body = req.body;
    let response = data.filter((e) => e.Name.includes(body.Name));
    res.status(200).json({"status": "success", "requestdAt": req.requestedAt, "data": response});
};

const getUserById = (req, res) => {
    let params = req.params;
    let response = data.find((e) => e.ID == params.id);
    res.status(200).json({"status": "success", "requestdAt": req.requestedAt, "data": response});
}

const updateUserById = (req, res) => {
    let params = req.params;
    // logic
    res.status(200).json({"status": "succes", "data": `Data entry [ID=${params.id}] has been deleted sucessfully.`});
}

const deleteUserById = (req, res) => {
    let params = req.params;
    // logic
    res.status(200).json({"status": "succes", "data": `Data entry [ID=${params.id}] has been deleted sucessfully.`});
}

app.route('/api/v1/students').get(getStudent).post(getStudentsByQueryParams);
app.route('/api/v1/students/:id').post(getStudentById).patch(updateStudent).delete(deleteStudent);

app.route('/api/v1/users').get(getAllUsers).post(getUsersByQueryParams);
app.route('/api/v1/users/:id').post(getUserById).patch(updateUserById).delete(deleteUserById);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});