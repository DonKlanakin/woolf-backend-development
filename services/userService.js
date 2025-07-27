const fs = require('fs');
const pool = require('../db/pool');

let data = JSON.parse(fs.readFileSync("./students.text"));

exports.createUser = async (req, res) => {
    let body = req.body;
    let sql = `INSERT INTO customers (firstname, lastname, occupation, email, city)
    VALUES ('${body.firstName}', '${body.lastName}', '${body.occupation}', '${body.email}', '${body.city}');`;
    let servResponse = await pool.query(sql);
    if (servResponse.rowCount > 0) {
        res.status(200).json({"status": "success", "requestSentAt": req.requestedAt, "data": body});
    } else {
        res.status(400).json({"status": "failed."});
    }
}

exports.getAllUsers = async (req, res) => {
    let sql = 'SELECT * FROM customers';
    let servResponse = await pool.query(sql);
    if (servResponse.rowCount > 0) {
        res.status(200).json({"status": "success", "requestSentAt": req.requestedAt, "data": servResponse});
    } else {
        res.status(400).json({"status": "failed."});
    }
}

// exports.getUsersByQueryParams = (req, res) => {
//     let body = req.body;
//     let response = data.filter((e) => e.Name.includes(body.Name));
//     res.status(200).json({"status": "success", "requestSentAt": req.requestedAt, "data": response});
// }

exports.getUserById = (req, res) => {
    let params = req.params;
    let response = data.find((e) => e.ID == params.id);
    res.status(200).json({"status": "success", "requestSentAt": req.requestedAt, "data": response});
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