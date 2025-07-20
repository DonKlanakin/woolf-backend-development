const fs = require('fs');
const pool = require('../db/pool');

let data = JSON.parse(fs.readFileSync("./students.text"));

exports.getAllUsers = async (req, res) => {
    let sql = 'SELECT NOW()'
    let response = await pool.query(sql);
    console.log(response);
    res.status(200).json({data});
}

exports.getUsersByQueryParams = (req, res) => {
    let body = req.body;
    let response = data.filter((e) => e.Name.includes(body.Name));
    res.status(200).json({"status": "success", "requestdAt": req.requestedAt, "data": response});
}

exports.getUserById = (req, res) => {
    let params = req.params;
    let response = data.find((e) => e.ID == params.id);
    res.status(200).json({"status": "success", "requestdAt": req.requestedAt, "data": response});
}

exports.updateUserById = (req, res) => {
    let params = req.params;
    // logic
    res.status(200).json({"status": "success", "message": `Data entry [ID=${params.id}] has been deleted sucessfully.`});
}

exports.deleteUserById = (req, res) => {
    let params = req.params;
    // logic
    res.status(200).json({"status": "success", "message": `Data entry [ID=${params.id}] has been deleted sucessfully.`});
}