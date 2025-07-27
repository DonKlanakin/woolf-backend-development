const fs = require('fs');
const pool = require('../db/pool');

let data = JSON.parse(fs.readFileSync("./students.text"));

exports.createUser = async (req, res) => {
    let body = req.body;
    let sql = `INSERT INTO customers (firstname, lastname, occupation, email, city)
    VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    let values = [body.firstName, body.lastName, body.occupation, body.email, body.city];
    let servResponse = await pool.query(sql, values);
    if (servResponse.rowCount > 0) {
        res.status(200).json({"status": "success", "requestSentAt": req.requestedAt, "data": servResponse});
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

exports.getUserById = async (req, res) => {
    let sql = `SELECT * FROM customers WHERE customer_id = $1`;
    let params = req.params;
    let servResponse = await pool.query(sql, [params.id]);
    if (servResponse.rowCount > 0) {
        res.status(200).json({"status": "success", "requestSentAt": req.requestedAt, "data": servResponse});
    } else {
        res.status(400).json({"status": "failed."});
    }
    
}

exports.updateUserById = async (req, res) => {
    let id = req.params.id;
    let body = req.body;
    let sql = `UPDATE customers
    SET firstname = $1, lastname = $2, occupation = $3, email = $4, city = $5
    WHERE customer_id = $6;`;
    let values = [body.firstName, body.lastName, body.occupation, body.email, body.city, id];
    let servResponse = await pool.query(sql, values);
    if (servResponse.rowCount > 0) {
        res.status(200).json({"status": "success", "message": `Data entry [ID=${id}] has been updated sucessfully.`, "data": servResponse});
    } else {
        res.status(400).json({"status": "failed."});
    }
}

exports.deleteUserById = (req, res) => {
    let params = req.params;
    // logic
    res.status(200).json({"status": "success", "message": `Data entry [ID=${params.id}] has been deleted sucessfully.`});
}